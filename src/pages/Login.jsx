import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../App.css';
import sha256 from 'crypto-js/sha256';
import PBKDF2 from 'crypto-js/pbkdf2';
import CryptoJS from 'crypto-js';


function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [genericSalt, setGenericSalt] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // salt to be used for all users
        let salt = CryptoJS.lib.WordArray.random(128 / 8);
        setGenericSalt(salt.toString());

    },[])

    const HashAndSaveUser = (username, password) => {
        // salt to be used for each user
        let usersalt = CryptoJS.lib.WordArray.random(128 / 8);


        const user = {
            username: username,
            password: password,
            passwordHash: sha256(password).toString(),
            passwordHashAndGenericSalt: PBKDF2(password, genericSalt, { keySize: 512 / 32, iterations: 1000 }).toString(),
            passwordHashAndSalt: PBKDF2(password, usersalt, { keySize: 512 / 32, iterations: 1000 }).toString(),
            salt: usersalt.toString()
        }
        localStorage.setItem(username, JSON.stringify(user))
        localStorage.setItem('connected', true.toString());
        // go to welcome page
        navigate('/welcome',{state: {username: username}});

    }

    const checkIfUserExists = (username) => {
        for(let i=0; i<localStorage.length; i++) {
            if(localStorage.key(i) === username) {
                return true;
            }
        }
    }

      const checkIfPasswordIsCorrect = (username, password) => {
        let user = JSON.parse(localStorage.getItem(username));
        if(user.passwordHash === sha256(password).toString()) {
            return true;
        }
      }

      const checkIfPasswordIsCorrectWithSalt = (username, password) => {
            let user = JSON.parse(localStorage.getItem(username));
            if(user.passwordHashAndSalt === PBKDF2(password, user.salt, { keySize: 512 / 32, iterations: 1000 }).toString()) {
                return true;
            }
      }

      const handleSubmit = (e) => {
        // On vérifie si l'utilisateur existe
        if(checkIfUserExists(username)) {

            // Si l'utilisateur existe, on vérifie si ses mots de passe correspondent

            if (checkIfPasswordIsCorrect(username, password)) {
                navigate('/welcome');
            }

            // vérifier si le mot de passe hashé + salt (générique) correspond
            //....

            // vérifier si le mot de passe hashé + salt (utilisateur) correspond
            //....


        }
        else{
            // Si l'utilisateur n'existe pas, on le créé
            HashAndSaveUser(username, password);
        }
      }


    return (
        <div className="App">
            <div className="card">
                <label>Username</label>
                <input  type={"text"} onChange={(e)=>setUsername(e.target.value)}/>
                <label>Password</label>
                <input type={"password"}onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={()=>handleSubmit()} >Valider</button>
            </div>
        </div>
    )
}

export default Login
