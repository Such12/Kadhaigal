// Thin wrapper around your email provider (Resend, EmailJS, SendGrid, etc).
// Kept provider-agnostic so it's easy to swap out.

const EMAIL_API_KEY = import.meta.env.VITE_EMAIL_SERVICE_API_KEY

/**
 * Subscribe an email address to the community newsletter.
 * @param {string} email
 */
export async function subscribeToNewsletter(email) {
  if (!EMAIL_API_KEY) {
    console.warn('VITE_EMAIL_SERVICE_API_KEY is not set. See .env.example.')
  }

  // TODO: replace with a real call to your email provider's API.
  // Example (pseudo-code):
  // return fetch('https://api.yourprovider.com/subscribe', {
  //   method: 'POST',
  //   headers: { Authorization: `Bearer ${EMAIL_API_KEY}` },
  //   body: JSON.stringify({ email }),
  // })

  return Promise.resolve({ email, subscribed: true })
}

/**
 * Send an event RSVP confirmation email.
 * @param {{ email: string, eventName: string }} params
 */
export async function sendEventConfirmation({ email, eventName }) {
  // TODO: wire up to your email provider.
  return Promise.resolve({ email, eventName, sent: true })
}
