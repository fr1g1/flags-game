import { Fieldset, SegmentedControl, SegmentedControlItem } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { useStores } from '../hooks/useStores'
import { Lang } from '../model'

export const LanguagePicker: React.FC = observer(() => {
    const { uiStore } = useStores()

    const languages: SegmentedControlItem[] = [
        { value: 'cs', label: 'Čeština' },
        { value: 'en', label: 'English' },
    ]

    return (
        <Fieldset legend='Select language'>
            <SegmentedControl
                styles={{
                    // Without this padding, punctuation are cut off in capital letters
                    innerLabel: { padding: 10 },
                }}
                size='lg'
                data={languages}
                value={uiStore.lang}
                onChange={lang => uiStore.setLang(lang as Lang)}
            />
        </Fieldset>
    )
})
