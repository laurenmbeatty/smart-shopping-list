import React from 'react'
import { NavLink } from 'react-router-dom'

const List = ({ loading, results }) => {
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : results && results.docs.length > 0 ? (
        <ul>
          {results.docs.map((item) => (
            <li key={item.data().name}>{item.data().name}</li>
          ))}
        </ul>
      ) : (
        <p>
          Your list is empty. Why don't you{' '}
          <NavLink exact to="/add-item">
            add an item
          </NavLink>
          ?
        </p>
      )}
    </div>
  )
}

export default List
