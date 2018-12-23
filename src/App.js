import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import Home from './components/Home'
import List from './components/List'
import Profile from './components/Profile'
import Navbar from './components/Navbar' 

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <div>
            <Navbar />
            <Route exact path='/' component={() => <Home />} />
            <Route path='/list' component={() => <List />} />
            <Route path='/profile' component={() => <Profile />} />
          </div>
        </Router>
      </>
    )
  }
}

export default App
