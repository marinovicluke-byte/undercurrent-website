// lib/validation.js
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(254),
  phone: z.string().max(20).optional(),
  message: z.string().min(10).max(2000),
  company: z.string().max(100).optional(),
  honeypot: z.string().max(0).optional(),
})

export const qualifySchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(254),
  businessType: z.string().min(1).max(100),
  teamSize: z.string().max(50),
  challenge: z.string().min(10).max(2000),
  honeypot: z.string().max(0).optional(),
})

export const auditSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(254),
  businessName: z.string().min(1).max(100),
  industry: z.string().min(1).max(100),
  results: z.record(z.unknown()),
  honeypot: z.string().max(0).optional(),
})
