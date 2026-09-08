import { supabase } from './supabase.js'

function rowToEvent(row) {
  if (!row) return null
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? '',
    date: row.event_date,
    startTime: row.start_time,
    endTime: row.end_time,
    accent: row.accent ?? 'navy',
    category: row.category ?? '',
    isFeatured: row.is_featured ?? false,
    imageUrl: row.image_url ?? '',
    price: row.price ?? null,
    ctaLabel: row.cta_label ?? '',
    scheduleLabel: row.schedule_label ?? '',
  }
}

function eventToRow(event) {
  const row = {}
  const set = (jsKey, dbKey = jsKey) => {
    if (event[jsKey] !== undefined) row[dbKey] = event[jsKey]
  }
  set('title')
  set('description')
  set('date', 'event_date')
  set('startTime', 'start_time')
  set('endTime', 'end_time')
  set('accent')
  set('category')
  set('isFeatured', 'is_featured')
  set('imageUrl', 'image_url')
  set('price')
  set('ctaLabel', 'cta_label')
  set('scheduleLabel', 'schedule_label')
  return row
}

// ---- Date helpers ----

function getCurrentWeekRange() {
  const now = new Date()
  const day = now.getDay() // 0 = Sunday
  const diffToMonday = day === 0 ? -6 : 1 - day
  const monday = new Date(now)
  monday.setHours(0, 0, 0, 0)
  monday.setDate(now.getDate() + diffToMonday)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  return { start: monday, end: sunday }
}

function toDateOnly(d) {
  return d.toISOString().slice(0, 10)
}

// Exported so any component displaying events (the noticeboard, the
// /events page, anywhere else) applies the exact same "has this
// finished?" rule rather than each maintaining its own copy of it.
// An event with no end_time is treated as running until the end of that
// day, rather than instantly "over" at midnight of its date.
export function hasEventEnded(event, now = new Date()) {
  const endTime = event.endTime || '23:59:59'
  const eventEnd = new Date(`${event.date}T${endTime}`)
  return eventEnd.getTime() < now.getTime()
}

// ---- Homepage noticeboard: this week only, auto-hides finished events ----

export async function getNoticeboardEvents() {
  const { start, end } = getCurrentWeekRange()
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('event_date', toDateOnly(start))
    .lte('event_date', toDateOnly(end))
    .order('event_date', { ascending: true })
    .order('start_time', { ascending: true })
  if (error) throw error

  const events = data.map(rowToEvent)
  const now = new Date()
  return events.filter((e) => !hasEventEnded(e, now))
}

// ---- Full /events page: all upcoming events, not limited to this week ----

export async function getUpcomingEvents() {
  const todayStr = toDateOnly(new Date())
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('event_date', todayStr)
    .order('event_date', { ascending: true })
    .order('start_time', { ascending: true })
  if (error) throw error

  const events = data.map(rowToEvent)
  const now = new Date()
  return events.filter((e) => !hasEventEnded(e, now))
}

export async function getFeaturedEvents() {
  const events = await getUpcomingEvents()
  return events.filter((e) => e.isFeatured)
}

// ---- Admin: everything, including past events, for management ----

export async function getAllEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: false })
  if (error) throw error
  return data.map(rowToEvent)
}

export async function addEvent(event) {
  const { data, error } = await supabase.from('events').insert(eventToRow(event)).select().single()
  if (error) throw error
  return rowToEvent(data)
}

export async function updateEvent(id, updates) {
  const { data, error } = await supabase
    .from('events')
    .update(eventToRow(updates))
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return rowToEvent(data)
}

export async function deleteEvent(id) {
  const { error } = await supabase.from('events').delete().eq('id', id)
  if (error) throw error
}

export function getEventStatus(event, now = new Date()) {
  const start = new Date(`${event.date}T${event.startTime || '00:00:00'}`)
  const end = new Date(`${event.date}T${event.endTime || '23:59:59'}`)
  if (now < start) return 'open'
  if (now >= start && now <= end) return 'in-progress'
  return 'completed'
}