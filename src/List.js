import React from 'react'
import { differenceInHours } from 'date-fns'
import { Link } from 'react-router-dom'
import { timestamp, updateFirestore } from './lib/firebase'

const List = ({ loading, results, token }) => {
  const handlePurchase = (e, item) => {
    const id = e.target.id
    const purchaseDates = item.purchaseDates || []
    updateFirestore(token, id, {
      lastPurchasedDate: timestamp,
      purchaseDates: [...purchaseDates, timestamp],
    })
  }

  const checkHours = (lastPurchased) => {
    return differenceInHours(lastPurchased, timestamp) < 24
  }

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : results && results.docs.length > 0 ? (
        <ul>
          {results.docs.map((item) => (
            <li key={item.data().name}>
              <input
                checked={
                  item.data().lastPurchasedDate
                    ? checkHours(item.data().lastPurchasedDate)
                    : false
                }
                disabled={
                  item.data().lastPurchasedDate
                    ? checkHours(item.data().lastPurchasedDate)
                    : false
                }
                id={item.id}
                name={item.id}
                type="checkbox"
                onChange={(e) => handlePurchase(e, item.data())}
              />
              <label htmlFor={item.id}>{item.data().name}</label>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          Your list is empty. Why don't you{' '}
          <Link to="/add-item">add an item</Link>?
        </p>
      )}
    </div>
  )
}

export default List
