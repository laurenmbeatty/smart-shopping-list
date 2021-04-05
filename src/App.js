import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import AddItem from './AddItem'
import './App.css'
import Footer from './components/Footer'
import getToken from './lib/tokens'
import List from './List'
import Welcome from './components/Welcome'
import { db } from './lib/firebase'

function App() {
  const [token, setToken] = useState(null)
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

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
      <Router>
        {!token && <button onClick={() => handleClick()}>Login</button>}
        <Switch>
          <Route exact path="/">
            {token ? (
              <Redirect to="/list" />
            ) : (
              <Welcome
                error={error}
                onChange={(e) => handleChange(e)}
                onSubmit={(e) => handleSubmit(e)}
                token={value}
              />
            )}
          </Route>
          {token && (
            <>
              <Route exact path="/list">
                <List token={token} />
              </Route>
              <Route exact path="/add-item">
                <AddItem token={token} />
              </Route>
            </>
          )}
        </Switch>
        {token && <Footer />}
      </Router>
    </div>
  )
}

export default App
