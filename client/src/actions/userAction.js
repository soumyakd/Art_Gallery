import axios from 'axios'

export const setUser = (user) => {
    return { type : 'SET_USER', payload : user}
}

export const startGetUser = () => {
    return(dispatch) => {
        axios.get('/users/account', {
            headers : {
                'Authorization' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const user = response.data
            dispatch(setUser(user))
        })
        .catch((err) => {
            alert(err)
        })
    }
}

// Register
export const startRegisterUser = (formData, redirect) => {
    return(dispatch) => {
        console.log(formData, formData)
        axios.post('/users/register', formData)
            .then((response) => {
                if(response.data.hasOwnProperty('errors')) {
                    alert(response.data.message)
                }else{
                    alert('You have registered successfully')
                    redirect()
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

// Login
export const startLoginUser = (formData, redirect, refresh) => {
    return(dispatch) => {
        axios.post('/users/login', formData) 
            .then((response) => {
                if(response.data.hasOwnProperty('errors')) {
                    alert(response.data.errors)
                }else{
                    alert('Successfully logged in')
                    localStorage.setItem('authToken', response.data.token)
                    axios.get('/users/account', {
                        headers : {
                            'Authorization' : localStorage.getItem('authToken')
                        }
                    })
                    .then((response) => {
                        const user = response.data
                        console.log(user)
                        dispatch(setUser(user))
                        redirect()
                    })
                    .catch((err) => {
                        alert(err)
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

// Logout
export const startUserLogout = () => {
    return(dispatch) => {
        axios.delete('/users/logout', {
            headers : {
                'Authorization' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            console.log(response.data)
            if(response.data.notice) {
                alert(response.data.notice)
                localStorage.removeItem('authToken')
                dispatch(setUser({}))
                window.location.href = '/'
            }
        })
    }
}
