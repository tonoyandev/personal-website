import { Resend } from 'resend'
import { config } from '../../theme.config'

const resend = new Resend(process.env.RESEND_API_KEY)

const getHtmlBody = (body) =>
  Object.entries(body)
    .map(([key, value]) => {
      if (typeof value === 'string') return `<b>${key}</b>: ${value}`
      if (typeof value === 'boolean') return value ? key : false
      if (typeof value === 'object')
        return `<b>${key}</b>: ${getHtmlBody(value).filter(Boolean).join(', ')}`
      return null
    })
    .filter(Boolean)

const contact = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Request method is not allowed.' })
  }

  const { recipient, subject } = config.contactForm || {}

  if (!recipient) {
    return res.status(400).json({ error: 'Missing [config.contactForm.recipient] in theme options.' })
  }

  const { email, message } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email address is required.' })
  }
  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Project description is required.' })
  }

  const serviceIds = ['Consulting', 'Development', 'Assets', 'Security', 'Education', 'Another']
  const anyServiceSelected = serviceIds.some((id) => req.body[id])
  if (!anyServiceSelected) {
    return res.status(400).json({ error: 'Please select at least one service.' })
  }

  const html = getHtmlBody(req.body).join('<br />')

  try {
    const { error } = await resend.emails.send({
      from: 'Contact Form <hi@tonoyan.dev>',
      to: recipient,
      reply_to: email,
      subject: req.body.subject || subject || 'Contact form entry',
      html,
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
