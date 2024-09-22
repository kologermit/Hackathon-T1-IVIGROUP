import './Style.css';
import React from 'react'
import plus from '../assets/plus.svg'
import graph from '../assets/graph.svg'
import { useNavigate } from 'react-router-dom';
import { questions, view } from './vote';

const Home = () => {
    let navigate = useNavigate();

    const openCreatePage = () => {
        view.set('selectColor', false);
        while (questions.length > 1) {
            questions.pop();
        }
        navigate('Create', { replace: false });
    }

    return (
        <div>
            <div className='textLine'>
                <div className='header'>Модель Кано</div>
            </div>
            <div className='homeBlock'>
                <div className='homeButton' onClick={() => openCreatePage()}>
                    <img src={plus}
					alt='Plus'
					className='homeIcon' />
                    <div className='homeButtonText'>Создать голосование</div>
                </div>
                <div className='homeButton' onClick={() => navigate('Stats', { replace: false })}>
                    <img src={graph}
					alt='Graph'
					className='homeIcon' />
                    <div className='homeButtonText'>Посмотреть статистику</div>
                </div>
            </div>
        </div>
    )
}

export default Home;