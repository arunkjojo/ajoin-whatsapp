import React from "react";
import { Button } from "@mui/material";
import "./Login.css";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

const Login = () => {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            // console.log(result);
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            });
            dispatch({
                type: actionTypes.SET_SESSION,
                uid: result.user.uid,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL,
            });
        })
        .catch((error) => {
            alert(error.message)
        });
    };
    return (
        <div className="login">
        <div className="login_container">
            <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/225px-WhatsApp.svg.png"
            alt="WhatApp"
            />
            <div className="login_text">
            <h1>Join WhatsApp</h1>
            </div>
            <Button onClick={signIn}>Sign in with Google</Button>
        </div>
        </div>
    );
};

export default Login;
