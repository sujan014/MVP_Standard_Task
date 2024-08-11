import React, { Component, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Location } from '../Employer/CreateJob/Location.jsx';

export function IndividualDetailSection({ saveProfileData, details }) {
    const [userDetails, setUserDetails] = useState(details);
    const [edit, setEdit] = useState(false);
    useEffect(() => {
        setUserDetails(details);
        console.table(details);        
    }, [details]);
    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(true);
    }
    const handleSaveDetails = (firstNameEdit, lastNameEdit, emailEdit, phoneEdit) => {        
        console.log(`${firstNameEdit}, ${lastNameEdit}, ${emailEdit}, ${phoneEdit}`);
        const profileData = {
            firstName: firstNameEdit,
            lastName: lastNameEdit,
            email: emailEdit,
            phone: phoneEdit
        }
        saveProfileData(profileData);
        setEdit(false);
    }
    const handleCancelEdit = () => {
        setEdit(false);
    }
    
    if (edit) {
        return (
            <EditDetail
                userDetails={userDetails}
                saveDetails={handleSaveDetails}
                cancelEdit={handleCancelEdit}
            />
        )
    }
    else {
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Name: {userDetails.firstName} {userDetails.lastName}</p>
                        <p>Email: {userDetails.email}</p>
                        <p>Phone: {userDetails.phone}</p>
                    </React.Fragment>
                    <button
                        type="button"
                        className="ui right floated teal button"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                </div>
            </div>
        )
    }
}

function EditDetail({ userDetails, saveDetails, cancelEdit }) {
    const [firstName, setFirstName] = useState(userDetails.firstName);
    const [lastName, setLastName] = useState(userDetails.lastName);
    const [email, setEmail] = useState(userDetails.email);
    const [phone, setPhone] = useState(userDetails.phone);

    const handleSave = (e) => {
        e.preventDefault();
        saveDetails(firstName, lastName, email, phone);
    }
    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }
    const handleLastName = (e) => {
        setLastName(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePhone = (e) => {
        setPhone(e.target.value);
    }
    return (
        <div className='ui sixteen wide column'>
            <ChildSingleInput
                inputType="text"
                label="First Name"
                name="firstName"
                value={firstName}
                controlFunc={handleFirstName}
                maxLength={80}
                placeholder="Enter your first name"
                errorMessage="Please enter a valid first name"
            />
            <ChildSingleInput
                inputType="text"
                label="Last Name"
                name="lastName"
                value={lastName}
                controlFunc={handleLastName}
                maxLength={80}
                placeholder="Enter your last name"
                errorMessage="Please enter a valid last name"
            />
            <ChildSingleInput
                inputType="text"
                label="Email address"
                name="email"
                value={email}
                controlFunc={handleEmail}
                maxLength={80}
                placeholder="Enter an email"
                errorMessage="Please enter a valid email"
            />

            <ChildSingleInput
                inputType="text"
                label="Phone number"
                name="phone"
                value={phone}
                controlFunc={handlePhone}
                maxLength={12}
                placeholder="Enter a phone number"
                errorMessage="Please enter a valid phone number"
            />

            <button
                type="button"
                className="ui teal button"
                onClick={handleSave}
            >
                Save
            </button>
            <button
                type="button"
                className="ui button"
                onClick={cancelEdit}
            >
                Cancel
            </button>
        </div>
    )    

}
//export class IndividualDetailSection extends Component {
//    constructor(props) {
//        super(props)

//        const details = props.details ?
//            Object.assign({}, props.details)
//            : {
//                firstName: "",
//                lastName: "",
//                email: "",
//                phone: ""
//            }

//        this.state = {
//            showEditSection: false,
//            newContact: details
//        }

//        this.openEdit = this.openEdit.bind(this)
//        this.closeEdit = this.closeEdit.bind(this)
//        this.handleChange = this.handleChange.bind(this)
//        this.saveContact = this.saveContact.bind(this)
//        this.renderEdit = this.renderEdit.bind(this)
//        this.renderDisplay = this.renderDisplay.bind(this)
//    }

//    openEdit() {
//        const details = Object.assign({}, this.props.details)
//        this.setState({
//            showEditSection: true,
//            newContact: details
//        })
//    }

//    closeEdit() {
//        this.setState({
//            showEditSection: false
//        })
//    }

//    handleChange(event) {
//        const data = Object.assign({}, this.state.newContact)
//        data[event.target.name] = event.target.value
//        this.setState({
//            newContact: data
//        })
//    }

//    saveContact() {
//        console.log(this.props.componentId)
//        console.log(this.state.newContact)
//        const data = Object.assign({}, this.state.newContact)
//        this.props.controlFunc(this.props.componentId, data)
//        this.closeEdit()
//    }

//    render() {
//        return (
//            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
//        )
//    }

//    renderEdit() {
//        return (
//            <div className='ui sixteen wide column'>
//                <ChildSingleInput
//                    inputType="text"
//                    label="First Name"
//                    name="firstName"
//                    value={this.state.newContact.firstName}
//                    controlFunc={this.handleChange}
//                    maxLength={80}
//                    placeholder="Enter your first name"
//                    errorMessage="Please enter a valid first name"
//                />
//                <ChildSingleInput
//                    inputType="text"
//                    label="Last Name"
//                    name="lastName"
//                    value={this.state.newContact.lastName}
//                    controlFunc={this.handleChange}
//                    maxLength={80}
//                    placeholder="Enter your last name"
//                    errorMessage="Please enter a valid last name"
//                />
//                <ChildSingleInput
//                    inputType="text"
//                    label="Email address"
//                    name="email"
//                    value={this.state.newContact.email}
//                    controlFunc={this.handleChange}
//                    maxLength={80}
//                    placeholder="Enter an email"
//                    errorMessage="Please enter a valid email"
//                />

//                <ChildSingleInput
//                    inputType="text"
//                    label="Phone number"
//                    name="phone"
//                    value={this.state.newContact.phone}
//                    controlFunc={this.handleChange}
//                    maxLength={12}
//                    placeholder="Enter a phone number"
//                    errorMessage="Please enter a valid phone number"
//                />

//                <button
//                    type="button"
//                    className="ui teal button"
//                    onClick={this.saveContact}
//                >
//                    Save
//                </button>
//                <button
//                    type="button"
//                    className="ui button"
//                    onClick={this.closeEdit}
//                >
//                    Cancel
//                </button>
//            </div>
//        )
//    }

//    renderDisplay() {

//        let fullName = this.props.details ? `${this.props.details.firstName} ${this.props.details.lastName}` : ""
//        let email = this.props.details ? this.props.details.email : ""
//        let phone = this.props.details ? this.props.details.phone : ""

//        return (
//            <div className='row'>
//                <div className="ui sixteen wide column">
//                    <React.Fragment>
//                        <p>Name: {fullName}</p>
//                        <p>Email: {email}</p>
//                        <p>Phone: {phone}</p>
//                    </React.Fragment>
//                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
//                </div>
//            </div>
//        )
//    }
//}


export class CompanyDetailSection extends Component {
    constructor(props) {
        super(props)

        const details = props.details ?
            Object.assign({}, props.details)
            : {
                name: "",
                email: "",
                phone: ""
            }

        this.state = {
            showEditSection: false,
            newContact: details
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    openEdit() {
        const details = Object.assign({}, this.props.details)
        this.setState({
            showEditSection: true,
            newContact: details
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newContact)
        data[event.target.name] = event.target.value
        this.setState({
            newContact: data
        })
    }

    saveContact() {
        const data = Object.assign({}, this.state.newContact)
        this.props.controlFunc(this.props.componentId, data)
        this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        let location = { city: '', country: '' }
        if (this.state.newContact && this.state.newContact.location) {
            location = this.state.newContact.location
        }

        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Name"
                    name="name"
                    value={this.state.newContact.name}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your last name"
                    errorMessage="Please enter a valid name"
                />
                <ChildSingleInput
                    inputType="text"
                    label="Email address"
                    name="email"
                    value={this.state.newContact.email}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter an email"
                    errorMessage="Please enter a valid email"
                />

                <ChildSingleInput
                    inputType="text"
                    label="Phone number"
                    name="phone"
                    value={this.state.newContact.phone}
                    controlFunc={this.handleChange}
                    maxLength={12}
                    placeholder="Enter a phone number"
                    errorMessage="Please enter a valid phone number"
                />
                Location:
                <Location location={location} handleChange={this.handleChange} />
                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {

        let companyName = this.props.details ? this.props.details.name : ""
        let email = this.props.details ? this.props.details.email : ""
        let phone = this.props.details ? this.props.details.phone : ""
        let location = {city:'',country:''}
        if (this.props.details && this.props.details.location) {
            location = this.props.details.location
        }

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Name: {companyName}</p>
                        <p>Email: {email}</p>
                        <p>Phone: {phone}</p>
                        <p> Location: {location.city}, {location.country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}
