⚡ GitHub Test Case Generator
A full-stack web application that connects to your GitHub account, lets you select repositories and files, and automatically generates test cases for your code using AI. Designed with a mobile-friendly, responsive UI, the app makes it easy to quickly create, view, and store generated test cases.

📌 Features
🔐 GitHub OAuth Authentication – Secure login using your GitHub account.

📂 Repository & File Browser – Browse through your own GitHub repositories and navigate file structures easily.

✅ File Selection – Select one or multiple files for generating test cases.

⚡ AI-Powered Test Case Generation – Automatically create test cases for supported languages.

🕒 History Tracking – Stores previously generated test cases for later reference.

📱 Mobile Friendly UI – Responsive design that works well on phones, tablets, and desktops.

⚠ Offline & Error Handling – Friendly error messages when the internet connection is slow or unavailable.

🖼 Demo Preview
(Insert screenshots or GIFs here)
Example sections you could add:

Login page

Repository list view

File selector

Generated test cases view

History page

🛠 Tech Stack
Frontend
React.js (Vite or CRA)

Tailwind CSS

React Hooks

Axios

React Hot Toast for notifications

Markdown rendering for test case output

Backend
Node.js & Express

GitHub API integration

AI/Code generation API endpoint

MongoDB (for storing history)

📂 Project Structure
css
Copy
Edit
client/
  ├──context/
  |   ├── app.js
  ├──public/
  ├──src/
  |   ├── assets
  |   ├── components
  │   |   ├── CodeGenerator.components.jsx
  │   |   ├── FileList.components.jsx
  │   |   ├── History.components.jsx
  │   |   ├── Navbar.components.jsx
  │   |   ├── RepoList.components.jsx
  |   ├── pages/
  │   |   └── Home.page.jsx
  |   ├──App.jsx
  |   ├──index.css
  |   ├──main.jsx
  ├──.env
  ├──index.html
  ├──package-lock.json
  ├──package.json

  
server/
  ├──src/
  |   ├── controllers/
  |   ├── database/
  |   ├── models/
  |   ├── routes/
  |   ├── constant.js
  ├──.env
  ├──package-lock.json
  ├──package.json
  ├── server.js

**Installation & Setup**
Clone the Repository

bash
Copy
Edit
git clone https://github.com/yourusername/github-testcase-generator.git
cd github-testcase-generator
Install Dependencies

bash
Copy
Edit
cd frontend
npm install

cd ../backend
npm install
Set Environment Variables
Create .env files in both frontend and backend with the following:

env
Copy
Edit
# Backend
PORT=8000
MONGO_URI=your_mongodb_connection
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
JWT_SECRET=your_jwt_secret

# Frontend
VITE_API_URL=http://localhost:8000/api
Run the Application

bash
Copy
Edit
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm run dev
**How It Works**
Login with GitHub → Secure OAuth login.

Select Repository → The app fetches your GitHub repos via API.

Select Files → Browse and choose one or more source files.

Generate Test Cases → The backend fetches file content, sends it to AI for test case generation.

View & Save → Test cases are shown in the UI and stored in history.

Access Anytime → History tab lets you revisit previously generated results.

**Mobile UI Considerations**
Adaptive grid layout for smaller screens.

Sticky navbar for easy access.

Collapsible sections for repo & file lists.

Large tap targets for buttons.

**Supported Languages**
JavaScript (.js, .jsx)

Python (.py)

Java (.java)

C (.c)

C++ (.cpp)
(Easily extendable for more languages)

**Error Handling**
Offline Mode → Displays friendly messages when internet is down.

Empty State UI → Shows fallback UI when no repos/files are found.

Toast Notifications → Success and error feedback for every action.

**Future Improvements**
Add dark mode 

Allow bulk file uploads from local storage

Export generated test cases as .txt or .md

Multi-language AI prompt optimization