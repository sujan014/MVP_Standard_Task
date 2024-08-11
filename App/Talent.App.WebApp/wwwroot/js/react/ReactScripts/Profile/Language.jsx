/* Language section */
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { lang } from 'moment';
import { getApiCall, postApiCall } from './ApiUtil.jsx';

//export default class Language extends React.Component {
//    constructor(props) {
//        super(props);


//    }

//    render() {

//    }
//}

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
    //var tLang = languageData.map((lang) => ({
    //    id: lang.id,
    //    currentUserId: lang.currentUserId,
    //    name: lang.name,
    //    level: lang.level,        
    //}));
    const [editProps, setEditProps] = useState([]);
    /*start from editing language level*/

    //const [languages, setLanguages] = useState(tLang);    
    const [languages, setLanguages] = useState([]);    
    const [addNew, setAddNew] = useState(false);
    const [languageEdit, setlanguageEdit] = useState(false); 
    const [postSuccess, setPostSuccess] = useState();

    useEffect(() => {
        //setLanguages(tLang);
        getApiCall(
            'http://localhost:60290/profile/profile/getLanguage',
            setLanguages
        );
    },
        //[tLang]
        []
    );        
    const handleDelayCall = () => {
        setTimeout(() => {
            getApiCall(
                'http://localhost:60290/profile/profile/getLanguage',
                setLanguages
            );
        }, 500);
    };
    const handleAddNewLanguage = (name, level) => {
        var temp = [...languages, {
            name:name,
            level: level,
            editState: false,
        }];
        // save language to database here
        var newList = [...languageData, {
            name: name,
            level: level,
        }];        
        var profileData = {
            languages : [...newList]
        }
        updateProfileData(profileData);
        handleDelayCall();
    }
    const handleAddNewUI = (e) => {
        e.preventDefault();
        setAddNew(true);
    }
    const handleCancelNewUI = () => {
        setAddNew(false);
    }

    const handleDeletelanguage = (index, languageId) => {
        //let t = languages[index];
        //var index = languages.findIndex(x => x.id === languageId);        
        console.log(index);
        const newArray = [...languages.slice(0, index), ...languages.slice(index + 1)];
        console.table(newArray);
        setLanguages(newArray);

        // make API call here
        console.log('languageid delete -> ' + languageId);
        var languagetodelete = languages.filter(x => x.id === languageId)[0];
        postApiCall(
            'http://localhost:60290/profile/profile/DeleteLanguage',
            languagetodelete,
            setLanguages
        );
    }
    
    const handleEditLanguage = (indexEdit) => {
        // This is no longer possible when the props are passed from the parent component.
        const tempLang = languages.map((todo, index) => {                        
            if (index === indexEdit) {
                const qw = todo;
                qw.editState = true;
                return qw;
            }
            return todo;
        });
        var profileData = {
            languages: tempLang
        }
        updateWithoutSave(profileData);
        //setLanguages(tempLangs);
    }
    const handleUpdateOk = (updateIndex, editLanguage, editLevel) => {
        console.log(`${updateIndex}, ${editLanguage}, ${editLevel}`);
        var languageToUpdate = languages[updateIndex];
        languageToUpdate.name = editLanguage;
        languageToUpdate.level = editLevel;
        
        console.table(languageToUpdate);
        postApiCall(
            'http://localhost:60290/profile/profile/updateLanguage',
            languageToUpdate,
            setLanguages
        );

        /*
        var updateLanguage = languages.map((langItem, index) => {
            if (index === updateIndex) {
                const newLang = langItem;
                newLang.name = editLanguage;
                newLang.level = editLevel;
                return newLang;
            }
            return langItem;
        });
        setLanguages(updateLanguage);
        */
    }
    const handleUpdateCancel = (indexEdit) => {        
        const newLangs = languages.map((lang, index) => {
            if (index === indexEdit) {
                const qw = lang;
                qw.editState = false;
                return qw;
            }
            return lang;
        });
        setLanguages(newLangs);        
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
                                    handleEditLanguage={handleEditLanguage}
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

function DisplayLanguageTable({ index, languageId, languageName, languageLevel, handleEditLanguage, handleDeletelanguage, handleUpdateOk }) {

    const [editState, setEditState] = useState(false);

    const handleEditForm = () => {
        //handleEditLanguage(index);
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
                //handleUpdateOk={handleUpdateOk}
                //handleUpdateCancel={handleUpdateCancel}
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
        //handleUpdateCancel(index);
    }
    return (
        <tr key={index}>
            <td>
                {/*{languageName}*/}
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
                {/*{languageLevel}*/}
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
