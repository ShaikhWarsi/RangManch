import cors from 'cors';

// Define allowed origins with proper typing
const allowedOrigins: string[] = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://rangmanch.netlify.app',
  'https://rangmanch.vercel.app'
];

// Add environment-specific frontend URL if defined
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'Pragma'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

export default cors(corsOptions);
