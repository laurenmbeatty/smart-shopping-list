import React from 'react'
import { Link } from 'react-router-dom'

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
          <Link exact to="/add-item">
            add an item
          </Link>
          ?
        </p>
      )}
    </div>
  )
}

export default List
