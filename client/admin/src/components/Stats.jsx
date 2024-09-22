import './Style.css';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import close from '../assets/close.svg'
import ReactLoading from "react-loading";
import { poll, user, vote } from './vote';
import axios from 'axios';
import { apiLink } from '../config/Config';

const Stats = () => {
    const [appState, setAppState] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    const openStats = async (id) => {
        await getVotes(id);
        navigate(`StatsPage/${id}`, { replace: false, state: {id: id} })
    }

    async function getVotes(id) {
        try {
            var response  = await axios.post(`${apiLink}/vote/getResult/`, {
                "name": user.get('name'),
                "token": user.get('token'),
                "voteId": id
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 200) {
                poll = response.data.data.usersResp;
            }
            setAppState(response);
        } catch (e) {
            alert('Ошибка при выполнении запроса, попробуйте ещё раз');
            // console.log(e)
        }
    }

    useEffect(() => {
        async function getVoteInfo() {
            try {
                var response  = await axios.post(`${apiLink}/vote/adminVotes/`, {
                    "name": user.get('name'),
                    "token": user.get('token'),
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response.status === 200) {
                    console.log(response);
                    vote = response.data.data.votes;
                }
                setAppState(response);
            } catch (e) {
                alert('Ошибка при выполнении запроса, попробуйте ещё раз');
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
                                <div className='voteText'>{item.description}</div>
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