import { Resend } from 'resend'
import { config, siteMetaData } from '../../theme.config'

// Constructed per request rather than at module scope: the Resend constructor throws
// when the key is absent, which would turn every response — including validation
// errors — into an opaque 500.
const getMailer = () => (process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null)

// Only these fields are ever read from the request body. Anything else is ignored.
const TEXT_FIELDS = [
  { key: 'first-name', label: 'First name', max: 200 },
  { key: 'last-name', label: 'Last name', max: 200 },
  { key: 'email', label: 'Email', max: 254 },
  { key: 'company', label: 'Company', max: 200 },
  { key: 'message', label: 'Message', max: 5000 },
]

const SERVICE_FIELDS = ['Consulting', 'Development', 'Assets', 'Security', 'Education', 'Another']

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ESCAPES[char])

// Best-effort throttle. Serverless instances don't share memory, so this thins out
// bursts from a single client rather than enforcing a global limit.
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 }
const submissions = new Map()

const isRateLimited = (ip) => {
  if (!ip) return false

  const now = Date.now()
  const recent = (submissions.get(ip) || []).filter((time) => now - time < RATE_LIMIT.windowMs)

  if (recent.length >= RATE_LIMIT.max) {
    submissions.set(ip, recent)
    return true
  }

  recent.push(now)
  submissions.set(ip, recent)

  // Keep the map from growing without bound on a long-lived instance.
  if (submissions.size > 5000) {
    for (const [key, times] of submissions) {
      if (!times.some((time) => now - time < RATE_LIMIT.windowMs)) submissions.delete(key)
    }
  }

  return false
}

const buildHtmlBody = (body) => {
  const lines = TEXT_FIELDS.filter(({ key }) => body[key]).map(
    ({ key, label }) => `<b>${label}</b>: ${escapeHtml(body[key])}`
  )

  const services = SERVICE_FIELDS.filter((key) => body[key] === true)
  if (services.length) {
    lines.push(`<b>Services</b>: ${services.map(escapeHtml).join(', ')}`)
  }

  return lines.join('<br />')
}

const contact = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Request method is not allowed.' })
  }

  const { recipient, subject, sender } = config.contactForm || {}

  if (!recipient) {
    return res
      .status(400)
      .json({ error: 'Missing [config.contactForm.recipient] in theme options.' })
  }

  // Honeypot: real users never see this field, so a filled value means a bot.
  // Answer as if it succeeded rather than revealing the check.
  if (req.body.website) {
    return res.status(200).json({ error: '' })
  }

  // Reject cross-origin posts when the browser tells us where they came from.
  const { origin } = req.headers
  if (origin && !origin.startsWith(siteMetaData.siteUrl)) {
    return res.status(403).json({ error: 'Request origin is not allowed.' })
  }

  const { email, message } = req.body

  if (!email || !EMAIL_PATTERN.test(String(email))) {
    return res.status(400).json({ error: 'A valid email address is required.' })
  }
  if (!message || !String(message).trim()) {
    return res.status(400).json({ error: 'Project description is required.' })
  }

  const tooLong = TEXT_FIELDS.find(
    ({ key, max }) => req.body[key] && String(req.body[key]).length > max
  )
  if (tooLong) {
    return res.status(400).json({ error: `${tooLong.label} is too long.` })
  }

  if (!SERVICE_FIELDS.some((key) => req.body[key] === true)) {
    return res.status(400).json({ error: 'Please select at least one service.' })
  }

  // Throttled only once the submission is otherwise valid, so someone correcting a
  // typo in their address is never locked out.
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many submissions. Please try again later.' })
  }

  const resend = getMailer()
  if (!resend) {
    return res.status(500).json({ error: 'Email delivery is not configured.' })
  }

  try {
    const { error } = await resend.emails.send({
      from: `Contact Form <${sender}>`,
      to: recipient,
      reply_to: email,
      // Never taken from the request: a caller-supplied subject is a spoofing vector.
      subject: subject || 'Contact form entry',
      html: buildHtmlBody(req.body),
    })

    if (error) {
      return res.status(500).json({ error: error.message })
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(200).json({ error: '' })
}

export default contact
