import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { startLoginUser } from '../../actions/userAction'

 class Login extends React.Component {
     constructor(){
        super()
        this.state = {
            email : '',
            password : ''
        }
    }

    handleChange = (e) => {
        this.setState ({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email : this.state.email,
            password : this.state.password
        }
        const redirect = () => {
            this.props.history.push('/')
        }
        this.props.dispatch(startLoginUser(formData, redirect))
    }

    render(){
        return(
            <div>
                <Form onSubmit= {this.handleSubmit} className='login'>
                <center><h2> Sign In </h2></center>
                          
                <Form.Group controlId= 'formBasicEmail'>
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
                <center>Forgot Password? <Link to= '/users/Register'> Sign Up</Link></center>
            </Form>
            </div>
        )
    }
}

export default connect()(Login)