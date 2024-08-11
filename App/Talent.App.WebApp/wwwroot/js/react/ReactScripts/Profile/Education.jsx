/* Education section */
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { default as Countries } from '../../../../../wwwroot/util/jsonFiles/countries.json'
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { getApiCall, postApiCall } from './ApiUtil.jsx';

//export default class Education extends React.Component {
//    constructor(props) {
//        super(props)
//    };

//    render() {
//        return (
//            <div>Hello my boy
//            </div>
//        )
//    }
//}

export default function Education({ educationData, updateProfileData }) {
    
    const [eduData, setEduData] = useState([]);
    const [eduForm, setEduForm] = useState(false);

    useEffect(() => {
        getApiCall(
            'http://localhost:60290/profile/profile/getEducation',
            setEduData
        );
    }, []);

    const handleDelayCall = () => {
        setTimeout(() => {
            getApiCall(
                'http://localhost:60290/profile/profile/getEducation',
                setEduData
            );
        }, 500);
    };
    const handleAddEduForm = () => {
        setEduForm(true);
    }
    const handleCancelEduForm = () => {
        setEduForm(false);
    }
    const handleAddNewEduForm = (newCountry, newInstituteName, newTitle, newDegree, newYog) => {        
        var addNewEdu = {
            country: newCountry,
            instituteName: newInstituteName,
            title: newTitle,
            degree: newDegree,
            yearOfGraduation: parseInt(newYog)
        }
        postApiCall(
            'http://localhost:60290/profile/profile/addEducation',
            addNewEdu,
            setEduData
        )
        //handleDelayCall();
    }
    const handleDeleteEdu = (index) => {
        let deleteEdu = eduData[index];
        postApiCall(
            'http://localhost:60290/profile/profile/deleteEducation',
            deleteEdu,
            setEduData
        )                
    }
    const handleEditEdu = (indexEdit, state) => {
        const newEdu = eduData.map((item, index) => {
            if (index === indexEdit) {
                const qw = item;
                qw.editState = state;
                return qw;
            }
            return item;
        });
        console.log(newEdu);
        setEduData(newEdu);
    }
    const handleUpdateEdu = (updateIndex, newCountry, newInstitute, newTitle, newDegree, newGradYear) => {        
        var eduToUpdate = eduData[updateIndex];
        eduToUpdate.country = newCountry;
        eduToUpdate.instituteName = newInstitute;
        eduToUpdate.title = newTitle;
        eduToUpdate.degree = newDegree;
        eduToUpdate.yearOfGraduation = newGradYear;
        console.log(`${eduToUpdate.country}, ${eduToUpdate.instituteName}, ${eduToUpdate.title}, ${eduToUpdate.degree}, ${eduToUpdate.yearOfGraduation}.`);
        postApiCall(
            'http://localhost:60290/profile/profile/updateEducation',
            eduToUpdate,
            setEduData
        );        
    }

    return (        
        <div className='ui grid sixteen column wide'>
            {eduForm &&
                <EducationForm
                    handleAddNewEduForm={handleAddNewEduForm }
                    handleCancelEduForm={handleCancelEduForm}
                />
            }
            <EducationTableHeader handleAddEduForm={handleAddEduForm} />
            {eduData.map((edu, index) => {
                return (
                    < EducationTable
                        key={index}
                        index={index}
                        country={edu.country}
                        instituteName={edu.instituteName}
                        title={edu.title}
                        degree={edu.degree}
                        yearOfGraduation={edu.yearOfGraduation}                        
                        handleEditEdu={handleEditEdu}
                        handleDeleteEdu={handleDeleteEdu}
                        handleUpdateEdu={handleUpdateEdu}
                    />
                )                
            }) }
        </div>
    )
}

function UpdateEduForm({ index, country, instituteName, title, degree, YoG, handleUpdateEdu, handleCancelUpdate })
{
    const [newCountry, setNewCountry] = useState(country);
    const [newInstitute, setNewInstitute] = useState(instituteName);
    const [newTitle, setNewTitle] = useState(title);
    const [newDegree, setNewDegree] = useState(degree);
    const [newGradYear, setNewGradYear] = useState(YoG);

    const handleUpdate = (e) => {
        e.preventDefault();
        handleUpdateEdu(newCountry, newInstitute, newTitle, newDegree, newGradYear);
    }
    const handleCancel = (e) => {
        e.preventDefault();
        handleCancelUpdate();
    }
    return (
        <div className='row' key={ index}>
            <div className='eight wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Country"
                    name="Country"
                    value={newCountry}
                    controlFunc={(e) => {
                        setNewCountry(e.target.value);
                    }}
                    maxLength={30}
                    placeholder="Country"
                    errorMessage="Please enter country"
                />
            </div>
            <div className='eight wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Institute"
                    name="Institute"
                    value={newInstitute}
                    controlFunc={(e) => {
                        setNewInstitute(e.target.value);
                    }}
                    maxLength={30}
                    placeholder="Institute"
                    errorMessage="Please enter institute"
                />
            </div>
            <div className='eight wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Title"
                    name="Titlte"
                    value={newTitle}
                    controlFunc={(e) => {
                        setNewTitle(e.target.value);
                    }}
                    maxLength={30}
                    placeholder="Title"
                    errorMessage="Please enter title"
                />
            </div>
            <div className='eight wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Degree"
                    name="Degree"
                    value={newDegree}
                    controlFunc={(e) => {
                        setNewDegree(e.target.value);
                    }}
                    maxLength={30}
                    placeholder="Institute"
                    errorMessage="Please enter institute"
                />
            </div>
            <div className='sixteen wide column'>
                <ChildSingleInput
                    inputType="number"
                    label="Grad year"
                    name="Grad year"
                    value={newGradYear}
                    controlFunc={(e) => {
                        setNewGradYear(e.target.value);
                    }}
                    maxLength={10}
                    errorMessage="Please enter year"
                />
            </div>
            <div className='eight wide column'>
                <div className='row'>
                    <button
                        className='ui teal button'
                        onClick={handleUpdate}
                    >
                        Add
                    </button>
                    <button
                        className='ui primary basic button'
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
function EducationTable({ index, country, instituteName, title, degree, yearOfGraduation, handleEditEdu, handleDeleteEdu, handleUpdateEdu }) {

    const [editState, setEditState] = useState(false);
    
    const handleEdit = (e) => {
        e.preventDefault();
        setEditState(true);
    }
    const handleEduDeleteClick = (e) => {
        e.preventDefault();
        handleDeleteEdu(index);
    }
    const handleUpdateEducationOK = (newCountry, newInstitute, newTitle, newDegree, newGradYear) => {
        handleUpdateEdu(index, newCountry, newInstitute, newTitle, newDegree, newGradYear)
        setEditState(false);
    }
    if (editState) {
        return (
            <UpdateEduForm
                index={index}
                country={country}
                instituteName={instituteName}
                title={title}
                degree={degree}
                YoG={yearOfGraduation}                
                handleUpdateEdu={handleUpdateEducationOK}
                handleCancelUpdate={ () => { setEditState(false) } }
            />
        )
    }

    return (
        <div className='row'>
            <div className='two wide column'>
                {country}
            </div>
            <div className='three wide column'>
                {instituteName}
            </div>
            <div className='three wide column'>
                {title}
            </div>
            <div className='three wide column'>
                {degree}
            </div>
            <div className='three wide column'>
                {yearOfGraduation}
            </div>
            <div className='one wide column'>
                <div className='row right floated'>
                    <i
                        className='pencil icon'
                        onClick={ handleEdit }                        
                    >
                    </i>
                    <i
                        className='close icon'
                        onClick={ handleEduDeleteClick }
                    >
                    </i>
                </div>
            </div>
        </div>
    )
}

function EducationForm({ handleAddNewEduForm, handleCancelEduForm }) {
    const [newCountry, setNewCountry] = useState('');
    const [newInstitute, setNewInstitute] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newDegree, setNewDegree] = useState('');
    const [newGradYear, setNewGradYear] = useState(1990);

    const handleClose = (e) => {
        e.preventDefault();
        handleCancelEduForm();
    }
    const handleAdd = (e) => {
        e.preventDefault();
        handleAddNewEduForm(newCountry, newInstitute, newTitle, newDegree, newGradYear)
        handleCancelEduForm();
    }
    return (
        <div className='row'>
            <div className='eight wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Country"
                    name="Country"
                    value={newCountry}
                    controlFunc={(e) => {
                        setNewCountry(e.target.value);
                    }}
                    maxLength={30}
                    placeholder="Country"
                    errorMessage="Please enter country"
                />
            </div>
            <div className='eight wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Institute"
                    name="Institute"
                    value={newInstitute}
                    controlFunc={(e) => {
                        setNewInstitute(e.target.value);
                    }}
                    maxLength={30}
                    placeholder="Institute"
                    errorMessage="Please enter institute"
                />
            </div>
            <div className='eight wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Title"
                    name="Titlte"
                    value={newTitle}
                    controlFunc={(e) => {
                        setNewTitle(e.target.value);
                    }}
                    maxLength={30}
                    placeholder="Title"
                    errorMessage="Please enter title"
                />
            </div>
            <div className='eight wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Degree"
                    name="Degree"
                    value={newDegree}
                    controlFunc={(e) => {
                        setNewDegree(e.target.value);
                    }}
                    maxLength={30}
                    placeholder="Institute"
                    errorMessage="Please enter institute"
                />
            </div>
            <div className='sixteen wide column'>
                <ChildSingleInput
                    inputType="number"
                    label="Grad year"
                    name="Grad year"
                    value={newGradYear}
                    controlFunc={(e) => {
                        setNewGradYear(e.target.value);
                    }}
                    maxLength={10}
                    errorMessage="Please enter year"
                />
            </div>
            <div className='eight wide column'>
                <div className='row'>
                    <button
                        className='ui teal button'
                        onClick={handleAdd}
                    >
                        Add
                    </button>
                    <button
                        className='ui primary basic button'
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
function EducationTableHeader({ handleAddEduForm }) {
    const handleAddNew = (e) => {
        e.preventDefault();
        handleAddEduForm();
    }
    return (
        <div className='ui background  row gap-1' style={{ background: 'lightgray' }}>
            <div className='two wide column'>
                Country
            </div>
            <div className='three wide column'>
                Institute Name
            </div>
            <div className='three wide column'>
                Title
            </div>
            <div className='three wide column'>
                Degree
            </div>
            <div className='three wide column'>
                Graduation Year
            </div>
            <div className='one wide column'>
                <button
                    className='ui teal button right floated'
                    onClick={handleAddNew}
                >
                    + Add New
                </button>
            </div>
        </div>
    )
}
