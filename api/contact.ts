import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

/**
 * Handles an HTTP POST request for processing the contact form submission. Validates the form data,
 * performs a honeypot check to detect spam, validates the email format, and sends the form data
 * via email using NodeMailer. Responds with appropriate HTTP status codes based on the outcome.
 *
 * @param {VercelRequest} request - The incoming HTTP request containing form data in the body. Expects a POST method.
 * @param {VercelResponse} response - The HTTP response object used to send a response to the client.
 * @return {Promise<void>} A promise resolving to no value. Sends an HTTP response with status and appropriate JSON payload.
 */
export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message, botCheck } = request.body;

  // Basic honeypot check
  if (botCheck) {
    return response.status(400).json({ error: 'Spam detected' });
  }

  // Basic validation
  if (!name || !email || !subject || !message) {
    return response.status(400).json({ error: 'All fields are required' });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return response.status(400).json({ error: 'Invalid email address' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Sending to yourself
    replyTo: email,
    subject: `Contact Form: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return response.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    return response.status(500).json({ error: 'Failed to send email. If the error persist consider sending me an email directly.'  });
  }
}