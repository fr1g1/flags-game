import { Group, rem, Stack, Title, useMantineTheme } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { useStores } from '../hooks/useStores'

export const Statistics: React.FC = observer(() => {
    const theme = useMantineTheme()
    const { gameStore } = useStores()
    const { correct, wrong } = gameStore

    return (
        <Stack
            align='center'
            h='100vh'
            justify='center'
        >
            <Group>
                <IconCheck
                    color={theme.colors.green[8]}
                    size={rem(50)}
                    stroke={1.5}
                />
                <Title order={1}>{correct}</Title>
            </Group>
            <Group>
                <IconX
                    color={theme.colors.red[8]}
                    size={rem(50)}
                    stroke={1.5}
                />
                <Title order={1}>{wrong}</Title>
            </Group>
        </Stack>
    )
})
