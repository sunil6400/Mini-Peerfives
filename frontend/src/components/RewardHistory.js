import React, { useEffect, useState } from "react";
import { getRewardsHistory } from "../api";
import { useParams } from "react-router-dom";

const RewardHistory = () => {
  const { id } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const rewardHistory = await getRewardsHistory(id);
      setHistory(rewardHistory);
    }
    fetchData();
  }, [id]);

  return (
    <div>
      <h2>rewardHistory History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Points</th>
            <th>Given By</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item._id}>
              <td>{new Date(item.timestamp).toLocaleString()}</td>
              <td>{item.points}</td>
              <td>{item.givenBy.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RewardHistory;
