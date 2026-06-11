export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f6f1e8',
        surface: '#fffdf8',
        ink: '#171513',
        muted: '#6d665c',
        line: '#e8ddcd',
        moss: {
          50: '#eef6ef',
          100: '#dceee0',
          500: '#3f7f59',
          600: '#2f6546',
          700: '#214a35',
        },
        clay: {
          50: '#fbf0ea',
          100: '#f5ddd1',
          500: '#b85d3c',
          600: '#93452e',
        },
        gold: {
          50: '#fff8e5',
          100: '#f7e8b3',
          200: '#ecd483',
          300: '#d6b65a',
          500: '#a97824',
          600: '#80571a',
          700: '#5f3d15',
          800: '#3f2812',
          900: '#24160c',
        },
      },
      boxShadow: {
        premium: '0 18px 45px rgba(35, 28, 20, .10)',
        lift: '0 14px 32px rgba(35, 28, 20, .14)',
        inset: 'inset 0 1px 0 rgba(255,255,255,.72)',
      },
      backgroundImage: {
        'hero-books': 'linear-gradient(135deg, rgba(23,21,19,.88), rgba(33,74,53,.78)), url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop")',
        'paper-grain': 'linear-gradient(120deg, rgba(255,255,255,.72), rgba(246,241,232,.9))',
        'accent-line': 'linear-gradient(90deg, #214a35, #a97824, #b85d3c)',
      },
    },
  },
  plugins: [],
}
