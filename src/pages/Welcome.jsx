import {Link} from "react-router-dom";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

function Welcome() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('connected') === 'false') {
            navigate('/login')
            console.log('not connected')
        }
    })

  return (
    <div>
      <h1>Welcome {location.state !== null ? location.state.username : Error} !</h1>
        <button>
            <Link to={"/login"}>Disconnect</Link>
        </button>

    </div>
  );
}

export default Welcome;