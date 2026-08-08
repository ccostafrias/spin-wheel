import React, { useState, useEffect } from 'react'

export default function Modal(props) {
  const {
    isOpen,
    closeModal,
    children,
    onClick,
  } = props

  const [show, setShow] = useState('')

  function handleTransitionEnd(e) {
    // if (e.propertyName !== 'opacity') return
    if (show === 'close') setShow('')
  }

  useEffect(() => {
    if (isOpen && !show) setShow('open')
    if (!isOpen && show) setShow('close')
  }, [isOpen])

  if (isOpen || show) {
    return (
      <div className={`modal ${show}`} onClick={onClick} onAnimationEnd={handleTransitionEnd}>
        {children}
      </div>
    )
  }
  
  return null
}