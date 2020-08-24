import React from 'react';
import axios from 'axios';

function LandingPage(props){
    const onClickHandler = () => {
        axios.get('/api/users/logout')
            .then(response => {
                if(response.data.success){
                    props.history.push('/login');
                }else{
                    alert('Logout failed.');
                }
            })
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <h2>시작 페이지</h2>
            <button onClick={onClickHandler}>Logout</button>
        </div>
    )
}

export default LandingPage;