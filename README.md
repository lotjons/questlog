# Questlog

Questlog is a small app where I keep track of my games: what I want to play, what I'm playing now, what I've finished and what I gave up on.

I made it for Assignment 2 in the JavaScript frameworks course.

- **Live:** https://lottie-questlog.vercel.app/
- **Handle:** `lottie`
- **Grade I'm aiming for:** VG

## Features

- List all games and filter by status
- Open a game to see cover, platform, rating and notes
- Add, edit and delete games
- Loading and error messages
- 404 page
- The filter is saved in localStorage, so it's still there after a reload

## How to run it

```bash
git clone https://github.com/lotjons/questlog.git
cd questlog
npm install
npm run dev
```

Then open http://localhost:5173.

Built with React, TypeScript, Vite, React Router, Tailwind and Biome. Hosted on Vercel.

## My hooks

All fetching happens in my hooks in `src/hooks`. The pages just call a hook and show the result.

- **`useGames(status)`** gets all games, or only one status. It returns `games`, `isLoading` and `error`, and fetches again when the filter changes.
- **`useGame(id)`** gets one game. If it doesn't exist, the page shows the 404 message from the API.
- **`useSaveGame()`** has `addGame`, `updateGame` and `deleteGame`. They only return whether it worked. The page decides what happens next, like going to another page or asking "are you sure?" before deleting.
- **`useLocalStorage(key, startValue)`** works like `useState` but saves the value in localStorage. I use it for the filter and for the pause button on the heading.

In the earlier puns exercises I had fetch and useEffect inside the components, and the files got long and messy. At first I didn't really see the point of custom hooks, it felt like I was just moving the code around. But when I built the edit page, I could reuse `useGame(id)` straight away, and suddenly it clicked for me. Now each page is mostly just HTML and all the API code is in one file, so it's also easier to find bugs.

## Design

I went for a dark theme with dark green and a serif font, because I wanted it to feel a bit like a game but still calm. In the list I draw my own covers with the game title, because the example covers from the API looked messy together. On the game page you see the real cover. The cover images in `public/covers` are my own artwork, made for this project.

The "My games" heading moves slowly, so there's a pause button, and it stays still if you have "reduce motion" turned on in your computer settings.

## Use of AI

I used Claude as a kind of tutor, mostly to understand custom hooks since I missed some lectures, and to find bugs. I wrote and committed the code myself. I also let it create my GitHub issues from my plan to try that out.

## Reflection

**What I learned about custom hooks**

Before this project I didn't know much about custom hooks. Now I see that a custom hook is basically a normal function that starts with `use` and uses other hooks inside it, like `useState` and `useEffect`. It's a way to move logic out of a component.

That's why the fetch code is in `useGames.ts` and not in my pages. I want to keep the logic separate from what each page shows. Otherwise every page would have to do everything itself, and the project would get big, repetitive and hard for another developer to read. With hooks, the hook takes care of *how* to get the data (fetching, loading and errors), and the page only decides *what* to show.

I also learned that two pages using the same hook don't share data. I use `useGame(id)` on both the game page and the edit page, but each of them gets its own `game`, `isLoading` and `error`. I think of a hook as a recipe, not a shared box.

In `useSaveGame`, the hook only tells the page if it worked. `addGame` returns the new game or `null`, and `deleteGame` returns `true` or `false`. Then the page decides what happens next, like calling `navigate` or asking with `window.confirm`. That way the hook doesn't need to know anything about pages or buttons, so it isn't hard-coded and can be used anywhere.

I learned the rules of hooks too. Hooks always have to be called at the top of the component, never inside an `if` or after an early `return`, because React keeps track of them by the order they are called in. That's why `useGame` and `useSaveGame` come before `if (isLoading) return ...` in my pages.

Finally, I understood why `[status]` is in the dependency array in `useGames`. It makes the hook fetch again when I change the filter. Without it, the list wouldn't update when I click another filter. The cleanup function (`ignore = true`) makes sure that an old answer that arrives late doesn't overwrite a newer one.

**Other things I learned**

I learned to look at the real API response before writing my types. For example, `rating` can be `null`, and `coverUrl` and `notes` are empty strings when they're missing.

I also learned that `npm run dev` doesn't check the types. My app worked locally, but the build failed on Vercel, so now I always run `npm run build` before I push.

**What was hard**

It was hard to keep track of everything when the files got longer. TypeScript's error messages helped me a lot to find what I had missed.

I also had to learn the difference between what's on my computer, what's committed and what's actually live on Vercel. Now I always run `npm run build` and check `git status` before I push.

**Next steps**

If I had more time, I would add a search field and let you add your own cover image.