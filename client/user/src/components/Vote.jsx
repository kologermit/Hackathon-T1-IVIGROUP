import './Vote.css';
import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { colors, name, questionDesk, questions, selected, user } from './Vars';
import ReactLoading from "react-loading";
import { useLocation, useNavigate } from 'react-router-dom';
import { apiLink } from '../config/Config';


const Vote = () => {
    const [appState, setAppState] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    if (typeof colors.get('mainColor') === 'undefined') {
        colors.set('mainColor', '#d9e4e6');
    }
    if (typeof colors.get('secondColor') === 'undefined') {
        colors.set('secondColor', '#ebf4f5');
    }
    if (typeof colors.get('textColor') === 'undefined') {
        colors.set('textColor', '#000000');
    }

    const location = useLocation();

    user.set("name", "za5en@yandex.ru");
    user.set("token", "5b509568-d5d5-464b-a1c4-3fafca11ff72");

    const changeAnswer = (id, index) => {
        selected.set(id, index);
        setAppState(appState + 1);
    }

    const send = async () => {
        var notNull = true;
        var vote = [];
        for (let i = 0; i < Object.keys(questionDesk).length; i++) {
            var answers = {};
            for (let j = 0; j < Object.keys(questions[0]).length; j++) {
                if (typeof selected.get(`${i}_${j}`) === 'undefined') {
                    notNull = false;
                }
            }

            answers = {
                "q1": selected.get(`${i}_${0}`),
                "q2": selected.get(`${i}_${1}`),
                "q3": selected.get(`${i}_${2}`)
            };
            vote.push(answers);
        }
        
        if (notNull) {
            try {
                var response = await axios.post(`${apiLink}/vote/toVote/`, {
                    "name": user.get("name"),
                    "token": user.get("token"),
                    "voteId": location.state.id,
                    "vote": vote
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
                // setAppState(0);
                setAppState(response);
            } catch (e) {
                alert('Ошибка при выполнении запроса, попробуйте ещё раз');
                // console.log(e)
            }
        } else {
            alert('Необходимо выбрать ответы на все вопросы');
        }
    }

    return (
        <div className='voteBlock' style={{background: colors.get('mainColor')}}>
        {
            isLoading ? (
                <div className='loadScreen'>
                  <ReactLoading type="bubbles" color="#419FD9"
                          height={100} width={50} />
                </div>
            ) : (
                <div>
                    <div className='voteName' style={{color: colors.get('textColor')}}>{name}</div>
                    {
                        Object.keys(questionDesk).map((key, i) => (
                            <div>
                                <div className='voteDesc' style={{color: colors.get('textColor')}}>{questionDesk[i].description}</div>
                                <div className='questions' style={{background: colors.get('secondColor')}}>
                                {Object.keys(questions[0]).map((item, index) => (
                                    <div>
                                        <div className='voteQuestion' style={{color: colors.get('textColor')}}>{questionDesk[i][`q${index + 1}`]}</div>
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