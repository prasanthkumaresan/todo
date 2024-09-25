import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import {v4 as uuidv4} from 'uuid'
import './index.css'

const SignUp = props => {
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
        axios.post("http://localhost:3001/signing",{id:uuidv4(),username,password})
        .then(res => {
            navigate("../login", {replace: true})
        })
    }

    return (
    <div className="login-cont">
        <h1 className='app-header'>Sign Up</h1>
        <form className="form-container" onSubmit={formSubmit}>
            <label className="label-text" htmlFor="name">Username</label>
            <input value={username} onChange={onChangeName} className="input-container" id="name" type="text" placeholder="Enter your username"/>
            <label className="label-text" htmlFor="password">Password</label>
            <input value={password} onChange={onChangePass} className="input-container" id="password" type="text" placeholder="Enter your password"/>
            <button type="submit" className="login-btn">Sign Up</button>
        </form>
    </div>
    )
}

export default SignUp
