import React, { useEffect } from 'react'
import './css/EnableButton.css'

const EnableButton = ({ setConfig, setter, configState }) => {
    let extStatus
    useEffect(() => {
        extStatus = document.getElementById('smart-extension-status')

        if (extStatus)
            if (!configState) extStatus.style.color = 'rgba(255, 255, 255, 0.3)'
            else extStatus.style.color = '#00a884'
    }, [configState, extStatus])

    const clickHandler = (e) => {
        setConfig('isEnabled', setter, e.target.checked)
    }

    return (
        <div className="smart-enable-button-container">
            <span id="smart-extension-status">
                {configState ? 'Enabled' : 'Disabled'}
            </span>
            <span className="smart-toggle-container">
                <input
                    type="checkbox"
                    id="smart-toggle-button"
                    checked={configState}
                    onChange={clickHandler}
                />
                <label
                    htmlFor="smart-toggle-button"
                    id="smart-toggle-label"
                ></label>
            </span>
        </div>
    )
}

export default EnableButton
