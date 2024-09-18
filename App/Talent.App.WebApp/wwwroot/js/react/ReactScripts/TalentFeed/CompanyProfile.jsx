import axios from 'axios';
import * as Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardMeta, Icon, Loader } from 'semantic-ui-react';

//export default class CompanyProfile extends React.Component {
//    constructor(props) {
//        super(props);
//    }

//    render() {

//    }
//}

export default function CompanyProfile() {
    const [dataLoad, setDataLoad] = useState(false);
    const [employerData, setEmployerData] = useState();

    useEffect(() => {
        setDataLoad(false);
        loadEmployerProfile();
    }, []);

    const loadEmployerProfile = () => {
        //var url = 'http://localhost:60290/profile/profile/getEmployerProfile';
        var url = 'https://module1talent-cnfucbdcave3ccgq.australiaeast-01.azurewebsites.net/profile/profile/getEmployerProfile';
        var cookies = Cookies.get('talentAuthToken');
        axios
            .get(
                //'http://localhost:60290/profile/profile/getEmployerProfile',
                'https://module1talent-cnfucbdcave3ccgq.australiaeast-01.azurewebsites.net/profile/profile/getEmployerProfile',
                {
                    headers: {
                        'authorization': 'bearer ' + cookies,
                        'content-type': 'application/json'
                    }
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    //console.log('Employer Response: ');console.log(response);
                    //console.log('Employer Response data: ');console.log(response.data.employer);
                    setEmployerData(response.data.employer);
                    setDataLoad(true);
                }
            })
            .catch(error => {
                TalentUtil.notification.show("Error fetching data", "error", null, null);
            })
    }

    return (
        <Card>
            <CardContent>
                <CardHeader className='center aligned'>            
                    <p>
                        <Icon name='image outline' size='small' circular />                    
                    </p>                          
                    {dataLoad ? 
                        employerData.companyContact.name :
                        "MVP Studio"
                    }
                    
                </CardHeader>
                <CardMeta className='center aligned'>
                    <Icon name='location arrow' />
                    {dataLoad ?
                        `${employerData.companyContact.location.city}, ${employerData.companyContact.location.country}` :
                        "Auckland, New Zealand"
                    }
                </CardMeta>
                <CardDescription>
                    We currently do not have specific skills that we desire.
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <p>
                    <Icon name='phone' /> : 
                    {dataLoad ?
                        `${employerData.companyContact.phone}` :
                        "232323"
                    }

                </p>
                <p>
                    <Icon name='mail' /> : 
                    {dataLoad ?
                        `${employerData.companyContact.email}` :
                        "genius@mvp.mail.com"
                    }
                </p>
            </CardContent>
        </Card>
    )
}