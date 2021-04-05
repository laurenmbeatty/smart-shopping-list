import React, { useState } from 'react'
import { writeToFirestore } from './lib/firebase'

const AddItem = ({ token }) => {
  const list = token
  const [name, setName] = useState('')
  const [daysUntilPurchase, setDaysUntilPurchase] = useState(7)

  const handleSubmit = (e) => {
    e.preventDefault()
    writeToFirestore(list, {
      name,
      lastPurchasedDate: null,
      daysUntilPurchase,
    })
    setName('')
    setDaysUntilPurchase(7)
  }

  const handleChange = (e) => {
    setDaysUntilPurchase(parseInt(e.target.value))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <fieldset>
          <legend>How soon are you likely to buy it?</legend>
          <input
            checked={daysUntilPurchase === 7}
            type="radio"
            id="soon"
            name="when"
            value={7}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="soon">Soon</label>
          <br />

          <input
            checked={daysUntilPurchase === 14}
            type="radio"
            id="kindof"
            name="when"
            value={14}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="kindof">Kind of Soon</label>
          <br />

          <input
            checked={daysUntilPurchase === 30}
            type="radio"
            id="not"
            name="when"
            value={30}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="not">Not Soon</label>
        </fieldset>
        <button type="submit">Add item</button>
      </form>
    </div>
  )
}

export default AddItem
