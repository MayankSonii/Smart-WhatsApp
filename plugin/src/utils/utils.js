export const getActiveTab = async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
    })
    return tab
}

const createSuggestionBoxHeader = () => {
    const suggestionBoxHeader = document.createElement('section')
    const heading = document.createElement('span')
    const hideButton = document.createElement('span')
    const showButton = document.getElementById('suggestion-box-show-button')

    suggestionBoxHeader.id = 'suggestion-box-header'
    hideButton.id = 'suggestion-box-hide-button'
    heading.innerText = 'Smart Suggestions'
    hideButton.innerText = 'X'
    hideButton.style.cursor = 'pointer'

    hideButton.onclick = () => {
        suggestionBoxHeader.parentElement.style.display = 'none'
        showButton.style.display = 'block'
    }

    suggestionBoxHeader.appendChild(heading)
    suggestionBoxHeader.appendChild(hideButton)

    return suggestionBoxHeader
}

export const createSuggestionBox = (DOMElement) => {
    const suggestionBox = document.createElement('div')
    const showButton = document.createElement('button')

    suggestionBox.id = 'suggestion-box'
    showButton.id = 'suggestion-box-show-button'

    showButton.innerText = 'AI'

    showButton.onclick = () => {
        showButton.style.display = 'none'
        suggestionBox.style.display = 'flex'
    }

    suggestionBox.appendChild(createSuggestionBoxHeader())
    DOMElement.appendChild(suggestionBox)
    DOMElement.appendChild(showButton)
}

export const showSuggestions = (suggestions) => {
    const suggestionBox = document.getElementById('suggestion-box')
    suggestionBox.replaceChildren()
    suggestionBox.appendChild(createSuggestionBoxHeader())

    suggestions.forEach((suggestion) => {
        const p = document.createElement('p')
        p.innerText = suggestion
        p.onclick = async () => {
            await navigator.clipboard.writeText(p.innerText)
            suggestionBox.style.display = 'none'

            const toast = document.createElement('div')
            toast.id = 'suggestion-box-toast'
            toast.innerText = 'Successfully copied the suggestion to the clipboard'
            suggestionBox.parentElement.appendChild(toast)

            setTimeout(() => {
                suggestionBox.parentElement.removeChild(toast)
            }, 4000)
        }
        suggestionBox.appendChild(p)
    })
    suggestionBox.style.display = 'flex'
}

export const getConfiguration = async () => {
    const isEnabled = await chrome.storage.local.get(['isEnabled'])
    const temperature = await chrome.storage.local.get(['temperature'])
    const nSuggestions = await chrome.storage.local.get(['suggestions'])
    const topP = await chrome.storage.local.get(['topP'])

    return {
        isEnabled: isEnabled.isEnabled,
        temperature: temperature.temperature,
        nSuggestions: nSuggestions.suggestions,
        topP: topP.topP,
    }
}
