import {
    showSuggestions,
    createSuggestionBox,
    getConfiguration,
    transformText,
    createSpinner,
    removeSpinner,
} from './utils'

const mainScript = async () => {
    let { isEnabled, topP, temperature, nSuggestions } =
        await getConfiguration()

    //listener for any changes in the local storage
    chrome.storage.onChanged.addListener(async () => {
        console.log('calling the listener')
        try {
            ;({ isEnabled, topP, temperature, nSuggestions } =
                await getConfiguration())
        } catch (err) {
            console.log('error:', err)
        }

        console.log(isEnabled, nSuggestions, topP, temperature)
    })

    const interval = setInterval(() => {
        const chatSection = document.querySelector("[role='application']")

        if (chatSection) {
            if (!chatSection.querySelector('#suggestion-box'))
                createSuggestionBox(chatSection)

            const spans = document.querySelectorAll('span.copyable-text')

            if (isEnabled)
                spans.forEach((span) => {
                    if (!span.onclick) {
                        span.onclick = async () => {
                            const suggestions = []
                            const key = transformText(span.innerText)
                            try {
                                createSpinner()
                                const localResponse =
                                    await chrome.storage.local.get([key])
                                let responseValue

                                for(let respKey in localResponse) {
                                    responseValue = localResponse[respKey]
                                }

                                if (responseValue) {
                                    const choices = JSON.parse(
                                        responseValue
                                    )
                                    choices.forEach((choice) =>
                                        suggestions.push(choice)
                                    )
                                } else {
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
                                    result.choices && result.choices.forEach((choice) =>
                                        suggestions.push(choice.message.content)
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
            else
                spans.forEach((span) => {
                    span.onclick = null
                    span.style.cursor = 'text'
                    document.getElementById(
                        'suggestion-box-show-button'
                    ).style.display = 'none'
                    document.getElementById('suggestion-box').style.display =
                        'none'
                })
        }
    }, 1000)
}

mainScript()
