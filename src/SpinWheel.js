import React, { useState, useEffect } from 'react'

import Odds from "./Odds"
import Modal from './Modal'
import Winner from './Winner'
import Save from './Save'

import { preSaveWheels } from './wheelsData'

import Github from './svg/Github'

export default function SpinWheel() {
  const defaultWheel = preSaveWheels.find(w => w.name === 'Default')
  
  const [colors, setColors] = useState(['#006d77', '#83c5be', '#ffddd2', '#e29578'])
  const ballsCount = 10

  const [angle, setAngle] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('history') || []))
  const [wheels, setWheels] = useState(JSON.parse(localStorage.getItem('wheels') || []))
  const [actualWheel, setActualWheel] = useState('')
  const [nextValue, setNextValue] = useState(() => defaultWheel.nextValue)
  const [spinValues, setSpinValues] = useState(defaultWheel.segments)
  
  const [isWinnerOpen, setIsWinnerOpen] = useState(false)
  const [isSaveOpen, setIsSaveOpen] = useState(false)

  function spinBall() {
    setIsSpinning(true)
    setAngle(prevAngle => {
      const [_, yes] = spinValues
      const laps = 20
      // const suplement = 360 - (prevAngle % 360)
      const newAngle = (360 * laps) + 360 * Math.random()
      return prevAngle - newAngle
    })
  }

  function addHistory() {
    const actualAngle = Math.abs(angle % 360)
    const segmentWinner = spinValues.find((s, i) => {
      const sum = i > 0 ? spinValues.reduce((acc, curr, index) => index < i ? acc + curr.value : acc ,0) * 360 / 100 : 0
      const angleSegment = sum + (s.value * 360 / 100)
      const isBetween = actualAngle > sum && actualAngle < angleSegment
      if (isBetween) return s
    })

    setHistory(prev => [...prev, segmentWinner])
    setIsWinnerOpen(true)
  }


  console.log(nextValue)

  // Modal

  function closeModal(e, callback) {
    if (!e.target.className.includes('modal')) return
  
    callback()

  }

  // Elements

  const aroundBallsElements = Array(ballsCount).fill().map((_, i) => {
    return (
      <div className='spin-balls-container' style={{
        transform: `rotate(${360/ballsCount * i}deg)`
      }} key={i}>
        <div className='spin-around-ball'></div>
      </div>
    )
  })

  const spinSegmentsElements = spinValues.map((s, i) => {
    const {value, text} = s
    const sumPercentage = spinValues.slice(0, -(spinValues.length - i))?.reduce((acc, curr) => acc + curr.value ,0)
    const angleLessThan = value < 12
    const higherText = spinValues.reduce((prev, curr) => prev.text.length > curr.text.length ? prev : curr).text.length
    // const fontSize = -(higherText/4) + 3.25
    const fontSize = (100/120)**(higherText-7)+0.5
    return (
      <>
        <div 
          className='spin-segment' 
          style={{
            background: `conic-gradient(${s.color} ${s.value}%, transparent 0)`,
            transform: `rotate(${360*sumPercentage/100}deg)`,
            filter: `brightness(${s.isFocus ? '110' : '100'}%)`,
          }} 
          key={i}
          // onAnimationEnd={() => setIsBlinking(false)}
        >
          <div className='spin-content' style={{
            transform: `rotate(${180*(s.value/100)}deg)`,
          }}>
            <div className={`spin-text ${angleLessThan ? 'outside' : ''}`} style={{
                // transform: angleLessThan ? `translate(-50%, -400%) rotate(90deg)` : `translate(-50%, -50%) rotate(90deg)`,
                fontSize: `${fontSize}rem`
            }}>{s.text}</div>
          </div>
        </div>
      </>
    )
  })

  useEffect(() => {
    const stringify = JSON.stringify(wheels)
    localStorage.setItem('wheels', stringify)
  }, [wheels])

  useEffect(() => {
    const stringify = JSON.stringify(history)
    localStorage.setItem('history', stringify)
  }, [history])

  return (
    <>
      <Modal
        isOpen={isWinnerOpen}
        onClick={(e) => closeModal(e, () => setIsWinnerOpen(false))}
      >
        <Winner 
          winner={history[history.length-1]?.text}
        />
      </Modal>
      <Modal
        isOpen={isSaveOpen}
        onClick={(e) => closeModal(e, () => setIsSaveOpen(false))}
      >
        <Save
          setWheels={setWheels}
          spinValues={spinValues}
          closeSave={() => setIsSaveOpen(false)}
          setActualWheel={setActualWheel}
          isOpen={isSaveOpen}
        />
      </Modal>
      <header className='main-header'>
        <h2>SpinWheel</h2>
        <a href="https://github.com/ccostafrias" target='_blank'>
          <Github
            className='icon-medium'
          />
        </a>
      </header>
      <main className='main-app'>
        <div className='spin-container'>
          <div className="spin-pointer-wrapper">
            <div className="spin-pointer"></div>
          </div>
          <button type='button' className="spin-ball" onClick={spinBall}>SPIN</button>
          <div 
            className="spin-segments-wrapper" 
            style={{
              transform: `rotate(${angle}deg)`
            }}
            onTransitionEnd={(e) => {
              if (e.propertyName !== 'transform') return
              setIsSpinning(false)
              addHistory()
            }}
          >
            <div className='spin-balls-wrapper' style={{
              transform: `translate(-50%, -50%) rotate(${360/(ballsCount*2)}deg)`
            }}>
              {aroundBallsElements}
            </div>
            {spinSegmentsElements}
          </div>
        </div>
        <Odds 
          spinValues={spinValues}
          setSpinValues={setSpinValues}
          isSpinning={isSpinning}
          colors={colors}
          history={history}
          setHistory={setHistory}
          wheels={wheels}
          setWheels={setWheels}
          setIsSaveOpen={setIsSaveOpen}
          actualWheel={actualWheel}
          setActualWheel={setActualWheel}
          setColors={setColors}
          setNextValue={setNextValue}
          nextValue={nextValue}
        />
      </main>
    </>
  )
}