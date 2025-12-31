import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
// use auth

const UseAuth = () => {
    const authInfo = useContext(AuthContext)
  return authInfo;
}

export default UseAuth
