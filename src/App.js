import React from 'react';
import styled from 'styled-components';
import './App.css';
import { Route, Link } from 'react-router-dom';
import MainPage from './pages/HomePage';
import InstagramLogo from './instagram-png-white-3.png';
import LoginPage from './pages/LoginPage';
import MyProfilePage from './pages/MyProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import UploadPage from './pages/UploadPage'

const NavBar = styled.div`
  color: white;
  background-color: #2f2f2f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`

const LeftNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const RightNav = styled.div`
  display: flex;
`

const Logo = styled.img`
  margin-right: 12px;
  margin-left: 8px;
`

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
  }
  &:focus {
    outline: none;
  }
`

class App extends React.Component {
 
  render() {
    return (
      <div>
        <NavBar>
          <LeftNav>
            <Logo width='30px' height='30px' src={InstagramLogo} />
            <h3>Nextagram</h3>
          </LeftNav>
          <RightNav>
            <Link to="/"><NavLinkTag>Home</NavLinkTag></Link>
            <LoginPage>Login</LoginPage>
          </RightNav>
        </NavBar>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/profile" component={MyProfilePage} />
        <Route exact path="/users/:id" component={UserProfilePage}></Route>
        <Route exact path="/upload" component={UploadPage}></Route>
      </div>
    )
  }
}


export default App;
