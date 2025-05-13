import type { DrizzleMySqlConfig } from './mysql.interface'
import { ConfigurableModuleBuilder } from '@nestjs/common'

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<DrizzleMySqlConfig>()
  .setExtras(
    {
      tag: 'default',
    },
    (definition, extras) => ({
      ...definition,
      tag: extras.tag,
    }),
  )
  .build()
