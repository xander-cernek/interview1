### Problem

Meta: Create a simple "stoplight" app that simulates a north American stoplight: Red, Yellow, and Green. 

## Part 1: 
Meta: Create a stoplight in CSS

# Components:
1. Render a sample "Stoplight" in CSS, it should be recognizable.

# Claude notes:
- Built in `src/App.tsx`: a dark rounded housing (flex column) holding three circular lights, stacked red/yellow/green top to bottom like a North American signal.
- A `Light` component takes `color` and `on`. Lit lights are full opacity with a glow; unlit ones are dimmed with an inset shadow. Red is lit as a static sample.
- Styles are inline, with no extra CSS files or antd, to keep the code small. `Light` is ready for Part 2's timer/state machine to drive `on`.

## Part 2:
Meta: Make the stoplight work on a timer. Create a "state machine" that simulates the movement between red, yellow, and green on a stoplight. Since the current problem only asks for the light to change on a signal, we can keep the state machine open-ended for now, basically moving Green -> Yellow -> Red -> Green... without validating the previous color.

# Components
1. Light component that takes in a color and a state.
2. Main component holds state of current active light
3. Timer in the main component that changes the state of the active light state
4. Main component will switch the light on of the active state and the other lights off in an if-else statement

# Claude notes:
- `App` holds the `active` color, which starts on green. A single 1s `setInterval` (set up once in a `useEffect`) advances the light to `NEXT[active]` once it has been on for its duration.
- The state machine is two lookup tables. `NEXT` gives the order (green → yellow → red → green) with no check on the previous color, and `DURATION_S` gives each color's time in seconds (green 5, yellow 1, red 2).
- `Light` now takes `state: 'on' | 'off'` to match the spec. `App` uses an if-else to set the active light `on` and the others `off`.

## Part 3:
Just for my sanity add a timer to the top right of the page. The timer should reset once the light changes

# Claude notes:
- The top-right timer shows which second of the current light we're in, counting from 1, so green shows 1s–5s and then switches. It resets to 1s on each change.
- Changed in Part 3: Part 2 used a separate `setTimeout` for light changes. Running it alongside a 1s counter made them race when both fired at the same moment, so one 1s interval now updates `{ active, seconds }` together in a single state update. Because of that, durations must be whole seconds.
- `src/App.test.tsx` (Vitest with fake timers) covers the starting state, the green → yellow → red → green timing, and the timer counting up and resetting on each change.
