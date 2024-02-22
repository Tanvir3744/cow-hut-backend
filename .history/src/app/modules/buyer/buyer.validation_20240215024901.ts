import { z } from 'zod';

const createBuyerZodShcema = z.object({
    body: z.object({

    })
})
const updateBuyerZodSchema = z.object({
    body: z.object({

    })
})

export const BuyerValidationZodSchema = {
    createBuyerZodShcema, 
    updateBuyerZodSchema,
}