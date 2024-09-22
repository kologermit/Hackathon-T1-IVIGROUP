import './Vote.css';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ReactLoading from "react-loading";
import { colors, name, questionDesk, user, view } from './Vars';
import axios from 'axios';

const Auth = () => {
    const [appState, setAppState] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    let location = useLocation();

    if (typeof view.get('mode') === 'undefined') {
        view.set('mode', 'auth');
    }

    if (typeof view.get('pass') === 'undefined') {
        view.set('pass', 'pass');
    }

    async function getVariants() {
        try {
            var response  = await axios.post('http://kologermit.ru:9002/vote/get/', {
                "name": user.get("name"),
                "token": user.get("token"),
                "voteId": 14
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                questionDesk = response.data.data.vote.questions_desc;
                name = response.data.data.vote.description;
            }
            setAppState(response);
        } catch (e) {
            alert('Ошибка при выполнении запроса, попробуйте ещё раз');
            // console.log(e)
        }
    }

    async function getColors() {
        try {
            var response  = await axios.post('http://kologermit.ru:9002/vote/getConfig/', {
                "name": user.get("name"),
                "token": user.get("token"),
                "voteId": 14
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                if (response.data.data.main_color !== response.data.data.question_color && response.data.data.main_color !== response.data.data.font_color) {
                    if (response.data.data.main_color !== "null") {
                        colors.set('mainColor', response.data.data.main_color);
                    }
                    if (response.data.data.question_color !== "null") {
                        colors.set('secondColor', response.data.data.question_color);
                    }
                    if (response.data.data.font_color !== "null") {
                        colors.set('textColor', response.data.data.font_color);
                    }
                }
            }
            setAppState(response);
        } catch (e) {
            alert('Ошибка при выполнении запроса, попробуйте ещё раз');
            // console.log(e)
        }
    }

    const logIn = async (mode) => {
        var login = document.getElementById('login').value;
        var password = document.getElementById('password').value;
        if (login !== '') {
            if (password !== '') {
                try {
                    if (mode === 'auth') {
                        var response = await axios.post(`http://kologermit.ru:9002/user/login/`, {
                            "name": login,
                            "hash": password
                        }, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        console.log(response)
                        if (response.status === 200) {
                            user.set('token', response.data.data.token);
                            user.set('name', response.data.data.name);
                            await getVariants();
                            await getColors();
                            navigate(`../Vote/${location.state.id}`, { replace: true, state: {id: location.state.id} });
                        } else {
                            alert('Ошибка авторизации, попробуйте ещё раз');
                        }
                    } else {
                        var response = await axios.post(`http://kologermit.ru:9002/user/signin/`, {
                            "name": login,
                            "hash": password
                        }, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }) 
                        console.log(response)
                        if (response.status === 200) {
                            user.set('token', response.data.data.token);
                            user.set('name', response.data.data.name);
                            await getVariants();
                            await getColors();
                            navigate(`../Vote/${location.state.id}`, { replace: true, state: {id: location.state.id} });
                        } else {
                            alert('Ошибка регистрации, попробуйте ещё раз');
                        }
                    }
                } catch (e) {
                    console.log(e)
                    alert('Ошибка при выполнении запроса, попробуйте ещё раз');
                }
            } else {
                alert('Необходимо указать пароль');
            }
        } else {
            alert('Необходимо указать логин');
        }
    }

    const switchMode = (mode) => {
        view.set('mode', mode);
        if (mode === "reg") {
            setAppState(appState + 1);
        } else {
            setAppState(appState - 1);
        }
    }

    const passwordVisibility = () => {
        var pass = document.getElementById('password');
        if (pass.type === "text") {
            pass.type = "password";
            view.set('pass', 'pass');
            setAppState(appState + 1);
        } else {
            pass.type = "text";
            view.set('pass', 'text');
            setAppState(appState - 1);
        }
    }

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
                    <div className='authBlockTop'>
                        <div className='textLine'>
                            <div className='header'>{view.get('mode') === 'reg' ? 'Регистрация' : 'Авторизация'}</div>
                        </div>
                    </div>
                    <div className='authBlockGen'>
                        <div className='authBlock'>
                            <input className='textField' type="text" id='login' placeholder='Логин' />
                        </div>
                        <div className='authBlock'>
                            <input className='textField' type="password" id='password' placeholder='Пароль' />
                        </div>
                        <div className='authBlock'>
                            <div className='regButton' onClick={() => passwordVisibility()}>
                                {view.get('pass') === 'pass' ? 'Показать пароль' : 'Скрыть пароль'}
                            </div>
                        </div>
                    </div>
                    <div className='authBlockGen'>
                        <div className='inputLine'>
                            <div className='regButton' onClick={() => view.get('mode') === 'reg' ? switchMode('auth') : switchMode('reg')}>
                                {view.get('mode') === 'reg' ? 'Авторизация' : 'Регистрация'} 
                            </div>
                        </div>
                        <div className='inputLine'>
                            <div className='addButton' onClick={() => view.get('mode') === 'reg' ? logIn('reg') : logIn('auth')}>
                                {view.get('mode') === 'reg' ? 'Зарегистрироваться' : 'Войти'}</div>
                        </div>
                    </div>
                </div>
            )
        }
        </div>
    )
}

export default Auth;