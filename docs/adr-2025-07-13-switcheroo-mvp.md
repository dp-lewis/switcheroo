# Architectural Decision Record: Switcheroo MVP

**Date:** 2025-07-13

## Context

Switcheroo is a daily word puzzle web app inspired by games like Wordle. Each day, users are presented with a scrambled sentence (from movie quotes, music lyrics, or famous quotes) and must solve it by swapping two words at a time, aiming for the minimum number of swaps. The MVP is implemented as a React app, built with Vite, and deployed to GitHub Pages via GitHub Actions.

## Decisions

- **Frontend Stack:**
  - React (with hooks, functional components)
  - Vite for fast development and builds
  - CSS for styling (minimal, clean, mobile-friendly)

- **Puzzle Content:**
  - 7 hardcoded puzzles (mix of movie quotes, music lyrics, and famous quotes)
  - Each puzzle requires at least 4 swaps to solve
  - Each puzzle includes a theme (as a clue) and a source (displayed on solve)

- **Gameplay Mechanics:**
  - Players swap two words at a time to rearrange the sentence
  - Move counter and minimum swaps are displayed
  - Star rating (Perfect/Good/Solved) based on moves
  - Clue (theme) is shown above the puzzle
  - Archive allows access to previous puzzles by date
  - Deep linking via URL hash (e.g. #puzzle-2) for sharing specific puzzles

- **UI/UX:**
  - Clean, accessible, and mobile-friendly
  - Archive is shown at the bottom, with dates as buttons
  - No puzzle answers are shown in the archive
  - Source is shown only after solving

- **Deployment:**
  - GitHub Actions workflow builds and deploys to GitHub Pages on every push to `main`
  - Vite `base` is set for correct GitHub Pages routing
  - Title and branding updated to "Switcheroo"

## Status

- MVP is complete and ready for user testing and feedback
- All code and configuration are in the repository

## Future Considerations

- Add more puzzles and automate daily rotation
- Add user stats, streaks, and sharing features
- Improve accessibility and add animations
- Support for custom domains or PWA features

---

*This ADR documents the key decisions and implementation details for the Switcheroo MVP as of 2025-07-13.*
