import { z } from 'zod';

const createBuyerZodShcema = z.object({
    body: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
      }),
      address: z.string({
        required_error: 'Address is required',
      }),
      phoneNumber: z.string({
        required_error: 'Phone number is required',
      }),
      budget: z.number({
        required_error: 'Budget is required',
      }),
      income: z.number({
        required_error: 'Income is required',
      }).optional(),
    }),
  });
  
  

// schema for updating the buyer schema and prevent unusual errors;
const updateBuyerZodSchema = z.object({
    body: z.object({
        name: z.object({
          firstName: z.string({
            required_error: 'First name is required',
          }).optional(),
          lastName: z.string({
            required_error: 'Last name is required',
          }).optional(),
        }).optional(),
        address: z.string({
          required_error: 'Address is required',
        }).optional(),
        phoneNumber: z.string({
          required_error: 'Phone number is required',
        }).optional(),
        budget: z.number({
          required_error: 'Budget is required',
        }).optional(),
        income: z.number({
          required_error: 'Income is required',
        }).optional(),
      }).optional(),
})

export const BuyerValidationZodSchema = {
    createBuyerZodShcema, 
    updateBuyerZodSchema,
}