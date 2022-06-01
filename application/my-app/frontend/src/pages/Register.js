import React, { useState } from 'react';
import axios from 'axios';
import "../css/login.css";
import Footer from '../components/Footer';
import NavBar from '../components/Navbar';
function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [type, setType] = useState("");

    const { baseUrl } = require("../config/config.js");

    const handleSubmit = (event) => {
        console.log("In submit");
        event.preventDefault();
        axios.post(baseUrl + ":3001/register", { name, email, password, repassword, type })
            .then(res => {
                console.log(res.data.result);
                window.location.href = "/login";
            });
    };

    return (
        <div className="page-container">
            <div className="content-wrap"><div>
                <NavBar></NavBar></div>
                <form onSubmit={handleSubmit}>
                    <div id="form">
                        <div><label className='textInput' name="name" required>Name </label></div>
                        <input input placeholder='e.g. Jane Doe' className="regInput" type="text" required name="name" onChange={e => setName(e.target.value)}></input>
                    </div>
                    <div id="form">
                        <div><label className='textInput' name="email" required>Email  </label></div>
                        <input input placeholder='e.g. janedoe@email.com' className="regInput" type="text" required name="email" onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div id="form">
                        <div><label className='textInput' name="password" required>Password</label></div>
                        <input input className="regInput" type="password" required name="password" onChange={e => setPassword(e.target.value)}></input>
                    </div>
                    <div id="form">
                        <div><label className='textInput' name="password" required>Confirm Password</label></div>
                        <input input className="regInput" type="password" required name="password" onChange={e => setRepassword(e.target.value)}></input>
                    </div>
                    
                    <div id="form" required onChange={e => setType(e.target.value)}>
                        <input type="radio" value="Student" name='accountType'></input>Student
                        <input type="radio" value="Company" name='accountType'></input>Company
                    </div>
                    <div>
                        <button type="submit">Register</button><a className="question">?
                            <span className="questionText">
                                Register by student or company to view more details
                            </span>
                        </a>
                    </div>

                </form>
                
                    <div className='registerRef'>
                    Have an account? <a href='/login'>Login</a>
                    </div>
            </div>
            <Footer />
        </div>
    );
}


export default Register