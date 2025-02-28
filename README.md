# 502nd PIR Website

This is the official website for the 502nd PIR, an authentic WW2 realism unit for ArmA 3.

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone this repository
```
git clone https://github.com/your-username/502nd-pir-website.git
cd 502nd-pir-website
```

2. Install dependencies
```
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
GHOST_API_URL=your_api_url_here
GHOST_CONTENT_KEY=your_content_key_here
PORT=3000
```

4. Start the development server
```
npm run dev
```

5. For production, use:
```
npm start
```

## Project Structure

```
502nd-pir-website/
├── .env                # Environment variables (keep this private)
├── .gitignore          # Git ignore file
├── package.json        # Project metadata and dependencies
├── server.js           # Express server that handles API requests
└── public/             # Static files
    └── index.html      # Main HTML file
```

## Security

This project uses environment variables to securely store API keys. The keys are accessed on the server side only, preventing exposure in client-side code.

## Contributing

Please read the contribution guidelines before submitting pull requests.
