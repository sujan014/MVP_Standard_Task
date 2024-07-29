/* Language section */
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

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
export default function Language({ languageData, updateProfileData }) {
    const tLang = languageData.map((lang) => ({
        name: lang.name,
        level: lang.level,
        editState: false
    }));    
    /*start from editing language level*/

    const [languages, setLanguages] = useState(tLang);
    
    const [addNew, setAddNew] = useState(false);
    const [languageEdit, setlanguageEdit] = useState(false);        

    const handleAddNewLanguage = (name, level) => {
        var temp = [...languages, {
            name:name,
            level: level,
            editState: false,
        }];
        setLanguages(temp);        
    }
    const handleAddNewUI = (e) => {
        e.preventDefault();
        setAddNew(true);
    }
    const handleCancelNewUI = () => {
        setAddNew(false);
    }
    const handleDeletelanguage = (index) => {
        let t = languages[index];
        const newArray = [...languages.slice(0, index), ...languages.slice(index + 1)];
        setLanguages(newArray);
    }
    const handleEditLanguage = (indexEdit) => {        
        const tempLangs = languages.map((todo, index) => {                        
            if (index === indexEdit) {
                const qw = todo;
                qw.editState = true;
                return qw;
            }
            return todo;
        });
        setLanguages(tempLangs);
    }
    const handleUpdateOk = (updateIndex, editLanguage, editLevel) => {
        const updateLanguage = languages.map((oldLanguage, index) => {
            if (index === updateIndex) {
                const newLang = oldLanguage;
                newLang.name = editLanguage;
                newLang.level = editLevel;
                newLang.editState = false;
                return newLang;
            }
            return oldLanguage;
        });
        setLanguages(updateLanguage);
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
                            if (language.editState === false) {
                                // Languages Default view
                                return(
                                    < DisplayLanguageTable
                                        key={index}
                                        index={index}
                                        languageName={language.name}
                                        languageLevel={language.level}
                                        handleEditLanguage={handleEditLanguage}
                                        handleDeletelanguage={handleDeletelanguage}
                                    />
                                )                                
                            } else if (language.editState === true) {
                                // Languages Edit view
                                return(
                                    < EditLanguageForm
                                        key={index }
                                        index={index}
                                        languageName={language.name}
                                        languageLevel={language.level}
                                        handleUpdateOk={handleUpdateOk}
                                        handleUpdateCancel={handleUpdateCancel}
                                    />
                                )                                
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function DisplayLanguageTable({ index, languageName, languageLevel, handleEditLanguage, handleDeletelanguage }) {

    const handleEdit = () => {
        handleEditLanguage(index);
    }
    const handleClose = () => {
        handleDeletelanguage(index);
    }

    return (
        <tr key={index}>
            <td>{languageName}</td>
            <td>{languageLevel}</td>
            <td>
                <div className='ui right floated'>
                    <i
                        className='pencil icon'
                        onClick={handleEdit}
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

function EditLanguageForm({ index, languageName, languageLevel, handleUpdateOk, handleUpdateCancel }) {
    const [editLanguage, setEditLanguage] = useState(languageName);
    const [editLevel, setEditLevel] = useState(languageLevel);
    const handleUpdate = (e) => {
        e.preventDefault();
        handleUpdateOk(index, editLanguage, editLevel);
    }
    const handleCancel = (e) => {
        e.preventDefault();
        handleUpdateCancel(index);
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
