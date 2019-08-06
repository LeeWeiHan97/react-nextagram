import React from "react";
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BackDrop = styled.div`
  background-color: #dedcdc;;
  height: 100vh;
  width: 100vw;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MyProfileImage = styled.img`
  border-radius: 50%;
  width: 210px;
  border: 3px solid #484848;
  margin-top: 30px;
`

const MyProfile = styled.div`
  text-align: center;
  font-size: 35px;
`

const MyImageContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 40px;
  background-color: #F5F5F5;
`

const MyImageTag = styled.img`
  height: 250px;
  width: 250px;
  object-fit: cover;
  margin: 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

export default class MyProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [],
        }
    }

    componentDidMount = () => {
        axios({
            method: 'GET',
            url: 'https://insta.nextacademy.com/api/v1/images/me',
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        })
            .then(response => {
                this.setState({
                    images: response.data,
                    isLoading: false
                })
            })
            .catch(error => {
                console.log(error.reponse) // so that we know what went wrong if the request failed
            })
    }

    render() {
        return (
            <>
                <BackDrop>
                    <MyProfileImage src={localStorage.getItem('userProfileImage')} alt='profile image' />
                    <MyProfile>
                        {localStorage.getItem('userUsername')} : {localStorage.getItem('userId')}
                    </MyProfile>
                    <Link to="/upload"><button>Post Something</button></Link>
                    <MyImageContainer>
                        {this.state.images.map(image =>
                            <MyImageTag src={image} alt='user image' />
                        )}
                    </MyImageContainer>
                </BackDrop>
            </>
        )
    }
}