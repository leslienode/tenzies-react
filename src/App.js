import React, { useState, useEffect } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
  const [dice, setDice] = useState(createNewDice)
  const [tenzie, setTenzie] = useState(false)
  const [rollPressed, setRollPressed] = useState(0)

  useEffect(() => {
    const allTrue = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value
    const compareValues = dice.every((die) => firstValue === die.value)
    if (allTrue && compareValues) {
      setTenzie(true)
    }
  }, [dice])

  // Creates an array with 10 objects which contains die value, id and isHeld property
  function createNewDice() {
    const diceArray = []
    for (let i = 0; i < 10; i++) {
      diceArray.push({
        value: Math.ceil(Math.random() * 6),
        id: nanoid(),
        isHeld: false,
      })
    }
    return diceArray
  }

  // Function to click and hold a die
  function holdDie(id) {
    if (!tenzie) {
      setDice((prevDice) => {
        return prevDice.map((die) => {
          return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        })
      })
    }
  }

  // Rolls new dice values and id's when the button "Roll" is clicked
  function rollNewDice() {
    setDice((prevDice) => {
      return prevDice.map((item) => {
        if (item.isHeld) {
          return item
        } else {
          return {
            value: Math.ceil(Math.random() * 6),
            id: nanoid(),
            isHeld: false,
          }
        }
      })
    })

    if (tenzie) {
      setTenzie(false)
      setDice(createNewDice)
      setRollPressed(-1)
    }
    setRollPressed((prevRollPressed) => prevRollPressed + 1)
  }

  return (
    <main>
      {tenzie && <Confetti />}
      <div className="container">
        <h1 className="title">Tenzi game</h1>

        <div className="dice-container">
          {dice.map((die) => {
            return (
              <Die
                holdDie={() => holdDie(die.id)}
                value={die.value}
                key={die.id}
                isHeld={die.isHeld}
              />
            )
          })}
        </div>
        <button onClick={rollNewDice} className="roll-button">
          {tenzie ? "New game" : "Roll"}
        </button>
        {tenzie && (
          <div className="roll-count">
            <h2>
              You rolled <span className="count-face">{rollPressed}</span>{" "}
              {rollPressed === 1 ? "time" : "times"}{" "}
            </h2>
          </div>
        )}
      </div>
    </main>
  )
}
