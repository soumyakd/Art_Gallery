import React from 'react'
import { connect } from 'react-redux'

import { startUpdateProducts } from './actions/productAction'

class EditProduct extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            description: '',
            price: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleChange2 = (e) => {
        this.props.history.push('/list')
    }

    handleSubmit = (e) => {
        e.preventDefault()     
        const formData = {
            title : this.state.title,
            description : this.state.description,
            price : this.state.price
        }

        const redirect = () =>  {
            return this.props.history.push('/list')
        }
        this.props.dispatch(startUpdateProducts(this.props.match.params.id, formData, redirect))
        this.setState({
            title : '',
            description: '',
            price: '',
        })
    }

    render(){
        let product = this.props.products.find(product => product._id === this.props.match.params.id)
        console.log(this.props.products)
        console.log(product)
        return(
            <div className="container">

                <h1> Edit Product </h1>
                    <form className="form-boxAuth productBox" onSubmit={this.handleSubmit}>
                    
                    <div  className="form-group">
                    <label htmlFor="title">Title : </label>
                    <input type="text" id="title" name="title" placeholder={product.title} value={this.state.title} onChange={this.handleChange} className="form-control" /></div>

        
                    <div  className="form-group">
                    <label htmlFor="description">Description: </label>
                    <textarea id="description" name="description" placeholder={product.description} value={this.state.description} onChange={this.handleChange} className="form-control"></textarea></div>
                    
                    <input type="submit" className="btn btn-primary" value="Update" />
                    <button className="btn btn-danger cancel" onClick={this.handleChange2}>Cancel</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products : state.products
    }
}

export default connect(mapStateToProps)(EditProduct)