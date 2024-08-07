import React from 'react'

import { Store } from '../stores/Store'

const store = new Store()

const storeContext = React.createContext<typeof store.stores>(store.stores)

export const useStores = () => React.useContext(storeContext)
