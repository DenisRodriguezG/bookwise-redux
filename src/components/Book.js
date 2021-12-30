import React, { useEffect, useRef, useState } from 'react'
import './Book.css';
import FavoriteIcon from '@material-ui/icons/Favorite'
import StarIcon from '@material-ui/icons/FavoriteBorderRounded';
import WatchIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { instanceUsers } from '../axios';
import {  likes, deleteLikes } from '../features/counter/likesSlice';
import { useDispatch, useSelector } from 'react-redux';


function Book(props) {
    const [ optionsCategories, setOptionsCategories ] = useState(0)
    const [ ajedrez, setAjedrez ] = useState();
    const [ ciencia, setCiencia ] = useState();
    const [ cine, setCine ] = useState();
    const [ comics, setComics ] = useState();
    const [ desarrolloWeb, setDesarrolloWeb ] = useState();
    const [ educacion, setEducacion ] = useState();
    const [ electronica, setElectronica ] = useState();
    const [ filosofia, setFilosofia ] = useState();
    const [ historia, setHistoria ] = useState();
    const [ idiomas, setIdiomas ] = useState();
    const [ programacion, setProgramacion ] = useState();
    const [ robotica, setRobotica ] = useState();
    const [ softwareLibre, setSoftwareLibre ] = useState();
    const infoBookk = useRef();
    const [ bookChoosed, setBookChoosed ] = useState();
    const allLikesBooks = useSelector(data => data.likesUser.likes);
    const dispatch = useDispatch();
    let formLikes = useRef();
    const [ bookLike, setBookLikes ] = useState([]);
    const [ iconActive, setIconActive ] = useState(false);

 
    useEffect(() => {
    if(props.allBooksCategories !== undefined)
        {
            setAjedrez([props.allBooksCategories[0].bookAjedrez.data]);
            setCiencia([props.allBooksCategories[0].bookCiencia.data]);
            setCine([props.allBooksCategories[0].bookCine.data]);
            setComics([props.allBooksCategories[0].bookComics.data]);
            setDesarrolloWeb([props.allBooksCategories[0].bookDesarrolloWeb.data]);
            setEducacion([props.allBooksCategories[0].bookEducacion.data]);
            setElectronica([props.allBooksCategories[0].bookElectronica.data]);
            setFilosofia([props.allBooksCategories[0].bookFilosofia.data]);
            setHistoria([props.allBooksCategories[0].bookHistoria.data]);
            setIdiomas([props.allBooksCategories[0].bookIdiomas.data]);
            setProgramacion([props.allBooksCategories[0].bookProgramacion.data]);
            setRobotica([props.allBooksCategories[0].bookRobotica.data]);
            setSoftwareLibre([props.allBooksCategories[0].bookSoftwareLibre.data]);
        }


    }, []);
    console.log(props.user)
    let size = allLikesBooks.length - 1;
    console.log(allLikesBooks[size])

        const infoBook = (valor, book = 0) => {
            console.log(book)
            if(valor === true)
            {
                infoBookk.current.classList.remove('hiddenInfo');
                setBookChoosed([book]);
            }
            if(valor === false)
            {
                infoBookk.current.classList.add('hiddenInfo');
            }
        }
        
        const favoriteBook = (book) => {
            console.log(allLikesBooks);
            console.log(book)
            if(allLikesBooks.length > 0)
            {
                let existBook = allLikesBooks.find(bookL => bookL.payload._idBook === book.ID);
                console.log(existBook)
                if(existBook !== undefined)
                {
                    console.log('delete')
                    dispatch(deleteLikes({
                        payload:{
                            idUser: props.user._id,
                            _idBook: book.ID,
                            urlBook: book.cover,
                            title: book.title,
                            author: book.author
                        }
                    }))
                    setBookLikes([{
                        idUser: props.user._id,
                        _idBook: book.ID,
                        urlBook: book.cover,
                        title: book.title,
                        author: book.author
                    }])
                    setIconActive(false);
                }
                else
                {
                    dispatch(likes({
                        payload:{
                        idUser: props.user._id,
                        _idBook: book.ID,
                        urlBook: book.cover,
                        title: book.title,
                        author: book.author
                    }
                    }))
                    setBookLikes([{
                        idUser: props.user._id,
                        _idBook: book.ID,
                        urlBook: book.cover,
                        title: book.title,
                        author: book.author
                    }])
                    setIconActive(true)
                }
            }
            else
            {
                dispatch(likes({
                    payload:{
                    idUser: props.user._id,
                    _idBook: book.ID,
                    urlBook: book.cover,
                    title: book.title,
                    author: book.author
                }
                }))
                setBookLikes([{
                    idUser: props.user._id,
                    _idBook: book.ID,
                    urlBook: book.cover,
                    title: book.title,
                    author: book.author
                }])
                setIconActive(true);
            }
           /* if(book)
            {
                dispatch(likes({
                    payload:{
                    _id: props.user._id,
                    _idBook: book.ID,
                    urlBook: book.cover,
                    title: book.title,
                    author: book.author
                }
                }))
            }*/
        }
    console.log(allLikesBooks)

    console.log(bookLike)
    useEffect(() => {
        const postLikesBook = async(bookLike = []) => {
            console.log(bookLike)
                if(bookLike.length > 0)
                {
                    console.log(bookLike)
                await instanceUsers.post('/v1/likes', {
                    idUser: bookLike[0].idUser,
                    _idBook: bookLike[0]._idBook,
                    urlBook: bookLike[0].urlBook,
                    title: bookLike[0].title,
                    author: bookLike[0].author
                })
                setBookLikes([]);
            }
        }
        console.log(bookLike)
       postLikesBook(bookLike);
       window.addEventListener('click', postLikesBook())
       return () => {
           window.removeEventListener('click', postLikesBook());
       }
    }, [bookLike])
    return (
        <div className="book">
            <div className='book__container'>
                <div className='categories'>
                    <h2>Categories</h2>
                    <div className='options__categories'>
                        <ul className='list_categories'>
                            <li className={optionsCategories === 0? "active" : ""} onClick={() => setOptionsCategories(0)}>Ajedrez</li>
                            <li className={optionsCategories === 1? "active" : ""} onClick={() => setOptionsCategories(1)}>Ciencia</li>
                            <li className={optionsCategories === 2? "active" : ""} onClick={() => setOptionsCategories(2)}>Cine</li>
                            <li className={optionsCategories === 3? "active" : ""} onClick={() => setOptionsCategories(3)}>Comics</li>
                            <li className={optionsCategories === 4? "active" : ""} onClick={() => setOptionsCategories(4)}>Desarrollo Web</li>
                            <li className={optionsCategories === 5? "active" : ""} onClick={() => setOptionsCategories(5)}>Educación</li>
                            <li className={optionsCategories === 6? "active" : ""} onClick={() => setOptionsCategories(6)}>Electrónica</li>
                            <li className={optionsCategories === 7? "active" : ""} onClick={() => setOptionsCategories(7)}>Filosofía</li>
                            <li className={optionsCategories === 8? "active" : ""} onClick={() => setOptionsCategories(8)}>Historia</li>
                            <li className={optionsCategories === 9? "active" : ""} onClick={() => setOptionsCategories(9)}>Idiomas</li>
                            <li className={optionsCategories === 10? "active" : ""} onClick={() => setOptionsCategories(10)}>Programación</li>
                            <li className={optionsCategories === 11? "active" : ""} onClick={() => setOptionsCategories(11)}>Robótica</li>
                            <li className={optionsCategories === 12? "active" : ""} onClick={() => setOptionsCategories(12)}>Software libre</li>
                        </ul>
                    </div>
                </div>
                <div className="choosed__categories">
                    <h2>Name category</h2>
                    <div className='container__img__books'>
                        {
                            optionsCategories === 0 && (<>
                            {!ajedrez?
                                (<h1 style={{color: "black"}}>Wait...Loading..</h1>)
                                 :
                                 (<>
                            {ajedrez[0].map(e => {
                                let exits = false;
                               
                                allLikesBooks.forEach(book => {
                                    if(props.user._id === book.payload.idUser)
                                    {
                                    if(book.payload._idBook === e.ID)
                                    {
                                        exits = true;
                                    }
                                }
                                })
                               
                                return <><div><img src={e.cover} alt=""/><div>{exits? (<FavoriteIcon onClick={() => favoriteBook(e)}/>) : (<StarIcon onClick={() => favoriteBook(e)}/>)}<WatchIcon onClick={() => infoBook(true, e)}/></div>
                                </div></>;
                            })}
                            </>)
                            }</>)
                        }
                        {
                            optionsCategories === 1 && (<>
                            {!ciencia?
                                (<h1 style={{color: "black"}}>Wait...Loading..</h1>)
                                 :
                                 (<>
                            {ciencia[0].map(e => {
                                let exits = false;
                                allLikesBooks.forEach(book => {
                                    if(props.user._id === book.payload.idUser)
                                    {
                                    if(book.payload._idBook === e.ID)
                                    {
                                        exits = true;
                                    }
                                }
                                })
                               
                                return <><div><img src={e.cover} alt=""/><div>{exits  ? (<FavoriteIcon onClick={() => favoriteBook(e)}/>) : (<StarIcon onClick={() => favoriteBook(e)}/>)}<WatchIcon onClick={() => infoBook(true, e)}/></div>
                                </div></>;
                            })}
                            </>)
                            }</>)
                        }
                        {
                            optionsCategories === 2 && (<>
                            {!cine?
                                (<h1 style={{color: "black"}}>Wait...Loading..</h1>)
                                 :
                                 (<>
                            {cine[0].map(e => {
                                let exits = false;
                                allLikesBooks.forEach(book => {
                                    if(props.user._id === book.payload.idUser)
                                    {
                                    if(book.payload._idBook === e.ID)
                                    {
                                        exits = true;
                                    }
                                }
                                })

                               
                                return <><div><img src={e.cover} alt=""/><div>{exits ? (<FavoriteIcon onClick={() => favoriteBook(e)}/>) : (<StarIcon onClick={() => favoriteBook(e)}/>)}<WatchIcon onClick={() => infoBook(true, e)}/></div>
                                </div></>;
                            })}
                            </>)
                            }</>)
                        }
                        {
                            optionsCategories === 3 && (<>
                            {!comics?
                                (<h1 style={{color: "black"}}>Wait...Loading..</h1>)
                                 :
                                 (<>
                            {comics[0].map(e => {
                                let exits = false;
                                allLikesBooks.forEach(book => {
                                    if(props.user._id === book.payload.idUser)
                                    {
                                    if(book.payload._idBook === e.ID)
                                    {
                                        exits = true;
                                    }
                                }
                                })
                               
                                return <><div><img src={e.cover} alt=""/><div>{exits ? (<FavoriteIcon onClick={() => favoriteBook(e)}/>) : (<StarIcon onClick={() => favoriteBook(e)}/>)}<WatchIcon onClick={() => infoBook(true, e)}/></div>
                                </div></>;
                            })}
                            </>)
                            }</>)
                        }
                        {
                            optionsCategories === 4 && (<>
                            {!desarrolloWeb?
                                (<h1 style={{color: "black"}}>Wait...Loading..</h1>)
                                 :
                                 (<>
                            {desarrolloWeb[0].map(e => {
                                let exits = false;
                                allLikesBooks.forEach(book => {
                                    if(props.user._id === book.payload.idUser)
                                    {
                                    if(book.payload._idBook === e.ID)
                                    {
                                        exits = true;
                                    }
                                }
                                })
                               
                                return <><div><img src={e.cover} alt=""/><div>{exits ? (<FavoriteIcon onClick={() => favoriteBook(e)}/>) : (<StarIcon onClick={() => favoriteBook(e)}/>)}<WatchIcon onClick={() => infoBook(true, e)}/></div>
                                </div></>;
                            })}
                            </>)
                            }</>)
                        }
                        {
                            optionsCategories === 5 && (<>
                            {!educacion?
                                (<h1 style={{color: "black"}}>Wait...Loading..</h1>)
                                 :
                                 (<>
                            {educacion[0].map(e => {
                                let exits = false;
                                allLikesBooks.forEach(book => {
                                    if(props.user._id === book.payload.idUser)
                                    {
                                    if(book.payload._idBook === e.ID)
                                    {
                                        exits = true;
                                    }
                                }
                                })
                               
                                return <><div><img src={e.cover} alt=""/><div>{exits ? (<FavoriteIcon onClick={() => favoriteBook(e)}/>) : (<StarIcon onClick={() => favoriteBook(e)}/>)}<WatchIcon onClick={() => infoBook(true, e)}/></div>
                                </div></>;
                            })}
                            </>)
                            }</>)
                        }
                        {
                            optionsCategories === 6 && (<>
                            {!electronica?
                                (<h1 style={{color: "black"}}>Wait...Loading..</h1>)
                                 :
                                 (<>
                            {electronica[0].map(e => {
                                let exits = false;
                                allLikesBooks.forEach(book => {
                                    if(props.user._id === book.payload.idUser)
                                    {
                                    if(book.payload._idBook === e.ID)
                                    {
                                        exits = true;
                                    }
                                }
                                })
                               
                                return <><div><img src={e.cover} alt=""/><div>{exits ? (<FavoriteIcon onClick={() => favoriteBook(e)}/>) : (<StarIcon onClick={() => favoriteBook(e)}/>)}<WatchIcon onClick={() => infoBook(true, e)}/></div>
                                </div></>;
                            })}
                            </>)
                            }</>)
                        }
                        {
                            optionsCategories === 7 && (<>
                            {!filosofia?
                                (<h1 style={{color: "black"}}>Wait...Loading..</h1>)
                                 :
                                 (<>
                            {filosofia[0].map(e => {
                               let exits = false;
                               allLikesBooks.forEach(book => {
                                if(props.user._id === book.payload.idUser)
                                {
                                   if(book.payload._idBook === e.ID)
                                   {
                                       exits = true;
                                   }
                                }
                               })
                              
                               return <><div><img src={e.cover} alt=""/><div>{exits ? (<FavoriteIcon onClick={() => favoriteBook(e)}/>) : (<StarIcon onClick={() => favoriteBook(e)}/>)}<WatchIcon onClick={() => infoBook(true, e)}/></div>
                               </div></>;
                            })}
                            </>)
                            }</>)
                        }
                        {
                            optionsCategories === 8 && (<>
                            {!historia?
                                (<h1 style={{color: "black"}}>Wait...Loading..</h1>)
                                 :
                                 (<>
                            {historia[0].map(e => {
                                let exits = false;
                                allLikesBooks.forEach(book => {
                                    if(props.user._id === book.payload.idUser)
                                    {
                                    if(book.payload._idBook === e.ID)
                                    {
                                        exits = true;
                                    }
                                }
                                })
                               
                                return <><div><img src={e.cover} alt=""/><div>{exits ? (<FavoriteIcon onClick={() => favoriteBook(e)}/>) : (<StarIcon onClick={() => favoriteBook(e)}/>)}<WatchIcon onClick={() => infoBook(true, e)}/></div>
                                </div></>;
                            })}
                            </>)
                            }</>)
                        }
                        {
                            optionsCategories === 9 && (<>
                            {!idiomas?
                                (<h1 style={{color: "black"}}>Wait...Loading..</h1>)
                                 :
                                 (<>
                            {idiomas[0].map(e => {
                                let exits = false;
                                allLikesBooks.forEach(book => {
                                    if(props.user._id === book.payload.idUser)
                                    {
                                    if(book.payload._idBook === e.ID)
                                    {
                                        exits = true;
                                    }
                                }
                                })
                               
                                return <><div><img src={e.cover} alt=""/><div>{exits ? (<FavoriteIcon onClick={() => favoriteBook(e)}/>) : (<StarIcon onClick={() => favoriteBook(e)}/>)}<WatchIcon onClick={() => infoBook(true, e)}/></div>
                                </div></>;
                            })}
                            </>)
                            }</>)
                        }
                        {
                            optionsCategories === 10 && (<>
                            {!programacion?
                                (<h1 style={{color: "black"}}>Wait...Loading..</h1>)
                                 :
                                 (<>
                            {programacion[0].map(e => {
                               let exits = false;
                               allLikesBooks.forEach(book => {
                                if(props.user._id === book.payload.idUser)
                                {
                                   if(book.payload._idBook === e.ID)
                                   {
                                       exits = true;
                                   }
                                }
                               })
                              
                               return <><div><img src={e.cover} alt=""/><div>{exits ? (<FavoriteIcon onClick={() => favoriteBook(e)}/>) : (<StarIcon onClick={() => favoriteBook(e)}/>)}<WatchIcon onClick={() => infoBook(true, e)}/></div>
                               </div></>;
                            })}
                            </>)
                            }</>)
                        }
                        {
                            optionsCategories === 11 && (<>
                            {!robotica?
                                (<h1 style={{color: "black"}}>Wait...Loading..</h1>)
                                 :
                                 (<>
                            {robotica[0].map(e => {
                                let exits = false;
                                allLikesBooks.forEach(book => {
                                    if(props.user._id === book.payload.idUser)
                                    {
                                    if(book.payload._idBook === e.ID)
                                    {
                                        exits = true;
                                    }
                                }
                                })
                               
                                return <><div><img src={e.cover} alt=""/><div>{exits ? (<FavoriteIcon onClick={() => favoriteBook(e)}/>) : (<StarIcon onClick={() => favoriteBook(e)}/>)}<WatchIcon onClick={() => infoBook(true, e)}/></div>
                                </div></>;
                            })}
                            </>)
                            }</>)
                        }
                        {
                            optionsCategories === 12 && (<>
                            {!softwareLibre?
                                (<h1 style={{color: "black"}}>Wait...Loading..</h1>)
                                 :
                                 (<>
                            {softwareLibre[0].map(e => {
                                let exits = false;
                                allLikesBooks.forEach(book => {
                                    if(props.user._id === book.payload.idUser)
                                    {
                                    if(book.payload._idBook === e.ID)
                                    {
                                        exits = true;
                                    }
                                }
                                })
                               
                                return <><div><img src={e.cover} alt=""/><div>{exits ? (<FavoriteIcon onClick={() => favoriteBook(e)}/>) : (<StarIcon onClick={() => favoriteBook(e)}/>)}<WatchIcon onClick={() => infoBook(true, e)}/></div>
                                </div></>;
                            })}
                            </>)
                            }</>)
                        }
                    </div>
                    <div className="infoOfBookSeleted hiddenInfo" ref={infoBookk}>
                        <div>
                        <CloseIcon onClick={() => infoBook(false)}/>
                        <div>
                            {
                                bookChoosed&&
                               bookChoosed.map(e => {
                                   return <><img src={e.cover} alt=""/>
                                   <figcaption><small>Title: {e.title} <br/>Author: {e.author}<br/>Page: {e.pages}</small></figcaption>
                                   <div><p>{e.content}</p></div></>
                               })
                            }
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Book
