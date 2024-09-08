import React, { useEffect, useState } from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import moment from 'moment';
import DatePicker from 'react-datepicker';

const visaValues = [
    {
        key: 1,
        value: 'Citizen',
        text: 'Citizen'
    },
    {
        key: 2,
        value: 'Permanent Resident',
        text: 'Permanent Resident'
    },
    {
        key: 3,
        value: 'Work Visa',
        text: 'Work Visa'
    },
    {
        key: 4,
        value: 'Student Visa',
        text: 'Student Visa'
    },
]
const spacer = (<span>&nbsp;</span>);

export default function VisaStatus({ visaStatus, visaExpiryDate, updateProfileData, saveProfileData }) {
    const [visa, setVisa] = useState(visaStatus);
    const [visaExpiry, setVisaExpiry] = useState(moment(visaExpiryDate));
    const [dateShow, setDateShow] = useState(false);

    const checkVisa = (valuetype) => {
        if (valuetype === 'Citizen' || valuetype === 'Permanent Resident') {
            setDateShow(false);
        } else {
            setDateShow(true);
        }
    }
    useEffect(
        () => {
            setVisa(visaStatus);
            setVisaExpiry(moment(visaExpiryDate));
            checkVisa(visaStatus);
        }, [visaStatus, visaExpiryDate]
    );
    const handleVisaSelect = (value) => {
        //const profileData = {
        //    visaStatus: value
        //}
        //updateProfileData(profileData);
        setVisa(value);
        checkVisa(value);
    }
    const handleVisaExpiryDate = (date) => {
        //const profileData = {
        //    visaExpiryDate: date
        //}
        //updateProfileData(profileData);
        setVisaExpiry(date);
    }
    const handleVisaStatusSave = (e) => {
        e.preventDefault();
        var profileData = {
            //visaStatus: visaStatus,
            //visaExpiryDate: moment(visaExpiryDate)
            visaStatus: visa,            
        }
        if (visa === 'Work Visa' || visa === 'Student Visa') {
            profileData.visaExpiryDate = moment(visaExpiry);
        }
        saveProfileData(profileData);
    }
    //let visaOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
    const visaOptions = visaValues.map((item) =>
        <option key={item.key} value={item.value}>{item.text}</option>
    );

    return (
        <div className='ui grid sixteen wide column'>
            {/*<div className='sixteen wide column'>*/}
            <div className='three column row'>
                <div className='ui four wide column'>
                    <div className="field">
                        <label>Visa type</label>
                        <select className="ui right labeled dropdown"
                            value={visa}//value={visaStatus}
                            onChange={(e) => handleVisaSelect(e.target.value)}
                            name="Visa Status"
                        >
                            {visaOptions}
                        </select>
                    </div>
                </div>
                {dateShow ?
                    <div className='ui four wide column'>
                        <div className="field">
                            <label>Visa expiry date</label>
                            <DatePicker
                                selected={visaExpiry}
                                onChange={
                                    handleVisaExpiryDate
                                    //(date) => setVisaExpiry(date)
                                }
                            />
                        </div>
                    </div> :
                    false
                }
                <div className='ui four wide column'>
                    <div className="field">
                        <label >
                            {spacer}
                        </label>
                        <button
                            className='ui teal button'
                            onClick={handleVisaStatusSave }
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


//export default function VisaStatus({ visaStatus, visaExpiryDate, updateProfileData, saveProfileData }) {
//    const [visa, setVisa] = useState(visaStatus);
    
//    //const [visaExpiry, setVisaExpiry] = useState(date);
//    const newDate = moment(visaExpiryDate);
    
//    const [visaExpiry, setVisaExpiry] = useState(newDate);
//    const [dateShow, setDateShow] = useState(false);
    
//    const checkVisa = (valuetype) => {
//        if (valuetype === 'Citizen' || valuetype === 'Permanent Resident') {
//            setDateShow(false);
//        } else {
//            setDateShow(true);
//        }
//    }
//    useEffect(
//        () => {
//            checkVisa(visa);
//        }, []
//    );
//    const handleVisaSelect = (value) => {        
//        setVisa(value);       
//        checkVisa(value);
//    }
//    const handleVisaExpiryDate = (date) => {
//        setVisaExpiry(date);
//    }
//    //let visaOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
//    const visaOptions = visaValues.map((item) => 
//        <option key={item.key} value={item.value}>{item.text}</option>
//    );

//    return (
//        <div className='ui grid sixteen wide column'>
//            {/*<div className='sixteen wide column'>*/}
//            <div className='three column row'>
//                <div className='ui four wide column'>
//                    <div className="field">
//                        <label>Visa type</label>
//                        <select className="ui right labeled dropdown"
//                            value={visa}
//                            onChange={(e) => handleVisaSelect(e.target.value)}
//                            name="Visa Status"                    
//                        >
//                            {visaOptions}
//                        </select>
//                    </div>
//                </div>
//                {dateShow ?
//                    <div className='ui four wide column'>
//                        <div className="field">
//                            <label>Visa expiry date</label>
//                            <DatePicker
//                                selected={visaExpiry}
//                                onChange={(date) => setVisaExpiry(date)}
//                            />
//                        </div>
//                    </div> :
//                    false
//                }
//                <div className='ui four wide column'>
//                    <div className="field">                    
//                        <label >
//                            { spacer}
//                        </label>
//                        <button className='ui teal button'>Save
//                        </button>
//                    </div>
//                </div>
//            </div>
//        </div>
//    )
//}
