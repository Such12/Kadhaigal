import { supabase } from './supabase.js'

function rowToEvent(row) {
  if (!row) return null
  return {
    id: row.id,
    day: row.day_of_week,
    title: row.title,
    time: row.time_range ?? '',
    tagline: row.tagline ?? '',
    accent: row.accent ?? 'navy',
    sortOrder: row.sort_order ?? 0,
    isActive: row.is_active ?? true,
  }
}

function eventToRow(event) {
  const row = {}
  if (event.day !== undefined) row.day_of_week = event.day
  if (event.title !== undefined) row.title = event.title
  if (event.time !== undefined) row.time_range = event.time
  if (event.tagline !== undefined) row.tagline = event.tagline
  if (event.accent !== undefined) row.accent = event.accent
  if (event.sortOrder !== undefined) row.sort_order = event.sortOrder
  if (event.isActive !== undefined) row.is_active = event.isActive
  return row
}

// Public-facing: only active slots, in display order. This is what the
// Home page noticeboard should call.
export async function fetchWeeklyEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data.map(rowToEvent)
}

// Admin-facing: everything, including inactive slots, so they can be
// re-enabled later rather than only ever deleted.
export async function getAllEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('sort_order', { ascending: true })
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