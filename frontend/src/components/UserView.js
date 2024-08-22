import React from "react";
import { Link, useParams } from "react-router-dom";

const UserView = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>User Dashboard</h2>
      <Link to={`/${id}/p5`}>View P5 History</Link>
      <Link to={`/${id}/rewards`}>View Reward History</Link>
      <Link to={`/${id}/rewards/new`}>
        <button>Create New Reward</button>
      </Link>
    </div>
  );
};

export default UserView;
