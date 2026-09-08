import { z } from 'zod'

export const registrationSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name is too long'),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid email address'),

  phone: z
    .string()
    .trim()
    .regex(
      /^\+?[\d\s\-(). ]{7,20}$/,
      'Please enter a valid phone number (7-20 digits)'
    ),

  role: z.enum(
    ['Student', 'Working Professional', 'Hobbyist/Other'] as const,
    { error: 'Please select your current status' }
  ),

  organization: z
    .string()
    .trim()
    .min(2, 'Please enter your school, workplace, or locality name')
    .max(150, 'Name is too long'),

  experience_level: z.enum(
    ['Beginner', 'Intermediate', 'Advanced'] as const,
    { error: 'Please select your experience level' }
  ),

  slot_id: z.string().uuid('Please select a valid session'),
})

export type RegistrationInput = z.infer<typeof registrationSchema>

// Admin filter/search validation
export const adminFiltersSchema = z.object({
  search:           z.string().trim().max(100).optional(),
  slot_id:          z.string().uuid().optional(),
  experience_level: z.enum(['Beginner', 'Intermediate', 'Advanced'] as const).optional(),
  status:           z.enum(['confirmed', 'attended', 'cancelled'] as const).optional(),
  page:             z.coerce.number().int().min(1).default(1),
  page_size:        z.coerce.number().int().min(1).max(100).default(25),
})

export type AdminFilters = z.infer<typeof adminFiltersSchema>
