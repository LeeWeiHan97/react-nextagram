import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ImageContainer from '../containers/ImageContainer';
import Loader from '../components/Loader';
import {Link} from 'react-router-dom';
import '../App.css';

const BackDrop = styled.div`
    background-color: darkgray;
`

const ProfileImage = styled.img`
    border-radius: 50%;
    width: 150px;
    border: 2px solid #484848;
    cursor: pointer;
`

const UserDiv = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  height: auto;
  background-color: #F5F5F5;
`

const UserAndProfile = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 500px;
    margin-right: 30px;
    margin-left: 25px;
`

const Button = styled.button`
    padding: 7px 0;
    font-weight: normal;
    margin: 6px 0;
    display: inline-block;
    text-align: center;
    width: 120px;
    background-color: transparent;
    border: 1px solid #003EFF;
    color: #003EFF;
    border-radius: 2px;
    transition: 0.2s;
    &:hover {
    background-color: #003EFF;
    color: #fff;
    }
    &:focus {
    outline: none;
    }
`

export default class MainPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        axios.get('https://insta.nextacademy.com/api/v1/users')
            .then(resp => {
                this.setState({
                    isLoaded: true,
                    users: resp.data
                })
            })
            .catch(error => {
                console.log('ERROR', error)
            })
    }

    render() {
        return (
            <>
                {
                    this.state.isLoaded === false ? (
                        <Loader />
                    ) : (
                            <BackDrop>
                                {this.state.users.map(user => {
                                    return (
                                        <UserDiv>
                                            <UserAndProfile>
                                                <Link to={`/users/${user.id}`} className='username' key={user.id}>{user.username}</Link>
                                                <ProfileImage src={user.profileImage} alt="profile picture" />
                                                <Button>Follow</Button>
                                            </UserAndProfile>
                                            <ImageContainer user={user}></ImageContainer>
                                        </UserDiv>
                                    )
                                })}
                            </BackDrop>
                        )
                }
            </>
        )
    }
}
