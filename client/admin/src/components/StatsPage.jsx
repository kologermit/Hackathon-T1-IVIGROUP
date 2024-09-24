import './Style.css';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import close from '../assets/close.svg'
import ReactLoading from "react-loading";
import file from '../assets/file.svg'
import table from '../assets/table.svg'
import { categories, poll, user, view, vote, vote1 } from './vote';
import axios from 'axios';
import { apiLink } from '../config/Config';
// import Plotly from 'plotly.js/dist/plotly'

const StatsPage = () => {
    const [appState, setAppState] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    const location = useLocation();

    // var srch = false;
    var poll1 = []

    for (let i = 0; i < vote1.length; i++) {
        poll1 = vote1[i];
    }

    if (typeof view.get('view') === 'undefined') {
        view.set('view', 'table');
    }

    // var x = {
    //     0: [],
    //     1: [],
    //     2: [],
    //     3: [],
    //     4: []
    // }

    // for (let i = 0; poll.length; i++) {
    //     for (let j = 0; poll[i].responce.length; j++) {
    //         if (poll[i].responce[j].q1 === 0) {
    //             if (poll[i].responce[j].q2 === 0) {
    //             } else if (poll[i].responce[j].q2 === 1) {
    //             }
    //             } else if (poll[i].responce[j].q2 === 2) {
    //             }
    //             } else if (poll[i].responce[j].q2 === 3) {
    //             }
    //             } else if (poll[i].responce[j].q2 === 4) {
    //             }
    //         } else if (poll[i].responce[j].q1 === 1) {
    //             if (poll[i].responce[j].q2 === 0) {
    //             } else if (poll[i].responce[j].q2 === 1) {
    //             }
    //             } else if (poll[i].responce[j].q2 === 2) {
    //             }
    //             } else if (poll[i].responce[j].q2 === 3) {
    //             }
    //             } else if (poll[i].responce[j].q2 === 4) {
    //             }
    //         } else if (poll[i].responce[j].q1 === 2) {
    //             if (poll[i].responce[j].q2 === 0) {
    //             } else if (poll[i].responce[j].q2 === 1) {
    //             }
    //             } else if (poll[i].responce[j].q2 === 2) {
    //             }
    //             } else if (poll[i].responce[j].q2 === 3) {
    //             }
    //             } else if (poll[i].responce[j].q2 === 4) {
    //             }
    //         } else if (poll[i].responce[j].q1 === 3) {
    //             if (poll[i].responce[j].q2 === 0) {
    //             } else if (poll[i].responce[j].q2 === 1) {
    //             }
    //             } else if (poll[i].responce[j].q2 === 2) {
    //             }
    //             } else if (poll[i].responce[j].q2 === 3) {
    //             }
    //             } else if (poll[i].responce[j].q2 === 4) {
    //             }
    //         } else if (poll[i].responce[j].q1 === 4) {
    //             if (poll[i].responce[j].q2 === 0) {
    //             } else if (poll[i].responce[j].q2 === 1) {
    //             }
    //             } else if (poll[i].responce[j].q2 === 2) {
    //             }
    //             } else if (poll[i].responce[j].q2 === 3) {
    //             }
    //             } else if (poll[i].responce[j].q2 === 4) {
    //             }
    //         }
    //     }
    // }

    for (const variant in poll1.variants) {
        var whole = 0;
        for (let j = 0; j < poll1.variants[variant].length; j++) {
            whole += poll1.variants[variant][j];
        }
        var biggest = -1;
        var biggestIndex = 0;
        for (let j = 0; j < poll1.variants[variant].length; j++) {
            poll1.percentage[variant][j] = (poll1.variants[variant][j] / whole * 100).toFixed(1);
            if (parseFloat(poll1.percentage[variant][j]) > parseFloat(biggest)) {
                biggest = poll1.percentage[variant][j];
                biggestIndex = j;
            }
            poll1.biggestIndex[variant] = biggestIndex;
            // x[j] = poll.percentage[variant][j];
        }
    }

    // var trace1 = {
    //     y: x[0],
    //     type: "histogram",
    // };
    // var trace2 = {
    //     y: x[1],
    //     type: "histogram",
    // };
    // var trace3 = {
    //     y: x[2],
    //     type: "histogram",
    // };
    // var trace4 = {
    //     y: x[3],
    //     type: "histogram",
    // };
    // var trace5 = {
    //     y: x[4],
    //     type: "histogram",
    // };
    // var data = [trace1, trace2, trace3, trace4, trace5];
    // var layout = {barmode: "stack"};

    // useEffect(() => {
    //     Plotly.newPlot('myDiv', data, layout);
    // })
    
    // const switchView = (type) => {
    //     view.set('view', type);
    //     if (type === 'hist') {
    //         setAppState(appState + 1);
    //     } else {
    //         setAppState(appState - 1);
    //     }
    // }

    const upload = async (type) => {
        if (type === 'excel') {
            try {
                var response = await axios.post(`${apiLink}/vote/getResultExcel/`, {
                    "name": user.get('name'),
                    "token": user.get('token'),
                    "voteId": location.state.id
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response.status === 200) {
                    alert('Выгрузка выполнена успешно');
                } else {
                    alert('Не удалось выполнить выгрузку, попробуйте ещё раз');
                }
            } catch (e) {
                alert('Ошибка при выполнении запроса, попробуйте ещё раз');
                // console.log(e)
            }
        } else {
            try {
                var response = await axios.post(`${apiLink}/vote/getResultJson/`, {
                    "name": user.get('name'),
                    "token": user.get('token'),
                    "voteId": location.state.id
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response.status === 200) {
                    alert('Выгрузка выполнена успешно');
                } else {
                    alert('Не удалось выполнить выгрузку, попробуйте ещё раз');
                }
            } catch (e) {
                alert('Ошибка при выполнении запроса, попробуйте ещё раз');
                // console.log(e)
            }
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
                    <div className='textLine'>
                        <img src={close} alt='close' className='manageButton' onClick={() => navigate(-1)} />
                        <div className='header'>id{location.state.id}</div>
                        <span className='another' />
                    </div>
                    <div>
                        <div className='variants'>{poll1.name}</div>
                        {/* <div className='textLine'>
                            <div className={view.get('view') === 'table' ? 'switchButtonActive' : 'switchButton'} onClick={() => switchView('table')}>Таблица</div>
                            <div className={view.get('view') === 'hist' ? 'switchButtonActive' : 'switchButton'} onClick={() => switchView('hist')}>Гистограмма</div>
                        </div> */}
                        <div className='authBlock'>
                            <div className='tableBlock'>
                            <table>
                                <tr>
                                    <th colSpan={7}>Количественная оценка</th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Обязательные</th>
                                    <th>Важные</th>
                                    <th>Интересные</th>
                                    <th>Безразличные</th>
                                    <th>Сомнительные</th>
                                    <th>Категория</th>
                                </tr>
                                {
                                    Object.keys(poll1.variants).map(item => (
                                        <tr>
                                            <th>{item}</th>
                                            <td className={poll1.biggestIndex[item] === 0 ? 'greenCell' : ''}>{poll1.percentage[item][0]}%</td>
                                            <td className={poll1.biggestIndex[item] === 1 ? 'greenCell' : ''}>{poll1.percentage[item][1]}%</td>
                                            <td className={poll1.biggestIndex[item] === 2 ? 'greenCell' : ''}>{poll1.percentage[item][2]}%</td>
                                            <td className={poll1.biggestIndex[item] === 3 ? 'greenCell' : ''}>{poll1.percentage[item][3]}%</td>
                                            <td className={poll1.biggestIndex[item] === 4 ? 'greenCell' : ''}>{poll1.percentage[item][4]}%</td>
                                            <th>{categories[poll1.biggestIndex[item]]}</th>
                                        </tr>
                                    ))
                                }
                            </table>
                            </div>
                        </div>
                        {/* <div className='authBlock' id='myDiv'>
                        </div> */}
                        <div className='statsBlock'>
                            <div className='homeButton' onClick={() => upload('excel')}>
                                <img src={table}
			            		alt='excel'
			            		className='uploadIcon' />
                                <div className='uploadText'>Выгрузка в Excel</div>
                            </div>
                            <div className='homeButton' onClick={() => upload('json')}>
                                <img src={file}
			            		alt='json'
			            		className='uploadIcon' />
                                <div className='uploadText'>Выгрузка в JSON</div>
                            </div>
                        </div>
                    </div>
                    {/* {Object.keys(poll.variants).map(item => (
                        <div className='stats'>
                            <div className='variantCard'>
                                <div className='voteId'>{item}</div>
                                <div className='voteText'>Отдано голосов: {poll.variants[item]}%</div>
                            </div>
                        </div>
                    ))} */}
                </div>
            )
        }
        </div>
    )
}

export default StatsPage;