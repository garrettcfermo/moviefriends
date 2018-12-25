import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import firebase from 'firebase'
import Home from './components/Home'
import List from './components/List'
import Profile from './components/Profile'
import Navbar from './components/Navbar'
import axios from 'axios'

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


class App extends Component {

  state = {
    user: false,
    name: '',
    uid: '',
    text: '',
    movie: null,
    favorites: []
  }

  handleMovieInput = event => {
    this.setState({ text: event.target.value })
  }

  handeleFormSubmit = event => {
    event.preventDefault()
    axios.get(`http://www.omdbapi.com/?t=${this.state.text}&apikey=trilogy`)
      .then(r => {
        this.setState({ movie: r.data })
      })
  }

  removeMovie = () => {
    this.setState({ movie: null, text: '' })
  }

  removeMovieFromFavorites = movie => {
    firebase.database().ref(`/users/${this.state.uid}`).once('value')
      .then(r => r.val())
      .then(user => {
        for (const key in user) {
          if (user.hasOwnProperty(key)) {
            let movies = user[key].favorited || []
            let index = -1
            movies.forEach((item,itemIndex) => item.Title === movie.Title ? index = itemIndex : null )
            movies.splice(index,1)
            firebase.database().ref(`/users/${this.state.uid}/${key}`).update({ favorited: movies })
            this.setState({favorites:movies })
          }
        }
      })
  }


  favMovie = () => {
    firebase.database().ref(`/users/${this.state.uid}`).once('value')
      .then(r => r.val())
      .then(user => {
        for (const key in user) {
          if (user.hasOwnProperty(key)) {
            let movies = user[key].favorited || []
            movies.push(this.state.movie)
            let favorites = this.state.favorites || []
            favorites.push(this.state.movie)
            firebase.database().ref(`/users/${this.state.uid}/${key}`).update({ favorited: movies })
            this.setState({ movie: null, text: '' , favorites:favorites })
          }
        }
      })
  }


  componentDidMount = () => {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => this.setState({ user: !!user }))

    firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref(`/users/${user.uid}`).once('value')
        .then(r => r.val())
        .then(dbUser => {
          for (const key in dbUser) {
            if (dbUser.hasOwnProperty(key)) {
              this.setState({ name: user.displayName, uid: user.uid, favorites: dbUser[key].favorited })
            }
          }
          if (!dbUser) {
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

  componentWillUnmount() {
    this.unregisterAuthObserver()
  }

  render() {
    return (
      <>
        <Router>
          <div>
            <Navbar handleFormSubmit={this.handeleFormSubmit} isUser={this.state.user} uiConfig={uiConfig} text={this.state.text} handleMovieInput={this.handleMovieInput} />
            <Route exact path='/' component={() => <Home movie={this.state.movie} removeMovie={this.removeMovie} favMovie={this.favMovie} />} />
            <Route path='/list' component={() => <List removeMovieFromFavorites={this.removeMovieFromFavorites} favorites={this.state.favorites} />} />
            <Route path='/profile' component={() => <Profile />} />
          </div>
        </Router>
      </>
    )
  }
}

export default App
