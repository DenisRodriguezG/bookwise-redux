import React, { useState, useRef, useEffect } from 'react'
import './Header.css';
import logologin from './logologin.svg';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { options } from '../features/counter/optionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
    const [ toggleMenu, setMenu ] = useState(false);
    const dispatch = useDispatch();
    const headerNav = useRef();
    const opt = useSelector(data => data.options.option.payload)

    const toggleShowMenu = (value) => {
        console.log(value)
        if(value === true)
        {
            headerNav.current.classList.add('show__menu');
            setMenu(true)
        }
        else if(value === false)
        {
            headerNav.current.classList.remove('show__menu');
            setMenu(false)
        }
    }
    const hiddenOptions = (v) => {
        if(v === true)
        {
            headerNav.current.classList.remove('show__menu');
            setMenu(false)   
        }
    }
    const setOptions = (option) => {
        dispatch(options({
            payload: option
        }))
    }
    return (
        <div className="header" ref={headerNav}>
            {
                !toggleMenu? (
                <div className="open__menu" onClick={() => toggleShowMenu(true)}>
                    <MenuIcon/>
                </div>
                )
                :
                (
                <div className="close__menu" onClick={() => toggleShowMenu(false)}>
                    <CloseIcon/>
                </div>
                )
            }
            <div className="header__logo">
                <img src={logologin} alt=""/>
            </div>
            <ul className="header__options">
               <li className={opt === 0? "activeO" : ""} onClick={() => {setOptions(0); hiddenOptions(true)}} >HOME</li>
               <li className={opt === 1? "activeO" : ""} onClick={() => {setOptions(1); hiddenOptions(true)}} >USER</li>
               <li className={opt === 2? "activeO" : ""} onClick={() => {setOptions(2); hiddenOptions(true)}}>BOOKS</li>
               <li className={opt === 3? "activeO" : ""} onClick={() => {setOptions(3); hiddenOptions(true)}}>CONTACTS</li>
               <li className={opt === 4? "activeO" : ""} onClick={() => {setOptions(4); hiddenOptions(true)}}>LOGOUT</li>
            </ul>
        </div>
    )
}

export default Header
