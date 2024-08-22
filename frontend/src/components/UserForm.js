import React, { useState } from "react";
import { createUser } from "../api";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(name);
    navigate("/");
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default UserForm;
