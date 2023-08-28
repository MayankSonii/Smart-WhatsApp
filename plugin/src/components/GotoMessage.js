import React from 'react'
import './css/GotoMessage.css'
const GotoMessage = () => {
    return (
        <div className="smart-goto-message-container">
            Visit WhatsApp Web to access this extension
            <button
                onClick={() =>
                    window.open('https://web.whatsapp.com', '_blank')
                }
            >
                Here
            </button>
        </div>
    )
}

export default GotoMessage
