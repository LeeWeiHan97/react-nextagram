import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styled from 'styled-components';
import '../App.css';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignupForm';
import { Link } from 'react-router-dom';

const NavLinkTag = styled.div`
  text-decoration: none;
  padding: 3px 0;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 9px;
  display: inline-block;
  text-align: center;
  width: 100px;
  background-color: transparent;
  border: 1px solid white;
  color: white;
  border-radius: 2px;
  transition: 0.2s;
  &:hover {
    text-decoration: none;
    background-color: white;
    color: black;
    cursor:pointer;
  }
  &:focus {
    outline: none;
  }
`

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: true,
            modal: false,
            showLogin: '',
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
    }

    toggleModal = () => {
        this.setState({
            modal: false
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState(prevState => ({
            login: !prevState.login
        }));
    }

    toggleShowLogin = () => {
        this.setState ({
            showLogin: !this.state.showLogin
        })
    }

    handleLogout = () => {
        this.toggleShowLogin();
        this.toggleModal();
        localStorage.removeItem('authToken')
        localStorage.removeItem('userId')
        localStorage.removeItem('userProfileImage')
        localStorage.removeItem('userUsername')
    }

    componentDidMount() {
        if (localStorage.authToken) {
            this.setState({
                showLogin: false
            })
        }
        else {this.setState({
            showLogin: true
        })}
    }

    render() {
        if (this.state.showLogin) {
        return (
            <div>
                <NavLinkTag onClick={this.toggle}>Login</NavLinkTag>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>{this.state.login ? 'Log In':'Sign Up'}</ModalHeader>
                        <ModalBody>
                            {this.state.login ? <LoginForm y={this.toggleShowLogin}/>:<SignUpForm x={this.toggleModal}/>}
                        </ModalBody>
                    <form onSubmit={this.handleSubmit}>
                        <ModalFooter>
                            <Button toggle={this.toggleLogin} color="primary">{this.state.login ? 'Sign Up':'Log In'}</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        )}
        else {return(
            <div>
            <Link to="/profile"><NavLinkTag>My Profile</NavLinkTag></Link>
            <Link to="/"><NavLinkTag onClick={this.handleLogout}>Logout</NavLinkTag></Link>
            </div>
        )}
    }
}