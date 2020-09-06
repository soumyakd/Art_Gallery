const cartInitialState = []

const cartReducer = (state=cartInitialState, action) => {

    switch(action.type) {
        case 'SET_CART':{
            return [].concat(action.payload)
        }
        case 'ADD_CART':{
            return state.concat(action.payload)
        }
        case 'EDIT_CART' :{
            return state.map (cart =>{
                if(cart._id === action.payload._id) {
                    return Object.assign({}, cart, action.payload)
                } else {
                    return Object.assign({}, cart)
                }
            })
        }
        case 'DELETE_CART':{
            return state.filter(cart=> cart._id !== action.payload)

        }
        default:{
            return[].concat(state)
        }
    }
}

export default cartReducer