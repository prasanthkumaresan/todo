import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {v4 as uuidv4} from 'uuid'
import { useNavigate } from 'react-router-dom'
import './index.css'

const AddTodo = () => {
    const [todo, setterTodo] = useState('')
    const [status, setterStatus] = useState('')
    const changeTodo = event => {
        setterTodo(event.target.value)
    }
    const navigate = useNavigate()
    const changeStatus = event => {
        setterStatus(event.target.value)
    }
    const formSubmit = event => {
        event.preventDefault();
        const token = Cookies.get('jwt_token');
        console.log(token)
        axios.post("http://localhost:3001/createtodo", {todoid: uuidv4(), todo, status}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log(res);
            navigate("../", {replace: true});
        })
    }
return (
<div className="add-cont">
    <h1 className='add-header'>Add Todo</h1>
    <form className="add-form-container" onSubmit={formSubmit}>
        <label className="add-label-text" htmlFor="name">Todo</label>
        <input value={todo} onChange={changeTodo} className="add-input-container" id="name" type="text" placeholder="Enter what todo?"/>
        <label className="add-label-text" htmlFor="password">Status</label>
        <input value={status} onChange={changeStatus} className="add-input-container" id="password" type="text" placeholder="Enter todo status"/>
        <button type="submit" className="add-login-btn">Update</button>
        <Link className='add-btn-back' to="/">back</Link>
    </form>
</div>
)
}

export default AddTodo