import {
  addAutoImport,
  addPlugin,
  addTemplate,
  createResolver,
  defineNuxtModule,
  resolveModule,
} from '@nuxt/kit'
import { name, version } from '../package.json'

export interface ModuleOptions {
  /**
   * Lyonkit Api Key to use backend
   * You can also use runtime config 'lyonkitApiKey'
   */
  apiKey?: string
  /**
   * Set to false if you want to use write commands
   * @default false
   */
  readOnly?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'lyonkit',
    compatibility: {
      nuxt: '^3.0.0-rc.4',
    },
  },
  defaults: {
    readOnly: true,
  },
  async setup(opts, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const resolveRuntimeModule = (path: string) => resolveModule(path, { paths: resolve('./runtime') })

    // Inject options via virtual template
    nuxt.options.alias['#lyonkit-options'] = addTemplate({
      filename: 'lyonkit-options.mjs',
      getContents: () => `
        export const apiKey = ${JSON.stringify(opts.apiKey ?? null, null, 2)}
        export const readOnly = ${JSON.stringify(opts.readOnly ?? false, null, 2)}
      `,
    }).dst!

    if (opts.readOnly)
      addPlugin(resolveRuntimeModule('./ro-plugin'))
    else
      addPlugin(resolveRuntimeModule('./plugin'))

    addAutoImport({ name: 'useLyonkit', as: 'useLyonkit', from: resolveRuntimeModule('./composables') })

    nuxt.options.css.push('@lyonkit/bloks/assets/style.css')
  },
})
