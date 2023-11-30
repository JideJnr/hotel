import React,{ useContext }  from 'react';
import {AuthContext} from './context/auth';
import Login from './pages/Login';
import Home from './pages/Home';

const Main = () => {

  const {user} = useContext(AuthContext);

  return (
    
       <>{user ?

        <><Home/></> :
        <><Login/></>

        }</>

    
  )
}

export default Main