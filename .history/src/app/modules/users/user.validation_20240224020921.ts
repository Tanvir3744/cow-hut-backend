import { z } from 'zod'

const createSellerZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'password is required'
    }).optional(),
    seller: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'first name is required',
        }).optional(),
        lastName: z.string({
          required_error: 'last name of seller is required',
        }).optional(),
      }),
      address: z.string({
        required_error: 'address is required',
      }).optional(),
      phoneNumber: z.string({
        required_error: 'phone number is required',
      }).optional(),
      income: z.number({
        required_error: 'income is required',
      }).optional(),
      budget: z.number({
        required_error: 'budget is required',
      }).optional(),
    })
  }),
})
const createBuyerZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'password is required'
    }).optional(),
    seller: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'first name is required',
        }).optional(),
        lastName: z.string({
          required_error: 'last name of seller is required',
        }).optional(),
      }),
      address: z.string({
        required_error: 'address is required',
      }).optional(),
      phoneNumber: z.string({
        required_error: 'phone number is required',
      }).optional(),
      income: z.number({
        required_error: 'income is required',
      }).optional(),
      budget: z.number({
        required_error: 'budget is required',
      }).optional(),
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
  createBuyerZodSchema,
 /*  updateUserZodSchema, */
}
