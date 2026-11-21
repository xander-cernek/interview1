# CLAUDE.md

## Project overview
<!-- What this project is and what it should do -->
This is a take-home interview for Silkline to demonstrate my ability to utilize AI in my development and show off my workflow.

## Tech stack
<!-- Languages, frameworks, key libraries -->
React
Typescript
Claude
https://ant.design

## Commands
<!-- How to install, run, test, and lint -->
Prerequisites: Node.js 22.22+ or 24.15+ (required by jsdom/Vitest) and npm. Package manager is npm.
Always commit `package-lock.json` so `npm install` gives the reviewer the exact same versions.
Keep README.md's "Running locally" section accurate — it's what the interviewer follows.

```bash
npm install          # install dependencies
npm run dev          # start dev server (http://localhost:5173)
npm run build        # type-check + production build
npm run preview      # serve the production build locally
npm test             # run tests once (Vitest)
npx vitest           # run tests in watch mode
npm run lint         # ESLint
```

## Conventions
<!-- Code style, structure, naming, anything Claude should follow -->

## Notes
<!-- Constraints, gotchas, things to avoid -->
Don't overengineer- the more files or loc you add (outside of needed React stuff), the worse.

TEST-DRIVEN: When coding with AI, use testing guardrails and that way the agent can self-correct based on test results.

This is for myself. Stoplights are extremely complex and I'm anticipating the problem getting extended in the live review. For example, here are all of the things I can anticipate (off the top of my head):
- Arrows
- Multi-sided stoplights
- Other states such as blinking red lights
- Multiple lights on at once such as green and green arrow
- Overriding the signal for emergency vehicles
- Double-red (some states have double red lights for some reason)
- The magnet override thingy where if no cars are coming it'll change the light
- Stopwalk button changing the light (Is that real? It never works for me :) )

So a state machine will get very complex.