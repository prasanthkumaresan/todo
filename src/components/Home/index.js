import {useEffect, useState} from 'react';
import axios from 'axios'
import './index.css'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom';

const Home = () => {
    const [list, setterList] = useState([])

    useEffect(() => {
        const token = Cookies.get('jwt_token');
        axios.get("http://localhost:3001/gettodo", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setterList(res.data);
            ;
        })
    }, [])
return (
<div className='home-cont'>
    <h1 className='list-header'>TODO LIST</h1>
    <div className='card'>
        <Link to="/create" className='add-btn'>ADD+</Link>
        <div className='list-cont-todo'>
            <div className='row-header'>
                <p className='para'>todo</p>
                <p className='para'>status</p>
                <p className='para'>Action</p>
            </div>
        </div>
        {
            list.map(each => (
                <div className='each-list-cont' key={each.todoid}>
                    <p className='para-res'>{each.todo}</p>
                    <p className='para-res'>{each.status}</p>
                    <div>
                        <button className='upd-btn'>Update</button>
                        <button className='del-btn'>Delete</button>
                    </div>
                </div>
            ))
        }
    </div>
</div>
)
}

export default Home