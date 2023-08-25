import React, { Suspense } from 'react'
import './App.css'

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
            <Message />
        </Suspense>
    )
}

export default App
