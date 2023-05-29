import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Welcome from './components/Welcome';

function App() {
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
