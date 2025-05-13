/* eslint-disable ts/no-unsafe-argument */
import { Injectable } from '@nestjs/common'
import { drizzle } from 'drizzle-orm/mysql2'
import * as mysql from 'mysql2'
import { DrizzleMySqlConfig } from './mysql.interface'

@Injectable()
export class DrizzleMySqlService {
  public async getDrizzle(options: DrizzleMySqlConfig) {
    if (options.mysql.connection === 'client') {
      const client = await mysql.createConnection(options.mysql.config as any)
      return drizzle({ client })
    }
    const pool = mysql.createPool(options.mysql.config as any)
    return drizzle({ client: pool })
  }
}
