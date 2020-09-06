import React from 'react'
import { connect } from  'react-redux'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { startRegisterUser } from '../../actions/userAction'

class Register extends React.Component {
    constructor(){
        super()
        this.state = {
            username : '',
            email : '',
            password : ''
        }
    }

    handleChange = (e) =>{
        this.setState ({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        const formData = {
            username : this.state.username,
            email : this.state.email,
            password : this.state.password
        }

        const redirect = () => {
            return this.props.history.push('/users/login')
        }
        this.props.dispatch(startRegisterUser(formData, redirect))
    }

    render(){
        return(
            <div>
                <Form onSubmit= {this.handleSubmit} className='register'>
                <center><h2> Register </h2></center>

                <Form.Group controlId= 'formBasicText'>
                    <Form.Label>  </Form.Label>
                    <Form.Control type = 'text' 
                                    placeholder = 'Username'
                                    name = 'username'
                                    value={this.state.username}
                                    onChange={this.handleChange} />
                </Form.Group> 
                                
                        
                <Form.Group controlId= 'formBasicEmail'>
                    <Form.Label>  </Form.Label>
                    <Form.Control type = 'email' 
                                    placeholder = 'Email'
                                    name = 'email'
                                    value = {this.state.email} 
                                    onChange = {this.handleChange} />
                </Form.Group>
                                
                <Form.Group controlId= 'formBasicPassword'>
                    <Form.Label>  </Form.Label>
                    <Form.Control type = 'password' 
                                    placeholder = 'Password'
                                    name = 'password'
                                    value = {this.state.password} 
                                    onChange = {this.handleChange} />
                </Form.Group>

                <center><button variant = 'primary' type= 'submit'> Submit </button></center>
                <br/>
                <center>Already Member? <Link to= '/users/login'> Sign In</Link></center>
            </Form>
        </div> 
        )
    }
}

export default connect()(Register)