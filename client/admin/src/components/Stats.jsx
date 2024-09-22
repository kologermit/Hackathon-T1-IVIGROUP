import './Style.css';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import close from '../assets/close.svg'
import ReactLoading from "react-loading";
import { vote } from './vote';
import axios from 'axios';

const Stats = () => {
    const [appState, setAppState] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    const openStats = (id) => {
        navigate(`StatsPage/${id}`, { replace: false, state: {id: id} })
    }

    useEffect(() => {
        async function getVoteInfo() {
            try {
                var response  = await axios.get('http://kologermit.ru:9002/vote/get-result')
                if (response.status === 200) {
                    // vote = response.body;
                }
                setAppState(response);
            } catch (e) {
                // console.log(e)
            }
        }

        async function makeRequest() {
            setIsLoading(true);
            await getVoteInfo();
            setIsLoading(false);
        }
    
        makeRequest();
    }, [setAppState]) 

    return (
        <div>
        {
            isLoading ? (
                <div className='loadScreen'>
                  <ReactLoading type="bubbles" color="#419FD9"
                          height={100} width={50} />
                </div>
            ) : (
                <div>
                    <div className='textLine'>
                        <img src={close} alt='close' className='manageButton' onClick={() => navigate(-1)} />
                        <div className='header'>Выберите голосование</div>
                        <span className='another' />
                    </div>
                    <div className='header'></div>
                    {vote.map(item => (
                        <div className='stats'>
                            <div className='voteCard' onClick={() => openStats(item.id)}>
                                <div className='voteId'>{'id' + item.id}</div>
                                <div className='voteText'>{item.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
        </div>
    )
}

export default Stats;