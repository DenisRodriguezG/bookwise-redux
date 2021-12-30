import React, { useRef, useEffect, useState } from 'react';
import './Login.css';
import logLogin from './logologin.svg';
import Pusher from 'pusher-js';
import { useSelector, useDispatch } from 'react-redux';
//import { store } from '../store';
import { instanceUsers } from '../axios';
import Main from './Main';
import { Link } from 'react-router-dom';
import { login } from '../features/counter/counterSlice';
import { options } from '../features/counter/optionsSlice';
import { deleteHistory } from '../features/counter/suggerensUser';
import { deleteAllLikes } from '../features/counter/likesSlice';

function Login() {

    const email = useRef();
    const password = useRef();
    const notice = useRef();
    const [ users, setUsers ] = useState();
    const [ logged, setLogged ] = useState(false);
    const dispatch = useDispatch();
    const userDataRedux = useSelector(data => data.counter);
    const [getDataRedux, setDataRedux] = useState([]);
    const [ valuePusher, setValuePusher ] = useState();
    let pusherData = [];

    console.log(userDataRedux)

    useEffect(() => {
        dispatch(deleteAllLikes({}))
        dispatch(deleteHistory({}))
        const getUsers = async () => {
            const usersData = await instanceUsers.get('/v1/users');
            setUsers([usersData.data])
        }

        getUsers();
    }, [])
   useEffect(() => {



        let pusher = new Pusher('b5a304c491f6dd955645', {
            cluster: 'us2'
          });
      
          let channel = pusher.subscribe('bookwise');
          channel.bind('inserted', function (data) {
              console.log(data)
              setValuePusher(data)
          })
          return () => {
            /*channel.unbind_all();
            channel.unsubscribe();*/
        }
    }, [valuePusher])

    console.log(valuePusher)
      useEffect(() => {
        const postUsersMongo = async (dataRedux) => {
            await instanceUsers.post('/v2/users', {
                firstName: dataRedux.firstName,
                lastName: dataRedux.lastName, 
                age: dataRedux.age,
                city: dataRedux.city,
                email: dataRedux.email,
                password: dataRedux.password,
                whyReason: dataRedux.whyReason
            });

        }
        if(userDataRedux.user !== null)
        {
            if(userDataRedux.user.payload.registered === "true")
            {
                const dataR = userDataRedux.user.payload;
                setValuePusher(dataR)
                postUsersMongo(dataR)
                dispatch(login({
                    payload: {
                        registered: "false"
                    }
                }))
            }
        }


    }, [getDataRedux]);

 
    console.log(users)
    const verigingData = (e) => {
        e.preventDefault();
        const emailValue = email.current.value;
        const passwordValue = password.current.value;

        if(emailValue !== "" && passwordValue !== "")
        {
           // console.log(valuePusher)
        if(valuePusher !== undefined)
            {
                let pusherArray = [];
                pusherArray.push(valuePusher)
                if(pusherArray.length > 0)
                {
                const confirmUser = pusherArray.find(user => user.email === emailValue && user.password === passwordValue);

                if(confirmUser !== undefined)
                {
                    dispatch(login({
                        payload: {
                            logged: "true",
                            _id: confirmUser._id,
                            firstName: confirmUser.firstName,
                            lastName: confirmUser.lastName,
                            age: confirmUser.age,
                            city: confirmUser.city,
                            email: confirmUser.email,
                            password: confirmUser.password,
                            whyReason: confirmUser.whyReason
                        }
                    }))
                    dispatch(options({
                        payload: 0
                    }))
                    setLogged(true)
                }
                else
                {
                    notice.current.innerHTML = '<p>User not exist or password incorrect</p>'
                    notice.current.style.display = 'flex';
                }
            }
            }
            else
            {
            const confirmUser = users[0].find(user => user.email === emailValue && user.password === passwordValue);
            if(confirmUser !== undefined)
            {
                dispatch(login({
                    payload: {
                        logged: "true",
                        _id: confirmUser._id,
                        firstName: confirmUser.firstName,
                        lastName: confirmUser.lastName,
                        age: confirmUser.age,
                        city: confirmUser.city,
                        email: confirmUser.email,
                        password: confirmUser.password,
                        whyReason: confirmUser.whyReason
                    }
                }))
                dispatch(options({
                    payload: 0
                }))
                setLogged(true)
            }
            else
            {
                notice.current.innerHTML = '<p>User not exist or password incorrect</p>'
                notice.current.style.display = 'flex';
            }
        }
    }
        else
        {
            notice.current.innerHTML = "<p>It's empty</p>";
            notice.current.style.display = 'flex';
        }
    }

    const hiddenNotice = (e) => {
        if(e){
            notice.current.style.display = 'none';
        }
    }

    console.log(getDataRedux)
    return <>
        {
            logged? (<Main/>)
            :
            (
                <div className="login">
                <div className="container">
                    <div className="notice" ref={notice}>
                    </div>
                    <div className="logo">
                        <div>
                            <img src={logLogin} alt=""/>
                        </div>
                    </div>
                    <form className="form" onSubmit={e => verigingData(e)} onKeyUp={e => hiddenNotice(e)}>
                        <div className="email">
                            <label>Email</label>
                            <input type="email" placeholder="Enter email" ref={email}/>
                        </div>
                        <div className="password">
                            <label>Password</label>
                            <input type="password" placeholder="Enter password" ref={password}/>
                        </div>
                        <div className="btn-login">
                            <button>LOGIN</button>
                        </div>
                    </form>
                    <div className="info">
                        <h4>Information</h4>
                        <p>Hi! If you not have a account you must<br/>
                        to go or touch here👉🏼<Link to="/register"><b>Goooo!</b></Link></p>
                    </div>
                </div>
            </div>
            )
        }

    </>
}

export default Login
