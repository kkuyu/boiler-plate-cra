import React from 'react';
import axios from 'axios';
import { NavLink, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavBar(props){
    const onClickHandler = () => {
        axios.get('/api/users/logout')
            .then(response => {
                if(response.data.success){
                    props.history.push('/');
                }else{
                    alert('Logout failed.');
                }
            })
    }

    const isLogin = useSelector(state => {
        return state.user.userData && state.user.userData.isAuth;
    });

    const isAdmin = useSelector(state => {
        return isLogin && state.user.userData.isAdmin;
    });
    
    const style = {
        fontWeight: 'bold'
    }

    return (
        <div>
            <NavLink exact to='/' activeStyle={style}>Home</NavLink>
            <NavLink exact to='/about' activeStyle={style}>About</NavLink>

            { isLogin && <NavLink exact to='/profile' activeStyle={style}>Profile</NavLink> }
            { !isLogin && <NavLink exact to='/login' activeStyle={style}>Login</NavLink> }
            { isAdmin && <NavLink exact to='/admin' activeStyle={style}>Admin</NavLink> }

            { isLogin && <button onClick={onClickHandler}>Logout</button> }
        </div>
    )
}

export default withRouter(NavBar);