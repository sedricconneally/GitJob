import React from 'react'
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';

//contains data for sidebar icons
export const SidebarData = [

    ]
    
//Not logged in (general) sidebar
export const NotLoggedIn = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    
    {
        title: 'Careers',
        path: '/careers',
        icon: <BsIcons.BsFillBriefcaseFill />,
        cName: 'nav-text'
    },
    {
        title: 'Login',
        path: '/login',
        icon: <AiIcons.AiOutlineUser />,
        cName: 'nav-text'
    },
    {
        title: 'Signup',
        path: '/register',
        icon: <AiIcons.AiOutlineUsergroupAdd />,
        cName: 'nav-text'
    }

]


//Student sidebar
export const studentSidebar = [

    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    
    {
        title: 'Careers',
        path: '/careers',
        icon: <BsIcons.BsFillBriefcaseFill />,
        cName: 'nav-text'
    },
    {
        title: 'My Jobs',
        path: '/jobs',
        icon: <BiIcons.BiMoney />,
        cName: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <AiIcons.AiFillProfile />,
        cName: 'nav-text'
    },

]

//Company sidebar
export const companySidebar = [

    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Post a Job',
        path: '/JobPosting2',
        icon: <AiIcons.AiFillDatabase />,
        cName: 'nav-text'
    },{
        title: 'My Posted Jobs',
        path: '/CompanyDelete',
        icon: <AiIcons.AiTwotoneDelete />,
        cName: 'nav-text'
    },{
        title: 'Profile',
        path: '/profile',
        icon: <AiIcons.AiFillProfile />,
        cName: 'nav-text'
    },

]

//Admin sidebar
export const adminSidebar = [

    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Admin',
        path: '/AdminDelete',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
   
]
