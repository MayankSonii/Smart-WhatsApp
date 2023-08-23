import React, { useEffect, useState } from 'react'
import { getActiveTab } from '../utils/utils'

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
            {activeTab &&
                (activeTab.url.includes('whatsapp.com')
                    ? 'Welcome to Smart-WhatsApp'
                    : 'Please visit WhatsApp Web to access this extension Visit Here https://web.whatsapp.com')}
        </div>
    )
}

export default Message
