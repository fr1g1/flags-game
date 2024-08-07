import { action, observable } from 'mobx'
import { Store } from './Store'

type Flag = {
    id: number
    imageUrl: string
    name: string
}

export class GameStore {
    private _correct = observable.box(0)
    private _currentFlag = observable.box<Flag | null>(null)
    private _flags = observable.array<Flag>([])
    private _result = observable.box<'correct' | 'wrong' | null>(null)
    private _stage = observable.box<'guess' | 'result'>('guess')
    private _totalCount = observable.box(0)
    private _wrong = observable.box(0)

    constructor(private readonly root: Store) { }

    start = action(() => {
        this.root.api.fetchFlags(this.root.continentStore.selectedContinentIds)
            .then(flags => {
                const data = flags.map<Flag>(({ id, name }) => ({ 
                    id,
                    imageUrl: this.root.api.getFlagImageUrl(id), 
                    name,
                }))
                this._flags.replace(data)
                this._totalCount.set(data.length)
                this._currentFlag.set(data[this.getRandomInt(data.length)])
            })
    })

    check = action((id: number) => {
        if (id === this._currentFlag.get()?.id) {
            this._correct.set(this.correct + 1)
            this._result.set('correct')
        } else {
            this._wrong.set(this.wrong + 1)
            this._result.set('wrong')
        }
        this._stage.set('result')
        this._flags.replace(this.flags.filter(flag => flag.id !== id))
    })

    next = action(() => {
        this._result.set(null)
        this._stage.set('guess')
        this._currentFlag.set(this.flags[this.getRandomInt(this.flags.length)])
    })

    private getRandomInt = (max: number) => {
        return Math.floor(Math.random() * max)
    }

    get correct() {
        return this._correct.get()
    }

    get currentFlag() {
        return this._currentFlag.get()
    }

    get flags() {
        return this._flags.slice()
    }

    get result() {
        return this._result.get()
    }

    get stage() {
        return this._stage.get()
    }

    get totalCount() {
        return this._totalCount.get()
    }

    get wrong() {
        return this._wrong.get()
    }
}