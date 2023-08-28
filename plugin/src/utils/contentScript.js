import {
    showSuggestions,
    createSuggestionBox,
    getConfiguration,
    transformText,
    createSpinner,
    removeSpinner,
} from './utils'

// main script which is being injected in the website
const mainScript = async () => {
    let { isEnabled, topP, temperature, nSuggestions } =
        await getConfiguration()

    //listener for any changes in the local storage
    chrome.storage.onChanged.addListener(async () => {
        try {
            ;({ isEnabled, topP, temperature, nSuggestions } =
                await getConfiguration())
        } catch (err) {
            console.log('error:', err)
        }
    })

    // interval which runs for every 1 second and senses for any change in the website DOM
    const interval = setInterval(() => {
        const chatSection = document.querySelector("[role='application']")

        if (chatSection) {
            if (!chatSection.querySelector('#suggestion-box'))
                createSuggestionBox(chatSection)

            const spans = document.querySelectorAll('span.copyable-text')

            //logic for enable button
            if (isEnabled)
                spans.forEach((span) => {
                    if (!span.onclick) {
                        // makes the messages clickable
                        span.onclick = async () => {
                            const suggestions = []
                            const key = transformText(span.innerText)
                            try {
                                createSpinner()
                                const localResponse =
                                    await chrome.storage.local.get([key])
                                let responseValue

                                for (let respKey in localResponse) {
                                    responseValue = localResponse[respKey]
                                }

                                // checks if the response already present in the local storage
                                if (responseValue) {
                                    const choices = JSON.parse(responseValue)
                                    choices.forEach((choice) =>
                                        suggestions.push(choice)
                                    )
                                } else {
                                    // sends request to the backend
                                    const response = await fetch(
                                        'http://localhost:5000/v1/chat',
                                        {
                                            method: 'post',
                                            body: JSON.stringify({
                                                userMessage: span.innerText,
                                                temperature: temperature,
                                                topP: topP,
                                                n: nSuggestions,
                                            }),
                                            headers: {
                                                'Content-type':
                                                    'application/json',
                                            },
                                        }
                                    )
                                    const result = await response.json()
                                    console.log(result)
                                    result.choices &&
                                        result.choices.forEach((choice) =>
                                            suggestions.push(
                                                choice.message.content
                                            )
                                        )

                                    await chrome.storage.local.set({
                                        [key]: JSON.stringify(suggestions),
                                    })
                                }

                                removeSpinner()
                                showSuggestions(suggestions)
                            } catch (err) {
                                showSuggestions([err])
                            }
                        }
                        span.style.cursor = 'pointer'
                    }
                })
            // if not enabled then remove the click handlers from the messages
            else
                spans.forEach((span) => {
                    span.onclick = null
                    span.style.cursor = 'text'
                    const showButton = document.getElementById(
                        'suggestion-box-show-button'
                    )
                    const suggestionBox =
                        document.getElementById('suggestion-box')

                    if (showButton) showButton.style.display = 'none'
                    if (suggestionBox) suggestionBox.style.display = 'none'
                })
        }
    }, 1000)
}

mainScript()
