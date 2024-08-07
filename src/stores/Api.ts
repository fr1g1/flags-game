import { Axios } from 'axios'

import { Continent, ContinentId, FlagInfo } from '../model'
import { Store } from './Store'

export class Api {
    private readonly api = new Axios({
        // baseURL: 'https://flags-api-ashen.vercel.app'
        baseURL: 'http://localhost:3000'
    })

    constructor(private readonly root: Store) { }

    fetchContinents = (): Promise<Continent[]> => {
        return this.api.get(`/${this.root.uiStore.lang}/continents`)
            .then(res => {
                return JSON.parse(res.data)
            })
            .catch(e => {
                console.log('Failed to fetch continents', e)
            })
    }

    fetchFlag = (id: number): Promise<FlagInfo[]> => {
        return this.api.get(`/${this.root.uiStore.lang}/flags/${id})`)
            .then(res => {
                return JSON.parse(res.data)
            })
            .catch(e => {
                console.log('Failed to fetch flags info', e)
            })
    }

    fetchFlags = (continentIds?: ContinentId[]): Promise<FlagInfo[]> => {
        const query = continentIds !== undefined && continentIds.length > 0 ? `?continents=${continentIds.join(',')}` : ''
        return this.api.get(`/${this.root.uiStore.lang}/flags${query}`)
            .then(res => {
                return JSON.parse(res.data)
            })
            .catch(e => {
                console.log('Failed to fetch flags info', e)
            })
    }

    getFlagImageUrl = (id: number) => {
        return `${this.api.defaults.baseURL}/flags/${id}`
    }
}