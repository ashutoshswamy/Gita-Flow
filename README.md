# Gita Flow

<div align="center">

![Gita Flow Banner](https://img.shields.io/badge/Spiritual-Guidance-emerald?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**Seek divine wisdom from Lord Krishna, inspired by the eternal teachings of the Bhagavad Gita**

[Live Demo](https://gita-flow.vercel.app) · [Report Bug](https://github.com/ashutoshswamy/gita-flow/issues) · [Request Feature](https://github.com/ashutoshswamy/gita-flow/issues)

</div>

---

## 📖 About The Project

Gita Flow is a spiritual guidance application that brings the timeless wisdom of the Bhagavad Gita into the modern age. Users can share their problems, dilemmas, or life questions and receive compassionate, insightful guidance in the voice of Lord Krishna, powered by advanced AI technology.

Whether you're facing career confusion, relationship challenges, anxiety about the future, or seeking deeper meaning in life, Gita Flow provides perspective rooted in ancient wisdom adapted for contemporary life.

### ✨ Key Features

- � **Spiritual Guidance** - Ask any life question and receive wisdom from Lord Krishna
- 💫 **AI-Powered** - Leverages Google's Gemini AI for thoughtful, context-aware responses
- 🎨 **Beautiful UI** - Serene, gradient-based design that promotes contemplation
- 🌓 **Dark Mode** - Comfortable viewing in any lighting condition
- ⚡ **Fast & Responsive** - Built with Next.js 15 for optimal performance
- 📱 **Mobile-Friendly** - Fully responsive design works on all devices
- ♿ **Accessible** - WCAG-compliant with proper ARIA labels and semantic HTML
- 🔍 **SEO Optimized** - Structured data, meta tags, and sitemap included

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- A **Google Gemini API key** (free tier available)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/ashutoshswamy/gita-flow.git
cd gita-flow
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Get your Gemini API key**

   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API key"
   - Copy your new API key

4. **Configure environment variables**

Create a `.env.local` file in the root directory:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

5. **Run the development server**

```bash
npm run dev
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## 📝 Usage

1. Open the Gita Flow application in your browser
2. Type your question, problem, or dilemma in the text area
3. Click the "Seek Krishna's Wisdom" button
4. Wait for the AI to generate a response inspired by the Bhagavad Gita
5. Read the divine guidance and reflect on its meaning

### 🎯 Example Questions

- "I'm confused about my career path. Should I pursue passion or stability?"
- "How can I deal with difficult people at work without losing my peace?"
- "I'm feeling anxious about the future. How do I find inner peace?"
- "What is the meaning of true success in life?"
- "How do I overcome procrastination and take action?"
- "I'm struggling with a moral dilemma. What should I do?"

## 🏗️ Project Structure

```
gita-flow/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── ask-krishna/
│   │   │       └── route.ts          # API endpoint for Krishna's wisdom
│   │   ├── disclaimer/
│   │   │   └── page.tsx              # Disclaimer page
│   │   ├── privacy/
│   │   │   └── page.tsx              # Privacy policy page
│   │   ├── terms/
│   │   │   └── page.tsx              # Terms of service page
│   │   ├── layout.tsx                # Root layout with metadata
│   │   ├── page.tsx                  # Home page
│   │   ├── globals.css               # Global styles
│   │   ├── robots.ts                 # Robots.txt generator
│   │   ├── sitemap.ts                # Sitemap generator
│   │   └── opengraph-image.tsx       # OG image generator
│   └── lib/
│       └── json-ld.ts                # Structured data for SEO
├── public/                            # Static assets
├── .env.local                         # Environment variables (not in repo)
├── next.config.ts                     # Next.js configuration
├── tailwind.config.ts                 # Tailwind CSS configuration
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Project dependencies
```

## 🛠️ Built With

### Core Technologies

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework

### AI & APIs

- **[Google Gemini AI](https://ai.google.dev/)** - Advanced AI for generating wisdom
- **[@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)** - Gemini AI SDK

### UI Components & Icons

- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build production application
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking

# Analysis
npm run build:analyze # Build with bundle analyzer
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy Gita Flow is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com/new)
3. Import your repository
4. Add your `GEMINI_API_KEY` environment variable
5. Click "Deploy"

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ashutoshswamy/gita-flow)

### Other Platforms

Gita Flow can be deployed to any platform that supports Next.js:

- **Netlify** - [Documentation](https://docs.netlify.com/frameworks/next-js/)
- **Railway** - [Documentation](https://docs.railway.app/guides/nextjs)
- **AWS Amplify** - [Documentation](https://docs.amplify.aws/guides/hosting/nextjs/)
- **DigitalOcean App Platform** - [Documentation](https://docs.digitalocean.com/products/app-platform/)

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your PR adheres to the following guidelines:

- Code follows the existing style and conventions
- All tests pass and there are no linting errors
- Commit messages are clear and descriptive

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the eternal wisdom of the **Bhagavad Gita**
- Powered by **Google's Gemini AI**
- Icons by **[Lucide](https://lucide.dev/)**
- Built with **[Next.js](https://nextjs.org/)** by Vercel

## 📧 Contact

For questions, suggestions, or feedback:

- **GitHub Issues**: [Create an issue](https://github.com/ashutoshswamy/gita-flow/issues)
- **Email**: ashutoshswamy397@gmail.com

## ⚖️ Disclaimer

This application uses AI to generate responses inspired by the Bhagavad Gita. The guidance provided should not be considered as professional advice for medical, legal, financial, or other specialized matters. Always consult qualified professionals for serious life decisions.

---

<div align="center">

**Made with 🙏 and inspired by eternal wisdom**

[⬆ Back to Top](#-gita-flow)

</div>
