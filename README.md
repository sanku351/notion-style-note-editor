# 📝 Notion-Style Notes with Embedded AI Chat
A powerful and intuitive note-taking application inspired by Notion, built using `Next.js`, `TypeScript`, and `TipTap`, with embedded `ChatGPT-style AI chat per` note. Fully responsive and styled with Tailwind CSS, and managed efficiently with `Zustand` state management.

## 🚀 Features
### ✏️ Notes System
- Sidebar to view, create, switch, and delete notes
- Each note includes:
  1. A title
  2. A TipTap rich-text editor
- TipTap supports:
  1. Plain text
  2. Headings (H1, H2, H3)
  3. Bullet and numbered lists
  4. Text formatting (bold, italic, underline)
- Auto-save note content with debounce

### 🤖 Embedded AI Chat (Per Note)
- Small circular AI button at the bottom-right of each note
- Clicking the button toggles a floating chat interface
- Chat UI includes:
  1. Input field to type prompts
  2. Submit to a mock API returning a fixed response
  3. User messages: right-aligned
  4. AI responses: left-aligned
- Note-specific chat history is preserved and restored on note switch

## ⚙️ State Management
- `Zustand` used for global and local state
- Notes and chat histories are persisted using Zustand’s persist middleware

## 📦 Tech Stack
- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Text Editor**: [TipTap v2](https://tiptap.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **UI Library**: [shadcn/ui](https://ui.shadcn.dev/)

## 🛠️ Getting Started
### 1. 📥 Clone the Repository
```bash
git clone https://github.com/sanku351/notion-style-note-editor.git
cd notion-style-note-editor
```
### 2. 📦 Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. 🏃 Start, the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
