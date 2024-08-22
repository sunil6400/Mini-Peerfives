import React, { useEffect, useState } from "react";
import { getP5History, deleteP5 } from "../api";
import { useParams } from "react-router-dom";

const P5History = () => {
  const { id } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const p5History = await getP5History(id);
      setHistory(p5History);
    }
    fetchData();
  }, [id]);

  const handleDelete = async (p5Id) => {
    await deleteP5(id, p5Id);
    setHistory(history.filter((item) => item._id !== p5Id));
  };

  return (
    <div>
      <h2>P5 History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Points</th>
            <th>Given To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item._id}>
              <td>{new Date(item.timestamp).toLocaleString()}</td>
              <td>{item.points}</td>
              <td>{item.givenTo.name}</td>
              <td>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default P5History;
