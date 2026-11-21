import { useEffect, useState } from 'react'

type Color = 'red' | 'yellow' | 'green'
type LightState = 'on' | 'off'

// Open-ended state machine: each color just advances to the next one.
const NEXT: Record<Color, Color> = { green: 'yellow', yellow: 'red', red: 'green' }
const DURATION_S: Record<Color, number> = { green: 5, yellow: 1, red: 2 }

function Light({ color, state }: { color: Color; state: LightState }) {
  const on = state === 'on'
  return (
    <div
      aria-label={`${color} ${state}`}
      style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: color,
        opacity: on ? 1 : 0.25,
        boxShadow: on ? `0 0 24px ${color}` : 'inset 0 4px 8px rgba(0,0,0,0.6)',
      }}
    />
  )
}

function App() {
  const [{ active, seconds }, setLight] = useState<{ active: Color; seconds: number }>({
    active: 'green',
    seconds: 0,
  })

  // One 1s tick drives both the light and the corner timer, so they can't drift
  // apart: once the active light has run its duration, advance and reset to 0.
  useEffect(() => {
    const interval = setInterval(
      () =>
        setLight(({ active, seconds }) =>
          seconds + 1 >= DURATION_S[active]
            ? { active: NEXT[active], seconds: 0 }
            : { active, seconds: seconds + 1 },
        ),
      1000,
    )
    return () => clearInterval(interval)
  }, [])

  let red: LightState = 'off'
  let yellow: LightState = 'off'
  let green: LightState = 'off'
  if (active === 'red') {
    red = 'on'
  } else if (active === 'yellow') {
    yellow = 'on'
  } else {
    green = 'on'
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
      <div style={{ position: 'fixed', top: 16, right: 16, fontFamily: 'monospace', fontSize: 20 }}>
        {seconds + 1}s
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          padding: 16,
          background: '#222',
          borderRadius: 24,
        }}
      >
        <Light color="red" state={red} />
        <Light color="yellow" state={yellow} />
        <Light color="green" state={green} />
      </div>
    </div>
  )
}

export default App
