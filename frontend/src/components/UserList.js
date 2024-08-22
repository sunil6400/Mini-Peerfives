import React, { useEffect, useState } from "react";
import { getUsers } from "../api";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const userData = await getUsers();
      setUsers(userData);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      <Link to="/new">Create New User</Link>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>P5 Balance</th>
            <th>Reward Balance</th>
            <th>Login</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.p5Balance}</td>
              <td>{user.rewardBalance}</td>
              <td>
                <Link to={`/${user._id}`}>Login</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
