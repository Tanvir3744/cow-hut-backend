import express from 'express'
import { UserRoutes } from '../app/modules/users/user.route'
import { SellerRoutes } from '../app/modules/seller/seller.route'
import { cowRoutes } from '../app/modules/cow/cow.route'
import { BuyerRoutes } from '../app/modules/buyer/buyer.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/seller',
    route: SellerRoutes,
  },
  {
    path: 'buyer',
    route: BuyerRoutes,
  },
  {
    path: '/cow',
    route: cowRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route)) // this is demonstarting -> router.use('/users', UserRoutes);
console.log(moduleRoutes)
export default router
