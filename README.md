# Gita Flow

A spiritual AI application that allows users to seek wisdom and guidance from Lord Krishna, inspired by the teachings of the Bhagavad Gita. Built with Next.js and powered by Google's Gemini AI.

## ✨ Features

- **Divine Wisdom**: Ask questions and receive guidance as if speaking directly with Lord Krishna, in a chat-style conversation
- **AI-Powered Responses**: Utilizes Google's Gemini AI for intelligent, contextual answers
- **Spiritual Context**: All responses are grounded in the teachings and philosophy of the Bhagavad Gita
- **Google Sign-In**: Firebase Authentication gates chat access; every question and answer is saved to your account
- **Multiple Named Chats**: Start new chats, rename them, and delete them — like any modern chat app
- **Persistent History**: Conversations are stored in a Neon Postgres database and reload automatically on sign-in
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **Fast Performance**: Built with Next.js and Turbopack for optimal speed
- **SEO Optimized**: Server-rendered content, structured data (JSON-LD), sitemap, robots.txt, and Open Graph metadata
- **Rate Limited**: Server-side request limits protect against abuse of the AI and database
- **Legal Pages**: Comprehensive privacy policy, terms of service, and disclaimer

## 🤝 Contributing

We welcome contributions from developers who want to help spread spiritual wisdom through technology!

### How to Contribute

1. **Fork the repository**

   ```bash
   git fork https://github.com/ashutoshswamy/Gita-Flow.git
   ```

2. **Clone your fork**

   ```bash
   git clone https://github.com/your-username/Gita-Flow.git
   cd Gita-Flow
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Set up environment variables**

   Create `.env.local` in the project root with:

   - `GEMINI_API_KEY` — Google AI Studio API key
   - `NEXT_PUBLIC_FIREBASE_*` — Firebase client config (Firebase Console → Project settings → General)
   - `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` — Firebase Admin service account (Project settings → Service accounts → Generate new private key)
   - `DATABASE_URL` — Neon Postgres connection string (Neon dashboard → Connection Details)

   In the Firebase Console, enable **Google** as a sign-in provider under Authentication → Sign-in method.

5. **Set up the database**

   Run [`db/schema.sql`](db/schema.sql) against your Neon database (via the Neon SQL editor, or `psql $DATABASE_URL -f db/schema.sql`) to create the `chats` and `conversations` tables.

6. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

7. **Make your changes and commit**

   ```bash
   git add .
   git commit -m "Add: your feature description"
   ```

8. **Push to your fork and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Test your changes thoroughly
- Respect the spiritual nature of the project
- Ensure responses align with Bhagavad Gita teachings
- Add comments for complex logic
- Update documentation when necessary

### Areas for Contribution

- UI/UX improvements
- Additional spiritual features
- Performance optimizations
- Accessibility enhancements
- Mobile responsiveness
- Testing coverage
- Documentation improvements

## 🐛 Issues

Found a bug or have a feature request? We'd love to hear from you!

### Reporting Issues

1. **Check existing issues** first to avoid duplicates
2. **Use our issue templates** when creating new issues
3. **Provide detailed information** including:
   - Steps to reproduce the issue
   - Expected vs actual behavior
   - Browser and device information
   - Screenshots if applicable

### Issue Labels

- `bug` - Something isn't working correctly
- `enhancement` - New feature or improvement
- `documentation` - Documentation related
- `good first issue` - Perfect for newcomers
- `help wanted` - Extra attention needed
- `spiritual` - Related to spiritual content accuracy

### Priority Levels

- `critical` - Breaks core functionality
- `high` - Important but not breaking
- `medium` - Nice to have improvements
- `low` - Minor enhancements

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### License Summary

- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ⚠️ Include copyright notice
- ⚠️ Include license text

## 👨‍💻 Developer

**Ashutosh Swamy**

- GitHub: [@ashutoshswamy](https://github.com/ashutoshswamy)
- X: [@ashutoshswamy_](https://x.com/ashutoshswamy_)
- LinkedIn: [@ashutoshswamy](https://linkedin.com/in/ashutoshswamy)
- Portfolio: [ashutoshswamy.in](https://ashutoshswamy.in)
- Email: ashutoshswamy397@gmail.com

### About the Developer

Ashutosh Swamy is a passionate developer who believes in the power of technology to spread wisdom and positivity. This project combines his love for modern web development with ancient spiritual teachings to create a meaningful digital experience.

## 📞 Contact & Support

- **GitHub Issues**: For bug reports and feature requests
- **Email**: ashutoshswamy397@gmail.com for general inquiries

---

Made with 💖 for spreading divine wisdom through technology.
