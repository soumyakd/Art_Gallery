import React from 'react'
import { Form } from 'react-bootstrap'
import {connect} from 'react-redux'
import {startAddProducts} from './actions/productAction'

class Products extends React.Component{
    constructor(){
        super()
        this.state = {
            title: '',
            description: '',
            price: '',
            image: null
        }  
    }
    handleChange = (e) => {
        e.preventDefault()
        if(e.target.type === 'file') {
            this.setState({image:e.target.files[0]})
        } else {
            this.setState({
                [e.target.name]:e.target.value
            })
        }      
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', this.state.title)
        formData.append('description', this.state.description)
        formData.append('price', this.state.price)
        formData.append('image',this.state.image)
        
        const refersh =  setInterval( () =>{  
            if(this.props.products.length ) {             
                clearInterval(refersh)                  
                const products= this.props.products[0] 
                this.setState({products})
            }
        } , 1000)
        const redirect = () => {
            this.props.history.push('/users/register')
        }
        console.log(formData)
        this.props.dispatch(startAddProducts(formData, redirect))
    }

    render() {
        return (
            <div>
                <Form onSubmit= {this.handleSubmit} className='add'>
                <center><h2> Add product</h2></center>
                    <Form.Group controlId= 'formBasicText'>
                        <Form.Control type = 'text' 
                                        placeholder = 'Title'
                                        name = 'title'
                                        value= {this.state.title}
                                        onChange = {this.handleChange} />
                    </Form.Group>
                    
                    <Form.Group controlId= 'formBasicTextarea'>
                        <Form.Control as = 'textarea' 
                                        type = 'text'
                                        placeholder = 'Description'
                                        name = 'description'
                                        value= {this.state.description}
                                        onChange = {this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId= 'formBasicText'>
                        <Form.Control   type = 'text'
                                        placeholder = 'Price'
                                        name = 'price'
                                        value = {this.state.price}
                                        onChange = {this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId= 'formControlFile'>
                        <Form.File type = 'file' 
                                    name = 'image'
                                    onChange= {this.handleChange} />
                    </Form.Group>
                            
                    <center><button variant = 'primary' type= 'submit'> Submit </button></center>
                </Form>
            </div>            
        )
    }
}


const mapStateToProps = (state) => {
    return{
        products: state.products
    }
}

export default connect(mapStateToProps)(Products)
