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
        suggestionBox.appendChild(p)
    })
    suggestionBox.style.display = 'flex'
}
