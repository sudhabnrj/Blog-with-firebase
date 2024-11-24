import './App.css';
import { Routes, Route } from "react-router";
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import { useNavigate } from 'react-router-dom';
import Post from './pages/Post';

function App() {

  const [isAuth, setIsAuth] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuth') === 'true';
    if(authStatus){
      setIsAuth(authStatus);
      navigate('/');
    }
    
  }, []);

  return (
    <>
      <Header setIsAuth={setIsAuth} isAuth= {isAuth}/>
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} />} />
          <Route path="/post/:postId" element={<Post isAuth={isAuth} />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="*" element={<NotFound  />} />
        </Routes>
    </>
  );
}

export default App;
