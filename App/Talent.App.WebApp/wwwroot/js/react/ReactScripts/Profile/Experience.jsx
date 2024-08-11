/* Experience section */
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { getApiCall, postApiCall } from './ApiUtil.jsx';

//export default class Experience extends React.Component {
//    constructor(props) {
//        super(props);

//    };

//    render() {


//    }
//}

export default function Experience({ experienceData, updateProfileData }) {
    //const texper = experienceData.map((exper) => ({
    //    company: exper.company,
    //    position: exper.position,
    //    duty: exper.duty,
    //    startDate: exper.startDate,
    //    endDate: exper.endDate,
    //    //editState: false
    //}));
    //const [expernc, setExpernc] = useState(texper);
    const [expernc, setExpernc] = useState([]);
    const [experiencForm, setExperienceForm] = useState(false);

    useEffect(() => {
        getApiCall(
            'http://localhost:60290/profile/profile/getExperience',
            setExpernc
        );
    }, []);
    const handleAddNewForm = () => {
        setExperienceForm(true);
    }
    const handleCancelNewForm = () => {
        setExperienceForm(false);
    }
    const handleAddNewExperience = (newCompany, newPosition, newResponsibilities, newStartDate, newEndDate) => {
        var addNewExp = {
            company: newCompany,
            position: newPosition,
            responsibilities: newResponsibilities,
            start: new Date(newStartDate),
            end: new Date(newEndDate)
        }
        console.log(`${addNewExp.company}, ${addNewExp.position}, ${addNewExp.responsibilities}, ${addNewExp.start}, ${addNewExp.end}`);
        postApiCall(
            'http://localhost:60290/profile/profile/addExperience',
            addNewExp,
            setExpernc
        )               
    }
    const handleAddExperience = () => {
        let tt = newExper;
        tt.company = e.target.value;
        setNewExper(tt);
    }
    const handleEditExpnc = (indexEdit, state) => {
        const newExprnc = expernc.map((item, index) => {
            if (index === indexEdit) {
                const qw = item;
                qw.editState = state;
                return qw;
            }
            return item;
        });
        setExpernc(newExprnc);
    }
    const handleDeleteExpnc = (index) => {
        let deleteExper = expernc[index];
        postApiCall(
            'http://localhost:60290/profile/profile/deleteExperience',
            deleteExper,
            setExpernc
        )
        //let t = expernc[index];
        //const newExpernc = [...expernc.slice(0, index), ...expernc.slice(index + 1)];
        //setExpernc(newExpernc);
    }
    const handleUpdateExpnc = (indexUpdate, companyUpdate, positionUpdate, responsibilitiesUpdate, startUpdate, endUpdate) => {
        var updateExper = expernc[indexUpdate];
        updateExper.company = companyUpdate;
        updateExper.position = positionUpdate;
        updateExper.responsibilities = responsibilitiesUpdate;
        updateExper.start = new Date(startUpdate);
        updateExper.end = new Date(endUpdate);

        postApiCall(
            'http://localhost:60290/profile/profile/updateExperience',
            updateExper,
            setExpernc
        )

        //const newExprnc = expernc.map((item, index) => {
        //    if (index === indexUpdate) {
        //        const qw = item;
        //        qw.company = company;
        //        qw.position = position;
        //        qw.responsibilities = responsibilities;
        //        qw.startDate = startDate.format('DD/MM/YYYY');
        //        qw.endDate = endDate.format('DD/MM/YYYY');
        //        qw.editState = false;
        //        return qw;
        //    }
        //    return item;
        //});
        //setExpernc(newExprnc);
    }
    return (
        <div className='ui grid sixteen column wide'>
            {experiencForm &&
                < AddExperienceForm
                    handleAddNewExperience={ handleAddNewExperience }
                    handleCancelNewForm={ handleCancelNewForm }
                />
            }
            
            <ExperienceTableHeader handleAddNewForm={ handleAddNewForm } />
            {expernc.map((exp, index) => {
                return (
                    < ExperienceTable
                        key={index}
                        index={index}
                        company={exp.company}
                        position={exp.position}
                        responsibilities={exp.responsibilities}
                        start={exp.start}
                        end={exp.end}
                        DeleteData={handleDeleteExpnc}
                        updateData={handleUpdateExpnc}
                    />
                    )
                    //return (
                    //    <UpdateExperienceForm
                    //        key={index}
                    //        company={exp.company}
                    //        position={exp.position}
                    //        duty={exp.duty}
                    //        startDate={exp.startDate}
                    //        endDate={exp.endDate}
                    //        editState={exp.editState}
                    //        updateData={handleUpdateExpnc}
                    //        cancelData={handleEditExpnc}
                    //        index={index}
                    //    />
                    //)                
            })}                         
        </div>
    )
}

function ExperienceTableHeader({ handleAddNewForm }) {
    const handleAddNew = (e) => {
        e.preventDefault();
        handleAddNewForm();
    }
    return (
        <div className='ui background  row gap-1' style={{ background:'lightgray' }}>
            <div className='two wide column'>
                Company
            </div>
            <div className='three wide column'>
                Position
            </div>
            <div className='three wide column'>
                Responsibilities
            </div>
            <div className='three wide column'>
                Start date
            </div>
            <div className='three wide column'>
                End Date
            </div>
            <div className='one wide column'>
                <button
                    className='ui teal button right floated'
                    onClick={ handleAddNew }
                >
                    + Add New
                </button>
            </div>
        </div>
    )
}
function ExperienceTable({ index, company, position, responsibilities, start, end, DeleteData, updateData }) {
    console.log(company + ', ' + position + ', ' + responsibilities + ', ' + start + ', ' + end);
    const [edit, setEdit] = useState(false);

    const handleEditClick = (e) => {
        e.preventDefault();
        setEdit(true);
    }
    const handleDelete = (e) => {
        e.preventDefault();
        DeleteData(index);
    }
    const handleUpdateExperience = (companyUpdate, positionUpdate, responsibilitiesUpdate, startUpdate, endUpdate) => {        
        updateData(index, companyUpdate, positionUpdate, responsibilitiesUpdate, startUpdate, endUpdate);
        setEdit(false);
    }
    
    if (edit === true) {
        return (
            <UpdateExperienceForm
                key={index}
                index={index}
                company={company}
                position={position}
                responsibilities={responsibilities}
                start={start}
                end={end}
                updateData={handleUpdateExperience}
                cancelData={() => { setEdit(false) } }                
            />
        )  
    }
    else {
        return (
            <div className='row'>
                <div className='two wide column'>
                    {company}
                </div>
                <div className='three wide column'>
                    {position}
                </div>
                <div className='three wide column'>
                    {responsibilities}
                </div>
                <div className='three wide column'>
                    {start}
                </div>
                <div className='three wide column'>
                    {end}
                </div>
                <div className='one wide column'>
                    <div className='row right floated'>
                        <i className='pencil icon'
                            onClick={ handleEditClick }                            
                        >
                        </i>
                        <i className='close icon'
                            onClick={handleDelete}
                        >
                        </i>
                    </div>
                </div>
            </div>
        )
    }
}
function UpdateExperienceForm({ index, company, position, responsibilities, start, end, updateData, cancelData }) {
    const [newCompany, setNewCompany] = useState(company);
    const [newPosition, setNewPosition] = useState(position);
    const [newStart, setNewStart] = useState(moment(start));
    const [newEnd, setNewEnd] = useState(moment(end));   
    const [newResponsibilities, setNewResponsibilities] = useState(responsibilities);

    const handleUpdate = (e) => {
        e.preventDefault();
        updateData(newCompany, newPosition, newResponsibilities, newStart, newEnd)
    }
    const handleCancel = (e) => {
        e.preventDefault();
        cancelData();
    }

    return (
        <div className='row'>
            <div className='eight wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Company"
                    name="Company"
                    value={newCompany}
                    controlFunc={(e) => {
                        setNewCompany(e.target.value);
                    }}
                    maxLength={10}
                    placeholder="Company"
                    errorMessage="Please enter a valid company name"
                />
            </div>
            <div className='eight wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Position"
                    name="Position"
                    value={newPosition}
                    controlFunc={(e) => {
                        setNewPosition(e.target.value);
                    }}
                    maxLength={30}
                    placeholder="Position"
                    errorMessage="Please enter a valid position name"
                />
            </div>
            <div className='eight wide column'>
                <div className="field">
                    <label>Start date</label>
                    <DatePicker
                        selected={newStart}
                        onChange={(date) => setNewStart(date)}
                        minDate={moment()}
                    />
                </div>
            </div>
            <div className='eight wide column'>
                <div className="field">
                    <label>Start date</label>
                    <DatePicker
                        selected={newEnd}
                        onChange={(date) => setNewEnd(date)}
                        minDate={moment()}
                    />
                </div>
            </div>
            <div className='sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Responsibilities"
                    name="Responsibilities"
                    value={newResponsibilities}
                    controlFunc={(e) => {
                        setNewResponsibilities(e.target.value);
                    }}
                    maxLength={50}
                    placeholder="Responsibilities"
                    errorMessage="Please enter a valid values"
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
function AddExperienceForm({ handleAddNewExperience, handleCancelNewForm }) {
    const [newCompany, setNewCompany] = useState('');
    const [newPosition, setNewPosition] = useState('');
    const [newResponsibilities, setNewResponsibilities] = useState('');
    //const [newStart, setNewStart] = useState(null);
    //const [newEnd, setNewEnd] = useState(null);    
    const [newStart, setNewStart] = useState(moment());
    const [newEnd, setNewEnd] = useState(moment());    

    const handleAdd = (e) => {
        e.preventDefault();
        handleAddNewExperience(newCompany, newPosition, newResponsibilities, newStart, newEnd);
        handleCancelNewForm();
    }
    const handleStartDate = (date) => {
        setNewStart(date);
        //console.log(date.format('DD/MM/YYYY'))        
    }
    const handleEndDate = (date) => {
        setNewEnd(date);
        //console.log(date.format('DD/MM/YYYY'))
    }
    const handleClose = (e) => {
        e.preventDefault();
        handleCancelNewForm();
    }
    return (
        <div className='row'>
            <div className='eight wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Company"
                    name="Company"
                    value={newCompany}
                    controlFunc={(e) => {
                        setNewCompany(e.target.value);
                    }}
                    maxLength={30}
                    placeholder="Company"
                    errorMessage="Please enter a valid company name"
                />
            </div>
            <div className='eight wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Position"
                    name="Position"
                    value={newPosition}
                    controlFunc={(e) => {
                        setNewPosition(e.target.value);
                    }}
                    maxLength={30}
                    placeholder="Position"
                    errorMessage="Please enter a valid position name"
                />
            </div>
            <div className='eight wide column'>
                <div className="field">
                    <label>Start date</label>
                    <DatePicker
                        selected={newStart}
                        //onChange={(date) => setNewStart(date)}
                        onChange={handleStartDate }
                        formatDate="dd/MM/yyy"
                        //minDate={moment()}
                    />
                </div>
            </div>
            <div className='eight wide column'>
                <div className="field">
                    <label>End date</label>
                    <DatePicker
                        selected={newEnd}
                        //onChange={(date) => setNewEnd(date)}
                        onChange={handleEndDate}
                        formatDate="dd/MM/yyy"
                        //minDate={moment()}
                    />
                </div>
            </div>
            <div className='sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Responsibilities"
                    name="Responsibilities"
                    value={newResponsibilities}
                    controlFunc={(e) => {
                        setNewResponsibilities(e.target.value);
                    }}
                    maxLength={50}
                    placeholder="Responsibilities"
                    errorMessage="Please enter a valid values"
                />
            </div>
            <div className='eight wide column'>
                <div className='row'>
                    <button
                        className='ui teal button'
                        onClick={ handleAdd }
                    >
                        Add
                    </button>
                    <button
                        className='ui primary basic button'
                        onClick={ handleClose }
                    >
                        Cancel
                    </button>
                </div>
            </div>

        </div>
    )
}