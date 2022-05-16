import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        poppins: 'Poppins',
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives({
      enforce: 'pre',
    }),
    transformerVariantGroup(),
  ],
  include: [
    /\.vue$/,
    /\.vue\?vue/,
    /packages\/bloks\/.+\.js$/,
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#639FEE',
        50: '#DFEBFB',
        100: '#D1E3FA',
        200: '#B6D2F7',
        300: '#9AC1F4',
        400: '#7EB0F1',
        500: '#639FEE',
        600: '#3E88EA',
        700: '#1972E6',
        800: '#1560C1',
        900: '#114D9C',
      },
    },
  },
})
