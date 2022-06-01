import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import "../css/home.css";
import "../css/form.css";
import "../css/careers.css";

import axios from 'axios';

//Contains the functionality that allows company accounts to delete their own posts
function CompanyDelete() {

    const [resData, setResData] = useState();

    const { baseUrl } = require("../config/config.js");

    useEffect(() => {
        // get all post from a company
        const getAllPost = async () => {
            const getJWT = async () => {
                return window.localStorage.getItem("accessToken");
            }

            const JWT = await getJWT();
            await axios.get(baseUrl + ":3001/getCompanyPost", {
                headers: { "Authorization": `Bearer ${JWT}` }
            })
                .then(res => {
                    console.log(res.data.result);
                    setResData(res.data.result); // sets value
                    console.log(resData);
                }).catch(function (error) {
                    console.log(error);
                });;
            return
        }

        getAllPost();
    }, [])

    const deletePost = async (postId) => {
        const getJWT = async () => {
            return window.localStorage.getItem("accessToken");
        }
        const JWT = await getJWT();
        await axios.delete(baseUrl + ":3001/deletePost",
            {
                headers: { "Authorization": `Bearer ${JWT}` },
                data: {
                    postId: postId
                }
            })
            .then(res => {
                if (res.data == "success") {
                    setResData(resData.filter(e => e['id'] != postId))
                    console.log(resData);
                }
            })
    }

    return (
        <div>
            <NavBar>
            </NavBar>

            <div className="container">

                <div className="sidenav-careers">
                    <Sidebar>
                    </Sidebar>

                </div>

                <div style={{ paddingTop: "10px" }} className="center-scroll">
                    {resData && resData.map(post => (

                        <div className='search-results-container'>

                            <div className='jobImage'>
                                <img className='actualImage' src={post["job photo"]} />
                            </div>


                            <div key={post["id"]} className='jobInfo'>
                                <div className='jobName'>Job Name: {post["job name"]}</div>
                                <div>Job Field: {post["job field"]}</div>
                                <div>Date Posted: {post["date posted"]}</div>
                                <div>Job Location: {post["job location"]}</div>
                                {/* <div>Job Description: {post["job desc."]}</div> */}
                                <div>Job Salary: {post["job salary"]}</div>
                                <div>Job Skills: {post["job skills"]}</div>
                            </div>

                            <div>
                                <button onClick={() => deletePost(post["id"])}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CompanyDelete;