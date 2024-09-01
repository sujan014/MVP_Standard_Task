/* Photo upload section */
import React, { Component, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Button, Icon, Image } from 'semantic-ui-react';
import axios from 'axios';
import default_picture from '../../../../images/no-image.png';
import { savePhoto } from './ApiUtil.jsx';

export default function PhotoUpload({ imageId, updateProfileData, savePhotoUrl }) {
    const [profileUrl, setProfileUrl] = useState(imageId);
    const [newProfile, setNewProfile] = useState('');
    const [newImage, setNewImage] = useState('');
    const [selectImage, setSelectImage] = useState(false);
    
    useEffect(() => {
        setProfileUrl(imageId);
    }, [imageId]);

    const handleFileSelect = (event) => {
        var photoId = event.target.files[0];        
        setNewProfile(photoId);
        setNewImage(URL.createObjectURL(photoId));
        setSelectImage(true);
    }
    const handleSavePhoto = (event) => {
        event.preventDefault();
        if (!selectImage) {
            TalentUtil.notification.show(`New profile picture not selected.`, "error", null, null);
            return;
        }
        //savePhoto(newProfile);
        savePhoto(
            savePhotoUrl,
            newProfile
        );
    }
    const handleReloadPhoto = (event) => {
        event.preventDefault();
        setSelectImage(false);
        getPhoto();
    }
        
    return (
        <div className="ui grid">
            <div className='ui ten wide column'>
                <input
                    type='file'
                    onChange={handleFileSelect}
                />
            </div>
            <div className='ui six wide column'>

                {selectImage ?
                    <img
                        src={newImage}
                        style={{
                            maxWidth: "200px",
                            maxHeight: "200px",
                            width: 'auto',
                            height: 'auto',
                            borderRadius: '50%'
                        }}
                    /> :
                    <img
                        src={profileUrl}
                        style={{
                            maxWidth: "200px",
                            maxHeight: "200px",
                            width: 'auto',
                            height: 'auto',
                            borderRadius: '50%'
                        }}
                    />
                }                
            </div>
            <div className='ui sixteen wide column'>
                <Button
                    className='teal float right'
                    onClick={handleSavePhoto}
                >
                    <Icon name='upload' />
                    Upload
                </Button>                
            </div>
        </div>
    )
}
