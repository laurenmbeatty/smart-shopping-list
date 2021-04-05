import React, { useEffect, useState } from 'react'
import { writeToFirestore } from './lib/firebase'

const AddItem = ({ results, token }) => {
  const list = token
  const [name, setName] = useState('')
  const [duplicateError, setDuplicateError] = useState(false)
  const [daysUntilPurchase, setDaysUntilPurchase] = useState(7)
  const [normalizedList, setNormalizedList] = useState([])

  useEffect(() => {
    const list =
      results && results.docs.map((item) => item.data().name.toLowerCase())
    setNormalizedList(list)
  }, [results])

  const checkItem = (value) => {
    const newItem = value
      .toLowerCase()
      .replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '')
    return normalizedList.includes(newItem)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const itemExists = checkItem(name.trim())
    if (itemExists) {
      setDuplicateError(true)
    } else {
      writeToFirestore(list, {
        name,
        lastPurchasedDate: null,
        daysUntilPurchase,
      })
      setName('')
      setDaysUntilPurchase(7)
    }
  }

  const handleChange = (e) => {
    setDaysUntilPurchase(parseInt(e.target.value))
  }

  const handleNameChange = (e) => {
    setDuplicateError(false)
    setName(e.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          onChange={(e) => handleNameChange(e)}
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
      {duplicateError && <p>That item is already on your list!</p>}
    </div>
  )
}

export default AddItem
