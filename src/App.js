import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [gengarHP, setGengarHP] = useState(100);
  const [reshiramHP, setReshiramHP] = useState(100);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [battleMessage, setBattleMessage] = useState("Choose your move!");
  const [isReshiramAttacking, setIsReshiramAttacking] = useState(false);

  const getRandomDamage = () => {
    return Math.floor(Math.random() * 26) + 5; // 5 to 30
  };

  useEffect(() => {
    if (gengarHP <= 0) {
      setBattleMessage("Gengar fainted! You lose!");
    } else if (reshiramHP <= 0) {
      setBattleMessage("Reshiram fainted! You win!");
    }
  }, [gengarHP, reshiramHP]);

  const playerAttack = (moveName) => {
    if (!isPlayerTurn || gengarHP <= 0 || reshiramHP <= 0) return;

    const playerDamage = getRandomDamage();
    setReshiramHP((prev) => Math.max(0, prev - playerDamage));
    setBattleMessage(`Gengar used ${moveName}! Dealt ${playerDamage} damage!`);
    setIsReshiramAttacking(false);
    setIsPlayerTurn(false);

    setTimeout(() => {
      if (reshiramHP - playerDamage > 0) {
        const opponentDamage = getRandomDamage();
        setGengarHP((prev) => Math.max(0, prev - opponentDamage));
        setBattleMessage(
          `Reshiram used Dragon Pulse! Dealt ${opponentDamage} damage!`
        );
        setIsReshiramAttacking(true);
      }
      setIsPlayerTurn(true);
    }, 2000);
  };

  return (
    <div className="App">
      <div className="opponent">
        <div className="pokemon-info">
          <h3>Reshiram Lv.50</h3>
          <div className="hp-bar">
            <div className="hp-fill" style={{ width: `${reshiramHP}%` }}></div>
          </div>
          <p>HP: {reshiramHP}/100</p>
        </div>
        <img
          src="/assets/reshiram.gif"
          alt="Reshiram"
          className={`reshiram ${reshiramHP <= 0 ? "fainted" : ""}`}
        />
      </div>

      <div
        className={`battle-message ${
          isReshiramAttacking ? "reshiram-message" : ""
        }`}
      >
        <p>{battleMessage}</p>
      </div>

      <div className="player">
        <img
          className={`gengar ${gengarHP <= 0 ? "fainted" : ""}`}
          src="/assets/gengar.gif"
          alt="Gengar"
        />
        <div className="pokemon-info">
          <h3>Gengar Lv.50</h3>
          <div className="hp-bar">
            <div className="hp-fill" style={{ width: `${gengarHP}%` }}></div>
          </div>
          <p>HP: {gengarHP}/100</p>
        </div>

        <div className="skills">
          <ul className="top-row">
            <li className="skill">
              <button
                onClick={() => playerAttack("Shadow Ball")}
                disabled={!isPlayerTurn}
              >
                Shadow Ball
              </button>
            </li>
            <li className="skill">
              <button
                onClick={() => playerAttack("Dark Pulse")}
                disabled={!isPlayerTurn}
              >
                Dark Pulse
              </button>
            </li>
          </ul>
          <ul className="bottom-row">
            <li className="skill">
              <button
                onClick={() => playerAttack("Sludge Bomb")}
                disabled={!isPlayerTurn}
              >
                Sludge Bomb
              </button>
            </li>
            <li className="skill">
              <button
                onClick={() => playerAttack("Venoshock")}
                disabled={!isPlayerTurn}
              >
                Venoshock
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
