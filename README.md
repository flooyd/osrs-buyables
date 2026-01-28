# Buyables

OSRS Grand Exchange tracker that calculates price per experience point for craftable items in Old School RuneScape.

## Features

- Real-time pricing from OSRS Wiki API
- Price per XP calculations for buyable skills
- Sortable table with profit/loss indicators
- Dark mode theme
- Auto-refresh every 5 minutes
- Responsive design

## Supported Skills

- Herblore (potions)
- Prayer (bones, ensouled heads) - Coming soon
- Cooking (raw → cooked) - Coming soon
- Crafting (jewelry, leather) - Coming soon
- Smithing (bars → equipment) - Coming soon

## Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS (dark mode)
- TanStack Table v8
- Axios
- Lucide React (icons)

**Backend:**
- Node.js + Express
- OSRS Wiki Real-time Prices API
- node-cache (5-minute caching)
- CORS, helmet, rate limiting

## Getting Started

### Prerequisites

- Node.js 18+ (v20.10.0 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd buyables
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Set up environment variables

Backend (.env):
```bash
cp backend/.env.example backend/.env
# Edit backend/.env if needed
```

Frontend (.env):
```bash
# Already created with default values
# Edit frontend/.env if backend runs on different port
```

### Running Locally

1. Start the backend server:
```bash
cd backend
npm start
```

Backend will run on http://localhost:3001

2. Start the frontend dev server (in a new terminal):
```bash
cd frontend
npm run dev
```

Frontend will run on http://localhost:5173

3. Open http://localhost:5173 in your browser

## API Endpoints

```
GET /api/health          - Health check
GET /api/skills          - List available skills
GET /api/buyables/:skill - Get buyables for a skill
```

## Understanding GP/XP

- **Negative GP/XP** (green) = You make profit while training!
- **Positive GP/XP** (red) = It costs GP to train
- Lower values = better efficiency (less cost per XP)
- Prices update every 5 minutes from OSRS Wiki real-time data

## Project Structure

```
buyables/
├── backend/          # Express API server
│   ├── src/
│   │   ├── data/     # Static skill data (JSON)
│   │   ├── routes/   # API routes
│   │   └── services/ # Business logic & API clients
│   └── package.json
│
├── frontend/         # React + Vite app
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # Theme context
│   │   ├── hooks/       # Custom hooks
│   │   ├── services/    # API client
│   │   └── utils/       # Formatters, helpers
│   └── package.json
│
└── README.md
```

## Development

### Adding New Skills

1. Create a new JSON file in `backend/src/data/skills/<skillname>.json`
2. Add the skill to `AVAILABLE_SKILLS` array in `backend/src/services/buyablesService.js`
3. Add display name to `SKILL_DISPLAY_NAMES` in `frontend/src/components/SkillSelector.jsx`

Example skill data format:
```json
{
  "skill": "herblore",
  "items": [
    {
      "itemId": 139,
      "name": "Prayer potion(3)",
      "level": 38,
      "xpGained": 87.5,
      "materials": [
        { "itemId": 99, "name": "Ranarr potion (unf)", "quantity": 1 },
        { "itemId": 231, "name": "Snape grass", "quantity": 1 }
      ]
    }
  ]
}
```

## Deployment

### Backend
- Deploy to Railway, Render, or Heroku
- Set environment variables (PORT, FRONTEND_URL)
- Configure CORS for production frontend URL

### Frontend
- Deploy to Vercel, Netlify, or Cloudflare Pages
- Set `VITE_API_BASE_URL` to production backend URL
- Build command: `npm run build`
- Output directory: `dist`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Acknowledgments

- OSRS Wiki for providing the real-time prices API
- Jagex for Old School RuneScape
- TanStack Table for the amazing table library
