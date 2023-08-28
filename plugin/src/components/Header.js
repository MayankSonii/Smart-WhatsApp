import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import './css/Header.css'

const Header = () => {
    return (
        <div className="smart-header-container">
            <span>Smart-WhatsApp</span>
            <button onClick={() => window.close()}>
                <AiFillCloseCircle />
            </button>
        </div>
    )
}

export default Header
