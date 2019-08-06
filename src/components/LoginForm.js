import React from 'react';
import '../App.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            usernameInput: '',
            passwordInput: ''
        }
    }

    toggle = () => {
        this.setState({
            usernameInput: '',
            passwordInput: ''
        });
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/login',
            data: {
                username: this.state.usernameInput,
                password: this.state.passwordInput
            }
        })
            .then(response => {
                localStorage.setItem('authToken', response.data.auth_token)
                localStorage.setItem('userId', response.data.user.id)
                localStorage.setItem('userProfileImage', response.data.user.profile_picture)
                localStorage.setItem('userUsername', response.data.user.username)
                alert('Successfully logged in!')
                this.props.y()
            })
            .catch(error => {
                alert('Login error. Please check username and password') // so that we know what went wrong if the request failed
            })
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>Username</Label>
                    <Input type="text" name="username" id="usernameInput" onChange={this.handleChange} value={this.state.usernameInput} />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type="password" name="password" id="passwordInput" onChange={this.handleChange} value={this.state.passwordInput} />
                </FormGroup>
                <Button disabled={this.state.usernameInput.length === 0 || this.state.passwordInput.length === 0}>Log In</Button>
            </Form>
        )
    }
}