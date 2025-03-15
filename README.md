# Google Drive Clone

A modern, feature-rich Google Drive clone built with Next.js 15, TypeScript, and Tailwind CSS. This application provides a familiar interface for file storage and management, with real-time updates and a responsive design.

## 🚀 Features

- **Authentication** - Secure user authentication powered by Clerk
- **File Management** - Upload, download, and organize files
- **Real-time Updates** - Instant file system changes using modern React
- **Responsive Design** - Beautiful UI that works on all devices
- **Modern Stack** - Built with Next.js 15, TypeScript, and Tailwind CSS
- **Database Integration** - Powered by Drizzle ORM with LibSQL
- **File Upload** - Seamless file uploads using UploadThing

## 🛠️ Tech Stack

- **Framework:** ⚡ Next.js 15
- **Language:** 🔷 TypeScript
- **Styling:** 🎨 Tailwind CSS
- **Authentication:** 🔐 Clerk
- **Database:** 🐘 PostgreSQL (SingleStore)
- **UI Components:** 🎭 shadcn/ui
- **File Upload:** 📤 UploadThing
- **Deployment:** 🚀 Netlify
- **Package Manager:** 📦 npm

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v10 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/google-drive-clone.git
cd google-drive-clone
```

2. Install dependencies:
```bash
npm install
```

3. Copy the example environment file:
```bash
cp .env.example .env
```

4. Update the environment variables in `.env` with your credentials

5. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📝 Environment Variables

Make sure to set up the following environment variables in your `.env` file:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key
- `DATABASE_URL` - Your LibSQL database URL
- `UPLOADTHING_SECRET` - UploadThing secret key
- `UPLOADTHING_APP_ID` - UploadThing app ID

## 🛠️ Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Format code
npm run format:write

# Check types
npm run typecheck
```

## 📚 Database Management

```bash
# Generate database schema
npm run db:generate

# Push schema changes
npm run db:push

# Run database migrations
npm run db:migrate

# Open database studio
npm run db:studio
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Netlify for the deployment platform
- Theo ([@t3dotgg](https://twitter.com/t3dotgg) / [Theo on YouTube](https://youtube.com/@t3dotgg)) for the amazing T3 stack and inspiration
- All the open-source contributors

---

Built with ❤️ using Next.js and TypeScript
