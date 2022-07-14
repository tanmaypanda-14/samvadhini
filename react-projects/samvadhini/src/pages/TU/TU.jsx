import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Thanks =() =>{
const navigation = useNavigate();
useEffect(() =>{
    setTimeout(() => {
        navigation('/')
    }, 3000);
})
    return (
        <>
            <h3>Thanks for using samvadhini</h3>
        </>
    )
}

export default Thanks;