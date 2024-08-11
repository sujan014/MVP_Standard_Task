/* Skill section */
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getApiCall, postApiCall } from './ApiUtil.jsx';

//export default class Skill extends React.Component {
//    constructor(props) {
//        super(props);

//    };


//   render() {

//    }
//}

const skillOptions = [
    {
        value: '',
        text: 'Skill Level'
    },
    {
        value: 'Beginner',
        text: 'Beginner'
    },
    {
        value: 'Intermediate',
        text: 'Intermediate'
    },
    {
        value: 'Expert',
        text: 'Expert'
    },
].map((x, index) => <option key={index} value={x.value}>{x.text}</option>);

export default function Skill({ skillData, updateProfileData, updateWithoutSave }) {    

    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');
    const [newLevel, setNewLevel] = useState('');
    const [addNew, setAddNew] = useState(false);

    useEffect(() => {
        getApiCall(
            'http://localhost:60290/profile/profile/getSkill',
            setSkills
        );
    },
        []
        //[tskills]
    );
    const handleDelayCall = () => {
        setTimeout(() => {
            getApiCall(
                'http://localhost:60290/profile/profile/getSkill',
                setSkills
            );
        }, 500);
    };
    const handleAddNewUI = (e) => {
        e.preventDefault();
        setAddNew(true);
    }
    const handleAddNewSkill = (newSkill, newLevel) => {        
        var newList = [...skillData, {
            name: newSkill,
            level: newLevel
        }];
        var profileData = {
            skills: [...newList]
        }
        updateProfileData(profileData);
        handleDelayCall();
    }
    const handleCancelNewUI = () => {
        setAddNew(false);
    }
    const handleDeleteSkill = (index) => {
        let deleteSkill = skills[index];
        const newArray = [...skills.slice(0, index), ...skills.slice(index + 1)];
        //setSkills(newArray);

        // API call
        console.log(`deleteSkill -> ${deleteSkill}`);
        postApiCall(
            'http://localhost:60290/profile/profile/deleteSkill',
            deleteSkill,
            setSkills
        )
    }
    const handleEditSkill = (indexEdit) => {
        const tempSkills = skills.map((item, index) => {
            if (index === indexEdit) {
                const qw = item;
                qw.editState = true;
                return qw;
            }
            return item;
        });
        setSkills(tempSkills);
    }
    const handleUpdateOk = (editIndex, editSkill, editLevel) => {
        var skillToUpdate = skills[editIndex];
        skillToUpdate.name = editSkill;
        skillToUpdate.level = editLevel;
        console.table(skillToUpdate);
        postApiCall(
            'http://localhost:60290/profile/profile/updateSkill',
            skillToUpdate,
            setSkills
        );
        /*var tempSkills = skills.map((oldSkill, index) => {
            if (index === editIndex) {
                var updateSkill = oldSkill;
                updateSkill.name = editSkill;
                updateSkill.level = editLevel;
                updateSkill.editState = false;
                return updateSkill;
            }
            return oldSkill;
        });
        setSkills(tempSkills);*/
    }
    const handleUpdateCancel = (indexEdit) => {
        const newSkills = skills.map((item, index) => {
            if (index === indexEdit) {
                const qw = item;
                qw.editState = false;
                return qw;
            }
            return item;
        });
        setSkills(newSkills);
    }

    return (
        <div className='ui grid sixteen wide column'>

            {addNew && 
                < AddSkillForm onAddLanguage={ handleAddNewSkill } onClose={ handleCancelNewUI } />
            }

            <div className='ui sixteen wide column'>
                <table className='ui table'>
                    <thead>
                        <tr>
                            <th>Skills</th>
                            <th>Level</th>
                            <th>
                                <button
                                    className='ui teal button right floated'
                                    onClick={handleAddNewUI}
                                >
                                    + Add New
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {skills.map((skill, index) => {
                            //if (skill.editState === false) {
                                // Skills Default view
                                return(
                                    < DisplaySkillTable
                                        key={ index }
                                        index={index}
                                        skillName={skill.name}
                                        skillLevel={skill.level}
                                        handleEditSkill={ handleEditSkill }
                                        handleDeleteSkill={handleDeleteSkill}
                                        handleUpdateOk={handleUpdateOk}
                                    />
                                )
                            /*} else if (skill.editState === true) {
                                // Languages Edit view
                                return (
                                    < EditSkillForm
                                        key={index}
                                        index={index}
                                        skillName={skill.name}
                                        skillLevel={skill.level}
                                        handleUpdateOk={handleUpdateOk}
                                        handleUpdateCancel={handleUpdateCancel}
                                    />
                                )
                            }*/
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function DisplaySkillTable({ index, skillName, skillLevel, handleEditSkill, handleDeleteSkill, handleUpdateOk }) {

    const [editState, setEditState] = useState(false);

    const handleEdit = (e) => {
        e.preventDefault();
        //handleEditSkill(index);
        setEditState(true);
    }
    const handleDelete = (e) => {
        e.preventDefault();
        handleDeleteSkill(index);
    }
    const handleUpdateSkills = (skillName, skillLevel) => {
        handleUpdateOk(index, skillName, skillLevel);
        setEditState(false);
    }
    if (editState) {
        return (
            < EditSkillForm
                key={index}
                index={index}
                skillName={skillName}
                skillLevel={skillLevel}
                handleUpdateOk={handleUpdateSkills}
                handleUpdateCancel={() => { setEditState(false) }}
            />
        )
    }
    else {
        return (
            <tr key={index}>
                <td>{skillName}</td>
                <td>{skillLevel}</td>
                <td>
                    <div className='ui right floated'>
                        <i
                            className='pencil icon'
                            onClick={handleEdit}
                        >
                        </i>
                        <i
                            className='close icon'
                            onClick={handleDelete}
                        >
                        </i>
                    </div>
                </td>
            </tr>
        )
    }
}
function EditSkillForm({ index, skillName, skillLevel, handleUpdateOk, handleUpdateCancel }) {
    const [editSkill, setEditSkill] = useState(skillName);
    const [editLevel, setEditLevel] = useState(skillLevel);

    const handleUpdate = (e) => {
        e.preventDefault();
        handleUpdateOk(editSkill, editLevel);        
    }
    const handleCancel = (e) => {
        e.preventDefault();
        handleUpdateCancel();
    }
    return (
        <tr key={index}>
            <td>
                <input
                    type='text'
                    name='Skill'
                    value={editSkill}
                    placeholder=''
                    maxLength={50}
                    onChange={(e) => setEditSkill(e.target.value)}
                />
            </td>
            <td>
                <select
                    type='text'
                    name='Language'
                    value={editLevel}
                    onChange={(e) => setEditLevel(e.target.value)}
                >
                    {skillOptions}
                </select>
            </td>
            <td>
                <div className='ui right floated'>
                    <button
                        className='ui primary basic button'
                        onClick={handleUpdate}
                    >
                        Update
                    </button>
                    <button
                        className='ui negative basic button'
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </td>
        </tr>
    )
}
function AddSkillForm({ onAddLanguage, onClose }) {
    const [newSkill, setNewSkill] = useState('');
    const [newLevel, setNewLevel] = useState('');

    const handleAddSkill = (e) => {
        e.preventDefault();
        onAddLanguage(newSkill, newLevel);
        onClose();
    }
    const handleCancel = (e) => {
        e.preventDefault();
        onClose();
    }

    return (
        <div className='three column row'>
            <div className='ui four wide column'>
                <input
                    type='text'
                    name='Skill'
                    value={newSkill}
                    placeholder='Add Skill'
                    maxLength={20}
                    onChange={(e) => setNewSkill(e.target.value)}
                />
            </div>
            <div className='column'>
                <select
                    type='text'
                    name='Level'
                    value={newLevel}
                    placeholder='Add level'
                    onChange={(e) => setNewLevel(e.target.value)}
                >
                    {skillOptions}
                </select>
            </div>
            <div className='ui four wide column'>
                <button
                    className='ui teal button'
                    onClick={ handleAddSkill }
                >
                    Add
                </button>
                <button
                    className='ui button'
                    onClick={ handleCancel }
                    //onClick={handleCancelNewUI}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}