import React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'
import "../css/myjobs.css";
import "../css/home.css";
import NavBar from '../components/Navbar';
import axios from 'axios';
import * as AiIcons from 'react-icons/ai';
import * as CgIcons from 'react-icons/cg';
import * as BsIcons from 'react-icons/bs';
import { useNotification } from "./Notifications/NotificationProvider";
import Popup from '../components/PopUp';

const MyJobs = () => {

    const [resData, setResData] = useState();

    const { baseUrl } = require("../config/config.js");

    //generates search results
    useEffect(() => {
        // get all post from a company
        const getBookmark = async () => {
            const getJWT = async () => {
                return window.localStorage.getItem("accessToken");
            }

            const JWT = await getJWT();
            await axios.get(baseUrl + ":3001/getBookmark", {
                headers: { "Authorization": `Bearer ${JWT}` }
            })
                .then(res => {
                    console.log(res.data.result);
                    setResData(res.data.result); // sets value
                    console.log(resData);
                });
        }

        getBookmark();
    }, []);

    const deleteBookmark = async (postId) => {
        const getJWT = async () => {
            return window.localStorage.getItem("accessToken");
        }
        const JWT = await getJWT();
        await axios.delete(baseUrl + ":3001/deleteBookmark",
            {
                headers: { "Authorization": `Bearer ${JWT}` },
                data: {
                    postId: postId
                }
            })
            .then(res => {
                if (res.data == "success") {
                    setResData(resData.filter(e => e['id'] != postId))
                }
            })
    }

    return (
        <div>
            <NavBar>
            </NavBar>

            <div className="jobsContainer">

                <Sidebar>
                </Sidebar>
                <div className="center-scroll">
                    {resData && resData.map(post => (
                        <div className='search-results-container'>

                            <div className='jobImage'>
                                <img className='actualImage' src={post["job photo"]} />
                            </div>


                            <div key={post["id"]} className='jobInfo'>

                                <div className='jobName'>{post["job name"]}</div>
                                <div className='jobLocation'>{post["company"] + " • " + post["job location"]}</div>
                                <br></br>
                                <div className='jobDate' >{post["date posted"]}</div>

                                <br></br>
                                <div>Job Field: {post["job field"]}</div>
                                <div>Job Skills: {post["job skills"]}</div>
                                <div>Salary: ${post["job salary"]}</div>

                                <br></br>
                                <div className="plusButton" onClick={() => handlePopup(post)} >
                                    <CgIcons.CgMoreO size={28} />
                                </div>
                            </div>

                            <div>
                                <button onClick={() => deleteBookmark(post["id"])}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    );
};

export default MyJobs;

