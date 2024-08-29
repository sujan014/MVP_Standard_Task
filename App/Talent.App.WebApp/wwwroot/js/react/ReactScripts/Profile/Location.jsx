import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Button } from 'semantic-ui-react';

const countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

export function Address({ address, updateProfileData, saveProfileData }) {    
    
    const [newNumber, setNewNumber] = useState(address.number);
    const [newStreet, setNewStreet] = useState(address.street);
    const [newSuburb, setNewSuburb] = useState(address.suburb);
    const [newCountry, setNewCountry] = useState(address.country);
    const [newCity, setNewCity] = useState(address.city);
    const [newPostCode, setNewPostCode] = useState(address.postCode);
    const [editAddress, setEditAddress] = useState(false);
    const [countryEdit, setCountryEdit] = useState(false);            

    useEffect(() => {        
        setNewNumber(address.number);
        setNewStreet(address.street);
        setNewSuburb(address.suburb);
        setNewCountry(address.country);
        setNewCity(address.city);
        setNewPostCode(address.postCode);
    }, [address.number, address.street, address.suburb, address.country, address.city, address.postCode]);    

    const handleCountrySelect = (e) => {
        var data = e.target.value;
        e.preventDefault();
        setCountryEdit(true);
        setNewCountry(data);
        var popCities = Countries[data].map((x) => (<option key={x} value={x}> {x}</option>));
    }
    const handleCitySelect = (e) => {
        //console.log('city: ' + e.target.value);
        setNewCity(e.target.value);
    }
    const handleNewNumber = (e) => {
        setNewNumber(e.target.value);
    }
    const handleNewStreet = (e) => {
        //console.log('street: ' + e.target.value);
        setNewStreet(e.target.value);
    }
    const handleNewSuburb = (e) => {
        setNewSuburb(e.target.value);
    }
    const handleNewPostCode = (e) => {
        setNewPostCode(e.target.value);
    }
    const handleAddressSave = (e) => {
        e.preventDefault();
        var profileData = {
            address: {
                number: newNumber,
                street: newStreet,
                suburb: newSuburb,
                city: newCity,
                country: newCountry,
                postCode: parseInt(newPostCode),
            }
        }        
        saveProfileData(profileData);
        setEditAddress(false);
    }
    const handleAddresEditCancel = (e) => {
        e.preventDefault();
        setEditAddress(false);
    }
    if (editAddress === false) {
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {newNumber} {newStreet} {newSuburb}</p>
                        <p>City: {newCity}</p>
                        <p>Country: {newCountry}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={() => setEditAddress(true)}>Edit</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className='ui grid'>
                <div className='row'>
                    <div className='five wide column'>
                        <ChildSingleInput
                            inputType="text"
                            label="Number"
                            name="number"
                            value={newNumber}
                            //controlFunc={(e) => setNumber(e.target.value)}
                            controlFunc = { handleNewNumber }
                            maxLength={10}
                            placeholder="1A"
                            errorMessage="Please enter a valid house number"
                        />
                    </div>
                    <div className='six wide column'>
                        <ChildSingleInput
                            inputType="text"
                            label="Street"
                            name="street"
                            value={newStreet}
                            controlFunc={handleNewStreet}
                            maxLength={50}
                            placeholder="Street name"
                            errorMessage="Please enter a valid house number"
                            />
                    </div>
                    <div className='five wide column'>
                        <ChildSingleInput
                            inputType="text"
                            label="Suburb"
                            name="suburb"
                            value={newSuburb}
                            controlFunc={handleNewSuburb}
                            maxLength={30}
                            placeholder="Suburb"
                            errorMessage="Please enter a valid house number"
                        />
                    </div>
                </div>  
                <div className='row'>
                    <div className='five wide column field'>
                        <label>Country</label>
                        <select className="ui right labeled dropdown"
                            placeholder="Country"
                            value={newCountry}
                            onChange={ handleCountrySelect }
                            name="country">

                            <option value="">Select a country</option>
                            {countriesOptions}                            
                        </select>
                    </div>                    
                        {
                            countryEdit ?
                            <div className='five wide column field'>
                                    <label>City</label>
                                    <span>
                                        <select
                                            className="ui dropdown"
                                            placeholder="City"
                                            value={newCity}                                            
                                            onChange={handleCitySelect}
                                            name="city"
                                        >
                                            <option value="0"> Select a town or city</option>
                                            {Countries[newCountry].map((x, index) => (<option key={index} value={x}> {x}</option>))}
                                        </select>
                                        <br />
                                    </span>
                                </div>:
                            ' '}                    
                    <div className='five wide column'>
                        <ChildSingleInput
                            inputType="number"
                            label="Post Code"
                            name="Post Code"
                            value={newPostCode}
                            controlFunc={handleNewPostCode}
                            maxLength={10}
                            placeholder="Postal code"
                            errorMessage="Please enter a valid postal code"
                        />
                    </div>
                </div>
                <div className='row'>
                    <Button
                        className='two wide column secondary'
                        onClick={handleAddressSave }
                    >
                        Save
                    </Button>
                    <Button
                        className='two wide column'
                        onClick={handleAddresEditCancel }
                    >
                        Cancel
                    </Button>
                </div>                                    
            </div>
        )
    }
}

export function Nationality({ nationalityData, saveProfileData }) {

    //const nationProps = nationalityData ? nationalityData : '';    
    const [newNationality, setNewNationality] = useState(nationalityData);

    useEffect(() => {
        setNewNationality(nationalityData);
    }, [nationalityData]);

    const handleNationality = (e) => {
        e.preventDefault();        
        setNewNationality(e.target.value);        
    }
    const handleSaveNationality = (e) => {
        e.preventDefault();
        
        var profileData = {
            nationality: newNationality
        }        
        // save data also here
        saveProfileData(profileData);
    }
    //let countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

    return (
        <div className='ui grid sixteen wide column'>
            <div className='two column row'>
                <div className='six wide column'>                
                    <select className=" ui right labeled dropdown column"
                        value={newNationality}
                        onChange={
                            handleNationality
                            //(e) => handleNationality(e.target.value)
                        }
                        name="country">
                        <option value="">Select a country</option>
                        {countriesOptions}
                    </select>
                </div>
                <div className='ten wide column'>
                    <div className='row'>
                        <Button                                
                            className="ui right floated teal button"
                            onClick={handleSaveNationality}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
