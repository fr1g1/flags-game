import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import React from 'react'
import { MainPage } from './pages/MainPage'

export const App: React.FC = () => {

    return (
        <MantineProvider defaultColorScheme='dark'>
            <MainPage />
        </MantineProvider>
    )
}
