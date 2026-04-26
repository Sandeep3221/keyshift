# Keyshift

A minimalist typing speed test application built with React. Practice your typing skills, track your WPM (Words Per Minute), and improve your accuracy.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)

## Features

- **Real-time Statistics** - Track your WPM, accuracy, typos, and elapsed time as you type
- **Multiple Modes**
  - **Time Mode** - Focus on time elapsed while typing
  - **Words Mode** - Track word count progress
  - **Zen Mode** - Distraction-free typing experience
- **Case Sensitivity Toggle** - Enable/disable case-sensitive matching
- **Results Dashboard** - View your performance with an interactive WPM chart
- **Responsive Design** - Clean, dark-themed interface

## Tech Stack

- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [Tailwind CSS 4](https://tailwindcss.com/) - Styling
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Recharts](https://recharts.org/) - Charts for results visualization
- [Lucide React](https://lucide.dev/) - Icons

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher) or [Bun](https://bun.sh/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/nimone/keyshift.git
cd keyshift
```

2. Install dependencies:

```bash
# Using npm
npm install

# Using bun
bun install
```

3. Start the development server:

```bash
# Using npm
npm run dev

# Using bun
bun dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## How to Use

1. Click on the typing area to focus
2. Start typing the displayed text
3. The timer begins automatically when you type your first character
4. Use the config bar at the top to:
   - Switch between Time, Words, or Zen modes
   - Toggle real-time stats display
   - Enable/disable case sensitivity
5. When you complete the text, view your results with WPM chart
6. Click the reset button to try again with a new text

## Project Structure

```
src/
├── components/
│   ├── ConfigBar.tsx    # Mode and settings controls
│   ├── ResultDialog.tsx # Results popup with chart
│   ├── Stats.tsx        # Real-time statistics display
│   └── TypingArea.tsx   # Main typing interface
├── App.tsx              # Main application component
├── data.ts              # Practice text quotes
├── store.ts             # Zustand state management
└── main.tsx             # Application entry point
```

## License

MIT
