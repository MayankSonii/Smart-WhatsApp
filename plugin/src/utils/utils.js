export const getActiveTab = async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
    })
    return tab
}

export const createSpinner = () => {
    const suggestionBox = document.getElementById('suggestion-box')
    const showButton = document.getElementById('suggestion-box-show-button')
    const spinnerContainer = document.createElement('div')
    const spinner = document.createElement('div')

    suggestionBox.replaceChildren()
    suggestionBox.appendChild(createSuggestionBoxHeader())

    spinnerContainer.classList.add('smart-spinner-container')
    spinner.classList.add('smart-spinner')
    suggestionBox.style.display = 'flex'
    showButton.style.display = 'none'

    spinnerContainer.appendChild(spinner)
    suggestionBox.appendChild(spinnerContainer)
}

export const removeSpinner = () => {
    console.log('calling remove spinner')
    const suggestionBox = document.getElementById('suggestion-box')
    const spinnerContainer = document.querySelector('.smart-spinner-container')
    suggestionBox.removeChild(spinnerContainer)
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
        showButton.style.display = 'flex'
    }

    suggestionBoxHeader.appendChild(heading)
    suggestionBoxHeader.appendChild(hideButton)

    return suggestionBoxHeader
}

export const createSuggestionBox = (DOMElement) => {
    const suggestionBox = document.createElement('div')
    const showButton = document.createElement('button')
    const icon = document.createElement('img')

    suggestionBox.id = 'suggestion-box'
    showButton.id = 'suggestion-box-show-button'
    icon.alt = 'AI'
    icon.src = chrome.runtime.getURL('assets/icon32.png')

    
    showButton.onclick = () => {
        showButton.style.display = 'none'
        suggestionBox.style.display = 'flex'
    }
    
    showButton.appendChild(icon)
    suggestionBox.appendChild(createSuggestionBoxHeader())
    DOMElement.appendChild(suggestionBox)
    DOMElement.appendChild(showButton)
}

export const showSuggestions = (suggestions) => {
    const suggestionBox = document.getElementById('suggestion-box')
    const showButton = document.getElementById('suggestion-box-show-button')
    suggestionBox.replaceChildren()
    suggestionBox.appendChild(createSuggestionBoxHeader())

    suggestions.forEach((suggestion) => {
        const p = document.createElement('p')
        p.innerText = suggestion
        p.onclick = async () => {
            await navigator.clipboard.writeText(p.innerText)
            suggestionBox.style.display = 'none'
            showButton.style.display = 'flex'
            suggestionBox
            const toast = document.createElement('div')
            toast.id = 'suggestion-box-toast'
            toast.innerText =
                'Successfully copied the suggestion to the clipboard'
            suggestionBox.parentElement.appendChild(toast)

            setTimeout(() => {
                suggestionBox.parentElement.removeChild(toast)
            }, 2500)
        }
        suggestionBox.appendChild(p)
    })
    // suggestionBox.style.display = 'flex'
    // showButton.style.display = 'none'
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

export const transformText = (text) => {
    const punctuations = /[?.,\/#!$%\^&\*;:{}=\-_`~()]/
    const textArray = [...text]
    let transformedText = ''

    textArray.forEach(char => {
        if(!punctuations.test(char))
            transformedText += char
    })

    return transformedText.toLowerCase().replace(/ +/g, ' ')
}