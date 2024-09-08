import React, { useEffect, useState } from 'react'
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
    // This is not working now.
    const [jobStatus, setJobStatus] = useState('');

    useEffect(() => {
        setJobStatus(status.status);
    }, [status]);
    var checkStatus = status.status;

    const onOptionSelect = (e) => {
        //e.preventDefault();        
        checkStatus = e.target.value;
        setJobStatus(e.target.value);
    }
    const handleSaveJobStatus = (e) => {
        e.preventDefault();
        var profileData = {
            jobSeekingStatus: {
                status: jobStatus
            }
        };
        saveProfileData(profileData);
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
                                onChange={onOptionSelect}
                                checked={jobStatus === 'Actively looking for a job'}
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
                                checked={jobStatus === 'Not looking for a job at the moment'}
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
                                checked={jobStatus === 'Currently employed but open to offers'}
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
                                checked={jobStatus === 'Will be available on later date'}
                            />
                        </div>
                        <div className='fifteen wide column'>
                            <label htmlFor='Active'>Will be available on later date</label>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button
                    className='ui teal button'
                    onClick={handleSaveJobStatus}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

//export default function TalentStatus({ status, updateProfileData, saveProfileData }) {
//    // This is not working now.
//    const [jobStatus, setJobStatus] = useState('');
    
//    useEffect(() => {
//        setJobStatus(status.status);
//    }, [status]);
//    var checkStatus = status.status;

//    const onOptionSelect = (e) => {        
//        //e.preventDefault();        
//        checkStatus = e.target.value;
//        setJobStatus(e.target.value);
//    }
//    const handleSaveJobStatus = (e) => {
//        e.preventDefault();
//        var profileData = {
//            jobSeekingStatus: {
//                status: jobStatus
//            }
//        };
//        saveProfileData(profileData);
//    }
//    return (
//        <div className='ui grid sixteen wide column'>
//            <div className='ui sixteen wide column'>
//                <div className='field'>
//                    <label>Current Status</label>
//                    <div className='ui grid'>
//                        <div className='column'>
//                            <input
//                                type='radio'
//                                name='Job Status'
//                                value='Actively looking for a job'
//                                id='Active'
//                                onChange={onOptionSelect}
//                                checked={jobStatus === 'Actively looking for a job'}
//                            />
//                        </div>
//                        <div className='fifteen wide column'>
//                            <label htmlFor='Active'>Actively looking for a job</label>
//                        </div>
//                    </div>
//                    <div className='ui grid'>
//                        <div className='column'>
//                            <input
//                                type='radio'
//                                name='Job Status'
//                                value='Not looking for a job at the moment'
//                                id='Inactive'
//                                onChange={onOptionSelect}
//                                checked={jobStatus === 'Not looking for a job at the moment'}
//                                />
//                        </div>
//                        <div className='fifteen wide column'>
//                            <label htmlFor='Active'>Not looking for a job at the moment</label>
//                        </div>
//                    </div>
//                    <div className='ui grid'>
//                        <div className='column'>
//                            <input
//                                type='radio'
//                                name='Job Status'
//                                value='Currently employed but open to offers'
//                                id='Open'
//                                onChange={onOptionSelect}
//                                checked={jobStatus === 'Currently employed but open to offers'}
//                                />
//                        </div>
//                        <div className='fifteen wide column'>
//                            <label htmlFor='Active'>Currently employed but open to offers</label>
//                        </div>
//                    </div>
//                    <div className='ui grid'>
//                        <div className='column'>
//                            <input
//                                type='radio'
//                                name='Job Status'
//                                value='Will be available on later date'
//                                id='Closed'
//                                onChange={onOptionSelect}
//                                checked={jobStatus === 'Will be available on later date'}
//                                />
//                        </div>
//                        <div className='fifteen wide column'>
//                            <label htmlFor='Active'>Will be available on later date</label>
//                        </div>
//                    </div>
//                </div>
//            </div>
//            <div>
//                <button
//                    className='ui teal button'
//                    onClick = { handleSaveJobStatus }
//                >
//                    Save
//                </button>
//            </div>
//        </div>
//    )
//}