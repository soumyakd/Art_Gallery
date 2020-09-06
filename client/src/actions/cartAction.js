import axios from 'axios'

export const setCart = (cart) => {
    return { type:'SET_CART', payload: cart }
}

export const startGetCart = () => {
    return(dispatch) => {
        axios.get('/cart',{
            headers:{
                'Auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const cart = response.data
            dispatch(setCart(cart))

        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const addCart = (cart) => {
    return { type: 'ADD_CART', payload: cart }
}

export const startAddCart = (formData, redirect) => {
    return(dispatch) => {
        const product= {
            productQuantity: -1,
            cartQuantity : 1,
            currentQuantity: 1,
            id: formData.product
        }
        axios.put('/products/update', product)
            .then(response => {
                console.log(response.data)
                if(response.data.hasOwnProperty('message')) {
                    alert(response.data.message)
                } else if(response.data.hasOwnProperty('error') ){
                    alert(response.data.error)
                } else { 
                    axios.post('/cart', formData, { headers : {
                        'auth': localStorage.getItem('authToken') 
                    }
                })
                .then(response => {  
                    dispatch(addCart(response.data) )
                    redirect()
                })
                .catch(err =>{
                    console.log(err)
                })    
            } 
        }) 
        .catch(err =>{
            console.log(err)
        })      
    }
}

export const startUpdateCart = (cart) =>{
    return {type: 'EDIT_CART' ,  payload:cart}
}


export const updateCart = (formData, refresh) =>{
    return(dispatch) =>{
        axios.put('products/update', formData)
        .then( response =>{
            if(response.data.hasOwnProperty('message')) {
                alert(response.data.message)
            } else if(response.data.hasOwnProperty('error') ){
                alert(response.data.error)
            } else { 
                axios.put('/cart/update',formData , {  headers : {
                    'auth' : localStorage.getItem('authToken') 
                    }
                })
                .then( response =>{
                    dispatch(startUpdateCart(response.data))
                     refresh()
                })   
                .catch(err=> {
                    console.log(err)
                })
            }
        })
        .catch(err =>{
            console.log(err)
        })
    }
}
     
export const deleteCart = (id) => {
    return { type:'DELETE_CART', payload:id }
}

export const startDeleteCart = (id, refresh) => {
    return(dispatch)=>{
        axios.delete(`/cart/${id}`,{
            headers:{
                'Auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if( response.data.hasOwnProperty('error')){
                alert(response.data)
            } else {
                dispatch(startGetCart())
                refresh()
                const product = {
                    productQuantity: response.data.quantity,
                    quantity: -1,
                    currentQuantity: response.data.quantity,
                    id: response.data.product
                }
                axios.put('/product/update', product)
                .then( response =>{
                    if(response.data.hasOwnProperty('message')) {
                        alert(response.data.message)
                    } else if(response.data.hasOwnProperty('error') ){
                        alert(response.data.error)
                    }  
                })
                .catch(err=>{
                    console.log(err)
                })
            }   
        })
        .catch(err =>{
            console.log(err)
        })         
    }
}