import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function Input({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    setMsg((prevMsg) => prevMsg + emojiObject.emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}


const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f1f1f1;
  border-top: 1px solid #ddd;

  .button-container {
    display: flex;
    align-items: center;
    margin-right: 10px;

    .emoji {
      position: relative;

      svg {
        font-size: 24px;
        cursor: pointer;
      }

      .emoji-picker-react {
        position: absolute;
        top: -350px; /* Adjust based on your layout */
        z-index: 10;
      }
    }
  }

  .input-container {
    display: flex;
    align-items: center;
    flex: 1;

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 20px;
      outline: none;
      margin-right: 10px;
    }

    button {
      background-color: #007bff;
      border: none;
      color: white;
      padding: 8px 16px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        font-size: 20px;
      }
    }
  }
`;
