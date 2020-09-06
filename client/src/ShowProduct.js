import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGetProducts } from './actions/productAction'
import { startAddCart } from './actions/cartAction'

class ShowProduct extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            quantity: 1,
            products: []
        }
    }

    componentDidMount() {
        this.props.dispatch(startGetProducts())
        const refersh =  setInterval( () =>{  
            if(this.props.products.length ) {             
                clearInterval(refersh)                  
                const products =   this.props.products[0] 
                this.setState({products})
            }
        } , 1000)
    }

    handleCart = () => {
        const formData = {
            title: this.state.products.title,
            price: this.state.products.price,
            image: this.state.products.image,
            quantity: this.state.products.quantity
        }
        const redirect = () => {
            this.props.history.push('/cart')
        }
        
        this.props.dispatch(startAddCart(formData, redirect))
    }

    // handleSubmit = () => {
    //     const formData = {
    //         products: this.props.products._id,
    //         quantity: this.state.quantity
    //     }
    //     const redirect = () => {
    //         return this.props.history.push('/users/login')
    //     }
    //     this.props.dispatch(startAddCart(formData, redirect))
    // }

    // handleClick = () => {
    //     this.setState({
    //         quantity: this.state.quantity + 1
    //     })
    // }

    // handleIncrement = () => {
    //     this.setState({
    //         quantity: this.state.quantity + 1
    //     })
    // }

    // handleDecrement = () => {
    //     if(this.state.quantity > 0) {
    //         this.setState({
    //             quantity: this.state.quantity - 1
    //         })
    //     }
    // }

    // handleSubmit = () => {
    //     swal({
    //         title: "Are you sure you want to Add?",
    //         buttons: true,
    //       })
    //     .then((willAdd) => {
    //         if(willAdd) {
    //             swal("Successfully Added", {
    //                 icon: "success",
    //             })
    //         } 
    //     })
    // }

    render(){
        let product = this.props.products.find(product => product._id === this.props.match.params.id)       
        return(
            <>
            {product !== undefined ? (
                <div className='container'>
                    <div className= 'row'>
                        <div className="col-7 mx-auto my-3">
                            <b> Title: </b> {product.title}
                        </div>
                    </div>

                    <div className= 'row'>
                        <div className="col-7 mx-auto my-3">
                            <b> Description: </b> {product.description}  
                        </div>
                    </div>

                    <div className= 'row'>
                        <div className="col-7 mx-auto my-3">
                            <b> Price: </b> ₹{product.price} /-
                        </div>
                    </div>
                    <div className= 'row'>
                        <div className= 'col-10 mx-auto col-md-6 my-3'>
                            <img src={`../uploads/${product.image}`} alt= 'product' align= 'center' style={{width:'18rem'}}/><br/><br/>
                        </div>
                    </div>

                    {/* <div className= 'col-10 x-auto col-md-6' style= {{paddingLeft:'20%'}}>
                    {
                        this.state.quantity === 0 ?
                        <button className= 'single-item-add' onClick= {this.handleClick}> Add to cart</button> :
                    
                        <div style= {{paddingLeft:'50px'}}>
                        <button style= {{color:'#fff',backgroundColor:'blue', outline:'none',border:'none',width:'30px'}} onClick= {this.handleIncrement}>+</button>
                        { '  '}{this.state.quantity} {'  '}
                        <button  style= {{color:'#fff',backgroundColor:'blue', outline:'none',border:'none',width:'30px'}} onClick= {this.handleDecrement}>-</button>
                        </div>
                    }
                    </div> */}

                    <div className= 'col-10 mx-auto col-md-6 my-3'>
                        <Link to= '/list'><button className= 'single-item-btn'>Back</button>{' '}</Link>
                        {/* <button className= 'single-item-btn' onClick= {this.handleCart}>Add to Cart</button> */}
                        <input type= 'submit'
                                id='submit' 
                                name ='submit' 
                                className ='btn btn-warning w-200  ml-3' 
                                value ='ADD TO CART' 
                                onClick = {this.handleCart}  />
                    </div>                    
                </div>
            ) : (<p> ...loading </p>)}       
        </>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.products)
    return {
        products: state.products,
        users: state.users 
    }
}

export default connect(mapStateToProps)(ShowProduct)