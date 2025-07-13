import { useState } from 'react'
import './App.css'

// Hardcoded puzzle for prototype
const PUZZLE = {
  solution: ['The', 'Sun', 'rises', 'in', 'the', 'east.'],
  scrambled: ['Sun', 'the', 'rises', 'east.', 'the', 'in'],
  minSwaps: 2,
}

function App() {
  const [words, setWords] = useState([...PUZZLE.scrambled])
  const [selected, setSelected] = useState(null)
  const [swaps, setSwaps] = useState(0)
  const [solved, setSolved] = useState(false)

  // Check if solved
  const checkSolved = (arr) => {
    return arr.join(' ') === PUZZLE.solution.join(' ')
  }

  // Handle word click
  const handleWordClick = (idx) => {
    if (solved) return
    if (selected === null) {
      setSelected(idx)
    } else if (selected === idx) {
      setSelected(null)
    } else {
      // Swap
      const newWords = [...words]
      ;[newWords[selected], newWords[idx]] = [newWords[idx], newWords[selected]]
      setWords(newWords)
      setSwaps(swaps + 1)
      setSelected(null)
      if (checkSolved(newWords)) setSolved(true)
    }
  }

  // Star rating logic
  let stars = 1
  if (swaps === PUZZLE.minSwaps) stars = 3
  else if (swaps === PUZZLE.minSwaps + 1) stars = 2

  return (
    <div className="switcheroo-container">
      <h1>Switcheroo</h1>
      <p className="subtitle">Swap, solve, and savour—one perfect sentence every day.</p>
      <div className="sentence">
        {words.map((word, idx) => (
          <button
            key={idx}
            className={`word-tile${selected === idx ? ' selected' : ''}${solved ? ' solved' : ''}`}
            onClick={() => handleWordClick(idx)}
            disabled={solved}
          >
            {word}
          </button>
        ))}
      </div>
      <div className="info">
        <span>Swaps: {swaps}</span>
        <span>Perfect: {PUZZLE.minSwaps}</span>
      </div>
      {solved && (
        <div className="result">
          <h2>
            {stars === 3 && '🌟 Perfect!'}
            {stars === 2 && '👍 Good!'}
            {stars === 1 && '👌 Solved!'}
          </h2>
          <p>"{PUZZLE.solution.join(' ')}"</p>
          <p>Solved in {swaps} swaps!</p>
        </div>
      )}
    </div>
  )
}

export default App
