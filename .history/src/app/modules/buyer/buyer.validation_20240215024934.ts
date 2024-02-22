import { z } from 'zod';

const createBuyerZodShcema = z.object({
    body: z.object({

    })
})

// schema for updating the buyer schema and prevent unusual errors;
const updateBuyerZodSchema = z.object({
    body: z.object({

    })
})

export const BuyerValidationZodSchema = {
    createBuyerZodShcema, 
    updateBuyerZodSchema,
}