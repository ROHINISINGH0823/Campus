import React from "react";
import Feed from "./Feed.js";
import SHeader from "./SHeader.js";
import "./Sliet.css";
import Sidebar from "./Sidebar.js";
import Widget from "./Widget.js";
import Chatbot from "../Chatbot.js";
function Quora() {
  return (
    <div className="quora">
      <SHeader />
      <div className="quora__contents">
        <div className="quora__content">
          <Sidebar />
          <Feed />
         <Chatbot></Chatbot>
        </div>
      </div>
    </div>
  );
}

export default Quora;
