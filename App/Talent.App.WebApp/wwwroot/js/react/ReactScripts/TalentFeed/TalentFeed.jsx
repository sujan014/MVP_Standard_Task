import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardMeta, Icon, Image, Loader } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import axios from 'axios';
import { getApiCall } from '../Profile/ApiUtil.jsx';

export default function TalentFeed() {
    let loader = loaderData;
    loader.allowedUsers.push("Employer")
    loader.allowedUsers.push("Recruiter")
    const [sloaderData, setsLoaderData] = useState(loader);
    const [feedIncrementalmodel, setFeedIncrementalModel] = useState({
        Number: 5,
        Position: 0,
    });
    const [feedData, setFeedData] = useState([]);
    //const [employerData, setEmployerData] = useState();    

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        let nloaderData = TalentUtil.deepCopy(sloaderData);
        nloaderData.isLoading = false;
        setsLoaderData(nloaderData);        
        loadTalents();        
    }
    const loadTalents = () => {
        //var url = `http://localhost:60290/profile/profile/getTalent?Number=${feedIncrementalmodel.Number}&Position=${feedIncrementalmodel.Position}`;
        var url = `https://module1talent-cnfucbdcave3ccgq.australiaeast-01.azurewebsites.net/profile/profile/getTalent?Number=${feedIncrementalmodel.Number}&Position=${feedIncrementalmodel.Position}`;

        getApiCall(
            url,
            setFeedData
        )        
    }    
    return (
        <BodyWrapper reload={init} loaderData={sloaderData}>
            <div className="ui container">
                {/*My code goes here*/}
                <div className='ui grid row'>
                    <div className='four wide column'>
                        <CompanyProfile />
                    </div>
                    <div className='ui eight wide column'>
                        {feedData.length > 0 ?
                            feedData.map((data, index) =>
                                <TalentCard
                                    key={index}
                                    talentData={data}
                                />
                            ) :
                            "There are no talents found for your recruitment company"
                        }
                        
                    </div>
                    <div className='four wide column'>
                        <div className="ui card">
                            <FollowingSuggestion />
                        </div>
                    </div>
                </div>
            </div>
        </BodyWrapper>
    )        
}
