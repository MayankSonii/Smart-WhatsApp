export const getActiveTab = async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
    })
    return tab
}

export const createSuggestionBox = () => {
    const suggestionBox = document.createElement('div')
    suggestionBox.id = 'suggestion-box'
    document.body.appendChild(suggestionBox)
}

export const showSuggestions = (suggestions) => {
    const suggestionBox = document.getElementById('suggestion-box')
    suggestionBox.innerText = suggestions[0]
    suggestionBox.style.display = 'block'
}
