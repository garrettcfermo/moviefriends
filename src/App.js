import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import firebase from 'firebase'
import Home from './components/Home'
import List from './components/List'
import Profile from './components/Profile'
import Navbar from './components/Navbar' 

const config = {
  apiKey: "AIzaSyDQAVxFA82LaH9vkEtaWgpsaAqbN8mqTJU",
  authDomain: "flixshare-gcf1100.firebaseapp.com",
  databaseURL: "https://flixshare-gcf1100.firebaseio.com",
  projectId: "flixshare-gcf1100",
  storageBucket: "flixshare-gcf1100.appspot.com",
  messagingSenderId: "919158435021"
}
const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
}
firebase.initializeApp(config)

//  User
//  Name
//  email
//  birth date
//  bio
//  hometown
//  friends [user w/o shared, friends]
//  shared movies []
//  favorited movies []




class App extends Component {

  state = {
    user:false,
    name:'',
    uid:''
  }

  componentDidMount = () => {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user =>this.setState({user : !!user}))
    
    firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref(`/users/${user.uid}`).once('value')
      .then(r => r.val())
      .then(dbUser => {
        this.setState({ name: user.displayName, uid:user.uid})
        if (!dbUser){
          firebase.database().ref(`/users/${user.uid}`).push({
            name: user.displayName,
            email: user.email,
            birth: '01/01/2001',
            bio: `Hello! My name is ${user.displayName}`,
            hometown: 'Irvine',
            friends: [],
            shared: [],
            favorited: []
          })
        }
      })
    })
  }

  render() {
    return (
      <>
        <Router>
          <div>
            <Navbar isUser={this.state.user} uiConfig={uiConfig} />
            <Route exact path='/' component={() => <Home  />} />
            <Route path='/list' component={() => <List />} />
            <Route path='/profile' component={() => <Profile />} />
          </div>
        </Router>
      </>
    )
  }
}

export default App
