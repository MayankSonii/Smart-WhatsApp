import React, { Suspense } from 'react'

const Message = React.lazy(() => import('./components/Message'))

const App = () => {
    return (
        <Suspense fallback={'loading...'}>
            <Message />
        </Suspense>
    )
}

export default App
