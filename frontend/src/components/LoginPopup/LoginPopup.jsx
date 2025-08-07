import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import app from '../firebase_config'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth'
const auth = getAuth(app)

const LoginPopup = ({ setShowLogin }) => {

    const { setToken, url,loadCartData } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Sign Up");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
    e.preventDefault();

    // let new_url = url;
    if (currState === "Login") {
        // Firebase login
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            const token = await user.getIdToken();

            setToken(token);
            localStorage.setItem("token", token);
            loadCartData({ token });
            setShowLogin(false);
            toast.success("Logged in successfully!");
        } catch (error) {
            toast.error(error.message);
        }
    }
    // if (currState === "Login") {
    //     new_url += "/api/user/login";

    //     const response = await axios.post(new_url, data);
    //     if (response.data.success) {
    //         setToken(response.data.token);
    //         localStorage.setItem("token", response.data.token);
    //         loadCartData({ token: response.data.token });
    //         setShowLogin(false);
    //     } else {
    //         toast.error(response.data.message);
    //     }
    // }
    // } else {
    //     new_url += "/api/user/register";

    //     const response = await axios.post(new_url, data);
    //     if (response.data.success) {
    //         toast.success("Registration successful. Please login to continue.");
    //         setCurrState("Login");
    //     } else {
    //         toast.error(response.data.message);
    //     }
    // }
    else {
        // Firebase registration
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            // Set the display name (username)
            await updateProfile(user, { displayName: data.name });
    
            toast.success("Registration successful. Please login to continue.");
            setCurrState("Login");
        } catch (error) {
            toast.error(error.message);
        }
    }
}

const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        // The signed-in user info.
        const user = result.user;
        // You can get the token if needed:
        const token = await user.getIdToken();

        // Optionally, send this token to your backend for session management
        setToken(token);
        localStorage.setItem("token", token);
        loadCartData({ token });
        setShowLogin(false);
        toast.success("Logged in with Google!");
    } catch (error) {
        toast.error("Google sign-in failed: " + error.message);
    }
};


    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2> <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" ? <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required /> : <></>}
                    <input name='email' value={data.email} onChange={onChangeHandler}  type="email" placeholder='Your email' required/>
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button>{currState === "Login" ? "Login" : "Create account"}</button>
                <button type="button" className="google-signin-btn" onClick={handleGoogleSignIn}>
                    Sign in with Google
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required/>
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
