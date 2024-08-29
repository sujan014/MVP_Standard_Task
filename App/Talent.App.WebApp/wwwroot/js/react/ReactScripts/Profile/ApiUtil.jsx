import Cookies from 'js-cookie';
import axios from 'axios';

const getApiCall = (url, callbackUseState) => {
    var cookies = Cookies.get('talentAuthToken');
    axios
        .get(
            url,
            {
                headers: {
                    'authorization': 'bearer ' + cookies,
                    'content-type': 'application/json'
                }
            }
        )
        .then((response) => {
            if (response.status === 200) {                
                var tempData = response.data.data;                                                                
                callbackUseState(tempData);
            } else {                
                TalentUtil.notification.show(`Error Status: ${response.status}`, "error", null, null);
            }
        })
        .catch(error => {            
            TalentUtil.notification.show("Error getting data", "error", null, null);
        })
}

const postApiCall = (url, data, callbackUseState) => {
    //console.table(data);
    var cookies = Cookies.get('talentAuthToken');
    axios
        .post(
            url,
            data,
            {
                headers: {
                    'authorization': 'bearer ' + cookies,
                    'content-type': 'application/json'
                }
            }
        )
        .then((response) => {            
            if (response.status === 200) {
                var tempData = response.data.data;
                TalentUtil.notification.show("Data updated sucessfully", "success", null, null);
                callbackUseState(tempData);                                
            } else {
                TalentUtil.notification.show(`Error Status: ${response.status}`, "error", null, null);
            }
        })
        .catch(error => {            
            TalentUtil.notification.show("Error updating data", "error", null, null);
        })
}

const savePhoto = (url, file) => {
    var cookies = Cookies.get('talentAuthToken');
    var formData = new FormData();
    formData.append("file", file, file.name);

    axios
        .post(
            url,    //savePhotoUrl,
            formData,
            {
                headers: {
                    'authorization': 'bearer ' + cookies,
                    'content-type': 'multipart/form-data'
                }
            }
        )
        .then((response) => {
            if (response.status === 200) {
                if (response.data.success) {
                    TalentUtil.notification.show("Profile photo updated sucessfully", "success", null, null);
                }
                else {
                    TalentUtil.notification.show("Profile photo update unsuccessfull", "error", null, null);
                }
            } else {
                TalentUtil.notification.show("Profile photo update unsuccessfull", "error", null, null);
            }
        })
        .catch((error) => {
            TalentUtil.notification.show("Profile photo update unsuccessfull. Axios post error", "error", null, null);
        })
}
export { getApiCall, postApiCall, savePhoto };