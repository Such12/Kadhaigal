import { supabase } from './supabase.js'

// Signs in, then immediately verifies the account is actually on the
// admin allow-list (not just any valid Supabase Auth user). If it's not,
// the session is signed back out — so a valid-but-non-admin login never
// sits around half-authenticated in the browser.
export async function signInAdmin(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message)

  const isAdmin = await checkIsAdmin()
  if (!isAdmin) {
    await supabase.auth.signOut()
    throw new Error("This account doesn't have admin access.")
  }

  return data.session
}

export async function signOutAdmin() {
  await supabase.auth.signOut()
}

export async function getAdminSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

// Calls the is_admin() Postgres function directly (see the RLS fix from
// earlier) rather than querying admin_users and checking for an empty
// result — same answer, but explicit about what it's actually asking.
export async function checkIsAdmin() {
  const { data, error } = await supabase.rpc('is_admin')
  if (error) {
    console.error('is_admin() check failed:', error)
    return false
  }
  return !!data
}