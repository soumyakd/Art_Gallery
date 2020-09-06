import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import productsReducer from '../reducers/productsReducer'
import cartReducer from '../reducers/cartReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        products: productsReducer,
        cart: cartReducer
    }), applyMiddleware(thunk))
    return store 
}

export default configureStore
