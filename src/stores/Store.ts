import { Api } from './Api'
import { ContinentStore } from './ContinentStore.ts'
import { GameStore } from './GameStore'
import { UIStore } from './UIStore.ts'

export class Store {
    readonly api = new Api(this)
    readonly continentStore = new ContinentStore(this)
    readonly gameStore = new GameStore(this)
    readonly uiStore = new UIStore(this)

    get stores() {
        return {
            continentStore: this.continentStore,
            gameStore: this.gameStore,
            uiStore: this.uiStore
        }
    }
}