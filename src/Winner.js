import React, { useState, useEffect } from 'react'

export default function Winner(props) {
  const {
    winner,
  } = props

  return (
      <div className='modal-text'>
        {`${winner}!`}
      </div>
  )

}