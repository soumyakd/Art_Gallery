import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import { startGetUser } from './actions/userAction'
import {startGetProducts} from './actions/productAction'
import { startGetCart } from './actions/cartAction'

const store = configureStore()
console.log(store.getState())

store.subscribe(() => {
    console.log(store.getState())
})

if(localStorage.getItem('authToken')){
    store.dispatch(startGetUser())
    store.dispatch(startGetProducts())
    store.dispatch(startGetCart())
}

const jsx = (
    <Provider store = {store}>
        <App/>
    </Provider>
)
ReactDOM.render(jsx, document.getElementById('root'))

