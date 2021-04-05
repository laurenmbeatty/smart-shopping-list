import React from 'react'

const Welcome = ({ error, onChange, onSubmit, token }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="token">Enter code</label>
        <input
          name="token"
          id="token"
          type="text"
          onChange={onChange}
          value={token}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <h2>Oops, looks like that token doesn't exist</h2>}
    </div>
  )
}

export default Welcome
