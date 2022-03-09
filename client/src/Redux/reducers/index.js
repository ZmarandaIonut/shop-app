import {combineReducers} from "redux"
import CountItemsInCart from "./CoutItemsInCart";
import ItemsInCart from "./ItemsInCart"
import GetCartTotal from "./GetCartTotal";
import SearchDir from "./SearchDir"
import MinMaxFilter from "./Filter-Min-Max"
const reducers = combineReducers({
    CountItemsInCart,   // name_to_acces : fct_name.
    ItemsInCart,
    GetCartTotal,
    SearchDir,
    MinMaxFilter,
})

export default reducers;