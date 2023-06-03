import './App.css';
import { Routes, Route } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from './components/context/Customer';
import Header from './components/Header';
import Welcome from './components/Welcome';

function App() {
  // const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
  return (
    <main>
      <Routes>
        <Route path="/" element={<Welcome/>} />
      </Routes>
      <Header/>
    </main>
  );
}

export default App;
