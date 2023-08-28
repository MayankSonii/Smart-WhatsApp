import React, { useEffect, useState } from 'react'
import ConfigurableElement from './ConfigurableElement'
import EnableButton from './EnableButton' 
import './css/Settings.css'

const getConfiguration = async (config, setter, defaultValue) => {
    const result = await chrome.storage.local.get([`${config}`])
    let value = null

    for (let key in result) value = result[key]

    if (!value) setConfiguration(config, setter, defaultValue)
    else setter(value)
}

const setConfiguration = (config, setter, value) => {
    setter(value)
    chrome.storage.local.set({
        [config]: value,
    })
}

const Settings = () => {
    const [isEnabled, setIsEnabled] = useState(false)
    const [suggestions, setSuggestions] = useState(1)
    const [temperature, setTemperature] = useState(0.5)
    const [topP, setTopP] = useState(0.5)

    useEffect(() => {
        ;(async () => {
            await getConfiguration('isEnabled', setIsEnabled, isEnabled)
            await getConfiguration('suggestions', setSuggestions, suggestions)
            await getConfiguration('temperature', setTemperature, temperature)
            await getConfiguration('topP', setTopP, topP)
        })()
    }, [])

    return (
        <div className="smart-settings-container">
            <EnableButton
                configState={isEnabled}
                setter={setIsEnabled}
                setConfig={setConfiguration}
            />

            <ConfigurableElement
                configName="suggestions"
                configState={suggestions}
                minValue={0}
                maxValue={4}
                step={1}
                setConfig={setConfiguration}
                setter={setSuggestions}
                description="No. of suggestions"
            />

            <ConfigurableElement
                configName="temperature"
                configState={temperature}
                minValue={0}
                maxValue={2}
                step={0.1}
                setConfig={setConfiguration}
                setter={setTemperature}
                description="Randomness of the suggestions"
            />

            <ConfigurableElement
                configName="topP"
                configState={topP}
                minValue={0}
                maxValue={1}
                step={0.1}
                setConfig={setConfiguration}
                setter={setTopP}
                description="Top probability of the suggestions"
            />
        </div>
    )
}

export default Settings
