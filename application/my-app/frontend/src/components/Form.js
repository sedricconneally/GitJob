import React, { useReducer, useState } from 'react';
import axios from 'axios';
import "../css/home.css";
import Sidebar from './Sidebar';
import NavBar from '../components/Navbar';

const { baseUrl } = require("../config/config.js");

const formReducer = (state, event) => {
    if (event.reset) {
        return {
            jobtitle: '',
            pay: '',
            jobdescription: '',
            skills: '',
            location: '',
        }
    }
    return {
        ...state,
        [event.name]: event.value

    }
}

function Form() {

    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);

    //processes the submitting of the job form post
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        const getJWT = async () => {
            return window.localStorage.getItem("accessToken");
        }

        const JWT = await getJWT();
        console.log(JWT);
        axios.post(baseUrl + ":3001/jobPost", {
            formData
        }, {
            headers: { "Authorization": `Bearer ${JWT}` },
        });

        setTimeout(() => {
            setSubmitting(false);
            setFormData({
                reset: true
            })
        }, 3000)

    }


    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const gitjob = () => {
        window.location.replace("/");
    }

    //renders the job posting form
    return (

        <div>
            <NavBar />


            <div className='container'>
                <Sidebar />


                <div className="JobPosting2">
                    {submitting &&
                        <div >Successfully Submitted!
                            <div className='submittedJob'>
                                {Object.entries(formData).map(([name, value]) => (
                                    <div key={name}>
                                        <strong>{name}
                                        </strong>:{value.toString()}
                                    </div>
                                ))}
                            </div>
                        </div>
                    }

                    <form onSubmit={handleSubmit}>

                        <fieldset className='fieldset'>
                            {/* <label>
                                <p className='jobForm'>Company</p>
                                <input className='input-search' placeholder='Enter company name' name="company" onChange={handleChange} value={formData.company || ''} />
                            </label> */}
                            <label>
                                <p className='jobForm'>Job Title</p>
                                <input className='input-search' placeholder='Enter postion title' name="jobtitle" onChange={handleChange} value={formData.jobtitle || ''} />
                            </label>
                            <label>
                                <p className='jobForm' >Salary</p>
                                <input className='input-search' placeholder='e.g. 100K-200K' name="pay" onChange={handleChange} value={formData.pay || ''} />
                            </label>
                            <label>
                                <p className='jobForm'>Job Description </p>
                                <textarea className='textarea' placeholder='Enter detailed job description' name="jobdescription" onChange={handleChange} value={formData.jobdescription || ''} />
                            </label>
                            <label>
                                <p className='jobForm'>Company Logo</p>
                                <input name="logo" type="file" onChange={handleChange} value={formData.logo || ''} />
                            </label>
                            <label>
                                <p className='jobForm'>Job Field</p>
                                <select name="jobs" onChange={handleChange} value={formData.jobs || ''}>
                                    <option value=" ">Select field</option>
                                    <option value="AI and ML">Artificial Intelligence and Machine Learning</option>
                                    <option value="Robotic Process Automation">Robotic Process Automation</option>
                                    <option value="Internet of Things">Internet Of Things</option>
                                    <option value="5G">5G</option>
                                    <option value="Virtual Reality and Augmented Reality">Virtual Reality and Augmented Reality</option>
                                    <option value="Blockchain">Blockchain</option>
                                    <option value="Quantum Computing">Quantum Computing</option>
                                    <option value="Edge Computing">Edge Computing</option>
                                    <option value="Cyber Security">Cyber Security</option>
                                </select>
                            </label>


                            <label>
                                <p className='jobForm'>Location</p>
                                <select name="location" onChange={handleChange} value={formData.location || ''}>
                                    <option value="">Select location</option>
                                    <option value="San Francisco, CA">San Francisco, CA</option>
                                    <option value="Palo Alto, CA">Palo Alto, CA</option>
                                    <option value="San Diego, CA">San Diego, CA</option>
                                    <option value="Phoenix, AZ">Phoenix, AZ</option>
                                    <option value="Las Vegas, NV">Las Vegas, NV</option>
                                    <option value="Chicago, IL">Chicago, IL</option>
                                    <option value="Los Angeles, CA">Los Angeles, CA</option>
                                    <option value="Seattle, WA">Seattle, WA</option>
                                    <option value="Austin, TX">Austin, TX</option>
                                    <option value="New York, NY">New York, NY</option>
                                    <option value="Atlanta, GA">Atlanta, GA</option>
                                    <option value="Orlando, FL">Orlando, FL</option>
                                    <option value="Tampa, FL">Tampa, Florida</option>
                                    <option value="Alexandria, VA">Alexandria, VA</option>
                                    <option value="Washington, D.C.">Washington, D.C.</option>
                                    <option value="Portland, OR">Portland, OR</option>
                                    <option value="Houston, TX">Houston, TX</option>
                                    <option value="Boston, MA">Boston, Massachusetts</option>
                                    <option value="Denver, CO">Denver, CO</option>
                                    <option value="Boise, ID">Boise, ID</option>

                                </select>
                            </label>


                            <label>
                                <p className='jobForm'>Skills</p>
                                <select name="skill" onChange={handleChange} value={formData.skill || ''} >
                                    <option value="">Select skill</option>
                                    <option value="C++">C++</option>
                                    <option value="Java">Java</option>
                                    <option value="Excel">Excel</option>
                                    <option value="Python">Python</option>
                                    <option value="JavaScript">JavaScript</option>
                                    <option value="Go">Go</option>
                                    <option value="C#">C#</option>
                                    <option value="React.js">React.js</option>
                                    <option value="Ruby">Ruby</option>
                                    <option value="Swift">Swift</option>
                                </select>
                            </label>

                            <label>
                                <button type="submit">Submit</button><a className="question">?
                                    <span className="questionText">
                                        Fill out all the fields<br />
                                        to find elegible job candidates!<br />
                                        Press 'Submit' to post the job.
                                    </span>
                                </a>
                            </label>

                        </fieldset>


                    </form>
                </div>

            </div>
        </div>
    )
}

export default Form;