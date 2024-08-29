import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon, CardContent, CardHeader, CardDescription, Card, CardMeta, GridRow, GridColumn, Grid } from 'semantic-ui-react'

export default function TalentCard({ talentData }) {    
    //console.table(talentData);
    const [video, setVideo] = useState(true);
    const handleVideo = (event, state) => {
        event.preventDefault();
        setVideo(state);
    }

    return (
        <div className='ui fluid card'>
            <div className='content'>                
                <div className='header'>    
                    {talentData.name}                                            
                    <Icon name='star' className='right floated' />                                                    
                </div>
                <div className='description'>
                    {video ?
                        <div>
                            <video preload="auto" controls width='500px' height='300px'>
                                Your browser doesn't support HTML 5.
                            </video>
                        </div> :
                        <Grid columns={2} divided>
                            <GridRow>
                                <GridColumn>                                
                                    <img
                                        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                                        style={{
                                            maxWidth: "250px",
                                            maxHeight: "300px",
                                            width: 'auto',
                                            height: 'auto'
                                        }}
                                    />                                    
                                </GridColumn>
                                <GridColumn> {/*<div className='column'>*/}
                                    <p><strong>CURRENT EMPLOYER</strong></p>
                                    <p>{talentData.currentEmployment}</p>
                                    <p><strong>VISA STATUS</strong></p>
                                    <p>{talentData.visa}</p>
                                    <p><strong>POSITION</strong></p>
                                    <p>{talentData.level}</p>
                                    {/*</div>*/}
                                </GridColumn>
                            </GridRow>
                        </Grid>
                    }
                    <div className='ui grid'>                    
                        <div className='4 wide column'>
                            {video ?
                                <Icon
                                    name='user'
                                    onClick={(event) => handleVideo(event, false)}
                                /> :
                                <Icon
                                    name='video'
                                    onClick={(event) => handleVideo(event, true)}
                                />
                            }
                        </div>
                        <div className='4 wide column'>
                            <Icon name='file pdf outline' />
                        </div>
                        <div className='4 wide column'>
                            <Icon name='linkedin in' />
                        </div>
                        <div className='4 wide column'>
                            <Icon name='github' />
                        </div>                        
                    </div>
                    <div className='ui divider'></div>
                    <div>
                        {talentData.skills.map((skillName, index) => (
                            <button
                                key={index }
                                className='ui blue basic button'
                            >
                                {skillName}
                            </button>
                        ))}
                    </div>
                </div>                    
            </div>
        </div>
    )    
}

