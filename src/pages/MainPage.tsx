import { Alert, Button, DefaultMantineColor, Grid, Image, Select, Stack, useMantineTheme } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { useStores } from '../hooks/useStores'
import { Statistics } from '../components/Statistics'
import { Progress } from '../components/Progress'

export const MainPage: React.FC = observer(() => {
    const theme = useMantineTheme()
    const [selectedFlag, setSelectedFlag] = React.useState<string | null>(null)
    const [isGuessing, setIsGuessing] = React.useState(true)
    const { gameStore } = useStores()
    const { check, currentFlag, flags, result, stage, next, start } = gameStore

    React.useEffect(() => {
        start()
    }, [])

    let alertColor: DefaultMantineColor | undefined
    switch (result) {
        case 'correct':
            alertColor = theme.colors.green[9]
            break
        case 'wrong':
            alertColor = theme.colors.red[9]
            break
        default:
            alertColor = undefined
    }

    let alertTitle: string = 'Guess the flag'
    switch (result) {
        case 'correct':
            alertTitle = 'Correct!'
            break
        case 'wrong':
            alertTitle = `Wrong! Correct answer: ${currentFlag?.en}`
            break
    }

    return (
        <Grid gutter={0}>
            <Grid.Col span={3}>
                <Statistics />
            </Grid.Col>
            <Grid.Col span={6}>
                <Stack
                    align='center'
                    // bg='yellow'
                    h='100vh'
                    justify='center'
                    gap='lg'
                >
                    <Alert
                        color={alertColor}
                        title={alertTitle}
                        w='100%'
                    />
                    <Image
                        radius='lg'
                        h={500}
                        maw='100%'
                        fit='contain'
                        src={`https://flags-api-ashen.vercel.app/flags/${currentFlag?.name}.svg`}
                    />
                    <Select
                        disabled={stage === 'result'}
                        placeholder='Select country'
                        size='xl'
                        styles={{ dropdown: { maxHeight: 400, overflowY: 'auto' } }}
                        withScrollArea={false}
                        data={flags.map(({ en, name }) => ({ label: en, value: name }))}
                        searchable
                        clearable
                        w='60%'
                        onChange={setSelectedFlag}
                        value={selectedFlag}
                    />
                    <Button
                        disabled={selectedFlag === null && stage === 'guess'}
                        onClick={() => {
                            if (isGuessing) {
                                if (selectedFlag !== null) {
                                    check(selectedFlag)
                                    setIsGuessing(false)
                                }
                            } else {
                                next()
                                setIsGuessing(true)
                            }
                            setSelectedFlag(null)
                        }}
                        size='xl'
                    >
                        {isGuessing ? 'Confirm' : 'Next'}
                    </Button>
                </Stack>
            </Grid.Col>
            <Grid.Col span={3}>
                <Progress />
            </Grid.Col>
        </Grid>
    )
})
