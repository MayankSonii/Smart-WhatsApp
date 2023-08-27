import React, { Suspense } from 'react'
import './App.css'

const Header = React.lazy(() => import('./components/Header'))
const Footer = React.lazy(() => import('./components/Footer'))
const Message = React.lazy(() => import('./components/Message'))

const App = () => {
    return (
        <Suspense
            fallback={
                <div className="smart-spinner-container">
                    <div className="smart-spinner"></div>
                </div>
            }
        >
            <Header />
            <Message />
            <Footer />
        </Suspense>
    )
}

export default App
