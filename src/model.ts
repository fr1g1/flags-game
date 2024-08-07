export type FlagInfo = {
    id: number
    continent: number
    name: string
    svg: {
        height: number
        name: string
        width: number
    },
}

export type Continent = {
    id: number
    name: string
}

export type ContinentId = number

export type Lang = 'cs' | 'en'
