import React, { useState, useEffect } from 'react'

export default function Modal(props) {
  const {
    isOpen,
    closeModal,
    winner,
  } = props

  const [show, setShow] = useState('')

  function handleTransitionEnd(e) {
    if (e.propertyName !== 'opacity') return
    if (show === 'close') setShow('')
  }

  console.log(isOpen, show)

  useEffect(() => {
    if (isOpen && !show) setShow('open')
    if (!isOpen && show) setShow('close')
  }, [isOpen])

  if (isOpen || show) {
    return (
      <div className={`modal ${show}`} onClick={closeModal} onTransitionEnd={handleTransitionEnd}>
        <div className='modal-text'>{`${winner}!`}</div>
      </div>
    )
  }
  
  return null
}