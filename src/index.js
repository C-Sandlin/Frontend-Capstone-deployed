import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./components/home/Home";
import 'bootstrap/dist/css/bootstrap.css';
import * as firebase from "firebase/app"

import index from './index.css'

const firebaseConfig = {
    apiKey: "AIzaSyAJyw3v8xuOeR2SM0B8ZRugzvqEb5h5yIM",
    authDomain: "colins-capstone-1558565262749.firebaseapp.com",
    databaseURL: "https://colins-capstone-1558565262749.firebaseio.com",
    projectId: "colins-capstone-1558565262749",
    storageBucket: "colins-capstone-1558565262749.appspot.com",
    messagingSenderId: "1079284141257",
    appId: "1:1079284141257:web:ab8ed956b3d81522",
};

firebase.initializeApp(firebaseConfig);


ReactDOM.render(
    <Router>
        <Home />
    </Router>
    , document.getElementById('root'))