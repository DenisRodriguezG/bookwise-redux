import React, {useEffect, useState } from 'react'
import './Main.css';
import { useSelector, useDispatch } from 'react-redux';
import { instanceBooks, getBookPeticion, instanceUsers } from '../axios';
import { deleteAllLkes, likes } from '../features/counter/likesSlice';
import Header from './Header';
import Home from '../components/Home';
import Footer from './Footer';
import Book from './Book';
import User from './User';
import Login from './Login';
import { historyUser } from '../features/counter/suggerensUser';
import { Navigate } from 'react-router-dom';
import { login } from '../features/counter/counterSlice';

function Main() {
    const user = useSelector(data => data.counter.user.payload);
    const options = useSelector(data => data.options.option.payload);
    const allLikesBooks = useSelector(data => data.likesUser.likes);
    const [ bookCine, setBookCine ] = useState();
    const [ bookComics, setBookComics ] = useState([]);
    const [ allBooksCategories, setAllBooksCategories ] = useState();
    const [ updateUser, setUpdateUser ] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const updateReduxUser =  async() => {
            const usersData = await instanceUsers.get('/v1/users');
            console.log(usersData.data)
            const foundUser = usersData.data.find(u => u.email === user.email);
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
            dispatch(login({
                payload: {
                    logged: "true",
                    _id: foundUser._id,
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName,
                    age: foundUser.age,
                    city: foundUser.city,
                    email: foundUser.email,
                    password: foundUser.password,
                    whyReason: foundUser.whyReason
                }}
            ))
            dispatch(historyUser({
                idUser: foundUser._id,
                typeMovement: "Log in",
                content: "You log in Bookwise",
                date: dateShort
            }))
        }
        updateReduxUser();
    }, [])
    useEffect(() => {
        
       
        console.log(updateUser)
        const getHistoryUser = async() =>
        {
            let historyU = await instanceUsers.get('/v1/history');
            if(historyU.data.length > 0)
            {
                historyU.data.map(movement => {
                    dispatch(historyUser({
                        idUser: movement.idUser,
                        typeMovement: movement.typeMovement,
                        content: movement.content,
                        date: movement.date
                    }))
                })
            }
            console.log(historyU.data);
        }
        getHistoryUser();
        const postHistoryUser = async(movementHistory) =>
        {
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
        if(movementHistory)
        {
            const usersData = await instanceUsers.get('/v1/users');
            console.log(usersData.data)
            const foundUser = usersData.data.find(u => u.email === user.email);
            await instanceUsers.post('/v1/history', {
                idUser: foundUser._id,
                typeMovement: "Log in",
                content: "You log in Bookwise",
                date: dateShort
            })
            
        }
        }
        postHistoryUser(user);
    }, [user])
    console.log(user)
    useEffect(() => {
        
        const getDataBookCategory = async () =>
        {
            const categoryCine = getBookPeticion.category + "cine";
            const categoryComics = getBookPeticion.category + "comics";
            const categoryAjedrez = getBookPeticion.category + "ajedrez";
            const categoryCiencia = getBookPeticion.category + "ciencia";
            const categoryDesarrolloWeb = getBookPeticion.category + "desarrollo_web";
            const categoryEducacion = getBookPeticion.category + "educacion";
            const categoryElectronica = getBookPeticion.category + "electronica";
            const categoryFilosofia = getBookPeticion.category + "filosofia";
            const categoryHistoria = getBookPeticion.category + "historia";
            const categoryIdiomas = getBookPeticion.category + "idiomas";
            const categoryProgramacion = getBookPeticion.category + "programacion";
            const categoryRobotica = getBookPeticion.category + "robotica";
            const categorySoftwareLibre = getBookPeticion.category + "software_libre";
            const dataComics = await instanceBooks.get(categoryComics);
            const dataCine = await instanceBooks.get(categoryCine);
            const dataAjedrez = await instanceBooks.get(categoryAjedrez);
            const dataCiencia = await instanceBooks.get(categoryCiencia);
            const dataDesarrolloWeb = await instanceBooks.get(categoryDesarrolloWeb);
            const dataEducacion = await instanceBooks.get(categoryEducacion);
            const dataElectronica = await instanceBooks.get(categoryElectronica);
            const dataFilosofia = await instanceBooks.get(categoryFilosofia);
            const dataHistoria = await instanceBooks.get(categoryHistoria);
            const dataIdiomas = await instanceBooks.get(categoryIdiomas);
            const dataProgramacion = await instanceBooks.get(categoryProgramacion);
            const dataRobotica = await instanceBooks.get(categoryRobotica);
            const dataSoftwareLibre = await instanceBooks.get(categorySoftwareLibre);
            
            const axiosDataBooksCategories = [{ 
                bookComics: dataComics, 
                bookCine: dataCine,
                bookAjedrez: dataAjedrez,
                bookCiencia: dataCiencia,
                bookDesarrolloWeb: dataDesarrolloWeb,
                bookEducacion: dataEducacion,
                bookElectronica: dataElectronica,
                bookFilosofia: dataFilosofia,
                bookHistoria: dataHistoria,
                bookIdiomas: dataIdiomas,
                bookProgramacion: dataProgramacion,
                bookRobotica: dataRobotica,
                bookSoftwareLibre: dataSoftwareLibre             
            }]
            setAllBooksCategories(axiosDataBooksCategories);
            setBookComics(dataProgramacion.data);
            setBookCine(dataCiencia.data);
        }
        const getfavoriteBookUser = async() => {
            const dataLike = await instanceUsers.get('/v1/likes');
            console.log(dataLike)
            if(dataLike.data.length > 0)
            {
                const usersData = await instanceUsers.get('/v1/users');
            console.log(usersData.data)
            const foundUser = usersData.data.find(u => u.email === user.email);
                dataLike.data.map(bookF => {
                    if(bookF.idUser === foundUser._id)
                    {
               dispatch(likes({
                    payload: {
                        idUser: bookF.idUser,
                        _idBook: bookF._idBook,
                        urlBook: bookF.urlBook,
                        title: bookF.title,
                        author: bookF.author
                    }
                }))
            }
            })
            }

        }

       getfavoriteBookUser();
        getDataBookCategory();
    }, []);
    return <>
        <div className="main" >
            {
                options === 4 ? (<Navigate to="/login" replace/>):
            (
                <>
                <Header/>
                {
                options === 0&& <Home user={user} bookComics={bookComics} bookCine={bookCine}/>
   
                }
                {
                options === 1&& <User user={user}/>
                }
                {
                options === 2&& <Book user={user} allBooksCategories={allBooksCategories}/>
                }
            <Footer user={user}/>
                </>
            )
            }
        </div>
    </>
}

export default Main
