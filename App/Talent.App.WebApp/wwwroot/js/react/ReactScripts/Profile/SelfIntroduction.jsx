/* Self introduction section */
import React, { Component, useState } from 'react';
import Cookies from 'js-cookie'

//export default class SelfIntroduction extends React.Component {
//    constructor(props) {
//        super(props);    
//    };
//    render() {
       
//    }
//}

export default function SelfIntroduction({ summary, description, updateProfileData, updateWithoutSave }) {
    const [newSummary, setNewSummary] = useState(summary);
    const [newDescription, setNewDescription] = useState(description);
    const handleSummary = (event) => {
        setNewSummary(event.target.value);
    }
    const handleDescription = (event) => {
        setNewDescription(event.target.value);
    }
    return (
        <div className='ui grid sixteen wide column'>
            <div className='sixteen wide column'>
            <input
                type='text'
                name='Summary'
                value={newSummary}
                placeholder='Enter your summary'
                    maxLength='150'
                row = '5'
                onChange={handleSummary}
                />
            </div>
            <div className='sixteen wide column'>
                <label>Summary must be no more than 150 characters.</label>
            </div>
            <div className='sixteen wide column'>
                <textarea
                    type='text'
                    name='Description'
                    value={newDescription}
                    placeholder='Tell us about any hobbies, additional expertice or anything else you would like to add.'
                    minLength='150'
                    maxLength='600'
                    onChange={handleDescription}
                />
            </div>
            <div className='sixteen wide column'>
                <label>Description must be between 150-600 characters.</label>
            </div>
            <button className='right floated ui teal button'>Save
            </button>
        </div>
    )
}


