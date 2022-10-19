import React from "react";
import { useState } from "react";
import Die from "./components/Die";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import Confetti from "react-confetti";

const App = () => {
  const generateNewDice = () => {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id: uuid() };
  };

  const generateAllNewDice = () => {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push(generateNewDice());
    }
    return diceArray;
  };

  const [dice, setDice] = useState(generateAllNewDice());
  const [tenzies, setTenzies] = useState(false);

  const handleRoll = () => {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : generateNewDice();
        })
      );
    } else {
      setTenzies(false);
      setDice(generateAllNewDice());
    }
  };

  const handleHeld = (id) => {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  const checkTenzies = () => {
    const allHeld = dice.every((die) => die.isHeld);
    const refValue = dice[0].value;
    const allSame = dice.every((die) => die.value === refValue);

    if (allHeld & allSame) {
      setTenzies(true);
    }
  };

  useEffect(() => {
    checkTenzies();
  }, [dice]);

  return (
    <main>
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      {tenzies && <Confetti />}
      <div className="dice-container">
        {dice.map((die) => (
          <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            handleHeld={() => handleHeld(die.id)}
          />
        ))}
      </div>
      <button onClick={handleRoll}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
};

export default App;
