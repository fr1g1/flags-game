import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { GamePage } from './pages/GamePage'
import { MainPage } from './pages/MainPage'

export const App: React.FC = () => {

    return (
        <MantineProvider theme={{ defaultRadius: 'md' }} defaultColorScheme='dark'>
            <BrowserRouter basename='/flags-game'>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/game' element={<GamePage />} />
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    )
}
