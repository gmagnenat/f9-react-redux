import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { login, logout, selectUser } from './features/userSlice';
import { auth, onAuthStateChanged } from './firebase';
import Login from './components/Login/Login';
import Header from './components/Header/Header';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    console.log('page loaded');
  }, []);

  return (
    <div className='app'>
      <Header />

      {!user ? (
        <Login />
      ) : (
        <div className='app__body'>
          <div>
            <h1>Hello {user.displayName}!</h1>
            <p>{user.email}</p>
            <img src={user.photoUrl} alt='' />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
