import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';

function App() {
  return (
    <main>
      <Header/>
      <Routes>
        <Route path="/" element={<Welcome/>} />
      </Routes>
      Hello
    </main>
  );
}

export default App;
