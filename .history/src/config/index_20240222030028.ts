import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') }) // this line is for env file which is outside of src folder

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_seller_pass: process.env.DEFAULT_SELLER_PASS
}
