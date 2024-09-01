/* Language section */
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { lang } from 'moment';
import { getApiCall, postApiCall } from './ApiUtil.jsx';

const languageOptions = [
    {
        value: '',
        text: 'Language Level'
    },
    {
        value: 'Basic',
        text: 'Basic'
    },
    {
        value: 'Conversational',
        text: 'Conversational'
    },
    {
        value: 'Fluent',
        text: 'Fluent'
    },
    {
        value: 'Native/Bilingual',
        text: 'Native/Bilingual'
    },
].map((x, index) => <option key={index} value={x.value}>{x.text}</option>);

const init = 0;
const success = 1;
const failure = 2;

export default function Language({ languageData, updateProfileData, updateWithoutSave }) {    
    const [editProps, setEditProps] = useState([]);    
    const [languages, setLanguages] = useState([]);    
    const [addNew, setAddNew] = useState(false);    

    useEffect(() => {
        getApiCall(
            //'http://localhost:60290/profile/profile/getLanguage',
            'https://module1talent-cnfucbdcave3ccgq.australiaeast-01.azurewebsites.net/profile/profile/getLanguage',
            setLanguages
        );
    }, []);
    const handleDelayCall = () => {
        setTimeout(() => {
            getApiCall(
                //'http://localhost:60290/profile/profile/getLanguage',
                'https://module1talent-cnfucbdcave3ccgq.australiaeast-01.azurewebsites.net/profile/profile/getLanguage',
                setLanguages
            );
        }, 500);
    };
    const handleAddNewLanguage = (name, level) => {        
        var newLang = {
            name: name,
            level: level,
        };
        //console.log(`${newLang.name}, ${newLang.level}`);
        postApiCall(
            //'http://localhost:60290/profile/profile/addLanguage',
            'https://module1talent-cnfucbdcave3ccgq.australiaeast-01.azurewebsites.net/profile/profile/addLanguage',
            newLang,
            setLanguages
        );
    }
    
    const handleAddNewUI = (e) => {
        e.preventDefault();
        setAddNew(true);
    }
    const handleCancelNewUI = () => {
        setAddNew(false);
    }

    const handleDeletelanguage = (index, languageId) => {
        
        var languageToDelete = languages[index];
        postApiCall(
            //'http://localhost:60290/profile/profile/DeleteLanguage',
            'https://module1talent-cnfucbdcave3ccgq.australiaeast-01.azurewebsites.net/profile/profile/DeleteLanguage',
            languageToDelete,
            setLanguages
        );
    }
        
    const handleUpdateOk = (updateIndex, editLanguage, editLevel) => {        
        var languageToUpdate = languages[updateIndex];
        languageToUpdate.name = editLanguage;
        languageToUpdate.level = editLevel;
        
        //console.table(languageToUpdate);
        postApiCall(
            //'http://localhost:60290/profile/profile/updateLanguage',
            'https://module1talent-cnfucbdcave3ccgq.australiaeast-01.azurewebsites.net/profile/profile/updateLanguage',
            languageToUpdate,
            setLanguages
        );        
    }
    
    return (        
        <div className='ui grid sixteen wide column'>
            
            {addNew && <AddNewLanguage
                onAddLanguage={handleAddNewLanguage}                onClose={handleCancelNewUI} />
            }
                
            <div className='ui sixteen wide column'>
                <table className='ui table'>
                    <thead>
                        <tr>
                            <th>Language</th>
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
                        {languages.map((language, index) => {
                            // Languages Default view
                            return (
                                < DisplayLanguageTable
                                    key={index}
                                    index={index}
                                    languageId={language.id}
                                    languageName={language.name}
                                    languageLevel={language.level}                                    
                                    handleDeletelanguage={handleDeletelanguage}
                                    handleUpdateOk={handleUpdateOk }
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function DisplayLanguageTable({ index, languageId, languageName, languageLevel, handleDeletelanguage, handleUpdateOk }) {

    const [editState, setEditState] = useState(false);

    const handleEditForm = () => {        
        setEditState(true);
    }
    const handleClose = () => {
        handleDeletelanguage(index, languageId);
    }
    const handleUpdateLanguage = (updateLanguage, updateLevel) => {
        handleUpdateOk(index, updateLanguage, updateLevel);
        setEditState(false);
    }

    if (editState) {
        return (
            < EditLanguageForm
                key={index}
                index={index}
                languageName={languageName}
                languageLevel={languageLevel}                
                handleUpdateOk={handleUpdateLanguage}
                handleUpdateCancel={() => { setEditState(false) } }
            />
        )
    } else {
        return (
            <tr key={index}>
                <td>{languageName}</td>
                <td>{languageLevel}</td>
                <td>
                    <div className='ui right floated'>
                        <i
                            className='pencil icon'
                            onClick={handleEditForm}
                        >
                        </i>
                        <i
                            className='close icon'
                            onClick={handleClose}
                        >
                        </i>
                    </div>
                </td>
            </tr>
        )
    }
}

function EditLanguageForm({ index, languageName, languageLevel, handleUpdateOk, handleUpdateCancel }) {
    const [editLanguage, setEditLanguage] = useState(languageName);
    const [editLevel, setEditLevel] = useState(languageLevel);
    const handleUpdate = (e) => {
        e.preventDefault();
        handleUpdateOk(editLanguage, editLevel);
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
                    name='Language'
                    value={editLanguage}
                    placeholder=''
                    maxLength={30}
                    onChange={(e) => setEditLanguage(e.target.value)}
                />
            </td>
            <td>                
                <select
                    type='text'
                    name='Language'
                    value={editLevel}
                    onChange={(e) => setEditLevel(e.target.value)}
                >
                    {languageOptions}
                </select>
            </td>
            <td>
                <div className='ui column right floated'>
                    <button
                        className='ui primary basic button'
                        onClick={ handleUpdate }
                    >
                        Update
                    </button>
                    <button
                        className='ui negative basic button'
                        onClick={ handleCancel }
                    >
                        Cancel
                    </button>
                </div>
            </td>
        </tr>
    )
}
function AddNewLanguage({ onAddLanguage, onClose }) {
    const [newLanguage, setNewlanguage] = useState('');
    const [newLevel, setNewLevel] = useState('');   

    const handleCancel = (e) => {
        e.preventDefault();
        onClose();
    }
    const handleAdd = (e) => {
        e.preventDefault();
        onAddLanguage(newLanguage, newLevel);
        onClose();
    }
    
    return (
        <div className='three column row'>
            <div className='ui four wide column'>
                <input
                    type='text'
                    name='Language'
                    value={newLanguage}
                    placeholder='Add language'
                    maxLength={20}
                    onChange={(e) => setNewlanguage(e.target.value)}
                />
            </div>
            <div className='column'>
                <select
                    type='text'
                    name='Language'
                    value={newLevel}
                    placeholder='Add language'
                    onChange={(e) => setNewLevel(e.target.value)}
                >
                    {languageOptions}
                </select>
            </div>
            <div className='ui four wide column'>
                <button
                    className='ui teal button'
                    onClick={handleAdd }
                >
                    Add
                </button>
                <button
                    className='ui button'
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    )    
}
