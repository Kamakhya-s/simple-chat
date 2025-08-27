# Simple Chat App = An AI-based Chat Application

**Simple Chat** is a web-based AI chat application that allows users to interact to provide guidance, coding advice, motivational insights and much more in a conversational manner.

---


## Features

- **Realistic Chat UI**: Smooth scrolling, timestamped messages, and visually appealing chat bubbles.

- **Markdown & Code Support**: AI responses can include formatted text, tables, and syntax-highlighted code blocks.

- **Responsive Design**: Fully responsive layout for desktop and mobile.

---

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Markdown, Syntax Highlighter  
- **Backend**: Next.js API routes, Google Gemini AI  
- **State Management**: React `useState`, `useEffect`, `useRef`  
- **Other Packages**: `lucide-react` (icons), `remark-gfm` (Markdown support)  

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd chai-aur-bot

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set your environment variable:

   ```bash
   GEMINI_API_KEY=<your-google-gemini-api-key>
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser at `http://localhost:3000`.

---

## File Structure

```
/app
  /api
    gemini-chat/route.js # Backend API to fetch AI responses
 page.js
```

---

## Usage

* Type a message in the input box and press **Enter** or click the **Send** button.
* AI responses can include **code snippets**, **Markdown**, and **emojis**.

---

## Dependencies

```bash
npm install react-markdown remark-gfm react-syntax-highlighter lucide-react
```

---

## License

This project is open-source and available under the MIT License.

---

## Future Enhancements

* Real-time streaming responses from Gemini AI
* Stream Response
* Multiple additional personas
* Dark/Light theme toggle
* Voice input and output
* Chat history and export

