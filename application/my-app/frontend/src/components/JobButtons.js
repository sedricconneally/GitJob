import React from "react";
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';

export const StudentButtons = () => {
    return (<div>
        <button>
            <BsIcons.BsBookmark />
        </button>

        <button>
            <AiIcons.AiOutlineAudit />
        </button>
    </div>);
}

export const NotLoginButtons = (props) => {
    return (<div>
        <button>
            <BsIcons.BsBookmark />
        </button>

        <button>
            <AiIcons.AiOutlineAudit />
        </button>
    </div>);
}