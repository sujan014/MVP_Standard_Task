import React from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Button } from 'semantic-ui-react';

//export class Address extends React.Component {
//    constructor(props) {
//        super(props)
//    }


//    render() {

//    }

//}

export function Address({ addressData, updateProfileData, saveProfileData }){
    //const  = props;
    const [edit, setEdit] = useState(false);
    const [countryEdit, setCountryEdit] = useState(false);

    const getAddress = addressData ?
        Object.assign({}, addressData)
        : {
            number: '',
            street: '',
            suburb: '',
            city: '',
            country: '',
            postCode: '',            
        }
    const [number, setNumber] = useState(getAddress.number);
    const [street, setStreet] = useState(getAddress.street);
    const [suburb, setSuburb] = useState(getAddress.suburb);
    const [city, setCity] = useState(getAddress.city);
    const [country, setCountry] = useState("Select a country");
    const [postCode, setPostCode] = useState(getAddress.postCode);

    let countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
    

    const handleCountrySelect = (data) => {
        setCountryEdit(true);
        setCountry(data);        
        console.log('selected country: ' + country);
        var popCities = Countries[data].map((x) => (<option key={x} value={x}> {x}</option>));        
    }

    if (edit === false) {
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {addressData.number} {addressData.street} {addressData.suburb}</p>
                        <p>City: {addressData.city}</p>
                        <p>Country: {addressData.country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={() => setEdit(true)}>Edit</button>
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
                            value={number}
                            controlFunc={(e) => setNumber(e.target.value)}
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
                            value={street}
                            controlFunc={(e) => setStreet(e.target.value)}
                            maxLength={10}
                            placeholder="Street name"
                            errorMessage="Please enter a valid house number"
                            />
                    </div>
                    <div className='five wide column'>
                        <ChildSingleInput
                            inputType="text"
                            label="Suburb"
                            name="suburb"
                            value={suburb}
                            controlFunc={(e) => setSuburb(e.target.value)}
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
                            value={country}
                            onChange={(e) => {
                                setCountry(e.target.value);
                                console.log(e.target.value);
                                console.log(country);                                
                                handleCountrySelect(e.target.value);
                                
                            }}
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
                                            value={city}
                                            onChange={(e, data) => setCity(data)}
                                            name="city"
                                        >
                                            <option value="0"> Select a town or city</option>
                                            {Countries[country].map((x, index) => (<option key={index} value={x}> {x}</option>))}
                                        </select>
                                        <br />
                                    </span>
                                </div>:
                            ' '}                    
                    <div className='five wide column'>
                        <ChildSingleInput
                            inputType="text"
                            label="Number"
                            name="number"
                            value={number}
                            controlFunc={(e) => setPostCode(e.target.value)}
                            maxLength={10}
                            placeholder="Postal code"
                            errorMessage="Please enter a valid postal code"
                        />
                    </div>
                </div>
                <div className='row'>
                    <Button className='two wide column secondary'>
                        Save
                    </Button>
                    <Button className='two wide column'>
                        Cancel
                    </Button>
                </div>
                    {/*<div className='five wide column'>*/}
                    {/*    <ChildSingleInput*/}
                    {/*        inputType="text"*/}
                    {/*        label="Country"*/}
                    {/*        name="country"*/}
                    {/*        value={addressData.suburb}*/}
                    {/*        controlFunc={(e) => setCountry(e.target.value)}*/}
                    {/*        placeholder="Country"*/}
                    {/*        errorMessage="Please enter city you live in."*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className='five wide column'>*/}
                    {/*    <ChildSingleInput*/}
                    {/*        inputType="text"*/}
                    {/*        label="City"*/}
                    {/*        name="city"*/}
                    {/*        value={addressData.suburb}*/}
                    {/*        controlFunc={(e) => setCity(e.target.value)}*/}
                    {/*        maxLength={30}*/}
                    {/*        placeholder="City"*/}
                    {/*        errorMessage="Please enter city you live in."*/}
                    {/*    />*/}
                    {/*</div>*/}
                
            </div>
        )
    }
}

export function Nationality({ nationalityData, saveProfileData }) {

    const nationProps = nationalityData ?
        nationalityData :
        '';
    const [nation, setNation] = useState('');

    const handleNationality = (data) => {
        setNation(data);
        // save data also here
    }

    let countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

    return (
        <div className='ui grid'>
            <div className='sixteen wide column'>
                <select className="ui right labeled dropdown"
                    value={nation}
                    onChange={ (e) => handleNationality(e.target.value) }
                    name="country">
                    <option value="">Select a country</option>
                    {countriesOptions}
                </select>
            </div>
        </div>
    )
}
//export class Nationality extends React.Component {
//    constructor(props) {
//        super(props)
       
//    }

    
//    render() {

        
//    }
//}