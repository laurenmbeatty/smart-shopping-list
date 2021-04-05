import React from 'react'

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
        <div>Your list is empty</div>
      )}
    </div>
  )
}

export default List
