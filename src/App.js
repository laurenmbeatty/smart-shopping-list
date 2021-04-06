import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import AddItem from './AddItem'
import './App.css'
import Footer from './components/Footer'
import Welcome from './components/Welcome'
import { db } from './lib/firebase'
import getToken from './lib/tokens'
import List from './List'

function App() {
  const [token, setToken] = useState(null)
  const [value, setValue] = useState('')
  const [joinError, setError] = useState(false)
  const list = token
  const [results, loading, error] = useCollection(db.collection(list || 'user'))

  useEffect(() => {
    const user = localStorage.getItem('userToken')
    user && setToken(user)
  }, [token])

  const handleClick = () => {
    setToken(localStorage.setItem('userToken', getToken()))
    db.collection('userTokens').add({
      tokenName: token,
    })
  }

  const handleChange = (e) => {
    setValue(e.target.value)
    setError(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const tokens = await db
      .collection('userTokens')
      .where('tokenName', '==', value)
      .get()
    if (tokens.empty) {
      setError(true)
    } else {
      localStorage.setItem('userToken', value)
      setToken(value)
    }
  }

  return (
    <div className="App">
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      <Router>
        {!token && <button onClick={() => handleClick()}>Login</button>}
        <Switch>
          <Route exact path="/">
            {token ? (
              <Redirect to="/list" />
            ) : (
              <Welcome
                error={joinError}
                onChange={(e) => handleChange(e)}
                onSubmit={(e) => handleSubmit(e)}
                token={value}
              />
            )}
          </Route>
          <Route exact path="/list">
            {!token ? (
              <Redirect to="/" />
            ) : (
              <List loading={loading} results={results} token={token} />
            )}
          </Route>
          <Route exact path="/add-item">
            {!token ? (
              <Redirect to="/" />
            ) : (
              <AddItem token={token} results={results} />
            )}
          </Route>
        </Switch>
        {token && <Footer />}
      </Router>
    </div>
  )
}

export default App
