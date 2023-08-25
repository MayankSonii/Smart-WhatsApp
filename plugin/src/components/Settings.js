import React, { useEffect, useState } from 'react'
import { TiPlus, TiMinus } from 'react-icons/ti'
import './css/Settings.css'

const Settings = () => {
    const [isEnabled, setIsEnabled] = useState(true)
    const [suggestions, setSuggestions] = useState(1)
    const [temperature, setTemperature] = useState(1)
    const [topP, setTopP] = useState(1)

    useEffect(() => {
        ;(async () => {
            const enabledRes = await chrome.storage.local.get(['isEnabled'])
            const suggestionsRes = await chrome.storage.local.get([
                'suggestions',
            ])
            const tempRes = await chrome.storage.local.get(['temperature'])
            const topPRes = await chrome.storage.local.get(['topP'])

            setIsEnabled(enabledRes.isEnabled)
            setSuggestions(suggestionsRes.suggestions)
            setTemperature(tempRes.temperature)
            setTopP(topPRes.topP)
        })()
    }, [])

    return (
        <div className="smart-settings-container">
            <header>
                <span>Smart-WhatsApp</span>
                <div className="smart-toggle-container">
                    <input
                        type="checkbox"
                        id="smart-toggle-button"
                        checked={isEnabled}
                        onChange={(e) => {
                            chrome.storage.local.set({
                                isEnabled: e.target.checked,
                            })
                            setIsEnabled(e.target.checked)
                        }}
                    />
                    <label
                        htmlFor="smart-toggle-button"
                        id="smart-toggle-label"
                    ></label>
                </div>
            </header>

            <section>
                <span>Suggestions</span>
                <div>
                    <span
                        onClick={() => {
                            const DOMElement =
                                document.getElementById('smart-input-choice')
                            DOMElement.stepDown()
                            const value = Math.max(0, DOMElement.value)
                            chrome.storage.local.set({
                                suggestions: value,
                            })
                            setSuggestions(value)
                        }}
                    >
                        <TiMinus />
                    </span>
                    <input
                        type="number"
                        max={4}
                        min={1}
                        value={suggestions}
                        id="smart-input-choice"
                        onChange={(e) => {
                            setSuggestions(e.target.value)
                        }}
                    />
                    <span
                        onClick={() => {
                            const DOMElement =
                                document.getElementById('smart-input-choice')
                            DOMElement.stepUp()

                            const value = Math.min(DOMElement.value, 4)
                            chrome.storage.local.set({
                                suggestions: value,
                            })
                            setSuggestions(value)
                        }}
                    >
                        <TiPlus />
                    </span>
                </div>
            </section>

            <section>
                <span>Temperature</span>
                <div>
                    <span
                        onClick={() => {
                            const DOMElement = document.getElementById(
                                'smart-input-temperature'
                            )
                            DOMElement.stepDown()
                            const value = Math.max(DOMElement.value, 0)
                            chrome.storage.local.set({
                                temperature: value,
                            })
                            setTemperature(value)
                        }}
                    >
                        <TiMinus />
                    </span>
                    <input
                        type="number"
                        max={2}
                        min={0}
                        step={0.1}
                        value={temperature}
                        id="smart-input-temperature"
                        onChange={() => {
                            setTemperature(e.target.value)
                        }}
                    />
                    <span
                        onClick={() => {
                            const DOMElement = document.getElementById(
                                'smart-input-temperature'
                            )
                            DOMElement.stepUp()
                            const value = Math.min(DOMElement.value, 2)
                            chrome.storage.local.set({
                                temperature: value,
                            })
                            setTemperature(value)
                        }}
                    >
                        <TiPlus />
                    </span>
                </div>
            </section>

            <section>
                <span>Top_p</span>
                <div>
                    <span
                        onClick={() => {
                            const DOMElement =
                                document.getElementById('smart-input-top-p')
                            DOMElement.stepDown()
                            const value = Math.max(DOMElement.value, 0)
                            chrome.storage.local.set({
                                topP: value,
                            })
                            setTopP(value)
                        }}
                    >
                        <TiMinus />
                    </span>
                    <input
                        type="number"
                        max={1}
                        min={0}
                        step={0.1}
                        value={topP}
                        id="smart-input-top-p"
                        onChange={() => {
                            setTopP(e.target.value)
                        }}
                    />
                    <span
                        onClick={() => {
                            const DOMElement =
                                document.getElementById('smart-input-top-p')
                            DOMElement.stepUp()
                            const value = Math.min(DOMElement.value, 1)
                            chrome.storage.local.set({
                                topP: value,
                            })
                            setTopP(value)
                        }}
                    >
                        <TiPlus />
                    </span>
                </div>
            </section>
        </div>
    )
}

export default Settings
