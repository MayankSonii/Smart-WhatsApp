// function to get the current tab information using chrom.tabs API
export const getActiveTab = async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
    })
    return tab
}

// function to create a spinner which is shown when the suggestions are being loaded in the suggestion box
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

// function to remove the spinner when the suggestions are loaded
export const removeSpinner = () => {
    console.log('calling remove spinner')
    const suggestionBox = document.getElementById('suggestion-box')
    const spinnerContainer = document.querySelector('.smart-spinner-container')
    suggestionBox.removeChild(spinnerContainer)
}

// funtion to create suggestion box header
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

    //click handler which hides the suggestion box and shows the show button
    hideButton.onclick = () => {
        suggestionBoxHeader.parentElement.style.display = 'none'
        showButton.style.display = 'flex'
    }

    suggestionBoxHeader.appendChild(heading)
    suggestionBoxHeader.appendChild(hideButton)

    return suggestionBoxHeader
}

// function to create the suggestion box and show button
export const createSuggestionBox = async (DOMElement) => {
    const suggestionBox = document.createElement('div')
    const showButton = document.createElement('button')
    const icon = document.createElement('img')

    suggestionBox.id = 'suggestion-box'
    showButton.id = 'suggestion-box-show-button'
    icon.alt = 'AI'

    //Accessing the asset from plugin folder to the current website
    icon.src = await chrome.runtime.getURL('assets/icon32.png')

    // click handler which hides the show button and shows the suggestion box
    showButton.onclick = () => {
        showButton.style.display = 'none'
        suggestionBox.style.display = 'flex'
    }
    
    showButton.appendChild(icon)
    suggestionBox.appendChild(createSuggestionBoxHeader())
    DOMElement.appendChild(suggestionBox)
    DOMElement.appendChild(showButton)
}

// function to populate the suggestion box with suggestions or error if any
export const showSuggestions = (suggestions) => {
    const suggestionBox = document.getElementById('suggestion-box')
    const showButton = document.getElementById('suggestion-box-show-button')
    suggestionBox.replaceChildren()
    suggestionBox.appendChild(createSuggestionBoxHeader())

    suggestions.forEach((suggestion) => {
        const p = document.createElement('p')
        p.innerText = suggestion

        // click handler for each suggestion in the suggestion box 
        // copies the suggestion in the clipboard
        p.onclick = async () => {
            await navigator.clipboard.writeText(p.innerText)
            suggestionBox.style.display = 'none'
            showButton.style.display = 'flex'
            suggestionBox
            const toast = document.createElement('div')
            toast.id = 'suggestion-box-toast'
            toast.innerText =
                'Successfully copied to the clipboard'
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

// funtion to return the configutations in the plugin local storage
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


// function to transform the suggestions so as to save them in the local storage
export const transformText = (text) => {
    const punctuations = /[?.,\/#!$%\^&\*;:{}=\-_`~()]/
    const textArray = [...text]
    let transformedText = ''

    // removes any punctuation from the text
    textArray.forEach(char => {
        if(!punctuations.test(char))
            transformedText += char
    })

    // returns the text in all lower case
    return transformedText.toLowerCase().replace(/ +/g, ' ')
}