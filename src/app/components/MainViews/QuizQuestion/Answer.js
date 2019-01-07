import React from 'react';

const Answer = (props) => {
    return(

    <li>
        <button className={props.className}><span>{props.letter}</span>{props.answer}</button>
    </li>
    );
}

export default Answer;