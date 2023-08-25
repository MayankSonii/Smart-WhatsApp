import { showSuggestions, createSuggestionBox, getConfiguration } from './utils'
;(async () => {
    let { isEnabled, topP, temperature, nSuggestions } =
    await getConfiguration()
    
    //listener for any changes in the local storage
    chrome.storage.onChanged.addListener(async () => {
        console.log('calling the listener');
        ({ isEnabled, topP, temperature, nSuggestions } =
            await getConfiguration())
    })

    const interval = setInterval(() => {
        const chatSection = document.querySelector("[role='application']")

        if (chatSection) {
            if (!chatSection.querySelector('#suggestion-box'))
                createSuggestionBox(chatSection)

            const spans = document.querySelectorAll('span.copyable-text')
            spans.forEach((span) => {
                if (!span.onclick) {
                    span.onclick = async () => {
                        const suggestions = []
                        try {
                            // const response = await fetch(
                            //     'http://localhost:5000/v1/chat',
                            //     {
                            //         method: 'post',
                            //         body: JSON.stringify({
                            //             userMessage: span.innerText,
                            //         }),
                            //         headers: {
                            //             "Content-type": "application/json"
                            //         }
                            //     }
                            // )

                            // const result = await response.json()
                            // result.choices.forEach((choice) => suggestions.push(choice.message.content))
                            suggestions.push(span.innerText)
                            suggestions.push(isEnabled)
                            suggestions.push(temperature)
                            suggestions.push(nSuggestions)
                            suggestions.push(topP)

                            showSuggestions(suggestions)
                        } catch (err) {
                            showSuggestions([err])
                        }
                    }
                    span.style.cursor = 'pointer'
                }
            })
        }
    }, 1000)
})()
