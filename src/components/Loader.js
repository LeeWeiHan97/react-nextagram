import React from 'react';
import styled from 'styled-components';
import UgandanKnuckles from '../ugandan-knuckles.gif';

const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`

function Loader(props) {
    return (
        <LoadingScreen>
            <img src={UgandanKnuckles} alt='loading...' />
        </LoadingScreen>
    )
}

export default Loader