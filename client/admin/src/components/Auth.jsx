import './Style.css';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ReactLoading from "react-loading";
import { view } from './vote';
import axios from 'axios';

const Auth = () => {
    const [appState, setAppState] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    if (typeof view.get('mode') === 'undefined') {
        view.set('mode', 'auth');
    }

    if (typeof view.get('pass') === 'undefined') {
        view.set('pass', 'pass');
    }

    const logIn = async (mode) => {
        var login = document.getElementById('login').value;
        var password = document.getElementById('password').value;
        if (login !== '') {
            if (password !== '') {
                try {
                    if (mode === 'auth') {
                        var response = await axios.post(`http://kologermit.ru:9002/admin/log-in-admin`, {
                            "username": login,
                            "password": password
                        }, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        if (response.status === 200) {
                            navigate('Home', { replace: false });
                        } else {
                            alert('Ошибка авторизации, попробуйте ещё раз');
                        }
                    } else {
                        var response = await axios.post(`http://kologermit.ru:9002/admin/sign-in-admin`, {
                            "username": login,
                            "password": password
                        }, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }) 
                        if (response.status === 200) {
                            navigate('Home', { replace: false });
                        } else {
                            alert('Ошибка регистрации, попробуйте ещё раз');
                        }
                    }
                } catch (e) {
                    // console.log(e)
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