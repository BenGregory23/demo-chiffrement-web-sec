import '../App.css';
import Login from "./Login.jsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Welcome from "./Welcome.jsx";



function App() {
    const cleanup = () => {
        localStorage.clear();
        localStorage.setItem('connected', false.toString());
        window.location.href = "/";
    }


  return (
    <div className="App">
        <h1>Sécurité Web</h1>
        <Router>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/welcome" element={<Welcome/>} />
            </Routes>
        </Router>
        <button className={"btnClear"} onClick={()=>cleanup()} >Clear local storage</button>
    </div>
  )
}

export default App
