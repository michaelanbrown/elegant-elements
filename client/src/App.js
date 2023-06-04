import './App.css';
import { Routes, Route } from "react-router-dom";
import { useEffect, useContext } from 'react';
import { UserContext } from './components/context/User';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Login from './components/Login';

function App() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    fetch("/authorized_user")
    .then((res) => {
      if (res.ok) {
        res.json()
        .then((user) => {
          setCurrentUser(user);
        });
      }
    })
  },[])


  return (
    <main>
      <Header/>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </main>
  );
}

export default App;
