import './Vote.css';
import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { description, name, questionDesk, questionNames, questions, selected } from './Vars';
import ReactLoading from "react-loading";
import { useNavigate } from 'react-router-dom';


const Vote = () => {
    const [appState, setAppState] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        async function getVariants() {
            try {
                var response  = await axios.get(`https://kologermit.ru:9000`);
                questionDesk = response.data.questionDesk;
                name = response.data.name;
                setAppState(response);
                if (response.status === 200) {
                    // console.log(response);
                }
            } catch (e) {
                // console.log(e)
            }
        }

        async function makeRequest() {
          setIsLoading(true);
          await getVariants();
          setIsLoading(false);
        }
    
        // makeRequest();
    })

    const changeAnswer = (id, index) => {
        selected.set(id, index);
        setAppState(appState + 1);
    }

    const send = async () => {
        var notNull = true
        for (let i = 0; i < Object.keys(questionDesk).length; i++) {
            for (let j = 0; j < Object.keys(questions[0]).length; j++) {
                if (typeof selected.get(`${i}_${j}`) === 'undefined') {
                    notNull = false;
                }
            }
        }
        
        if (notNull) {
            try {
                var response = await axios.post('https://kologermit.ru:9000/vote/vote', {
                    "vote_id": 1,
                    "option": "Python" 
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 200) {
                    for (let i = 0; i < Object.keys(questionDesk).length; i++) {
                        for (let j = 0; j < Object.keys(questions[0]).length; j++) {
                            selected.delete(`${i}_${j}`);
                        }
                    }
                    navigate(-1);
                    alert('Вы успешно проголосовали!');
                } else {
                    alert('Не удалось отправить результаты голосования, попробуйте ещё раз');
                }
                setAppState(response);
            } catch (e) {
                // console.log(e)
            }
        } else {
            alert('Необходимо выбрать ответы на все вопросы');
        }
    }

    return (
        <div className='voteBlock'>
        {
            isLoading ? (
                <div className='loadScreen'>
                  <ReactLoading type="bubbles" color="#419FD9"
                          height={100} width={50} />
                </div>
            ) : (
                <div>
                    <div className='voteName'>{name}</div>
                    {
                        Object.keys(questionDesk).map((key, i) => (
                            <div>
                                <div className='voteDesc'>{questionDesk[i].description}</div>
                                <div className='questions'>
                                {Object.keys(questions[0]).map((item, index) => (
                                    <div>
                                        <div className='voteQuestion'>{questionDesk[i][`q${index + 1}`]}</div>
                                        {questions[0][index].map((it, ind) => (
                                            <div className={`voteButton${selected.get(`${i}_${index}`) === ind ? 'Selected' : ''}`} onClick={() => changeAnswer(`${i}_${index}`, ind)}>{it}</div>
                                        ))}
                                    </div>
                                ))}
                                </div>
                            </div>
                        ))
                    }
                    <div className='inputLine'>
                        <div className='addButton' onClick={() => send()}>Отправить</div>
                    </div>
                </div>
            )
        }
        </div>
    )
}

export default Vote;