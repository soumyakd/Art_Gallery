import axios from 'axios'

const getToken = localStorage.getItem('authToken')

export const setProducts = (data) => {
    return { type: 'SET_PRODUCTS', payload: data}
}

export const startGetProducts = () => {
    return(dispatch) => {
        axios.get('/products', {headers: {'Authorization': getToken, 'content-type': 'multipart/form-data'}})
        .then((response) => {
            console.log(getToken)
            const products = response.data
            dispatch(setProducts(products))
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

// Add
export const addProducts = (data) => {
    return { type: 'ADD_PRODUCTS', payload: data}
}

export const startAddProducts = (data) => {
    return(dispatch) => {
        axios.post('/products', data, {headers: {'Authorization': getToken, 'content-type': 'multipart/form-data'}})
        .then((response) => {
            console.log(response.data)
            const products = response.data
            dispatch(addProducts(products))
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

// Remove 
export const removeProducts = (id) => {
    return { type: 'REMOVE_PRODUCTS', payload: id}
}
export const startRemoveProducts = (id) => {
    return(dispatch) => {
        axios.delete(`/products/${id}`, {headers: {'Authorization': getToken}})
        .then((response) => {
            dispatch(removeProducts(id))
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

// Update 
export const updateProducts = (id, data) => {
    return { type: 'UPDATE_PRODUCTS', payload: { id, data }}
}

export const startUpdateProducts = (id, data) => {
    return(dispatch) => {
        axios.put(`/products/${id}`, data, {headers: {'Authorization': getToken}})
        .then((response) => {
            dispatch(updateProducts (id, data))
        })
        .catch((err) => {
            console.log(err)
        })
    }
}