import React, { useState, useEffect, useRef } from 'react'

import ArrowLeft from "./svg/ArrowLeft"
import Close from "./svg/Close"

export default function Odds(props) {

  const {
    spinValues, 
    setSpinValues,
    isSpinning,
    colors,
  } = props

  const [isDown, setIsDown] = useState(true)
  const [clickedInput, setClickedInput] = useState(null)
  const [focusedInput, setFocusedInput] = useState(null)
  const isDownRef = useRef(true)

  const arrowSize = getComputedStyle(document.documentElement)
    .getPropertyValue('--arrow-size')
  
  function handleChange(event) {
    if (isDown) return
    const {value, name} = event.target
    let valueFiltered = Number(value.replace(/\D/g, '').replace(/^0+/, '')) || 0

    adjustValues(valueFiltered, name)
  }

  function adjustValues(value, name) {
    if (value <= 0) value = 1
    else if (value >= 100) value = 99

    setSpinValues(prevSpinValues => {
      const sumValues = prevSpinValues.reduce((acc, curr) => curr.name !== name ? acc + curr.value : acc, 0)
      return prevSpinValues.map(sv => {
        return sv.name === name ? {...sv, value} : {...sv, value: (sv.value*(100-value))/sumValues}
      })
    })
  }

  function handleChangeInput(e) {
    const {value, name, id} = e.target

    setSpinValues(prev => {
      return prev.map(s => {
        return s.name === name ? (
          {...s, [id]: value}
        ) : s
      })
    })
  }

  function highlightSegment(highlight, name) {
    setSpinValues(prevSpinValues => {
      return prevSpinValues.map(sv => {
        return sv.name === name ? {...sv, isFocus: highlight ? true : false} : {...sv, isFocus: false}
      })
    })
  }

  function addMoreOdds() {
    setSpinValues(prev => {
      const newValue = prev.length + 1
      const name = `sv-${newValue}`
      const value = 100 / newValue
      const withNewOdd = [
        ...prev,
        {
          name,
          text: `Choice ${newValue}`,
          color: colors[prev.length % colors.length],
          isFocus: false,
        }
      ]
      const adjustValues = withNewOdd.map(s => {
        const sumValues = withNewOdd.reduce((acc, curr) => curr.name !== name ? acc + curr.value : acc, 0)
        return s.name === name ? {...s, value} : {...s, value: (s.value*(100-value))/sumValues}
      })
      return adjustValues
    })
  }

  function removeOdd(name) {
    setSpinValues(prev => {
      const filtered = prev.filter(s => s.name !== name)
      const sumValues = filtered.reduce((acc, curr) => curr.name !== name ? acc + curr.value : acc, 0)
      const adjustValues = filtered.map(s => {
        return {...s, value: (s.value*100)/sumValues}
      })
      return adjustValues
    })
  }
  
  function handleInputClick(e, name) {
    const {type} = e
    if (type.includes('down') & focusedInput !== name) {
      setClickedInput(name)
    }
    else if (type.includes('up')) {
      if (clickedInput) {
        setClickedInput(null)
        setIsDown(isDownRef.current)
      }
      
      if (name) {
        const selectedInput = e.target.type ? e.target : [...e.target.closest('.odd-percentage').children][0]
        if (focusedInput !== name) selectedInput.select()
        setFocusedInput(name)
        selectedInput.focus()
      }
    }
  }
  
  function handleMouseMove(e) {
    if (!clickedInput || isSpinning) return
    const {movementX} = e
    const name = clickedInput
    const value = spinValues.find(sv => sv.name === name).value + movementX
    adjustValues(value, name)
  }

  function handleMouseContainer(down) {
    isDownRef.current = down
    if (isSpinning) return
    if (!clickedInput && !focusedInput) setIsDown(down)
  }

  useEffect(() => {

  }, [])
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleInputClick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleInputClick)
    }
  }, [spinValues, clickedInput])

  const oddsElements = spinValues.map((s, i) => {
    return (
      <div 
        className='odd'
        onMouseEnter={() => highlightSegment(true, s.name)}
        onMouseLeave={() => highlightSegment(false, s.name)}
      >
        <span className='odd-label-wrapper'>
          <input 
            type="color"
            className='odd-color'
            name={s.name} 
            id="color"
            value={s.color}
            onChange={handleChangeInput}
          />
          {/* <span className='odd-color' style={{
            backgroundColor: s.color
          }}/> */}
          <input
            className='odd-text'
            name={s.name}
            id='text'
            value={s.text}
            onChange={handleChangeInput}
          />
        </span>
        <span 
          className='odd-percentage'
          onMouseDown={(e) => handleInputClick(e, s.name)}
          onMouseUp={(e) => handleInputClick(e, s.name)}
        >
          <input
            type="text"
            value={`${s.value}`}
            className={`odd-input ${(clickedInput === s.name || focusedInput === s.name) ? 'is-changing' : ''} ${focusedInput === s.name ? 'is-focused' : ''}`}
            name={s.name}
            id={s.name}
            onChange={handleChange}
            onFocus={() => highlightSegment(true, s.name)}
            onBlur={() => {
              highlightSegment(false, s.name)
              setFocusedInput(null)
            }}
            autoComplete='off'
            key={i}
          />
          <span>%</span>
        </span>
        {/* {s.name !== 'sv-1' && s.name !== 'sv-2' && */}
          <Close 
            className='icon-small icon-click'
            onClick={() => spinValues.length > 2 ? removeOdd(s.name) : null}
          />
        {/* } */}
      </div>
    )
  })

  return (
    <>
      <div 
        className='odds-container' 
        style={{
          transform: isDown ? `translateX(calc(100% - 42px - ${arrowSize}))` : 'translateX(0)'
        }}
        onMouseOver={() => handleMouseContainer(false)}
        onMouseLeave={() => handleMouseContainer(true)}
      >
        <div 
          className="arrow-wrapper" 
          style={{
            opacity: isDown ? '1' : '0',
            pointerEvents: isDown ? 'all' : 'none',
          }}
        >
          <ArrowLeft />
        </div>
        <div 
          className="odds-content" 
          style={{
            opacity: isDown ? '0' : '1',
            pointerEvents: isDown ? 'none' : 'all',
          }}
        >
          <h3>Change odds:</h3>
          <div className='odds-wrapper'>
              {oddsElements}
          </div>
          <button 
            className='bttn dark anim'
            onClick={addMoreOdds}
          >
            +
          </button>
        </div>
      </div>
    </>
  )
}
