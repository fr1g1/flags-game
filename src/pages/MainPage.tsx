import { Button, Center, Modal, Stack } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useNavigate } from 'react-router-dom'

// import { LanguagePicker } from '../components/LanguagePicker'
import { ContinentPicker } from '../components/ContinentPicker'
import { useStores } from '../hooks/useStores'
import { useDisclosure } from '@mantine/hooks'

export const MainPage: React.FC = observer(() => {
    const [isModalOpened, { close: closeModal, open: openModal }] = useDisclosure(false)
    const navigate = useNavigate()
    const { continentStore } = useStores()
    const { selectedContinentIds } = continentStore

    return (
        <Center h='100vh'>
            <Stack>
                <Modal opened={isModalOpened} onClose={closeModal} title='Error'>
                    {'Please select at least one continent'}
                </Modal>
                {/* <LanguagePicker /> */}
                <ContinentPicker />
                <Button
                    onClick={() => {
                        if (selectedContinentIds.length === 0) {
                            openModal()
                            return
                        }
                        navigate('/game')
                    }}
                    size='lg'
                >
                    {'Start game'}
                </Button>
            </Stack>
        </Center>
    )
})
