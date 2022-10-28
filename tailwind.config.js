module.exports = {
  content: [
    "./src/**/*.{html,js}",
    // "./components/**/*.{js,vue,ts}",
    // "./layouts/**/*.vue",
    // "./pages/**/*.vue",
    // "./plugins/**/*.{js,ts}",
    // "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      notosans: ['NotoSansKR', 'Arial'],
      // montserrat: ['Montserrat', 'Arial'],
      // suit: ['SUIT', 'Arial'],
      // segoemdl2: ['SegoeMDL2'],
    },
    screens: {
      // tablet: '900px',
      // desktop: '1164px',
      tablet: '1280px',
      desktop: '1440px',
    },
  },
  plugins: [],
}