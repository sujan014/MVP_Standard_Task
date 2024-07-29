/* Experience section */
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import moment from 'moment';
import DatePicker from 'react-datepicker';

//export default class Experience extends React.Component {
//    constructor(props) {
//        super(props);

//    };

//    render() {


//    }
//}

export default function Experience({ experienceData, updateProfileData }) {
    const texper = experienceData.map((exper) => ({
        company: exper.company,
        position: exper.position,
        duty: exper.duty,
        startDate: exper.startDate,
        endDate: exper.endDate,        
        editState: false
    }));
    const [expernc, setExpernc] = useState(texper);
    const [experiencForm, setExperienceForm] = useState(false);

    const handleAddNewForm = () => {
        setExperienceForm(true);
    }
    const handleCancelNewForm = () => {
        setExperienceForm(false);
    }
    const handleAddNewExperience = (newCompany, newPosition, newDuty, newStartDate, newEndDate) => {
        console.log('newStartDate');console.log(newStartDate);
        console.log('newEndDate');console.log(newEndDate);
        var temp = [...expernc, {
            company: newCompany,
            position: newPosition,
            duty: newDuty,
            startDate: newStartDate.format('DD/MM/YYYY'),
            endDate: newEndDate.format('DD/MM/YYYY'),
            editState: false
        }];
        console.log(temp);
        setExpernc(temp);        
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
        let t = expernc[index];
        const newExpernc = [...expernc.slice(0, index), ...expernc.slice(index + 1)];
        setExpernc(newExpernc);
    }
    const handleUpdateExpnc = (indexUpdate, company, position, duty, startDate, endDate) => {
        const newExprnc = expernc.map((item, index) => {
            if (index === indexUpdate) {
                const qw = item;
                qw.company = company;
                qw.position = position;
                qw.duty = duty;
                qw.startDate = startDate.format('DD/MM/YYYY');
                qw.endDate = endDate.format('DD/MM/YYYY');
                qw.editState = false;
                return qw;
            }
            return item;
        });
        setExpernc(newExprnc);
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
                if (exp.editState === false) {
                    return (
                        < ExperienceTable
                            key={index}
                            company={exp.company}
                            position={exp.position}
                            duty={exp.duty}
                            startDate={exp.startDate}
                            endDate={exp.endDate}
                            editState={exp.editState}
                            EditData={handleEditExpnc}
                            DeleteData={handleDeleteExpnc}
                            //EditData={() => { handleEditExpnc(index, true) }}
                            //DeleteData={() => { handleDeleteExpnc(index) }}
                            index={index}
                        />
                    )
                } else {
                    return (
                        <UpdateExperienceForm
                            key={index}
                            company={exp.company}
                            position={exp.position}
                            duty={exp.duty}
                            startDate={exp.startDate}
                            endDate={exp.endDate}
                            editState={exp.editState}
                            updateData={handleUpdateExpnc}
                            cancelData={handleEditExpnc}
                            index={index}
                        />
                    )
                }
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
function ExperienceTable({ company, position, duty, startDate, endDate, editState, EditData, DeleteData, index  }) {
    //console.log(company + ', ' + position + ', ' + duty + ', ' + startDate + ', ' + endDate);

    if (editState === false) {
        return (
            <div className='row'>
                <div className='two wide column'>
                    {company}
                </div>
                <div className='three wide column'>
                    {position}
                </div>
                <div className='three wide column'>
                    {duty}
                </div>
                <div className='three wide column'>
                    {startDate}
                </div>
                <div className='three wide column'>
                    {endDate}
                </div>
                <div className='one wide column'>
                    <div className='row right floated'>
                        <i className='pencil icon'
                            onClick={() => EditData(index, true)}>
                        </i>
                        <i className='close icon'
                            onClick={() => DeleteData(index)}>
                        </i>
                    </div>
                </div>
            </div>
        )
    }
}
function UpdateExperienceForm({ company, position, duty, startDate, endDate, editState, updateData, cancelData, index }) {
    const [newCompany, setNewCompany] = useState(company);
    const [newPosition, setNewPosition] = useState(position);
    const [newStart, setNewStart] = useState(moment());
    const [newEnd, setNewEnd] = useState(moment());   
    const [newDuty, setNewDuty] = useState(duty);
    console.log("Update " + company);
    console.log('newStart: ' + newStart);
    console.log('newEnd: ' + newEnd);
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
                    value={newDuty}
                    controlFunc={(e) => {
                        setNewDuty(e.target.value);
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
                        onClick={() => updateData(index, newCompany, newPosition, newDuty, newStart, newEnd)}
                    >
                        Add
                    </button>
                    <button
                        className='ui primary basic button'
                        onClick={() => cancelData(index, false)}
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
    const [newDuty, setNewDuty] = useState('');
    //const [newStart, setNewStart] = useState(null);
    //const [newEnd, setNewEnd] = useState(null);    
    const [newStart, setNewStart] = useState(moment());
    const [newEnd, setNewEnd] = useState(moment());    

    const handleAdd = (e) => {
        e.preventDefault();
        handleAddNewExperience(newCompany, newPosition, newDuty, newStart, newEnd);
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
                    <label>Start date</label>
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
                    value={newDuty}
                    controlFunc={(e) => {
                        setNewDuty(e.target.value);
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