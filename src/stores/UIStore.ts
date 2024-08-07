import { observable } from 'mobx'

import { Lang } from '../model'
import { Store } from './Store'

export class UIStore {
    private _lang = observable.box<Lang>('en')

    constructor(private readonly root: Store) { }
    
    setLang = (lang: Lang) => {
        this._lang.set(lang)
    }

    get lang() {
        return this._lang.get()
    }
}