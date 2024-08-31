import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Input from '../Components/Input';
import Logout from '../Components/Logout';
import { receiveMessageRoute, sendMessageRoute } from '../utils/apiRoutes';

const ChatContainer = ({ currentChat, socket }) => {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      const response = await axios.post(receiveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };

    if (currentChat) {
      fetchMessages();
    }
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="username">
            <h3>{currentChat?.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div ref={scrollRef} key={index} className={`message ${message.fromSelf ? 'sended' : 'received'}`}>
            <div className="content">
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>
      <Input handleSendMsg={handleSendMsg} />
    </Container>
  );
};

// Styled-components for styling the chat container
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  padding-top: 1rem;
  
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background-color: #f1f1f1;
    border-bottom: 1px solid #ccc;
    
    .user-details {
      display: flex;
      align-items: center;
      
      .username {
        h3 {
          margin: 0;
          font-size: 1.2rem;
          color: #333;
        }
      }
    }
  }

  .chat-messages {
    padding: 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    .message {
      display: flex;
      align-items: center;
      
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0.5rem 1rem;
        border-radius: 10px;
        font-size: 1rem;
        color: #fff;
      }

      &.sended {
        justify-content: flex-end;
        
        .content {
          background-color: #4f04ff21;
          color: #000;
        }
      }

      &.received {
        justify-content: flex-start;
        
        .content {
          background-color: #9900ff20;
          color: #000;
        }
      }
    }
  }
`;

export default ChatContainer;
