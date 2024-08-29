import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardMeta, Icon, Image, Loader } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import axios from 'axios';

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
                    console.log('Talent Response: ');
                    console.log(response);
                    console.log('Talent Response data: ');
                    console.log(response.data.data);
                    setFeedData(response.data.data);
                }
            })
            .catch(error => {
                TalentUtil.notification.show("Error fetching data", "error", null, null);
            })
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
                        {feedData.map((data, index) => (
                            <TalentCard
                                key={index}
                                talentData={data}
                            />
                        ))}
                        
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
//export default class TalentFeed extends React.Component {
//    constructor(props) {
//        super(props);

//        let loader = loaderData
//        loader.allowedUsers.push("Employer")
//        loader.allowedUsers.push("Recruiter")

//        this.state = {
//            loadNumber: 5,
//            loadPosition: 0,
//            feedData: [],
//            watchlist: [],
//            loaderData: loader,
//            loadingFeedData: false,
//            companyDetails: null
//        }

//        this.init = this.init.bind(this);

//    };

//    init() {
//        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
//        loaderData.isLoading = false;
//        this.setState({ loaderData });//comment this
//    }

//    componentDidMount() {
//        //window.addEventListener('scroll', this.handleScroll);
//        this.init()
//    };

   
//    render() {

//        return (
//            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
//                <div className="ui container">
//                    {/*My code goes here*/}
//                    <div className='ui grid row'>                    
//                        <div className='four wide column'>
//                            <CompanyProfile />
//                        </div>
//                        <div className='eight wide column'>
//                            <TalentCard />
//                        </div>
//                        <div className='four wide column'>
//                            <div className="ui card">
//                                <FollowingSuggestion />
//                            </div>
//                        </div>
//                    </div>
//                </div>
//            </BodyWrapper>
//        )
//    }
//}