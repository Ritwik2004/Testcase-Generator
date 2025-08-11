# ⚡ GitHub Test Case Generator

A React-based web application that connects to your GitHub account, lets you browse repositories and files, and automatically generates test cases for selected source files.  
It also maintains a history of generated test cases for quick access.

## 🚀 Features

- **GitHub OAuth Login** – Sign in securely using your GitHub account.
- **Repository Browser** – View your GitHub repositories and navigate file structures.
- **File Selection** – Select specific files for test case generation.
- **Test Case Generation** – Automatically generate test cases for supported file types:
  - `.js`, `.jsx`, `.py`, `.java`, `.c`, `.cpp`
- **History Tracking** – Keep a record of previously generated test cases.
- **Responsive UI** – Works smoothly on desktop and mobile devices.
- **Error Handling** – Graceful fallbacks for slow or no internet connection.

## 🛠️ Tech Stack

- **Frontend:** React, TailwindCSS
- **Backend API:** Custom API (Node.js/Express) for GitHub integration & test case generation
- **Authentication:** GitHub OAuth
- **Markdown Rendering:** react-markdown
- **Notifications:** react-hot-toast

## 📦 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/github-testcase-generator.git
cd github-testcase-generator
