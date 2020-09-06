import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { startGetProducts } from './actions/productAction'
// import {startRemoveProducts} from './actions/productAction'

class List extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    // handleRemove = (id) => {
    //     this.props.dispatch(startRemoveProducts(id))
    // }

    componentDidMount = () => {
        this.props.dispatch(startGetProducts(this.props.match.params.id)) 
        const refersh =  setInterval( () =>{            
            if(this.props.products.length){
                clearInterval(refersh) 
                this.setState({products:this.props.products})
            }
        },1000)
    }

    render(){
        return(
            <div className = 'list'>
                {this.props.products.map((prod, id) => {
                    return(
                        <div className= 'img-container p-5' key={prod._id}>
                            {/* <Link to= '/details'>
                                <img src={`../uploads/${prod.image}`} alt= 'product' className='card-img-top' />
                            </Link> */}
                        <Card className = 'list-card'>
                            <Card.Img variant= 'top' src={`../uploads/${prod.image}`} alt= 'product' style={{width:'12rem'}} />
                            <Card.Body>
                                <Link to= {`/products/${prod._id}`}><Card.Text><b>{prod.title}</b></Card.Text> </Link>
                                <Card.Text>₹{prod.price}/-</Card.Text>
                            </Card.Body>
                        </Card>
                        {/* <button onClick= {() => this.handleRemove(prod._id)} className='btn btn-primary'> Delete </button>  */}
                    </div>
                    )    
                })} 
                <Link to = '/add-product'> Add Product </Link>
             </div> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(List)
