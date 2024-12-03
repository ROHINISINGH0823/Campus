import React from 'react'
import SHeader from '../SHeader'
import Sidebar from '../Sidebar'
import Widget from '../Widget'
import UserFeed from './UserFeed'

function Index() {
    return (
        <div className="quora">
      <SHeader />
      <div className="quora__contents">
        <div style = {{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }} className="quora__content">
          <div style = {{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px 30px",
            border: "1px solid lightgray",
            borderRadius: "5px",
            backgroundColor: "white"
          }} className = 'torch'>
            {/* <img style = {{
            objectFit: "contain"
          }} width = {200} alt = 'spaces' src = 'https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.dormant_darkmode.png-26-de0e3d9c488b2b12.png'  /> */}
          <h2>Add 5 topics you know about</h2>
          <h5>Add topics for a customized feed with questions you can answer.
</h5>
          </div>
          {/* <Sidebar /> */}
          
          {/* <Widget /> */}
          <UserFeed />
        </div>
      </div>
    </div>
    )
}

export default Index
