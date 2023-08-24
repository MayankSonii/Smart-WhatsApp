import { showSuggestions, createSuggestionBox } from './utils'
;(() => {
    const interval = setInterval(() => {
        const chatSection = document.querySelector("[role='application']")

        if (chatSection) {
            if(!chatSection.querySelector('#suggestion-box'))
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
                            showSuggestions(suggestions)
                            // const inputDiv = document.querySelectorAll(".lexical-rich-text-input")[1]
                            // const inputP = inputDiv.querySelector('p')
                            // const newText = document.createChild('span')
                            // newText.innerText = span.innerText
                            // inputP.appendChild(newText)
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
