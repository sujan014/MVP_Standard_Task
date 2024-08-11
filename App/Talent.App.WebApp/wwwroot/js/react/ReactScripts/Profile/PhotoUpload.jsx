/* Photo upload section */
import React, { Component, useState } from 'react';
import Cookies from 'js-cookie';
import { Image } from 'semantic-ui-react';

//export default class PhotoUpload extends Component {
//    constructor(props) {
//        super(props);
//    };

//    render() {
//    }
//}

export default function PhotoUpload({ imageId, updateProfileData, savePhotoUrl }) {
    const [imageFile, setImageFile] = useState();
    const handleFileSelect = (event) => {
        var photoId = event.target.files[0];
        setImageFile(URL.createObjectURL(photoId));
        console.log(`${photoId.name}, ${photoId.type}, ${photoId.size}`);        
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
                <Image
                    src={imageFile}
                    size='small'
                    circular
                />                
            </div>
        </div>                    
    )
}