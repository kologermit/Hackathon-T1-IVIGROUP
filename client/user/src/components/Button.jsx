import './Vote.css';
import React from 'react'
import graph from '../assets/graph.svg'
import { useNavigate } from 'react-router-dom';

const Button = () => {
    let navigate = useNavigate();

    return (
        <div className='buttonBlock' onClick={() => navigate('Auth', { replace: false })}>
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