import { Checkbox, Fieldset, Stack } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { useStores } from '../hooks/useStores'

export const ContinentPicker: React.FC = observer(() => {
    const { continentStore } = useStores()
    const { continents, selectedContinentIds, setSelectedContinentIds } = continentStore

    React.useEffect(() => {
        continentStore.fetch()
    }, [])

    return (
        <Fieldset legend='Select continents'>
            <Checkbox.Group
                value={selectedContinentIds.map(String)}
                onChange={value => void setSelectedContinentIds(value.map(Number))}
            >
                <Stack p='md' gap='xl'>
                    {continents.map(continent => (
                        <Checkbox
                            size='xl'
                            key={continent.id}
                            value={continent.id.toString()}
                            label={continent.name}
                        />
                    ))}
                </Stack>
            </Checkbox.Group>
        </Fieldset>
    )
})
