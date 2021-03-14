import { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {FormControl, InputLabel, Input, Button, FormControlLabel, Checkbox} from '@material-ui/core';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


if(firebase.apps.length === 0)
{
  firebase.initializeApp(firebaseConfig);
}

function Login() {

  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const [newUser, setNewUser] = useState(true);

  const [user, setUser] = useState({
      isSignedIn: false,
      isSignedInFb: false,
     name: '',
     photo: '',
     email: '',
     password: '',
     success: false,
     error: ''
  });

  const [LoggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let {from} = location.state || {from: {pathname: "/"}};

  const handleSignGoogle = () =>
  {
      firebase.auth().signInWithPopup(provider)
      .then(res => {
          const {displayName, photoURL, email} = res.user;
          const getUser = {
            isSignedIn: true,
            name: displayName,
            photo: photoURL,
            email: email
          }
          setUser(getUser);
          setLoggedInUser(getUser);
          history.replace(from);
      }).catch((error) => {
        console.log(error);
      })
  }

  const signOut = () =>{
      firebase.auth().signOut()
      .then(res =>{
          const signOutGoogle = {
            isSignedIn: false,
            name: '',
            photo: '',
            email: ''
          }
          setUser(signOutGoogle);
      })
  }

  const handleSignFb = () =>{
    firebase.auth().signInWithPopup(fbProvider)
    .then((result) => {
      console.log(result);
      const {displayName, photoURL} = result.user;
      const getData = {
        isSignedInFb: true,
        name: displayName,
        photo: photoURL
      }
      setUser(getData);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const logOut = () =>{
    firebase.auth().signOut().then(() => {
      const setNull ={
        isSignedInFb: false,
        name: '',
        photo: ''
      }
      setUser(setNull);
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleChange = (e) =>
  {
      //console.log(e.target.value);
      let isValid = true;
      if(e.target.name === 'email')
      {
          const isValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e.target.value);
      }

      if(e.target.name === 'password')
      {
          const isLenValid = e.target.value.length >= 6;
          const isValPass = /^(?=.*[a-z])(?=.*[0-9]).*$/.test(e.target.value);
          const isValid = isLenValid && isValPass;
      }

      if(isValid)
      {
          const newUser = {...user};
          newUser[e.target.name] = e.target.value;
          setUser(newUser);
      }
  }

  const handleSignUp = (e) =>
  {
      if(newUser && user.email && user.email)
      {
          firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then((res) => {
            // Signed in 
            const newUser = {...user};
            newUser.success = true;
            newUser.error = '';
            setUser(newUser);
            setLoggedInUser(newUser);
            history.replace(from);
            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            const newUser = {...user};
            newUser.success = false;
            newUser.error = errorMessage;
            setUser(newUser);
            console.log(errorCode, errorMessage)
            // ..
          });
      }

      if(!newUser && user.email && user.password)
      {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((res) => {
              // Signed in
              const newUser = {...user};
              newUser.success = true;
              newUser.error = '';
              setUser(newUser);
              setLoggedInUser(newUser);
              history.replace(from);
              // ...
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              const newUser = {...user};
              newUser.error = errorMessage;
              newUser.success = false;
              setUser(newUser);
              console.log(errorCode, errorMessage)
            });
      }

      e.preventDefault();
  }

  return (
    <div className="App">
    <h1>User Registration System</h1>

    {
        user.isSignedIn && <div>
          <h2>Welcome {user.name}</h2>
          <img style={{borderRadius: "50%"}} src={user.photo}></img>
        </div>
    }

    <form>
    {
        newUser && <div>
          <FormControl>
              <InputLabel htmlFor="my-input1">Name</InputLabel>
              <Input type="text" name="name" onChange={handleChange} id="my-input1" />
          </FormControl>
          <br /><br />
        </div>
    }
        <FormControl>
            <InputLabel htmlFor="my-input2">Email address</InputLabel>
            <Input type="text" name="email" onChange={handleChange} id="my-input2" />
        </FormControl>
        <br /><br />
        <FormControl>
            <InputLabel htmlFor="my-input3">Password</InputLabel>
            <Input type="password" name="password" onChange={handleChange} id="my-input3" />
        </FormControl>
        <br /><br />
        <Button variant="contained" onClick={handleSignUp} color="primary" type="submit">{newUser ? "Sign Up" : "Sign In"}</Button><br />
        <FormControlLabel
        onChange={() => setNewUser(!newUser)}
        control={<Checkbox  name="checkedA" />}
        label="Login"
      />
    </form>
      {
          user.isSignedIn ? <Button style={{textTransform:"capitalize"}} onClick={signOut} variant="contained" color="secondary">
      Sign Out
    </Button> : <Button style={{textTransform:"capitalize"}} onClick={handleSignGoogle} variant="contained" color="secondary">
      Sign In with Google
    </Button>
      }
      <br /><br />
      {
          user.isSignedInFb ? <Button style={{textTransform:"capitalize"}} onClick={logOut} variant="contained" color="primary">
          Log Out
        </Button> : <Button style={{textTransform:"capitalize"}} onClick={handleSignFb} variant="contained" color="primary">
          Sign In with Facebook
        </Button>
      }

      <p style={{color: 'red'}}>{user.error}</p>
      {user.success && <p style={{color: 'green'}}>User {newUser ? "Created": "Logged In"} Successfully!</p>}
    </div>
  );
}

export default Login;
