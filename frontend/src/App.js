import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import UserView from "./components/UserView";
import P5History from "./components/P5History";
import RewardHistory from "./components/RewardHistory";
import NewReward from "./components/NewReward";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={UserList}></Route>
        <Route path="/new" Component={UserForm}></Route>
        <Route path="/:id/rewards/new" element={<NewReward />} />
        <Route path="/:id/rewards" Component={RewardHistory}></Route>
        <Route path="/:id/p5" Component={P5History}></Route>
        <Route path="/:id" Component={UserView}></Route>
      </Routes>
    </Router>
  );
}

export default App;
