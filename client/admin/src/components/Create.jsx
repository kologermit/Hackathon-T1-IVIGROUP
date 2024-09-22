import './Style.css';
import React, { useState } from 'react'
import close from '../assets/close.svg'
import trash from '../assets/trash.svg'
import check from '../assets/check.svg'
import { useNavigate } from 'react-router-dom';
import { questions } from './vote';

const Create = () => {
    const [appState, setAppState] = useState(0);
    let navigate = useNavigate();

    // const addVariant = () => {
    //     questions.push('');
    //     setAppState(appState + 1);
    // }

    const addFunction = () => {
        questions.push(['', '']);
        setAppState(appState + 1);
    }

    const deleteFunction = (index) => {
        questions.splice(index, 1);
        for (let i = 0; i < questions.length; i++) {
            var question = document.getElementById(`funcName${i}`);
            question.value = questions[i][0];
            question = document.getElementById(`funcDesc${i}`);
            question.value = questions[i][1];
        }
        setAppState(appState - 1);
    }

    const change = (value, index, j) => {
        questions[index][j] = value;
        setAppState(appState + 1);
    }

    const addVote = () => {
        var name = document.getElementById('name').value;

        var blank = false;
        for (let i = 0; i < questions.length; i++) {
            var question = document.getElementById(`funcName${i}`).value;
            var questionDesc = document.getElementById(`funcDesc${i}`).value;
            if (question === '' || questionDesc === '') {
                blank = true;
            }
        }

        if (name !== '') {
            if (!blank) {
                var sum = {
                    "description": name,
                    "questions_desk": []
                };

                for (let i = 0; i < questions.length; i++) {
                    sum.questions_desk.push({
                        "description": document.getElementById(`funcDesc${i}`).value,
                        "q1": "Если в продукте ЕСТЬ" + document.getElementById(`funcName${i}`).value,
                        "q2": "Если в продукте НЕТ" + document.getElementById(`funcName${i}`).value,
                        "q3": "Насколько понятна суть этой функции?"
                    })
                }

                try {
                    var json = {
                        "name": "asdsdsdfsd",
                        "token": "786fa3ca-40b1-4fff-a722-7a30fadecfb4",
                        sum
                    }
                    // api request
                } catch (e) {
                    // console.log(e);
                }
                // if (response.status === 200) {
                    navigate(-1);
                    alert('Голосование успешно создано');
                    setAppState(appState + 1);
                // } else {
                    // alert('Не удалось создать голосование, попробуйте ещё раз');
                // }
            } else {
                alert('Необходимо заполнить все поля с названиями и описаниями');
            }
        } else {
            alert('Необходимо указать описание голосования');
        }
    }

    return (
        <div>
            <div className=''>
                <div className='textLine'>
                    <img src={close} alt='close' className='manageButton' onClick={() => navigate(-1)} />
                    <div className='header'>Добавить новое голосование</div>
                    <img src={check} alt='check' className='manageButton' onClick={() => addVote()}/>
                </div>
                <div className='inputLine'>
                    <input className='textField' type="text" id='name' placeholder='Введите описание голосования' />
                </div>
                {
                    questions.map((item, index) => (
                        <div className='flexBox'>
                            <div className='questionBlock'>
                                <div className='inputLine'>
                                    <input className={questions.length > 1 ? 'textFieldAnswer' : 'textFieldInside'} type="text" id={`funcName${index}`} placeholder='Введите название фичи (свойства/функции)' onChange={() => change(document.getElementById(`funcName${index}`).value, index, 0)} />
                                    {questions.length > 1 ? (
                                        <img src={trash} alt='delete' className='deleteButton' onClick={() => deleteFunction(index)}/>  
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                                <div className='inputLine'>
                                    <input className='textFieldInside' type="text" id={`funcDesc${index}`} placeholder='Введите описание фичи (свойства/функции)' onChange={() => change(document.getElementById(`funcDesc${index}`).value, index, 1)} />
                                </div>
                            </div>
                        </div>
                    ))
                }                
                {/* <div className='flexBox'>
                    <div className='questionBlock'>
                        <div className='variantsOne'>Установите варианты ответа для вопроса "Насколько понятна суть этого свойства?":</div>
                        {questions.map((item, index) => (
                            <div className='inputLine'>
                                <input className={questions.length > 1 ? 'textFieldAnswer' : 'textFieldInside'} type="text" id={`question${index}`} placeholder='Введите вариант ответа' onChange={() => change(document.getElementById(`question${index}`).value, index)} />
                                {questions.length > 1 ? (
                                    <img src={trash} alt='delete' className='deleteButton' onClick={() => deleteVariant(index)}/>  
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        ))}
                        <div className='inputLine'>
                            <div className='addButtonInside' onClick={() => addVariant()}>Добавить вариант ответа</div>
                        </div>
                    </div>
                </div> */}
                <div className='inputLine'>
                    <div className='addButton' onClick={() => addFunction()}>Добавить функцию</div>
                </div>
            </div>
        </div>
    )
}

export default Create;