# 🧠 AI Quiz Generator

An AI-powered web app that transforms any PDF into a personalized quiz to help you learn and retain content. Upload your file, and the app generates multiple-choice questions based on the PDF using OpenAI’s GPT models — complete with correct answers and explanations.

---

## ✨ Features

- 📄 Upload any PDF (e.g. lecture notes, textbooks, articles)
- 🤖 Generates multiple-choice quizzes using OpenAI GPT-4o
- ✅ Real-time answer validation with explanations
- 📊 Instant results with score percentage
- 🌗 Dark mode support
- 🎯 Great for studying, training, or review

---

## 🧰 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **OpenAI API** (`gpt-4o`)
- **pdf-parse** (for extracting PDF content)
- **React Hooks** (`useState`, `useEffect`, `usePathname`)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ai-quiz-app.git
cd ai-quiz-app
```
### 2. Install dependencies
```bash
npm install
```

### 3. Set up environmental variables
Create a `.env.local` file in the root:
```bash
OPENAIT_API_KEY=your_key
```
⚠️ You must have a paid OpenAI account with GPT-3.5 or GPT-4 access.

### 4. Run the app
```bash
npm run dev
```
Then open your browser at http://localhost:3000

## 📂 Project Structure
```bash
app/
├─ page.tsx            // Home (upload page)
├─ quiz/               // Quiz + Results
├─ about/              // About page
components/            // UI & logic components
api/                   // Upload & quiz generation endpoints
lib/                   // PDF parser, utils
types/                 // Type definitions
```

## 📚 Use Cases
- Students studying PDFs, lecture notes, or books

- Professionals reviewing training manuals

- Teachers generating practice questions

- Anyone who wants to turn reading into active recall


## 🤝 Contributions
Open to feedback, pull requests, or new feature ideas.
Feel free to fork this project and make it your own.
