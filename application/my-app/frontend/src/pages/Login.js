import React, { useReducer, useState } from 'react';
import axios, { Axios } from 'axios';
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const { baseUrl } = require("../config/config.js");

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(baseUrl + ":3001/login", {
            email,
            password
        }).then(response => {
            console.log(response);

            //accesses local storage variables from SQL data base
            window.localStorage.setItem('accessToken', response.data.token);
            window.localStorage.setItem('name', response.data.name);
            window.localStorage.setItem('type', response.data.type);
            window.localStorage.setItem('email', response.data.email);

            console.log(response.data);

            //login redirection of student to home page s
            if (window.localStorage.getItem('type') === 'Student') {
                window.location.replace("/");
                console.log("logged in as student")
            } else {
                window.location.replace("/");
                console.log("logged in as company")
            }


        }).catch(error => {

        });
    }

    return (



        <div className="page-container">
            <div className="content-wrap"><div>
                <NavBar></NavBar></div>
                <form onSubmit={handleSubmit}>
                    <div id="form">
                        <div><label name="email"></label> </div>
                        <input placeholder='Enter email' className="loginInput" type="text" required name="email" onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div>
                        <div><label name="password"></label> </div>
                        <input placeholder='Enter password' input className="loginInput" type="password" required name="password" onChange={e => setPassword(e.target.value)}></input>
                    </div>

                    <button type="submit">Log In</button>
                    <a className="question">?
                        <span className="questionText">
                            Login in to view more details<br />
                        </span>
                    </a>
                    <div className='registerRef'>
                        Don't have an account? <a href='/register'>Register</a>
                    </div>
                </form>
            </div>
            <Footer />
        </div>


    );
}

export default Login

// https://www.digitalocean.com/community/tutorials/how-to-build-forms-in-react