import { SLOT_MINUTES } from './data.js'

export function generateSlots() {
  const slots = []
  const blocks = [{ start: 9 * 60, end: 12 * 60 }, { start: 13 * 60, end: 19 * 60 }]
  for (const { start, end } of blocks) {
    let c = start
    while (c + SLOT_MINUTES <= end) {
      slots.push(`${String(Math.floor(c / 60)).padStart(2, '0')}:${String(c % 60).padStart(2, '0')}`)
      c += SLOT_MINUTES
    }
  }
  return slots
}

// Segunda (1) a Sábado (6)
export function isWorkday(date) {
  const w = date.getDay()
  return w >= 1 && w <= 6
}

export function nextWorkdays(count = 6) {
  const out = []
  const today = new Date()
  for (let i = 1; i <= 21 && out.length < count; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    if (isWorkday(d)) out.push(d.toISOString().split('T')[0])
  }
  return out
}

export function fmtDate(s) {
  return new Date(s + 'T12:00:00').toLocaleDateString('pt-PT', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

export function fmtShort(s) {
  const d = new Date(s + 'T12:00:00')
  return {
    day: d.toLocaleDateString('pt-PT', { weekday: 'short' }).replace('.', ''),
    num: d.getDate(),
    mon: d.toLocaleDateString('pt-PT', { month: 'short' }).replace('.', ''),
  }
}
