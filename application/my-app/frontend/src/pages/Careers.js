import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import "../css/careers.css";
import NavBar from '../components/Navbar';

//Renders the careers page with info about each field
const Careers = () => {

    return (
        <div>
            <NavBar>
            </NavBar>

            <div className="flex-container" >

                <div className="sidenav-careers">
                    <Sidebar>
                    </Sidebar>
                </div>

                <a className="question2">?
                    <span className="questionText2">
                        Brief background <br />
                        on the different <br />
                        career fields for <br />
                        jobs posted.

                    </span>
                </a>


                <div className="faqflex">

                    <div className="faqcontainer" >

                        <p className="ques">
                            Artificial Intelligence and Machine Learning
                        </p>

                        <div className="overlay">
                            <p className="faqtext">
                                Machine learning is a subfield of artificial intelligence,
                                which is broadly defined as the capability of a machine to
                                imitate intelligent human behavior. Artificial intelligence
                                systems are used to perform complex tasks in a way that is similar
                                to how humans solve problems.]<br></br>
                                ~ MIT
                            </p>
                        </div>
                    </div>

                    <div className="faqcontainer">
                        <p className="ques">
                            Robotics and Process Automation
                        </p>

                        <div className="overlay">
                            <p className="faqtext">
                                Robotic process automation (RPA), also known as software robotics,
                                uses automation technologies to mimic back-office tasks of human workers,
                                such as extracting data, filling in forms, moving files, et cetera. It
                                combines APIs and user interface (UI) interactions to integrate and perform
                                repetitive tasks between enterprise and productivity applications. By deploying
                                scripts which emulate human processes, RPA tools complete autonomous execution of
                                various activities and transactions across unrelated software systems.
                                <br></br>
                                ~ IBM
                            </p>
                        </div>
                    </div>

                    <div className="faqcontainer">
                        <p className="ques">
                            Edge Computing
                        </p>

                        <div className="overlay">
                            <p className="faqtext">
                                Edge computing is a distributed computing framework that brings
                                enterprise applications closer to data sources such as IoT devices
                                or local edge servers. This proximity to data at its source can deliver
                                strong business benefits, including faster insights, improved response
                                times and better bandwidth availability.
                                <br></br>
                                ~ IBM
                            </p>
                        </div>
                    </div>

                    <div className="faqcontainer">
                        <p className="ques">
                            Quantum Computing
                        </p>

                        <div className="overlay">
                            <p className="faqtext">
                                Quantum computers harness the unique behavior of quantum physics—such as
                                superposition, entanglement, and quantum interference—and apply it to computing.
                                This introduces new concepts to traditional programming methods.
                                <br></br>
                                ~ Microsoft
                            </p>
                        </div>
                    </div>


                    <div className="faqcontainer">
                        <p className="ques">
                            Virtual and Augmented Reality
                        </p>

                        <div className="overlay">
                            <p className="faqtext">
                                Augmented reality (AR) and Virtual Reality (VR) bridge the digital and physical worlds.
                                They allow you to take in information and content visually, in the same way you take in
                                the world. AR dramatically expands the ways our devices can help with everyday activities
                                like searching for information, shopping, and expressing yourself. VR lets you experience
                                what it's like to go anywhere — from the front row of a concert to distant planets in outer
                                space.
                                <br></br>
                                ~ Google

                            </p>
                        </div>
                    </div>

                    <div className="faqcontainer">
                        <p className="ques">
                            Blockchain
                        </p>

                        <div className="overlay">
                            <p className="faqtext">
                                Blockchain is a shared, immutable ledger that facilitates
                                the process of recording transactions and tracking assets
                                in a business network. An asset can be tangible (a house,
                                car, cash, land) or intangible (intellectual property, patents,
                                copyrights, branding). Virtually anything of value can be tracked
                                and traded on a blockchain network, reducing risk and cutting costs
                                for all involved.
                                <br></br> ~ IBM

                            </p>
                        </div>
                    </div>

                    <div className="faqcontainer">
                        <p className="ques">
                            Internet of Things
                        </p>

                        <div className="overlay">
                            <p className="faqtext">
                                The Internet of Things (IoT) describes the network of physical
                                objects—“things”—that are embedded with sensors, software, and
                                other technologies for the purpose of connecting and exchanging
                                data with other devices and systems over the internet. These devices
                                range from ordinary household objects to sophisticated industrial tools.
                                With more than 7 billion connected IoT devices today, experts are expecting
                                this number to grow to 10 billion by 2020 and 22 billion by 2025.
                                <br></br> ~ Oracle
                            </p>
                        </div>
                    </div>

                    <div className="faqcontainer">
                        <p className="ques">
                            5G
                        </p>

                        <div className="overlay">
                            <p className="faqtext">
                                5G at its peak potential could be instrumental for
                                developing revolutionary applications unlike anything
                                that exists today outside a wired environment. These
                                applications are varied, but there is predicted growth
                                in fields like autonomous driving, virtual reality, and
                                augmented reality. Beyond speed and latency, 5G standards
                                will have a much higher connection density, allowing networks
                                to handle immense numbers of connected devices.
                                <br></br>
                                ~ IBM
                            </p>
                        </div>
                    </div>

                    <div className="faqcontainer">
                        <p className="ques">
                            Cyber Security
                        </p>

                        <div className="overlay">
                            <p className="faqtext">
                                Cybersecurity is the practice of protecting critical
                                systems and sensitive information from digital attacks.
                                Also known as information technology (IT) security,
                                cybersecurity measures are designed to combat threats
                                against networked systems and applications, whether those
                                threats originate from inside or outside of an organization.
                                <br></br>
                                ~ IBM
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default Careers;

