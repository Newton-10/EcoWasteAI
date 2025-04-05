# EcoWaste AI

An AI-powered waste management and sorting application.

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/Newton-10/EcoWasteAI.git
cd EcoWasteAI
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```
OPENAI_API_KEY=your_api_key_here
OPENAI_BASE_URL=https://api.openai.com/v1
```

4. Start the development server:
```bash
npm run dev
```

## Deployment

This project is configured for deployment on Render.com. To deploy:

1. Fork this repository to your GitHub account
2. Create a new Web Service on Render.com
3. Connect your GitHub repository
4. Add the following environment variables in Render.com dashboard:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NODE_ENV`: Set to "production"

The application will be automatically deployed when you push changes to the main branch.

## Tech Stack

- Frontend: React + Vite
- Backend: Express.js
- Styling: Tailwind CSS
- Database: Neon (PostgreSQL)
- AI: OpenAI API
- Authentication: Passport.js

## License

MIT 