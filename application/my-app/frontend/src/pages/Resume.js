import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {IconContext} from 'react-icons';
import Sidebar from '../components/Sidebar'
import {SidebarData} from '../components/SidebarData';
import "../css/home.css";
import NavBar from '../components/Navbar';

const Resume = () => {


    const [title, setTitle] = useState("");
    const [field, setField] = useState("");
    const [resData, setResData] = useState([]);    

    const handleSubmit = (event) => {
       //window.location.href="/results";
        event.preventDefault();

        const { baseUrl } = require("../config/config.js");

        axios.post(baseUrl + ":3001/searchresume", { title, field })
            .then(res => {
                console.log(res.data.result);
                setResData(res.data.result);
                this.props.history.push({
                    pathname: '/results',
                      state: resData // your data array of objects
                  })
            
            });
    };

    useEffect(() => {
    }, []);



    return (
        <div>
           <NavBar>
            </NavBar>

            <div className="container">
            <div className="sidenav-careers">
                <Sidebar>
                </Sidebar>
                    
                </div>
                <div className="sidenav-home">
                    <div className='nav-text'>
                        {SidebarData.map((item, index)=> {
                        return (
                            <li key = {index} className = {item.cName}>
                            <Link to = {item.path}>
                                {item.icon}   
                                <span>{item.title}</span>
                            </Link>
                            </li>
                        );
                        })}
                    </div>  
                </div>

                <div className="center-scroll">
                    <div>
                        <div className="search-container">
                            <form onSubmit={handleSubmit}>
                                <input className="input-search" type="text" placeholder="Search" onChange={e => setTitle(e.target.value)} />
                                <select id="field" name="field" onChange={e => setField(e.target.value)}>
                                    <option value=""></option>
                                    <option value="Artificial Intelligence and Machine Learning">AI and ML</option>
                                    <option value="Robotic Process Automation">Robotic Process Automation</option>
                                    <option value="Edge Computing">Edge Computing</option>
                                    <option value="Quantum Computing">Quantum Computing</option>
                                    <option value="Virtual Reality and Augmented Reality">Virtual Reality and Augmented Reality</option>
                                    <option value="Blockchain">Blockchain</option>
                                    <option value="Internet of Things">Internet of Things</option>
                                    <option value="5G">5G</option>
                                    <option value="Cyber Security">Cyber Security</option>
                                </select>
                                <button type="submit">Search<i className="search" /></button>
                            </form>
                        </div>

                    {resData.map(post => (
            <div className='search-results-container'>
                <div>First Name: {post["first name"]}</div>
                <div>Skills: {post["job field"]}</div>
                <div>Date Posted: {post["date posted"]}</div>
                <div>Resume: {post["resume"]}</div>
            
                <br/>
            </div>
            ))}



                </div>
                </div></div>

            </div>
          
           
        
    );
};

export default Resume;

