const productInitialState = []

const productsReducer = (state = productInitialState, action) => {
    switch(action.type) {
        case 'SET_PRODUCTS': {
            return [].concat(action.payload)
        }

        case 'ADD_PRODUCTS': {
            return state.concat(action.payload)
        }

        case 'REMOVE_PRODUCTS': {
            return state.filter(product => product._id !== action.payload)
        }

        case 'UPDATE_PRODUCTS': {
            return state.map(product => {
                if(product._id === action.payload.id) {
                    return Object.assign( {}, product.action.payload.data)
                } else {
                    return Object.assign({}, product)
                }
            })
        }

        default: {
            return [].concat(state)
        }
    }
}

export default productsReducer