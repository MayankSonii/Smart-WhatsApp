import React, { useEffect, useState } from 'react'
import { getActiveTab } from '../utils/utils'
import GotoMessage from './GotoMessage'
import Settings from './Settings'

const Message = () => {
    const [activeTab, setActiveTab] = useState(null)

    useEffect(() => {
        (async () => {
            const tab = await getActiveTab()
            setActiveTab(tab)
        })()
    }, [])

    return (
        <div>
            {/* checks if the current tab is of WhatsApp web or not */}
            {activeTab &&
                (activeTab.url.includes('whatsapp.com') ? (
                    <Settings />
                ) : (
                    <GotoMessage />
                ))}
        </div>
    )
}

export default Message
