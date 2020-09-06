import React from 'react'
import NumberFormat from 'react-number-format' 
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { startGetCart, startDeleteCart, startUpdateCart } from './actions/cartAction'

class Cart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            price: 0,
            tax: 0        }
    }
    
    componentDidMount = () => {
        this.props.dispatch(startGetCart()) 
        const refersh =  setInterval( () =>{  
            if(this.props.cartData.length ) {             
                clearInterval(refersh)   
                let price = 0
                this.props.cartData.map( cart =>{
                    price += cart.price * cart.quantity
                    return price  
                })   
                
                if (price > 0 ){
                    const tax = price * 1 /100
                    this.setState({price, tax})
                }
            }
        } , 1000)
    }

    handleCartQuantity = (e , cart) =>{
        const valTYpe = e.target.title 

        if(valTYpe === 'less' && cart.quantity === 1 ) {           
            alert ('Item quantity can not be less than 1')
        } else if( cart.quantity >= 3 && valTYpe === 'add' ){
            alert('Upto 3 quantity only purchase at a time ')
        }

        const refresh =() =>{
            return window.location.reload()
        }

        if(valTYpe === 'less' &&  cart.quantity > 1 ) {
            const formData = {
                id : cart.product,
                cartQuantity : -1,
                cartid : cart._id,
                productQuantity : 1,
                currentQuantity : cart.quantity,
                auth : localStorage.getItem('token')
            }
            this.props.dispatch(startUpdateCart(formData,refresh))   

        } else if(valTYpe === 'add' &&  cart.quantity >=1 && cart.quantity < 3 ){
            const formData = {
                id : cart.product,
                cartQuantity : 1,
                cartid : cart._id,
                productQuantity : -1,
                currentQuantity : cart.quantity,
                auth : localStorage.getItem('token')
            }
            this.props.dispatch(startUpdateCart(formData,refresh))  
        }
    }

    handleRemove = (e) =>{
        const id = e.target.value 
        const refresh =() =>{
            return window.location.reload()
        }
        this.props.dispatch(startDeleteCart(id ,refresh))
    }

    render() { 
        return(
            <div className ='container-fluid m-3 '>
                 <h4 style ={{ visibility : this.props.cartData.length ? 'visible' : 'hidden'}}  > My Cart</h4> 
                {
                   this.props.cartData.length ? 
                   <div className="row justify-content-between">                        
                        <div className="col-6"> 
                        {
                            this.props.cartData.map((cart,i) =>{
                                return (
                                    <div className="card mb-2"  key ={i+1}>
                                        <div className="row no-gutters">
                                            <div className="col-md-1 mt-3">
                                                <img src={`../uploads/${cart.image}`} className="card-img" alt = 'product' /> 
                                            </div>
                                            
                                            <div className="col-md-10">
                                                <div className="card-body">
                                                    <div className='row'>
                                                        <div className ='col'>  
                                                            <h5 className="card-title">{cart.title}</h5>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h5 className="card-text text-left mt-3">
                                                            <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" 
                                                                className="card-title text-left"
                                                                displayType = 'text' prefix={'₹'} value={cart.price }/>
                                                        </h5> 
                                                    </div>
                                                    <div className ='row mt-3'>
                                                        <div className ='col-4'>
                                                            <input type ='submit' className ='card-text border-white rounded-circle' name = 'less' 
                                                                onClick = { (e) => {this.handleCartQuantity (e,cart)} }  value = '-' />
                                                                     
                                                            <input type ='text' disabled value = {cart.quantity} 
                                                                className ='text-center w-25'/>
                                                             <input type ='submit' className ='card-text border-white rounded-circle'
                                                              name = 'add'  onClick = { (e) => {this.handleCartQuantity (e,cart)} }  value = '+' />
                                                               
                                                        </div>  
                                                        <div className ='col-7'>
                                                            <button className="card-text float-right btn btn-danger mt-3" 
                                                                value ={cart._id} onClick ={this.handleRemove} > Remove</button>   
                                                        </div>    
                                                         
                                                                                                       
                                                    </div>  
                                                    
                                                </div>
                                                 
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            
                        } 
                    </div>
                  
                   <div className="col-3  mr-auto ml-5" style ={{height:'100%',width:'150%'}}>
                       <div className="card">
                           <div className="card-header">
                               <h5>PRICE DETAILS</h5>
                           </div>
                           <div className="card-body">
                               <div className ='row justify-content-between'>
                                   <h5 className="card-title float-left">{`Price (${this.props.cartData.length} items)`} </h5> 
                                   <h5 className="card-title float-right">
                                    <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" className="card-title float-right"
                                        displayType = 'text' prefix={'₹'} value={this.state.price}/>
                                    </h5>
                               </div>
                              <div className ='row justify-content-between'>
                                   <h5 className="card-title float-left">TAX  </h5> 
                                   <h5 className="card-title float-right">
                                    <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" className="card-title float-right"
                                        displayType = 'text' prefix={'₹'} value={ this.state.tax}/>
                                    </h5>
                              </div>
                               
                           </div>
                           <div className="card-footer">                                
                               <h5 className="card-title float-left">TOTAL PRICE </h5> 
                               <h5 className="card-title float-right">
                                    <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" className="card-title float-right"
                                        displayType = 'text' prefix={'₹'} value={ this.state.price + this.state.tax}/>
                                    </h5>
                           </div>
                           {/* <input type= 'submit' id='submit' name ='submit' className ='btn btn-danger ' 
                                       value ='PLACE ORDER'  onClick = {this.handleOrder} /> */}
                            <Link to ='/order' id='submit' name ='submit' className ='btn btn-danger ' > PLACE ORDER </Link>
                       </div>
                       
                   </div>
                   
               </div>
                
                   : 
                   <div className = 'container border mx-auto' style ={{height:'200px'}}> 
                    <h4> My Cart</h4>                                       
                       <div className="row justify-content-md-center mt-5">
                            <div className="col-11 offset-md-9">
                                <h5> Your cart is empty! </h5>
                            </div>
                         
                        </div>
                        <div className="row justify-content-md-center mt-5">
                            <div className="col-11 offset-md-9">
                               <Link to = '/list' className ='btn btn-primary'> Shop More..</Link>
                            </div>
                         </div>   
                   </div>     
                }
               
            </div>
        )
    }
}

const mapStateTOProps = (state) =>{
    return{
        cartData: state.cartData,
        users : state.users
    }
}
export default connect(mapStateTOProps)(Cart)









//     handleSubmit = () => {
//         const formData = {
//             products: this.props.products._id,
//             quantity: this.state.quantity
//         }
//         const redirect = () => {
//             return this.props.history.push('/users/login')
//         }
//         this.props.dispatch(startAddCart(formData, redirect))
//     }

//     handleClick = () => {
//         this.setState({
//             quantity: this.state.quantity + 1
//         })
//     }

//     handleIncrement = () => {
//         this.setState({
//             quantity: this.state.quantity + 1
//         })
//     }

//     handleDecrement = () => {
//         if(this.state.quantity > 0) {
//             this.setState({
//                 quantity: this.state.quantity - 1
//             })
//         }
//     }

//     render(){
//         console.log(this.props)
//         return(
//             <div>
//                 {this.props.cartData.length?
//               <div className="container ">
//                   <div className="row">
//                       <div className="col-10 mx-auto my-3">
//                         <h2>{this.props.prod.title}</h2>
//                       </div>

//                   </div>

//                   <div className="row">
//                       <div className="col-10 mx-auto col-md-6 my-3">
//                       <img src={`../uploads/${this.props.prod.image}`} />

//                     </div>

//                 <div className="col-10 mx-auto col-md-6 my-3" >
//                 <p>{this.props.prod.description}</p>
                
//                 <p>
//                     <b>Desctiption</b>:<br/>{this.props.prod.description}<br />
//                 </p>
//                 </div>
//                 <div className=" col-10 x-auto col-md-6" style={{paddingLeft:'12%'}}>
//                     {
//                     this.state.quantity == 0 ?
//                     <button className="single-item-add" onClick={this.handleClick}> Add</button> :
                   
//                     <div style={{paddingLeft:'50px'}}>
//                     <button style={{color:'#fff',backgroundColor:'#E95E3E', outline:'none',border:'none',width:'30px'}} onClick={this.handleIncrement}>+</button>
//                     { '  '}{this.state.quantity} {'  '}
//                     <button  style={{color:'#fff',backgroundColor:'#E95E3E', outline:'none',border:'none',width:'30px'}} onClick={this.handleDecrement}>-</button>
//                     </div>
                   

//                 }
//                     </div>
//                     <div className="single-item-btns">
//                     <Link to="/menu"><button className="single-item-btn">Back</button>{' '}</Link>
//                     <button className="single-item-btn" onClick={this.handleSubmit}>Continue</button>
                    
//                     </div>

//                 </div>
              

//               </div>
//                :
//                null }
//             </div>
//         )
//     }
// }
// const mapStateToProps = (state, props) => {
//     const id = props.match.params.id
//     console.log(state.prod)

//     return {
//         prod: state.prod.find(prod=>prod._id == id)
//     }
// }

// export default connect(mapStateToProps)(Cart)