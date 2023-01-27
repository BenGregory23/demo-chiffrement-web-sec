import {Link} from "react-router-dom";

function Welcome() {
  return (
    <div>
      <h1>Welcome</h1>
        <button>
            <Link to={"/login"}>Disconnect</Link>
        </button>

    </div>
  );
}

export default Welcome;