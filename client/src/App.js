import React from 'react'
import { AuthProvider } from './context/AuthContext'
import { AudioProvider } from './context/AudioContext'
import { PredictionProvider } from './context/PredictionContext'
import Router from './Router/Router'

const App = () => {
  return (
    <>
        <AuthProvider>
            <AudioProvider>
                <PredictionProvider>
                    <Router/>
                </PredictionProvider>
            </AudioProvider>
        </AuthProvider>
    </>
  )
}

export default App
