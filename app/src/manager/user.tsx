import {makeAutoObservable} from "mobx"


export default class UserState {
    private _isAuth = false
    private _user = {}
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }
    setIsAuth(bool: boolean) {
        this._isAuth = bool
    }
    setUser(user: any) {
        this._user = user
    }
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}