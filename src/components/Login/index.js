import {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
    const [username,setterUserName] = useState('')
    const [password,setterPassword] = useState('')
    const navigate = useNavigate()

    const onChangeName = event => {
        console.log(event.target.value);
        setterUserName(event.target.value)
    }

    const onChangePass = event => {
        setterPassword(event.target.value)
    }

    const formSubmit = event => {
        event.preventDefault()
        axios.post("http://localhost:3001/validpass",{username,password})
        .then(res => {
            if (res.data.jwtToken) {
                Cookies.set('jwt_token', res.data.jwtToken, {expires:30})
                navigate("../", {replace: true})
            }else {
                alert("Invalid Login")
            }
        })
    }

    return (
    <div className="login-cont">
        <h1 className='app-header'>Todo</h1>
        <form className="form-container" onSubmit={formSubmit}>
            <label className="label-text" htmlFor="name">Username</label>
            <input value={username} onChange={onChangeName} className="input-container" id="name" type="text" placeholder="Enter your username"/>
            <label className="label-text" htmlFor="password">Password</label>
            <input value={password} onChange={onChangePass} className="input-container" id="password" type="text" placeholder="Enter your password"/>
            <button type="submit" className="login-btn">Login</button>
            <p>Need an account? <Link to="/signup">Sign Up</Link></p>
        </form>
    </div>
    )
}

export default Login
