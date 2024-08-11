/* Social media JSX */
import React, { useState } from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Button, Popup } from 'semantic-ui-react';

//export default class SocialMediaLinkedAccount extends React.Component {
//    constructor(props) {
//        super(props);


//    }

//    componentDidMount() {
//        //$('.ui.button.social-media').popup();
//    }



//    render() {
//        return (
//            <div className='ui three column grid'>
//                <Button className='primary'>
//                    Linked
//                </Button>
//                <Button className='secondary'>
//                    Github
//                </Button>
                
//                <Button className='secondary right floated'>
//                    Edit
//                </Button>
//            </div>
//        )
//    }
//}

export default function SocialMediaLinkedAccount({ linkedAccounts, updateProfileData, saveProfileData }) {
    const [accounts, setAccounts] = useState(linkedAccounts);
    const [edit, setEdit] = useState(false);

    //console.log('linkedAccounts: ' + JSON.stringify(linkedAccounts));

    const setEditFunction = (state) => {
        setEdit(state);
    }
    const handleEditWin = (e) => {
        e.preventDefault();
        setEditFunction(true);        
    }
    const handleAccountSave = (linkedIn, github) => {
        //var temp = accounts;
        //temp.linkedIn = linkedIn;
        //temp.github = github;
        //setAccounts(temp);
        //Save data        
    }    
        
    return (
        <div className='ui grid sixteen wide column'>
            {/*<div className='sixteen wide column'>*/}
            <div className='three column row'>
                <div className='ui four wide column'>
                    <div>
                        <Button
                            className='primary'
                            onClick={(e) => e.preventDefault()}
                        >
                            LinkedIn
                        </Button>
                    </div>
                </div>
                
                <div className='ui four wide column'>
                    
                        <div>
                            <Button
                                className='secondary'
                                onClick={(e) => e.preventDefault()}
                            >
                                Github
                            </Button>
                        </div>
                </div>
                    
                <div className='ui four wide column'>
                    <div>
                        <Button className='secondary right floated'
                            onClick={handleEditWin }
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            </div>
            {edit ?
                < EditSocialMediaAccount
                    linkedAccounts={linkedAccounts}
                    onSave={saveProfileData}
                    onCancel={() => setEditFunction(false)}
                /> :
                false
            }
        </div>
    )        
}

function EditSocialMediaAccount({ linkedAccounts, onSave, onCancel }) {
    const [newLinkedIn, setNewLinkedIn] = useState(linkedAccounts.linkedIn);
    const [newGithub, setNewGithub] = useState(linkedAccounts.github);

    const handleSave = (e) => {
        e.preventDefault();
        const profileData = {
            linkedAccounts: {
                linkedIn: newLinkedIn,
                github: newGithub
            }
        }
        onSave(profileData);
        onCancel();
    }
    const handleCancel = (e) => {
        e.preventDefault();
        onCancel();
    }
    return (
        /*<div className='row sixteen wide column'>*/
        <div className='ui sixteen wide column'>
            <ChildSingleInput
                inputType="text"
                label="LinkedIn"
                name="LinkedIn"
                value={newLinkedIn}
                controlFunc={e => setNewLinkedIn(e.target.value)}
                maxLength={80}
                placeholder="Enter your LinkedIn Url"
                errorMessage="Please enter a valid input"
            />
            <ChildSingleInput
                inputType="text"
                label="Github"
                name="Github"
                value={newGithub}
                controlFunc={e => setNewGithub(e.target.value)}
                maxLength={80}
                placeholder="Enter your Github Url"
                errorMessage="Please enter a valid input"
            />
            <div className='row'>
                <button
                    className='ui button secondary'
                    onClick={e => handleSave(e) }
                >
                    Save
                </button>
                <button
                    className='ui button'
                    onClick={e => handleCancel(e)}
                >
                    Cancel
                </button>
            </div>
        </div>
            
        /*</div>*/
    )
}