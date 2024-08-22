import React, { useState, useEffect } from "react";
import { getUsers, getUser } from "../api";
import { useParams, useNavigate } from "react-router-dom";

function NewReward() {
  const { id } = useParams(); // Get the current user ID from the URL
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");
  const [currentUserP5, setCurrentUserP5] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch users except the current user
    async function fetchUsers() {
      try {
        const userData = await getUsers();
        setUsers(userData.filter((user) => user._id !== id));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
    // Fetch current user's P5 balance
    async function fetchCurrentUser() {
      try {
        const data = await getUser(id);
        setCurrentUserP5(data[0].p5Balance);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    }

    fetchCurrentUser();
  }, [id]);

  const handleRewardAmountChange = (e) => {
    setRewardAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      parseFloat(rewardAmount) > currentUserP5 ||
      parseFloat(rewardAmount) > 100
    ) {
      alert("Insufficient P5 balance or amount exceeds limit.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:5000/p5/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          points: parseFloat(rewardAmount),
          givenTo: selectedUser,
        }),
      });

      if (response.ok) {
        alert("successfully transefered");
        navigate(`/`);
      } else {
        alert("Failed to create reward.");
      }
    } catch (error) {
      console.error("Error creating reward:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>New Reward</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user">Select User:</label>
          <select
            id="user"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="rewardAmount">Reward Amount:</label>
          <input
            id="rewardAmount"
            type="number"
            min="1"
            max="100"
            value={rewardAmount}
            onChange={handleRewardAmountChange}
            required
          />
          <p>P5 Balance: {currentUserP5}</p>
        </div>
        <button
          type="submit"
          disabled={
            isSubmitting ||
            !selectedUser ||
            rewardAmount <= 0 ||
            rewardAmount > 100 ||
            rewardAmount > currentUserP5
          }
        >
          Submit
        </button>
        <button type="button" onClick={() => navigate(`/users/${id}/rewards`)}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default NewReward;
