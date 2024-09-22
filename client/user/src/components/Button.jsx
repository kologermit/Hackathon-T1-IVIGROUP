import './Vote.css';
import React from 'react'
import graph from '../assets/graph.svg'
import { useNavigate } from 'react-router-dom';

const Button = () => {
    let navigate = useNavigate();

    var id = 14;

    return (
        <div className='buttonBlock' onClick={() => navigate(`Auth/${id}`, { replace: false, state: { id: id } })}>
            <div className='mainButton'>
                <img src={graph}
				alt='graph'
				className='buttonIcon' />
                <div className='buttonText'>Проголосовать за контент!</div>
            </div>
        </div>
    )
}

export default Button;