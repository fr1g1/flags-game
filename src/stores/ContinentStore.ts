import { action, observable } from 'mobx'
import { Store } from './Store'
import { Continent, ContinentId } from '../model'

export class ContinentStore {
    private _continents = observable.array<Continent>([])
    private _selectedContinentIds = observable.array<ContinentId>([])

    constructor(private readonly root: Store) { }

    fetch = () => {
        this.root.api.fetchContinents()
            .then(this.setContinents)
    }

    setContinents = action((continents: Continent[]) => {
        this._continents.replace(continents)
    })

    setSelectedContinentIds = action((ids: ContinentId[]) => {
        this._selectedContinentIds.replace(ids)
    })

    get continents() {
        return this._continents.slice()
    }

    get selectedContinentIds() {
        return this._selectedContinentIds.slice()
    }
}