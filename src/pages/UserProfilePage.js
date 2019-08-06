import React from "react";
import styled from 'styled-components';
import axios from 'axios';
import Loader from '../components/Loader';

const BackDrop = styled.div`
  background-color: #dedcdc;;
  height: 100vh;
  width: 100vw;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const UserProfileImage = styled.img`
  border-radius: 50%;
  width: 210px;
  border: 3px solid #484848;
  margin-top: 30px;
`

const UserProfile = styled.div`
  text-align: center;
  font-size: 35px;
`

const UserImageContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 40px;
  background-color: #F5F5F5;
`

const UserImageTag = styled.img`
  height: 250px;
  width: 250px;
  object-fit: cover;
  margin: 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userImages: [],
      users: {},
      isLoading: true
    }
  }
  componentDidMount() {
    axios.get(`https://insta.nextacademy.com/api/v1/users/${this.props.match.params.id}`)
      .then(resp => {
        this.setState({
          isLoading: false,
          users: resp.data
        })
      })
      .catch(error => {
        console.log('ERROR', error)
      })

    axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${this.props.match.params.id}`)
      .then(resp => {
        this.setState({
          userImages: resp.data
        })
      })
      .catch(error => {
        console.log('ERROR', error)
      })
  }

  render() {
    let { id, profileImage, username } = this.state.users
    return (
      <> {this.state.isLoading ? (
        <Loader />
      ) : (
          <BackDrop>
            <UserProfileImage src={profileImage} alt='profile image' />
            <UserProfile>
              {username}: {id}
            </UserProfile>
            <UserImageContainer>
              {this.state.userImages.map(userImage =>
                <UserImageTag src={userImage} alt='user image'/>
              )}
            </UserImageContainer>
          </BackDrop>)
      }
      </>
    )
  }


}
export default UserProfilePage