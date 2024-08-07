import { Alert, Button, DefaultMantineColor, Grid, Group, Image, Select, Stack, useMantineTheme } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { useStores } from '../hooks/useStores'
import { Statistics } from '../components/Statistics'
import { Progress } from '../components/Progress'

export const GamePage: React.FC = observer(() => {
    const theme = useMantineTheme()
    const [selectedFlag, setSelectedFlag] = React.useState<string | null>(null)
    const [isGuessing, setIsGuessing] = React.useState(true)
    const { gameStore } = useStores()
    const { currentFlag, flags, result, stage } = gameStore

    React.useEffect(() => {
        gameStore.start()
    }, [gameStore])

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
            alertTitle = `Wrong! Correct answer: ${currentFlag?.name}`
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
                        radius={theme.defaultRadius}
                        mih={500}
                        mah={500}
                        maw='100%'
                        w='auto'
                        fit='contain'
                        src={currentFlag?.imageUrl}
                    />
                    <Select
                        disabled={stage === 'result'}
                        placeholder='Select country'
                        size='xl'
                        styles={{ dropdown: { maxHeight: 400, overflowY: 'auto' } }}
                        withScrollArea={false}
                        data={flags.map(({ id, name }) => ({ label: name, value: id.toString() }))}
                        searchable
                        clearable
                        w='60%'
                        onChange={setSelectedFlag}
                        value={selectedFlag}
                        nothingFoundMessage="Nothing found..."
                    />
                    <Group grow w='60%'>
                        <Button
                            disabled={selectedFlag === null && stage === 'guess'}
                            onClick={() => {
                                if (isGuessing) {
                                    if (selectedFlag !== null) {
                                        gameStore.check(parseInt(selectedFlag))
                                        setIsGuessing(false)
                                    }
                                } else {
                                    gameStore.next()
                                    setIsGuessing(true)
                                }
                                setSelectedFlag(null)
                            }}
                            size='xl'
                        >
                            {isGuessing ? 'Confirm' : 'Next'}
                        </Button>
                        {isGuessing && (
                            <Button
                                onClick={() => { }}
                                size='xl'
                            >
                                {'Skip for later'}
                            </Button>
                        )}
                    </Group>
                </Stack>
            </Grid.Col>
            <Grid.Col span={3}>
                <Progress />
            </Grid.Col>
        </Grid>
    )
})
