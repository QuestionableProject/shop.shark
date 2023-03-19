import {makeAutoObservable} from "mobx"
import { IProducts } from "src/constant"


export default class ProductState {
    private _product = []
    private _curt = []
    constructor() {
        this._product = []
        this._curt = []
        makeAutoObservable(this)
    }
    setProd(product: any) {
        this._product = product
    }
    setCurt(curt: any) {
        this._curt = curt
    }
    get product() {
        return this._product
    }
    get curt() {
        return this._curt
    }
}