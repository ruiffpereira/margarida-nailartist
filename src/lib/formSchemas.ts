import { z } from 'zod/v4'

type T = (key: string) => string

export const loginFormSchema = (t: T) => z.object({
  email:    z.email(t('val.email_invalido')),
  password: z.string().min(1, t('val.password_obrigatoria')),
})

export const registerFormSchema = (t: T) => z.object({
  name:     z.string().min(2, t('val.nome_min')),
  email:    z.email(t('val.email_invalido')),
  phone:    z.string().min(9, t('val.telemovel_min')).or(z.literal('')).optional(),
  password: z.string().min(6, t('val.password_min6')),
})

export const forgotFormSchema = (t: T) => z.object({
  email: z.email(t('val.email_invalido')),
})

export const resetFormSchema = (t: T) => z.object({
  newPassword:     z.string().min(8, t('val.password_min8')),
  confirmPassword: z.string().min(1, t('val.confirma_password')),
}).refine(
  d => d.newPassword === d.confirmPassword,
  { message: t('val.passwords_diferentes'), path: ['confirmPassword'] },
)

export const profileFormSchema = (t: T) => z.object({
  name:  z.string().min(2, t('val.nome_min')),
  email: z.email(t('val.email_invalido')),
  phone: z.string().min(9, t('val.telemovel_min')),
  nif:   z.union([z.literal(''), z.string().regex(/^\d{9}$/, t('val.nif_invalido'))]).optional(),
})

export function firstZodError(error: z.ZodError, fallback = 'Dados inválidos.'): string {
  return error.issues[0]?.message ?? fallback
}
