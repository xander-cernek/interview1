import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms))

const expectActive = (active: string) => {
  for (const color of ['red', 'yellow', 'green']) {
    const state = color === active ? 'on' : 'off'
    expect(screen.getByLabelText(`${color} ${state}`)).toBeTruthy()
  }
}

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('starts on green with the other lights off', () => {
    render(<App />)
    expectActive('green')
  })

  it('cycles green -> yellow -> red -> green on each duration', () => {
    render(<App />)
    advance(4999)
    expectActive('green')
    advance(1)
    expectActive('yellow')
    advance(1000)
    expectActive('red')
    advance(2000)
    expectActive('green')
  })

  it('counts seconds from 1 in the corner timer and resets when the light changes', () => {
    render(<App />)
    expect(screen.getByText('1s')).toBeTruthy()
    advance(4000)
    expect(screen.getByText('5s')).toBeTruthy()
    advance(1000)
    expectActive('yellow')
    expect(screen.getByText('1s')).toBeTruthy()
    advance(1000)
    expectActive('red')
    expect(screen.getByText('1s')).toBeTruthy()
    advance(1000)
    expect(screen.getByText('2s')).toBeTruthy()
  })
})
