import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../pages/Logo.png';

const AllContacts = ({ contacts, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      setCurrentUserName(data.username);
    };
    fetchData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <div>
      {currentUserName && (
        <Container>
          <div className="heading">
            <img src={Logo} alt="Logo" />
            <h2>Chit Chat</h2>
          </div>
          {contacts.map((contact, index) => (
            <ContactItem
              key={contact.id}
              className={index === currentSelected ? 'selected' : ''}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="username">
                <h2>{contact.username}</h2>
              </div>
            </ContactItem>
          ))}
        </Container>
      )}
    </div>
  );
};

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 20px auto;

  .heading {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    img {
      height: 40px;
      margin-right: 10px;
    }

    h2 {
      color: #333;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  width: 100%;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e6e6e6;
  }

  &.selected {
    background-color: #d1e7ff;
  }

  .username {
    margin-left: 10px;
    font-size: 1rem;
    color: #555;

    h2 {
      font-size: 1rem;
      margin: 0;
    }
  }
`;

export default AllContacts;
