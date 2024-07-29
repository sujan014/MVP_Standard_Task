import React, { useState } from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

//export default class TalentStatus extends React.Component {
//    constructor(props) {
//        super(props);       
//    }    
//    render() {        
//    }
//}

export default function TalentStatus({ status, updateProfileData, saveProfileData }) {
    const [jobStatus, setJobStatus] = useState(status);
    const onOptionSelect = (e) => {

        var temp = jobStatus;
        temp.status = e.target.value;
        setJobStatus(temp);

        //setJobStatus(prevState => ({
        //    ...prevState,
        //    status = e.target.value
        //}
        //));

        //setJobStatus({
        //    ...prevState,
        //    status = e.target.value
        //}
        //);

        console.log('status: ' + jobStatus.status);
    }

    return (
        <div className='ui grid sixteen wide column'>
            <div className='ui sixteen wide column'>
                <div className='field'>
                    <label>Current Status</label>
                    <div className='ui grid'>
                        <div className='column'>
                            <input
                                type='radio'
                                name='Job Status'
                                value='Actively looking for a job'
                                id='Active'
                                onChange={ onOptionSelect }
                            />
                        </div>
                        <div className='fifteen wide column'>
                            <label htmlFor='Active'>Actively looking for a job</label>
                        </div>
                    </div>
                    <div className='ui grid'>
                        <div className='column'>
                            <input
                                type='radio'
                                name='Job Status'
                                value='Not looking for a job at the moment'
                                id='Inactive'
                                onChange={onOptionSelect}
                                />
                        </div>
                        <div className='fifteen wide column'>
                            <label htmlFor='Active'>Not looking for a job at the moment</label>
                        </div>
                    </div>
                    <div className='ui grid'>
                        <div className='column'>
                            <input
                                type='radio'
                                name='Job Status'
                                value='Currently employed but open to offers'
                                id='Open'
                                onChange={onOptionSelect}
                                />
                        </div>
                        <div className='fifteen wide column'>
                            <label htmlFor='Active'>Currently employed but open to offers</label>
                        </div>
                    </div>
                    <div className='ui grid'>
                        <div className='column'>
                            <input
                                type='radio'
                                name='Job Status'
                                value='Will be available on later date'
                                id='Closed'
                                onChange={onOptionSelect}
                                />
                        </div>
                        <div className='fifteen wide column'>
                            <label htmlFor='Active'>Will be available on later date</label>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button className='ui teal button'>Save
                </button>
            </div>
        </div>
    )
}