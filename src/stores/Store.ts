import { FlagStore } from './FlagStore'
import { GameStore } from './GameStore'

export class Store {
    readonly flagStore = new FlagStore()
    readonly gameStore = new GameStore(this.flagStore)
}