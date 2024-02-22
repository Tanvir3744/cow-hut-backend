import { z } from 'zod'

const createSellerZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'password is required'
    }),
    seller: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'first name is required',
        }),
        lastName: z.string({
          required_error: 'last name of seller is required',
        }),
      }),
      address: z.string({
        required_error: 'address is required',
      }),
      phoneNumber: z.string({
        required_error: 'phone number is required',
      }),
      income: z.number({
        required_error: 'income is required',
      }),
      budget: z.number({
        required_error: 'budget is required',
      }),
    })
  }),
})

/* 
const updateUserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'password is required',
    }).optional(),
    role: z.enum(['buyer', 'seller'], {required_error: 'role is required'}).optional()
  })
}) */

export const userValidation = {
  createSellerZodSchema,
 /*  updateUserZodSchema, */
}
