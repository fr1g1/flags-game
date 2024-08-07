import { Stack, Title } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { useStores } from '../hooks/useStores'

export const Progress: React.FC = observer(() => {
    const { gameStore } = useStores()
    const { correct, totalCount, wrong } = gameStore

    return (
        <Stack
            align='center'
            h='100vh'
            justify='center'
        >
            <Title order={1}>{`${correct + wrong + 1}/${totalCount}`}</Title>
        </Stack>
    )
})
