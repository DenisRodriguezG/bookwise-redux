import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import PreviosIcon from '@material-ui/icons/SkipPrevious';
import NextIcon from '@material-ui/icons/SkipNext';

function Home(props) {
    const booksContainer = useRef();
    const [ left, setLeft ] = useState(0);
    const [ current, setCurrent ] = useState(0)
    const [ bookDestacado, setBookDestacado ] = useState([]);
    const [ allBooks, setAllBooks ] = useState([]);
    const [ isThereDestacado, setIsThereDescado ] = useState(false);
    const [ check, setCheck ] = useState(false);
    const bookLenght = allBooks.length - 1;

    useEffect(() => {
        let mm = window.matchMedia('(max-width: 768px)').media
        window.addEventListener('resize', () => {
            if(window.matchMedia('(max-width: 768px)').matches)
        {
            setCheck(true);
            
        }
        else
        {
            setCheck(false);
        }
        })
        
    }, [])
    useEffect(() => {
        if(props.bookCine)
        {

        let book = []
        let _allBooks = book.concat(props.bookCine).concat(props.bookComics)
        let numberAlea = parseInt(Math.floor(Math.random() * (_allBooks.length - 1)));
        if(numberAlea)
        {
            setIsThereDescado(true);
        }
            
        setBookDestacado([_allBooks[numberAlea]])
        setAllBooks(_allBooks)
        }
    }, [props.bookCine])


    const sliceBooks = () => {
        console.log('size--->' + bookLenght)
        setCurrent(current !== 0 ? current - 1 : bookLenght)
    }
    const right = () => {
        setCurrent(current < bookLenght ? current + 1 : 0)
        
    }
    console.log(current)
    return (
        <div className="home">
            <div className="container__home">
                <div className="welcome">
                    <p>
                    Hello <b>{props.user.firstName} {props.user.lastName}</b> welcome to BookWise.<br/>
                    In our website you'll find many books.<br/>
                    We have books of programming, Science, Comics,etc.
                    This books is for you, because we want that you'll get
                    a lot of wise. The programming is very important in 
                    world. The educaction is very important, our books is 
                    order per categories. Categories: chess, science, cine,                     develoment web, disign 3D, electronica, novelas, idiomas 
                    and more.</p>
                </div>
                <div className="book__destacado">
                    {isThereDestacado? <>
                    <h1>Destacado</h1>
                    <img src={bookDestacado[0].cover} alt=""/>
                    <div>
                    <h3>Title: {bookDestacado[0].title}</h3>
                    <h3>Author: {bookDestacado[0].author}</h3>
                    </div></>:
                    <>
                    <h1>wait....loading</h1>
                    </>
                   }
                 </div>
            </div>
            <div className="slice__book">
                <div className="botton__left" onClick={() => sliceBooks()}>
                    <PreviosIcon/>
                </div>
                <div className="books__container" ref={booksContainer}>
                    {
                        allBooks.map((book, index) => {
                            let titleBook = "";
                            let authorBook = "";
                            let titleBook2 = "";
                            let authorBook2 = "";
                            for(let i = 0; i < book.title.length; i++)
                            {
                                if(!check)
                                {
                                    if(i <= 20)
                                {
                                    titleBook += book.title[i];
                                    
                                    if(book.author.length >= 20 )
                                    {
                                        
                                            authorBook += book.author[i];
                                    }
                                    else
                                    {
                                        authorBook = book.author;  
                                    }
                                }
                                else
                                {
                                    break;
                                }
                                }
                                else
                                {
                                    if(i <= 10)
                                {
                                    titleBook2 += book.title[i];
                                    if(book.author.length >= 10 )
                                    {
                                        
                                            authorBook2 += book.author[i];
                                    }
                                    else
                                    {
                                        authorBook2 = book.author;  
                                    }
                                }
                                else
                                {
                                    break;
                                }
                                }
                                
                            }
                            if(!check && current === index)
                            {
                                return <div className="books">
                                <h3>{titleBook}...</h3>
                                <img src={book.cover}/>
                                <h3>{authorBook}</h3>
                                </div>
                            }
                            if(check)
                            {
                                return <div className="books">
                                <h5>{titleBook2}...</h5>
                                <img src={book.cover}/>
                                <h6>{authorBook2}</h6>
                                </div>
                            }
                            
                        })
                    }

                </div>
                <div className="botton__rigth" onClick={() => right()}>
                    <NextIcon/>
                </div>
            </div>
        </div>
    )
}

export default Home
