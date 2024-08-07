import { Axios } from 'axios'

import { FlagInfo } from '../model'

export class FlagStore {
    private readonly api = new Axios({
        baseURL: 'https://flags-api-ashen.vercel.app'
    })

    fetch = (): Promise<FlagInfo[]> => {
        return this.api.get('/flags/info')
            .then(res => {
                return JSON.parse(res.data)
            })
            .catch(e => {
                console.log('Failed to fetch flags info', e)
            })
    }
}