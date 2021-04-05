import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from './lib/firebase'

const List = ({ token }) => {
  const list = token
  const [results, loading, error] = useCollection(db.collection(list))

  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading ? (
        <span>Collection: Loading...</span>
      ) : results && results.docs.length > 0 ? (
        <ul>
          {results &&
            results.docs.map((item) => (
              <li key={item.data().name}>{item.data().name}</li>
            ))}
        </ul>
      ) : (
        <h2>Your list is empty</h2>
      )}
    </div>
  )
}

export default List
