/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'mono': ['Space Mono', 'monospace']
      },
      colors: {
        // Primary palette
        'void': '#0a0a0b',
        'smoke': '#1a1a1d',
        'ash': '#2d2d30',
        'silver': '#a0a0a3',
        'bone': '#e8e8e6',

        // Accent colors (for the three entry points)
        'ember': '#ef4136',      // Music - warm, passionate
        'signal': '#50d2cb',     // Work/Humanitarian - clear, hopeful
        'pulse': '#7ec245',      // Code - growth, logic

        // Effects
        'glow': '#f0f0f0'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'breathe': 'breathe 8s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        breathe: {
          '0%, 100%': { opacity: 0.8 },
          '50%': { opacity: 1 }
        }
      }
    }
  },
  plugins: []
}
