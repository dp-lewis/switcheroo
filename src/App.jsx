import { useState, useEffect } from 'react'
import './App.css'

// Hardcoded puzzles for 7 days (famous movie quotes)
const PUZZLES = [
  // --- Original 7 puzzles ---
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
  // --- 20 new puzzles ---
  {
    solution: ["frankly", "my", "dear", "i", "don't", "give", "a", "damn", "about", "anything", "else"],
    scrambled: ["damn", "anything", "else", "frankly", "my", "dear", "i", "don't", "give", "a", "about"],
    minSwaps: 5,
    theme: "Movie Quote",
    source: "Gone with the Wind"
  },
  {
    solution: ["i", "could", "have", "been", "a", "contender", "i", "could", "have", "been", "somebody"],
    scrambled: ["been", "i", "could", "have", "been", "somebody", "a", "contender", "i", "could", "have"],
    minSwaps: 4,
    theme: "Movie Quote",
    source: "On the Waterfront"
  },
  {
    solution: ["there's", "no", "place", "like", "home", "when", "you're", "with", "family", "and", "friends"],
    scrambled: ["home", "when", "you're", "with", "family", "and", "friends", "there's", "no", "place", "like"],
    minSwaps: 5,
    theme: "Famous Quote",
    source: "The Wizard of Oz (paraphrased)"
  },
  {
    solution: ["all", "the", "world's", "a", "stage", "and", "all", "the", "men", "and", "women", "merely", "players"],
    scrambled: ["players", "all", "the", "world's", "a", "stage", "and", "all", "the", "men", "and", "women", "merely"],
    minSwaps: 4,
    theme: "Famous Quote",
    source: "Shakespeare"
  },
  {
    solution: ["we", "don't", "need", "no", "education", "we", "don't", "need", "no", "thought", "control"],
    scrambled: ["education", "we", "don't", "need", "no", "thought", "control", "we", "don't", "need", "no"],
    minSwaps: 4,
    theme: "Music Lyric",
    source: "Pink Floyd"
  },
  {
    solution: ["you", "can't", "always", "get", "what", "you", "want", "but", "if", "you", "try", "sometimes"],
    scrambled: ["want", "but", "if", "you", "try", "sometimes", "you", "can't", "always", "get", "what", "you"],
    minSwaps: 5,
    theme: "Music Lyric",
    source: "The Rolling Stones"
  },
  {
    solution: ["i", "have", "a", "dream", "that", "one", "day", "this", "nation", "will", "rise", "up"],
    scrambled: ["nation", "will", "rise", "up", "i", "have", "a", "dream", "that", "one", "day", "this"],
    minSwaps: 4,
    theme: "Famous Quote",
    source: "Martin Luther King Jr."
  },
  {
    solution: ["just", "a", "small", "town", "girl", "living", "in", "a", "lonely", "world", "she", "took", "the", "midnight", "train"],
    scrambled: ["girl", "living", "in", "a", "lonely", "world", "she", "took", "the", "midnight", "train", "just", "a", "small", "town"],
    minSwaps: 6,
    theme: "Music Lyric",
    source: "Journey"
  },
  {
    solution: ["to", "infinity", "and", "beyond", "reach", "for", "the", "sky", "never", "give", "up"],
    scrambled: ["beyond", "reach", "for", "the", "sky", "never", "give", "up", "to", "infinity", "and"],
    minSwaps: 5,
    theme: "Movie Quote",
    source: "Toy Story (paraphrased)"
  },
  {
    solution: ["i", "get", "by", "with", "a", "little", "help", "from", "my", "friends"],
    scrambled: ["from", "my", "friends", "i", "get", "by", "with", "a", "little", "help"],
    minSwaps: 4,
    theme: "Music Lyric",
    source: "The Beatles"
  },
  {
    solution: ["the", "greatest", "glory", "in", "living", "lies", "not", "in", "never", "falling", "but", "in", "rising", "every", "time", "we", "fall"],
    scrambled: ["fall", "the", "greatest", "glory", "in", "living", "lies", "not", "in", "never", "falling", "but", "in", "rising", "every", "time", "we"],
    minSwaps: 7,
    theme: "Famous Quote",
    source: "Nelson Mandela"
  },
  {
    solution: ["i", "will", "survive", "oh", "as", "long", "as", "i", "know", "how", "to", "love", "i", "know", "i'll", "stay", "alive"],
    scrambled: ["alive", "i", "will", "survive", "oh", "as", "long", "as", "i", "know", "how", "to", "love", "i", "know", "i'll", "stay"],
    minSwaps: 7,
    theme: "Music Lyric",
    source: "Gloria Gaynor"
  },
  {
    solution: ["all", "you", "need", "is", "love", "love", "is", "all", "you", "need"],
    scrambled: ["love", "is", "all", "you", "need", "all", "you", "need", "is", "love"],
    minSwaps: 4,
    theme: "Music Lyric",
    source: "The Beatles"
  },
  {
    solution: ["i", "am", "the", "master", "of", "my", "fate", "i", "am", "the", "captain", "of", "my", "soul"],
    scrambled: ["captain", "of", "my", "soul", "i", "am", "the", "master", "of", "my", "fate", "i", "am", "the"],
    minSwaps: 6,
    theme: "Famous Quote",
    source: "William Ernest Henley"
  },
  {
    solution: ["i", "see", "trees", "of", "green", "red", "roses", "too", "i", "see", "them", "bloom", "for", "me", "and", "you"],
    scrambled: ["bloom", "for", "me", "and", "you", "i", "see", "trees", "of", "green", "red", "roses", "too", "i", "see", "them"],
    minSwaps: 7,
    theme: "Music Lyric",
    source: "Louis Armstrong"
  },
  {
    solution: ["i", "have", "nothing", "to", "offer", "but", "blood", "toil", "tears", "and", "sweat"],
    scrambled: ["tears", "and", "sweat", "i", "have", "nothing", "to", "offer", "but", "blood", "toil"],
    minSwaps: 5,
    theme: "Famous Quote",
    source: "Winston Churchill"
  },
  {
    solution: ["every", "little", "thing", "is", "gonna", "be", "alright", "don't", "worry", "about", "a", "thing"],
    scrambled: ["alright", "don't", "worry", "about", "a", "thing", "every", "little", "thing", "is", "gonna", "be"],
    minSwaps: 5,
    theme: "Music Lyric",
    source: "Bob Marley"
  },
  {
    solution: ["the", "future", "belongs", "to", "those", "who", "believe", "in", "the", "beauty", "of", "their", "dreams"],
    scrambled: ["beauty", "of", "their", "dreams", "the", "future", "belongs", "to", "those", "who", "believe", "in", "the"],
    minSwaps: 5,
    theme: "Famous Quote",
    source: "Eleanor Roosevelt"
  },
  {
    solution: ["i", "walk", "a", "lonely", "road", "the", "only", "one", "that", "i", "have", "ever", "known"],
    scrambled: ["the", "only", "one", "that", "i", "have", "ever", "known", "i", "walk", "a", "lonely", "road"],
    minSwaps: 5,
    theme: "Music Lyric",
    source: "Green Day"
  },
  {
    solution: ["i", "will", "find", "a", "way", "or", "make", "one", "if", "it", "is", "important", "enough"],
    scrambled: ["make", "one", "if", "it", "is", "important", "enough", "i", "will", "find", "a", "way", "or"],
    minSwaps: 5,
    theme: "Famous Quote",
    source: "Hannibal (paraphrased)"
  },
  {
    solution: ["i", "get", "knocked", "down", "but", "i", "get", "up", "again", "you're", "never", "gonna", "keep", "me", "down"],
    scrambled: ["again", "you're", "never", "gonna", "keep", "me", "down", "i", "get", "knocked", "down", "but", "i", "get", "up"],
    minSwaps: 6,
    theme: "Music Lyric",
    source: "Chumbawamba"
  },
  {
    solution: ["the", "only", "limit", "to", "our", "realization", "of", "tomorrow", "will", "be", "our", "doubts", "of", "today"],
    scrambled: ["our", "doubts", "of", "today", "the", "only", "limit", "to", "our", "realization", "of", "tomorrow", "will", "be"],
    minSwaps: 5,
    theme: "Famous Quote",
    source: "FDR"
  },
  {
    solution: ["i", "want", "to", "break", "free", "i", "want", "to", "ride", "my", "bicycle", "i", "want", "to", "make", "a", "supersonic", "man", "out", "of", "you"],
    scrambled: ["ride", "my", "bicycle", "i", "want", "to", "make", "a", "supersonic", "man", "out", "of", "you", "i", "want", "to", "break", "free", "i", "want", "to"],
    minSwaps: 8,
    theme: "Music Lyric",
    source: "Queen (combined lyrics)"
  },
  {
    solution: ["i", "have", "not", "failed", "i've", "just", "found", "ten", "thousand", "ways", "that", "won't", "work"],
    scrambled: ["ways", "that", "won't", "work", "i", "have", "not", "failed", "i've", "just", "found", "ten", "thousand"],
    minSwaps: 5,
    theme: "Famous Quote",
    source: "Thomas Edison"
  },
  {
    solution: ["i", "still", "haven't", "found", "what", "i'm", "looking", "for", "but", "i", "try", "and", "i", "try"],
    scrambled: ["try", "and", "i", "try", "i", "still", "haven't", "found", "what", "i'm", "looking", "for", "but"],
    minSwaps: 5,
    theme: "Music Lyric",
    source: "U2"
  },
  {
    solution: ["the", "purpose", "of", "our", "lives", "is", "to", "be", "happy", "and", "spread", "joy"],
    scrambled: ["be", "happy", "and", "spread", "joy", "the", "purpose", "of", "our", "lives", "is", "to"],
    minSwaps: 4,
    theme: "Famous Quote",
    source: "Dalai Lama (paraphrased)"
  }
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
