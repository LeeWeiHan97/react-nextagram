import React from 'react';
import axios from 'axios';
import loading from '../Spinner-1s-200px.gif';
import styled from 'styled-components';

const ImgContainer = styled.div`
    background-color: #F5F5F5;
    flex-wrap: wrap;
    width: 100vw;
    height: 500px;
    overflow: auto;
    background-color: #dedcdc;
    border-radius: 4px;
`

const NoPostDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    border-radius: 4px;
    background-color: #dedcdc;
    width: 100vw;
`

const ImageContainerTag = styled.img`
    margin-left: 14px;
    margin-top: 15px;
    height: 228px;
    width: 228px;
    object-fit: cover;
    cursor: pointer;
    border-radius: 3px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

export default class ImageContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [],
            isLoading: true
        }
    }

    componentDidMount() {
        let user = this.props.user
        axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${user.id}`)
            .then(resp => {
                this.setState({
                    isLoading: false,
                    images: resp.data,
                })
            })
    }

    render() {    
        return (
            <>
            {this.state.isLoading ? (
                <ImgContainer>
                    {this.state.images.map(image =>
                        <img src={loading} alt='loading' />
                    )
                    }
                </ImgContainer>) :
            (this.state.images.length === 0 ? (
            <NoPostDiv>
            <h3>There are no posts yet.</h3>
            </NoPostDiv>)
            : (
            <ImgContainer>
                {this.state.images.map(image =>
                    <ImageContainerTag src={image} alt='image'/>
                )
                }
            </ImgContainer>))
            }
            </>
        )
    }
}
