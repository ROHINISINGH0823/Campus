import axios from "axios";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/auth";
import CamLanding from "./components/CamLanding";
// import { auth } from "./firebase";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import { logout } from "./Action/User";
import AllSpaces from "./components/CamLanding/AllUser";
import Slietians from './components/CamLanding/Slietians'
import Chatbot from "./components/Chatbot";
import { useState } from "react";

import AllUsers from './components/CamLanding/AllSpaces'
// import { decodeToken, isExpired } from "react-jwt";
// import myDecodedToken from "./Utils/decodedToken";

function App() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  console.log(userLogin);

  // console.log(myDecodedToken);
  // const _userInfo = localStorage.getItem("userInfo");
  // console.log(_userInfo);

  // const _userInfo = localStorage.getItem("userInfo");
  // const token = _userInfo ? JSON.parse(_userInfo).token : "";
  // console.log(decodeToken(token));
  const checkToken = useCallback(() => {
    const _userInfo = localStorage.getItem("userInfo");
    const token = _userInfo ? JSON.parse(_userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    if (token) {
      axios
        .get("/api/validateTokenExpiry", config)
        .then((res) => {
          // valid
          // console.log(res.data);
        })
        .catch((err) => {
          // expire
          // console.log(err);
          dispatch(logout());
        });
    }
  }, [dispatch]);

  React.useEffect(() => {
    checkToken();
    setInterval(() => {
      checkToken();
    }, 1000 * 60 * 5);
  }, [checkToken]);

  // useEffect(() => {
  //   if (myDecodedToken !== null) {
  //     setStatus(myDecodedToken.status);
  //   } else {
  //     setStatus(false);
  //   }
  // }, [userLogin]);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        userLogin?.userInfo?.auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );

  return (
    <>
      <BrowserRouter>
        <Switch>
          <main>
            <PrivateRoute exact path="/" component={CamLanding} />
            <PrivateRoute exact path = '/allSpaces' component = {AllSpaces} />
            <PrivateRoute exact path = '/myQuestions' component = {Slietians} />
            <PrivateRoute exact path = '/allUsers' component = {AllUsers} />
            <Route exact path="/auth" component={Auth} />
          </main>
        </Switch>
      </BrowserRouter>
      {/* {userLogin?.userInfo?.auth ? <QuoraLanding /> : <Auth />} */}
    </>
  );
}

export default App;
