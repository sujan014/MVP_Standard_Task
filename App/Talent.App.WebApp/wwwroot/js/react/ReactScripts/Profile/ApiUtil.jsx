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
            console.log('response');
            console.log(response);
            if (response.status === 200) {
                //TalentUtil.notification.show("Language updated sucessfully", "success", null, null);
                var tempData = response.data.data;
                //console.table(tempData);
                //var mapData = tempData.map((lang) => ({
                //    id: lang.id,
                //    currentUserId: lang.currentUserId,
                //    name: lang.name,
                //    level: lang.level,
                //    //editState: false
                //}));
                console.log('API CALL DATA');
                console.table(tempData);
                callbackUseState(tempData);
            } else {
                console.log('Get Language unsuccessful');
                //TalentUtil.notification.show("Language update unsuccessfull", "error", null, null);
            }
        })
        .catch(error => {
            console.log('error: ' + error);
            TalentUtil.notification.show("Error getting language", "error", null, null);
        })
}

const postApiCall = (url, data, callbackUseState) => {
    console.table(data);

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
            console.log('response');
            console.log(response);
            if (response.status === 200) {
                TalentUtil.notification.show("Language updated sucessfully", "success", null, null);
                var tempData = response.data.data;
                console.table(tempData);                
                callbackUseState(tempData);
                //setLanguages(mapData);
                // to update the values, reloaded value must be passed to the state in the parent component.
                // It cannot be directly changed from the child component.
            } else {
                TalentUtil.notification.show("Language update unsuccessfull", "error", null, null);
            }
        })
        .catch(error => {
            console.log('error: ' + error);
            TalentUtil.notification.show("Error updating language", "error", null, null);
        })
}

export { getApiCall, postApiCall };