import React from 'react';
import "../css/jobposting.css";
import { useState, useEffect } from 'react';
import "../css/home.css";
import NavBar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const JobPosting = () => {
    
    const [title, setTitle] = useState(""); //state variable for job title 
    const [field, setField] = useState(""); //state variable for job field 
    const [resData, setResData] = useState([]);

    const { baseUrl } = require("../config/config.js"); // retrieves site url where POST request is sent

    // event handler "handleSubmit" handles 'submit' button event
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(baseUrl + ":3001/search", { title, field }) //created POST request to send data to URL
            .then(res => {
                console.log(res.data.result);
                setResData(res.data.result); // sets value

            });
    };


    //generates search results
    useEffect(() => {
    }, []);


    return (
        <div>
            <NavBar>
            </NavBar>

            <div className="container">

                <div className="sidenav-jobs">
                    <Sidebar>
                    </Sidebar>
                </div>

                <div className="center-info" >
                    <div className="buttons">
                        <button className="apply-button"><a href="./Register">Apply</a></button>
                        <button className="bookmark-button"><a href="./Register">Bookmark</a></button>
                    </div>
                </div>



                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3155.8094989878573!2d-122.48212918378363!3d37.72414917976872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7db005c0e281%3A0xa57a7c9f946a45d3!2sSan%20Francisco%20State%20University!5e0!3m2!1sen!2sus!4v1649197029614!5m2!1sen!2sus" width="600" height="450" className="map"></iframe>
            </div>


        </div>
    );
};

export default JobPosting;

