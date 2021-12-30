import React, { useEffect, useRef, useState } from 'react'
import './Footer.css';
import GithubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedinIcon from '@material-ui/icons/LinkedIn';
import { instanceUsers } from '../axios';
import { useDispatch } from 'react-redux';
import { historyUser } from '../features/counter/suggerensUser';

function Footer({user}) {
    const formSuggeren = useRef();
    const [ currentSuggeren, setCurrentSuggeren ] = useState([]);
    const dispatch = useDispatch();
    

    const uploadSuggeren = (e) => {
        e.preventDefault();
        const date = new Date();
        let convertToString = "";
        convertToString += date;
        let dateShort = ""
        for(let i = 0; i < convertToString.length; i++)
        {
            if(convertToString[i] === "(")
            {
                break;
            }
            dateShort += convertToString[i];
        }
        console.log(dateShort);
        let suggerenUser = "";
        const dataForm = new FormData(formSuggeren.current)
        dataForm.forEach(suggeren => suggerenUser = suggeren);
        console.log(suggerenUser);
        setCurrentSuggeren([{idUser: user._id, suggerens: suggerenUser, date: dateShort}])
    }
    console.log(currentSuggeren)

    useEffect(() => {
        const postUploadSuggerens = async(currentS) => {
            if(currentS.length > 0)
            {
                await instanceUsers.post('/v1/suggerens',{
                    idUser: currentS[0].idUser,
                    coment: currentS[0].suggerens,
                    date: currentS[0].date
                })
                await instanceUsers.post('/v1/history',{
                    idUser: currentS[0].idUser,
                    typeMovement: "Suggeren",
                    content: currentS[0].suggerens,
                    date: currentS[0].date
                })
                dispatch(historyUser({
                    idUser: currentS[0].idUser,
                    typeMovement: "Suggeren",
                    content: currentS[0].suggerens,
                    date: currentS[0].date
                }))
                setCurrentSuggeren([]);
            }
            
        }
        postUploadSuggerens(currentSuggeren);
    },[currentSuggeren]);
    return (
        <div className="footer">
            <div className="info__bookwise">
                <div>
                    <p>Company: BookWise</p>
                    <p>Author: Denis Rodriguez</p>
                    <p>Location: Cancun, Quintaroo</p>
                    <p>Email: uriaselyuyo@gmail.com</p>
                    <p>Phone: +52 933 158 0264</p>
                </div>
                <div className="social">
                    <GithubIcon/>
                    <FacebookIcon/>
                    <InstagramIcon/>
                    <TwitterIcon/>
                    <LinkedinIcon/>
                </div>
            </div>
            <div className="suggerents">
                <div>
                    <p>
                    Please, help us to update our site
                    </p>
                    <form onSubmit={(e) => uploadSuggeren(e)} ref={formSuggeren}>
                        <textarea name="coment"/>
                        <button>SEND</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Footer
