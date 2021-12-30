import React, { useState, useRef, useEffect } from 'react'
import './User.css';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../features/counter/updateDataSlice';
import { login } from '../features/counter/counterSlice';
import { instanceUsers } from '../axios';

function User({ user }) {
    const [ updateUser, setUpdateUser ] = useState(false);
    const changeFirstName = useRef();
    const changeLastName = useRef();
    const changeAge = useRef();
    const changeCity = useRef();
    const dispatch = useDispatch();
    const newDataUser = useSelector(data => data.newDataUser.newData);
    const dataUserCounter = useSelector(data => data.counter.user.payload);
    const likesUser = useSelector(data => data.likesUser.likes);
    const allMovementUser = useSelector(data => data.suggerensUser.movement);

    console.log(allMovementUser);
    useEffect(() => {
        const updateDataOfUser = async (id, firstName, lastName, age, city) => {
            await instanceUsers.post('/v3/update',{
                _id: id,
                firstName: firstName,
                lastName: lastName,
                age: age,
                city: city
            })
        }
        if(newDataUser !== 0)
        {
            console.log(newDataUser.payload.age)
            updateDataOfUser(newDataUser.payload._id, newDataUser.payload.firstName, newDataUser.payload.lastName, newDataUser.payload.age, newDataUser.payload.city)
        }
    }, [newDataUser])

    const updateDataUser = (e) => {
        e.preventDefault();

        let userFirstName = changeFirstName.current.value;
        let userLastName = changeLastName.current.value;
        let userAge = changeAge.current.value;
        let userCity = changeCity.current.value;

        if(userFirstName && userLastName && userAge && userCity)
        {
            dispatch(updateData({
                payload: {
                    _id: user._id,
                    firstName: userFirstName,
                    lastName: userLastName,
                    age: userAge,
                    city: userCity
                }
            }))
            dispatch(login({
                payload:{
                _id: dataUserCounter._id,
                firstName: userFirstName,
                lastName: userLastName,
                age: userAge,
                city: userCity,
                email: dataUserCounter.email,
                password: dataUserCounter.password,
                whyReason: dataUserCounter.whyReason}
            }))
            setUpdateUser(false) 
        }
        else
        {
            console.log("It's empty")
        }
    }
    console.log(user);
    return (
        <div className="user">
            <div className="user__container">
                <div className="info__user">
                <h3>Information user</h3>
                    { !updateUser?(<>
                    <div className="user__data">
                        <p><b>First-Name: </b>{user.firstName}</p>
                        <p><b>LastName: </b>{user.lastName}</p>
                        <p><b>Age:</b> {user.age}</p>
                        <p><b>City:</b> {user.city}</p>
                        <p><b>Email:</b> {user.email}</p>
                        <p><b>I like to read...</b></p>
                        <p>{user.whyReason}</p>
                    </div>
                    <EditIcon onClick = {() => setUpdateUser(true) }/></>)
                    :
                    (<><form onSubmit={(e) => updateDataUser(e)}>
                        <div>
                        <label>First-name: </label>
                        <input type="text" name="firstName" placeholder='Change your first-name' ref={changeFirstName}/>
                        </div>
                        <div>
                        <label>Last-name: </label>
                        <input type="text" name="lastName" placeholder='Change your last-name' ref={changeLastName}/>
                        </div>
                        <div>
                        <label>Age: </label>
                        <input type="text" name="age" placeholder='Change your age' ref={changeAge}/>
                        </div>
                        <div>
                        <label>City: </label>
                        <input type="text" name="city" placeholder='Change your city' ref={changeCity}/>
                        </div>
                        <button type='submit'>UPDATE</button>
                    </form></>)
}
                </div>
                <div className="favorite__book">
                    <h3>Favorite Book</h3>
                    <div className="books__user">
                        <>
                        {
                            !likesUser? (<h1>There'are not books</h1>) :
                            (<>
                            {likesUser.map((info) => {
                                if(user._id === info.payload.idUser)
                                {
                                    return   <img src={info.payload.urlBook}/>
                                }
                            })}
                            </>)
                        }
                        </>
                    </div>
                </div>
                <div className="movement">
                    <h3>Suggerens</h3>
                    <div className='movement__user'>
                        {
                            allMovementUser.length > 0 ? (<>
                            {
                                allMovementUser.map(movement => {
                                    let verifyU = false;
                                    if(user._id === movement.idUser)
                                    {
                                        verifyU = true;
                                    }
                                    return (<>{verifyU && (<p>type: {movement.typeMovement}<br/>
                                    content: {movement.content}<br/>date: {movement.date}</p>)}</>)
                                })
                            }
                            </>)
                            :
                            (<p>There is nothing</p>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User
