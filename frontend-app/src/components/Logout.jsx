import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logOutRoute } from "../utils/apiRoutes";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const id = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      )._id;

      const { data } = await axios.get(`${logOutRoute}/${id}`);
      if (data.status === 200) {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f44336;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  svg {
    color: white;
    font-size: 1.5rem;
  }

  &:hover {
    background-color: #d32f2f;
  }
`;
