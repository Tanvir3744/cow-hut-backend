import { z } from 'zod';

const createSellerZodSchema = z.object({
    body: z.object({
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
    }),
});
  

const updateSellerZodSchema = z.object({
    body: z.object({
        name: z.object({
            firstName: z.string({
                required_error: 'first name is required'
            }).optional(),
            lastName: z.string({
                required_error: ('last name of seller is required');
            }).optional(),
        }).optional(),
        address: z.string({
            required_error: 'address is required',
        }).optional(),
        phoneNumber: z.string({
            required_error: "phone number is reqired",
        }).optional(),
        income: z.number({
            required_error: 'income is required',
        }).optional(),
        budget: z.number({
            required_error: 'budget is reqired',
        })

    })
})

export const SellerValidationZodSchema = {
    createSellerZodSchema,
    updateSellerZodSchema,
}