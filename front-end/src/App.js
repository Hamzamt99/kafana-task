import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/home';
import Header from './components/Header';
import AdminHome from './components/pages/admin/Home'
import cookies from 'react-cookies';
import { decodeToken } from 'react-jwt';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Container from './components/pages/authContainer';
import NotFound from './components/pages/404';
import Profile from './components/pages/profileDashboard/Profile';

function App() {
  const [decode, setDecode] = useState(null);
  const state = useSelector(state => state.user);
  const Logged = state.user.isLogged;
  const isAuth = cookies.load('user_session');

  useEffect(() => {
    if (isAuth) {
      const decodeAuth = decodeToken(isAuth);
      setDecode(decodeAuth);
    } else {
      setDecode(null);
    }
  }, [isAuth]);

  return (
    <div className="App">
      {decode && decode.userID ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {
              decode && decode.role === 'admin' &&
              <Route path="/admin" element={<AdminHome />} />
            }
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      ) : (
        <Container />
      )}
    </div>
  );
}

export default App;
