import React, { useState, useEffect } from 'react'

export default function Winner(props) {
  const {
    wheels,
    setWheels,
    spinValues,
    closeSave,
  } = props

  const [input, setInput] = useState({
    save: '',
  })
  const [alert, setAlert] = useState(false)

  function handleChange(e) {
    const {name, value} = e.target
    setInput(prev => (
      {
        ...prev,
        [name]: value,
      }
    ))
  }

  function handleSubmit(e) {
    console.log(input.save)
    // e.preventDefault()
    if (!input.save) {
      setAlert(true)
    } else {
      setWheels(prev => {
        return [
          ...prev,
          {
            name: input.save,
            segments: [
              ...spinValues,
            ]
          },
        ]
      })
      closeSave()
    }
  }

  return (
      <div className='save-container'>
        <span>Wheel name:</span>
        <span className='save-alert' style={{
          display: alert ? 'block' : 'none',
        }}>Give it a name!</span>
        <input 
          type="text"
          className='save-input' 
          name="save"
          id="save" 
          value={input.save}
          onChange={handleChange}
          autoComplete='off'
        />
        <button type='submit' className='bttn anim' onClick={handleSubmit}>Save</button>
      </div>
  )

}