import React, { useState, useEffect, useRef } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { instanceUsers } from '../axios';
import { useDispatch } from 'react-redux';
import { login } from '../features/counter/counterSlice';


function Register() {

    const [ numbersAge, setNumbersAge ] = useState([]);
    const [ nameCity, setCity ] = useState([])
    const dataForm = useRef();
   // const [ dataUser, setDataUser ] = useState([]);
    const notice = useRef();
    const [ dataMongoDB, setDataMongoDB ] = useState([]);
    //const [ registered, setRegistered ] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        let numbers = [];

        for(let i = 18; i <= 100; i++)
        {
            numbers.push(i);
        }
        setNumbersAge(numbers);
        setCity([ 'AGUASCALIENTES', 'BAJA CALIFORNIA NORTE','BAJA CALIFORNIA SUR', 'COAHUILA', 'CHIHUAHUA','COLIMA','CAMPECHE','CHIAPAS','DISTRITO FEDERAL','DURANGO','GUERRERO','GUANAJUATO','HIDALGO','JALISCO','MICHOACAN','MORELOS','MEXICO','NAYARIT','NUEVO LEON','OAXACA','PUEBLA','QUERETARO','QUINTANA ROO','SINALOA','SAN LUIS POTOSI','SONORA','TAMAULIPAS','TABASCO','TLAXCALA','VERACRUZ','YUCATAN','ZACATECAS'])
    }, []);

    //Get data MongoDB
    useEffect(() => {
        const getDataMongoDB = async() => {
            const users = await instanceUsers('/v1/users');
            setDataMongoDB(users.data);
        }
        getDataMongoDB();
    }, [])

    const uploadData = (e) => {
        e.preventDefault();
        const dataFormUser = new FormData(dataForm.current);
        let jsonAux = {
            firstName: "",
            lastName: "", 
            age: 0,
            city: "",
            email: "",
            password: "",
            verifyPassword: "",
            whyReason: ""
        }
        let i = 0;

        dataFormUser.forEach(e => {
            if(i === 0) jsonAux.firstName = e;
            if(i === 1) jsonAux.lastName = e;
            if(i === 2) jsonAux.age = e;
            if(i === 3) jsonAux.city = e;
            if(i === 4) jsonAux.email = e;
            if(i === 5) jsonAux.password = e;
            if(i === 6) jsonAux.verifyPassword = e;
            if(i === 7) jsonAux.whyReason = e;

            i++;
        });
        
        if(jsonAux.firstName && jsonAux.lastName && jsonAux.age && jsonAux.city && jsonAux.email && jsonAux.password && jsonAux.verifyPassword && jsonAux.whyReason)
        {
            if(jsonAux.password === jsonAux.verifyPassword)
            {
                const userInData = dataMongoDB.find(user => user.email === jsonAux.email);
                
                if(!userInData)
                {
                    //setDataUser([jsonAux]);
                    dispatch(login({
                        payload: {
                            registered: "true",
                            firstName: jsonAux.firstName,
                            lastName: jsonAux.lastName,
                            age: jsonAux.age,
                            city: jsonAux.city,
                            email: jsonAux.email,
                            password: jsonAux.password,
                            whyReason: jsonAux.whyReason
                        }
                    }))
                    navigate('/');
                    //setRegistered(true);
                }
                else
                {
                    notice.current.style.visibility = 'visible';
                    notice.current.innerHTML = '<p>Email already exits</p>';
                }
            }
            else
            {
                notice.current.style.visibility = 'visible';
                notice.current.innerHTML = "<p>Passwors is not same</p>"
            }
        }
        else
        {
            notice.current.style.visibility = 'visible';
            notice.current.innerHTML = "<p>It's empty</p>";
        }
    }
    const hiddenNotice = (e) => {
        if(e)
        {
            notice.current.style.visibility = 'hidden';
            notice.current.innerHTML = '';
        }
    }

    //console.log(registered)
    return <>
            <div className="register">
            <div className="container">
                
                
                    <Link to="/">
                        <KeyboardReturnIcon/>
                    </Link>
                
                <div className="notice" ref={notice}>
                </div>
                <form className="form__register" ref={dataForm} onSubmit={(e) => uploadData(e)} onKeyUp={e => hiddenNotice(e)}>
                    <div className="firstName">
                        <label>First name</label>
                        <input type="text" placeholder="Enter frist name" name="firstName"/>
                    </div>
                    <div className="lastName">
                        <label>Last name</label>
                        <input type="text" placeholder="Enter last name" name="lastName"/>
                    </div>
                    <div className="age__city">
                        <div className="age">
                            <label>Age</label>
                            <select name="age">
                                {numbersAge.map(number => {
                                    return <option value={number}>{number}</option>
                                })}
                            </select>
                        </div>
                        <div className="city">
                            <label>City</label>
                            <select name="city">
                                {nameCity.map(city => {
                                    return <option value={city}>{city}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="email">
                        <label>Email</label>
                        <input type="email" placeholder="Enter email" name="email"/>
                    </div>
                    <div className="password">
                        <label>Password</label>
                        <input type="password" placeholder="Enter password" name="password"/>
                    </div>
                    <div className="verify__password">
                        <label>Verify password</label>
                        <input type="password" placeholder="Enter password" name="verify__password"/>
                    </div>
                    <div className="reason">
                        <label>Why do you like to read?</label>
                        <textarea name="textarea" placeholder="Enter coment"/>
                    </div>
                    <div className="btn__save">
                        <button type="submit">SAVE</button>
                    </div>
                </form>
            </div>
        </div>

    </>
}

export default Register
