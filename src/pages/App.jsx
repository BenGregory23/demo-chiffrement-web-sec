import '../App.css';
import Login from "./Login.jsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Welcome from "./Welcome.jsx";

function App() {



  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/welcome" element={<Welcome/>} />
            </Routes>
        </Router>
        <button className={"btnClear"} onClick={()=>localStorage.clear()} >Clear local storage</button>
    </div>
  )
}

export default App
