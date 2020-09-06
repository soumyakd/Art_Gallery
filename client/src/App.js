import React from 'react'
import { connect } from 'react-redux'
import Home from './components/static/Home' 
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import 'bootstrap/dist/css/bootstrap.css'
 
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import NewProduct from './Add_new'
import List from './List'
import ShowProduct from './ShowProduct'
// import EditProduct from './EditProduct'
import Cart from './Cart'

function App(props){
    const handleLogout = () => {
        localStorage.removeItem('authToken')
        window.location.href ='/'    
    }
    return(
        <BrowserRouter>                                                                                
            <div className='container'> 
                <h1> Art Gallery </h1>
                <Link to = '/'> Home </Link>
                {
                    Object.keys(props.user).length !== 0 ? (
                        <div>                        
                            <Link to = '/customers'> Customers | </Link>
                            <Link to = '/list'> List | </Link>
                            <Link to = '/users/account'> Account | </Link>
                            <Link to = '#' onClick ={handleLogout}> Logout </Link>

                            {/* { props.user.role === 'admin' && (
                                <Link> </Link>
                            )} */}
                        </div>
                    ) : (
                        <div>
                            <Link to = '/users/register'> Register </Link>
                            <Link to = '/users/login'> Login </Link>
                        </div>
                    )
                }
                
                <Switch>
                    <Route path = '/' component = {Home} exact = {true} />
                    <Route path = '/users/register' component = {Register} /> 
                    <Route path = '/users/login' component = {Login} />
                    <Route path = '/add-product' component = {NewProduct} />
                    <Route path = '/list' component={List} />
                    <Route path = '/products/:id' component = {ShowProduct}  exact={true}/>
                    <Route path = '/cart' component = {Cart} />
                    {/* <Route path = '/products/:id' component = {EditProduct} exact={true} /> */}
                </Switch>
            </div>
        </BrowserRouter>  
    )
}

const mapStateToProps = (state) => {
    return {
        user : state.user
    }
}
export default connect(mapStateToProps)(App)


// import React from 'react'
// import { connect } from 'react-redux'
// import { BrowserRouter, Route, Switch } from 'react-router-dom'

// import NavBar from './nav'
// import Home from './components/static/Home' 

// import Register from './components/auth/Register'
// import Login from './components/auth/Login'
// import AdminRegister from './components/auth/Admin'

// import 'bootstrap/dist/css/bootstrap.css'

// import Products from './Products'
// // import NewProduct from './Add_new'

// function App(props){ 
//     return(
//         <BrowserRouter>
//             <div>
//                 <NavBar />
//                 <Switch>
//                     <Route path="/" component={Home} exact={true} />

//                     <Route path = '/users/register' component = {Register} />
//                     <Route path ="/admin/register" component={AdminRegister} />
//                     <Route path = '/login' component = {Login} />
//                     {/* <Route path = '/products' component = {Products} /> */}
//                     <Route path = '/add-product' component = {Products} exact={true}/>
//                 </Switch>
//             </div>
//         </BrowserRouter>
//     )
// }

// const mapStateToProps = (state) => {
//     return {
//         // products: state.products,
//         user : state.user
//     }
// }
// export default connect(mapStateToProps)(App)













