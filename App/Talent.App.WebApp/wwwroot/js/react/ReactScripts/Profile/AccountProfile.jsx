import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import SocialMediaLinkedAccount from './SocialMediaLinkedAccount.jsx';
import { IndividualDetailSection } from './ContactDetail.jsx';
import FormItemWrapper from '../Form/FormItemWrapper.jsx';
import { Address, Nationality } from './Location.jsx';
import Language from './Language.jsx';
import Skill from './Skill.jsx';
import Education from './Education.jsx';
import Certificate from './Certificate.jsx';
import VisaStatus from './VisaStatus.jsx'
import PhotoUpload from './PhotoUpload.jsx';
import VideoUpload from './VideoUpload.jsx';
import CVUpload from './CVUpload.jsx';
import SelfIntroduction from './SelfIntroduction.jsx';
import Experience from './Experience.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import { LoggedInNavigation } from '../Layout/LoggedInNavigation.jsx';
import TalentStatus from './TalentStatus.jsx';
import moment from 'moment';
import axios from 'axios';
import { getApiCall, postApiCall } from './ApiUtil.jsx';

export default class AccountProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            profileData: {
                id: '',
                summary: '',
                description: '',
                address: {
                    number: '',
                    street: '',
                    suburb: '',
                    city: '',
                    country: '',
                    postCode: 0, // Check inputs related to this field.
                },
                nationality: '',
                education: [],
                languages: [],
                skills: [],
                experience: [],
                certifications: [],
                visaStatus: '',//'Student Visa',
                visaExpiryDate: moment(),//'',new Date(),//
                //profilePhoto: '',
                linkedAccounts: {
                    linkedIn: "",
                    github: "",                    
                },
                jobSeekingStatus: "",
                //jobSeekingStatus: {
                //    status: "",
                //    availableDate: moment()
                //},
                firstName: '',
                middleName: '',
                lastName: '',
                gender: '',
                email: '',
                phone: '',
                isPhoneVerified: true,
                profilePhotoUrl: '',
                profilePhoto: '',
                videoName: '',
                videoUrl: '',
                cvName: '',
                cvUrl: '',
            },
            loaderData: loaderData,

        }

        this.updateWithoutSave = this.updateWithoutSave.bind(this)
        this.updateAndSaveData = this.updateAndSaveData.bind(this)
        this.updateForComponentId = this.updateForComponentId.bind(this)
        this.saveProfile = this.saveProfile.bind(this)
        this.loadData = this.loadData.bind(this)
        this.init = this.init.bind(this);
        this.removeNulls = this.removeNulls.bind(this);
    };

    init() {
        let loaderData = this.state.loaderData;
        loaderData.allowedUsers.push("Talent");
        loaderData.isLoading = false;
        this.setState({ loaderData, })        
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {        
        var cookies = Cookies.get('talentAuthToken');
        //$.ajax({
        //    url: 'http://localhost:60290/profile/profile/getTalentProfile',
        //    headers: {
        //        'Authorization': 'Bearer ' + cookies,
        //        'Content-Type': 'application/json'
        //    },
        //    type: "GET",
        //    success: function (res) {
        //        console.log('RES');
        //        console.log(res);
        //        console.log('Response data');
        //        console.log(res.data);
        //        this.updateWithoutSave(res.data)
        //    }.bind(this)
        //})
        getApiCall(
            //'http://localhost:60290/profile/profile/getTalentProfile',
            'https://module1talent-cnfucbdcave3ccgq.australiaeast-01.azurewebsites.net/profile/profile/getTalentProfile',
            this.updateWithoutSave
        );
        this.init()
        
    }    
    removeNulls(object) {        
        if (object.id == null) { object.id = ''};
        if (object.summary == null) { object.summary = '' };
        if (object.description == null) object.description = '';
        //if (object.address.number == null) object.address.number = '';
        //if (object.address.street == null) object.address.street = '';
        //if (object.address.suburb == null) object.address.suburb = '';
        //if (object.address.city == null) object.address.city = '';
        //if (object.address.country == null) object.address.country = '';
        //if (object.address.postCode == null) object.address.postCode = 0;
        if (object.nationality == null) object.nationality = '';
        if (object.visaStatus == null) object.visaStatus = '';
        if (object.visaExpiryDate == null) object.visaExpiryDate = moment();
        if (object.profilePhoto == null) object.profilePhoto = '';
        if (object.profilePhotoUrl == null) object.profilePhotoUrl = '';
        //if (object.linkedAccounts.linkedIn == null) object.linkedAccounts.linkedIn = '';
        //if (object.linkedAccounts.github == null) object.linkedAccounts.github = '';
        if (object.jobSeekingStatus == null) object.jobSeekingStatus = '';        
        if (object.firstName == null) object.firstName = '';
        if (object.middleName == null) object.middleName = '';
        if (object.lastName == null) object.lastName = '';
        if (object.gender == null) object.gender = '';
        if (object.email == null) object.email = '';
        if (object.phone == null) object.phone = '';
        if (object.mobilePhone == null) object.mobilePhone = '';
        if (object.isPhoneVerified == null) object.isPhoneVerified = false;
        if (object.videoName == null) object.videoName = '';
        if (object.videoUrl == null) object.videoUrl = '';
        if (object.cvName == null) object.cvName = '';
        if (object.cvUrl == null) object.cvUrl = '';

        return object;
    }
    //updates component's state without saving data
    updateWithoutSave(newValues) {
        let filterData = this.removeNulls(newValues);
        //let newProfile = Object.assign({}, this.state.profileData, newValues)
        let newProfile = Object.assign({}, this.state.profileData, filterData)
        this.setState(
            {
                profileData: newProfile
            },
            () => {
                //console.log(`profileData: `);console.log(this.state.profileData);
            }
        )
    }

    //updates component's state and saves data
    updateAndSaveData(newValues) {        
        //let filterData = this.removeNulls(newValues);
        //let newProfile = Object.assign({}, this.state.profileData, filterData);
        let newProfile = Object.assign({}, this.state.profileData, newValues);        
        this.setState({
            profileData: newProfile
        }, this.saveProfile)
    }

    updateForComponentId(componentId, newValues) {
        this.updateAndSaveData(newValues)
    }

    saveProfile() {        
        postApiCall(
            //'http://localhost:60290/profile/profile/updateTalentProfile',
            'https://module1talent-cnfucbdcave3ccgq.australiaeast-01.azurewebsites.net/profile/profile/updateTalentProfile',
            JSON.stringify(this.state.profileData),
            () => { }
        );

        //var cookies = Cookies.get('talentAuthToken');
        //$.ajax({
        //    url: 'http://localhost:60290/profile/profile/updateTalentProfile',
        //    headers: {
        //        'Authorization': 'Bearer ' + cookies,
        //        'Content-Type': 'application/json'
        //    },
        //    type: "POST",
        //    data: JSON.stringify(this.state.profileData),
        //    success: function (res) {
        //        console.log(res)
        //        if (res.success == true) {
        //            TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
        //        } else {
        //            TalentUtil.notification.show("Profile did not update successfully", "error", null, null)

        //        }

        //    }.bind(this),
        //    error: function (res, a, b) {
        //        console.log(res)
        //        console.log(a)
        //        console.log(b)
        //    }
        //})
    }

    render() {
        const profile = {
            firstName: this.state.profileData.firstName,
            lastName: this.state.profileData.lastName,
            email: this.state.profileData.email,
            phone: this.state.profileData.phone
        }
        const profileAddress = this.state.profileData.address;        
        return (
            <BodyWrapper reload={this.loadData} loaderData={this.state.loaderData}>
                <section className="page-body">
                    <div className="ui container">
                        <div className="ui container">
                            <div className="profile">
                                <form className="ui form">
                                    <div className="ui grid">                                                                                
                                        <FormItemWrapper
                                            title='User Details'
                                            tooltip='Enter your contact details'
                                        >
                                            <IndividualDetailSection
                                                //controlFunc={this.updateForComponentId}
                                                saveProfileData={this.updateAndSaveData}
                                                details={profile}
                                                //componentId='contactDetails'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Address'
                                            tooltip='Enter your current address'>
                                            <Address
                                                address={this.state.profileData.address} //{this.state.profileData.address}
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Nationality'
                                            tooltip='select your nationality'
                                        >
                                            <Nationality
                                                nationalityData={this.state.profileData.nationality}
                                                saveProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Linked Accounts'
                                            tooltip='Linking to online social networks adds credibility to your profile'
                                        >
                                            <SocialMediaLinkedAccount
                                                linkedAccounts={this.state.profileData.linkedAccounts}
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Description'
                                            tooltip='Summary and Description about yourself.'
                                        >
                                            <SelfIntroduction
                                                summary={this.state.profileData.summary}
                                                description={this.state.profileData.description}
                                                updateProfileData={this.updateAndSaveData}
                                                updateWithoutSave={this.updateWithoutSave}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Languages'
                                            tooltip='select languages that you speak'
                                        >                                            
                                            <Language
                                                languageData={this.state.profileData.languages}
                                                updateProfileData={this.updateAndSaveData}
                                                updateWithoutSave={this.updateWithoutSave}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Skills'
                                            tooltip='List your skills'
                                        >
                                            <Skill
                                                skillData={this.state.profileData.skills}
                                                updateProfileData={this.updateAndSaveData}
                                                updateWithoutSave={this.updateWithoutSave}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Work experience'
                                            tooltip='Add your work experience'
                                        >
                                            <Experience
                                                experienceData={this.state.profileData.experience}
                                                updateProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>                                        
                                        <FormItemWrapper
                                            title='Education'
                                            tooltip='Add your educational background'
                                        >
                                            <Education
                                                educationData={this.state.profileData.education}
                                                updateProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>                                        
                                        <FormItemWrapper
                                            title='Visa Status'
                                            tooltip='What is your current Visa/Citizenship status?'
                                        >
                                            <VisaStatus
                                                //id={this.state.profileData.id}
                                                visaStatus={this.state.profileData.visaStatus}
                                                visaExpiryDate={this.state.profileData.visaExpiryDate}
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Status'
                                            tooltip='What is your current status in jobseeking?'
                                        >
                                            <TalentStatus
                                                status={this.state.profileData.jobSeekingStatus}
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Profile Photo'
                                            tooltip='Please upload your profile photo'
                                            hideSegment={true}
                                        >
                                            <PhotoUpload                                                
                                                imageId={this.state.profileData.profilePhotoUrl}
                                                updateProfileData={this.updateWithoutSave}
                                                savePhotoUrl='https://module1profile-b9cwa0hmcbbbejbk.australiaeast-01.azurewebsites.net/profile/profile/updateProfilePhoto'
                                            />
                                        </FormItemWrapper>
                                        {/*<FormItemWrapper*/}
                                        {/*    title='Certification'*/}
                                        {/*    tooltip='List your certificates, honors and awards'*/}
                                        {/*>*/}
                                        {/*    <Certificate*/}
                                        {/*        certificateData={this.state.profileData.certifications}*/}
                                        {/*        updateProfileData={this.updateAndSaveData}*/}
                                        {/*    />*/}
                                        {/*</FormItemWrapper>*/}
                                        {/*<FormItemWrapper*/}
                                        {/*    title='Profile Video'*/}
                                        {/*    tooltip='Upload a brief self-introduction video'*/}
                                        {/*    hideSegment={true}*/}
                                        {/*>*/}
                                        {/*    <VideoUpload*/}
                                        {/*        videoName={this.state.profileData.videoName}*/}
                                        {/*        updateProfileData={this.updateWithoutSave}*/}
                                        {/*        saveVideoUrl={'http://localhost:60290/profile/profile/updateTalentVideo'}*/}
                                        {/*    />*/}
                                        {/*</FormItemWrapper>*/}
                                        {/*<FormItemWrapper*/}
                                        {/*    title='CV'*/}
                                        {/*    tooltip='Upload your CV. Accepted files are pdf, doc & docx)'*/}
                                        {/*    hideSegment={true}*/}
                                        {/*>*/}
                                        {/*    <CVUpload*/}
                                        {/*        cvName={this.state.profileData.cvName}*/}
                                        {/*        cvUrl={this.state.profileData.cvUrl}*/}
                                        {/*        updateProfileData={this.updateWithoutSave}*/}
                                        {/*        saveCVUrl={'http://localhost:60290/profile/profile/updateTalentCV'}*/}
                                        {/*    />*/}
                                        {/*</FormItemWrapper>*/}                                        
                                    </div>
                                </form>
                            </div >
                        </div>
                    </div>
                </section>
            </BodyWrapper>
        )
    }
}
