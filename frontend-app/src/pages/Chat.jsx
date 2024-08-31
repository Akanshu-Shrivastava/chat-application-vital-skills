import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client'; // Corrected import
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AllContacts from '../Components/AllContacts';
import { allUsersRoute } from '../utils/apiRoutes';
import Welcome from '../Components/Welcome';
import ChatContainer from '../components/ChatContainer.jsx';

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  
  // Define the host for the socket connection
  const host = 'http://localhost:5000'; // Replace with your actual host

  useEffect(() => {
    const fetchUser = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate('/login');
      } else {
        setCurrentUser(
          await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
        );
      }
    };
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host); // Corrected socket initialization
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser, host]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data);
      }
    };
    fetchContacts();
  }, [currentUser]);

  const handleChangeChat = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className='container'>
        <AllContacts contacts={contacts} changeChat={handleChangeChat} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  /* Add your styled-components CSS here */
`;

export default Chat;
