# Questlog

Questlog is my game backlog app. It keeps track of the games I want to play, the ones I'm playing right now, the ones I've finished and the ones I gave up on.

I built it for Assignment 2 in the JavaScript frameworks course, to practise React Router, working with a REST API and writing my own custom hooks.

**Live site:** https://lottie-questlog.vercel.app/
**Grade I'm aiming for:** VG
**My handle:** `lottie` (my games are saved here: https://questlog-api.vercel.app/api/lottie/games)

## What you can do

- [ ] See all my games and filter them by status (All, Want to play, Playing, Completed, Dropped)
- [ ] Open a game to see its cover, platform, rating and notes
- [ ] Add a new game
- [ ] Edit a game, for example change the status or rating
- [ ] Delete a game
- [ ] See a loading message while data is loading, and an error message if something goes wrong
- [ ] Get a 404 page if the page or game doesn't exist
- [ ] Keep the selected filter after reloading the page

## Built with

- React and TypeScript (with Vite)
- React Router
- Tailwind CSS
- Biome for linting and formatting
- Vercel for hosting

## How to run it

1. Clone the repo and install the packages:

   ```bash
   git clone https://github.com/lotjons/questlog.git
   cd questlog
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Open http://localhost:5173 in your browser.

I also use `npm run check` to check the code with Biome before I commit, and `npm run format` to fix the formatting.

## My custom hooks

_I'll write this when the hooks are done: how `useGames`, `useGame`, `useSaveGame` and `useLocalStorage` work, and why I put the fetch logic in hooks._

## Reflection

_Coming