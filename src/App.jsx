import { useState, useEffect } from 'react'
import './App.css'

// Hardcoded puzzles for 7 days (famous movie quotes)
const PUZZLES = [
  {
    solution: ["may", "the", "force", "be", "with", "you"],
    scrambled: ["be", "with", "may", "you", "the", "force"],
    minSwaps: 4,
    theme: "Movie Quote",
    source: "Star Wars"
  },
  {
    solution: ["let", "it", "be", "let", "it", "be"],
    scrambled: ["be", "let", "it", "be", "let", "it"],
    minSwaps: 4,
    theme: "Music Lyric",
    source: "The Beatles"
  },
  {
    solution: ["the", "only", "thing", "we", "have", "to", "fear", "is", "fear", "itself"],
    scrambled: ["fear", "itself", "the", "only", "thing", "we", "have", "to", "fear", "is"],
    minSwaps: 4,
    theme: "Famous Quote",
    source: "FDR Inaugural Address"
  },
  {
    solution: ["i'm", "the", "king", "of", "the", "world"],
    scrambled: ["the", "world", "i'm", "of", "king", "the"],
    minSwaps: 4,
    theme: "Movie Quote",
    source: "Titanic"
  },
  {
    solution: ["imagine", "all", "the", "people", "living", "life", "in", "peace"],
    scrambled: ["life", "imagine", "all", "the", "people", "living", "peace", "in"],
    minSwaps: 4,
    theme: "Music Lyric",
    source: "John Lennon"
  },
  {
    solution: ["to", "be", "or", "not", "to", "be"],
    scrambled: ["not", "to", "be", "be", "or", "to"],
    minSwaps: 4,
    theme: "Famous Quote",
    source: "Shakespeare"
  },
  {
    solution: ["life", "is", "what", "happens", "when", "you're", "busy", "making", "other", "plans"],
    scrambled: ["making", "life", "is", "what", "happens", "when", "you're", "busy", "other", "plans"],
    minSwaps: 4,
    theme: "Famous Quote",
    source: "John Lennon"
  },
]

// Pick puzzle based on day of week (0=Sunday)
const today = new Date()
const puzzleIdx = today.getDay() % PUZZLES.length
const PUZZLE = PUZZLES[puzzleIdx]

// Helper to get date N days ago
function getDateNDaysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d
}
// Helper to format date as e.g. 'Sunday 13th July'
function formatDate(date) {
  const day = date.toLocaleDateString(undefined, { weekday: 'long' })
  const dayNum = date.getDate()
  const month = date.toLocaleDateString(undefined, { month: 'long' })
  // Add ordinal suffix
  const j = dayNum % 10, k = dayNum % 100
  let suffix = 'th'
  if (j === 1 && k !== 11) suffix = 'st'
  else if (j === 2 && k !== 12) suffix = 'nd'
  else if (j === 3 && k !== 13) suffix = 'rd'
  return `${day} ${dayNum}${suffix} ${month}`
}

function App() {
  const [activePuzzleIdx, setActivePuzzleIdx] = useState(puzzleIdx)
  const [words, setWords] = useState([...PUZZLES[activePuzzleIdx].scrambled])
  const [selected, setSelected] = useState(null)
  const [swaps, setSwaps] = useState(0)
  const [solved, setSolved] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  // Deep link: set puzzle from URL hash (e.g. #puzzle-2)
  useEffect(() => {
    const hash = window.location.hash
    if (hash.startsWith('#puzzle-')) {
      const idx = parseInt(hash.replace('#puzzle-', ''), 10)
      if (!isNaN(idx) && idx >= 0 && idx < PUZZLES.length) {
        setActivePuzzleIdx(idx)
        setWords([...PUZZLES[idx].scrambled])
        setSelected(null)
        setSwaps(0)
        setSolved(false)
      }
    }
  }, [])

  // When puzzle changes, update URL hash
  useEffect(() => {
    window.location.hash = `#puzzle-${activePuzzleIdx}`
  }, [activePuzzleIdx])

  // When active puzzle changes, reset state
  const handleSelectPuzzle = (idx) => {
    setActivePuzzleIdx(idx)
    setWords([...PUZZLES[idx].scrambled])
    setSelected(null)
    setSwaps(0)
    setSolved(false)
    setShowHistory(false)
  }

  // Check if solved
  const checkSolved = (arr) => {
    return arr.join(' ') === PUZZLES[activePuzzleIdx].solution.join(' ')
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
  if (swaps === PUZZLES[activePuzzleIdx].minSwaps) stars = 3
  else if (swaps === PUZZLES[activePuzzleIdx].minSwaps + 1) stars = 2

  return (
    <div className="switcheroo-container">
      <h1>Switcheroo</h1>
      <p className="subtitle">Swap, solve, and savour—one perfect sentence every day.</p>
      <div className="clue">Clue: <strong>{PUZZLES[activePuzzleIdx].theme}</strong></div>
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
        <span>Minimum: {PUZZLES[activePuzzleIdx].minSwaps}</span>
      </div>
      {solved && (
        <div className="result">
          <h2>
            {stars === 3 && '🌟 Perfect!'}
            {stars === 2 && '👍 Good!'}
            {stars === 1 && '👌 Solved!'}
          </h2>
          <p>"{PUZZLES[activePuzzleIdx].solution.join(' ')}"</p>
          <p><em>Source: {PUZZLES[activePuzzleIdx].source}</em></p>
          <p>Solved in {swaps} swaps!</p>
        </div>
      )}
      <button className="history-toggle" onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? 'Hide Puzzle Archive' : 'Show Puzzle Archive'}
      </button>
      {showHistory && (
        <div className="history-list">
          <h3>Puzzle Archive</h3>
          <ul>
            {PUZZLES.map((puzzle, i) => {
              const idx = (activePuzzleIdx - i + PUZZLES.length) % PUZZLES.length
              const date = getDateNDaysAgo(i)
              return (
                <li key={idx} style={{fontWeight: idx === activePuzzleIdx ? 'bold' : 'normal'}}>
                  <button onClick={() => handleSelectPuzzle(idx)} style={{background:'none',border:'none',color:'#2563eb',cursor:'pointer',textDecoration:'underline',fontWeight: idx === activePuzzleIdx ? 'bold' : 'normal'}}>
                    {formatDate(date)}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
