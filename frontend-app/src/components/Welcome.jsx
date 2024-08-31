import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import chitchatapp from './chitchatapp.png';

const Welcome = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
        if (data && data.username) {
          setUserName(data.username);
        }
      } catch (error) {
        console.error("Failed to fetch username from local storage:", error);
      }
    };
    
    fetchUserName();
  }, []);

  return (
    <Container>
      <img src='./chitchatimg' alt='Welcome'/>
      <h1>Hellooooo!! <span>{userName}...</span></h1>
      <p>Please select among contacts to have a chit chat</p>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 15rem;
  }
  span {
    color: darkgreen;
  }
`;

export default Welcome;
