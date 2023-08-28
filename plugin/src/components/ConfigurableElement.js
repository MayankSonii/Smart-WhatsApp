import React from 'react'
import { TiPlus, TiMinus } from 'react-icons/ti'

const ConfigurableElement = ({
    configName,
    configState,
    minValue,
    maxValue,
    setConfig,
    setter,
    step,
    description
}) => {
    return (
        <section>
            <span title={description}>{configName}</span>
            <div>
                <span
                    onClick={() => {
                        const DOMElement = document.getElementById(
                            `smart-input-${configName}`
                        )
                        DOMElement.stepDown()
                        const value = Math.max(minValue, DOMElement.value)
                        setConfig(configName, setter, value)
                    }}
                >
                    <TiMinus />
                </span>
                <input
                    type="number"
                    max={maxValue}
                    min={minValue}
                    value={configState}
                    step={step}
                    id={`smart-input-${configName}`}
                    onChange={(e) => setter(e.target.value)}
                />
                <span
                    onClick={() => {
                        const DOMElement = document.getElementById(
                            `smart-input-${configName}`
                        )
                        DOMElement.stepUp()

                        const value = Math.min(DOMElement.value, maxValue)
                        setConfig(configName, setter, value)
                    }}
                >
                    <TiPlus />
                </span>
            </div>
        </section>
    )
}

export default ConfigurableElement
