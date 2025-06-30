import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { UserContextProvider, useUser, useUserUpdate } from './contexts/UserContext';
import { usePage } from './contexts/PageContext';

import LoginSignUp from './pages/LoginSignUp';
import Store from './pages/Store';
import NavBar from './components/NavBar';



function App() {
  const page = usePage();
  const setUser = useUserUpdate();
  useEffect(() => {
    axios.get("http://localhost:3001/me", {
      headers: {
        Authorization: Cookies.get("accessToken")
      }
    })
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.log(err)
        setUser(null);
      })
  }
  , []);
  return (
    <div>
      <NavBar />
      {page}
    </div>
  );
  
}

export default App;
