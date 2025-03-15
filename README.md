<a id="readme-top"></a>

# Tldraw Editor

An advanced, yet intuitive, shape editing tool built with modern web technologies. This application offers seamless drawing, shape modification, and AI-powered shape recognition for a smooth and user-friendly experience. 
<br/>
For the AI features is used free model **Qwen2.5 VL 72B Instruct (FREE)**. 

## ✨ Features

- **Create & Edit Shapes** – Draw and modify shapes easily using the interactive editor.
- **Shape Modification** – Instantly transform selected shapes using the **Modify Shape** button.
- **AI Shape Recognition** – Select a shape and let AI determine its type with the **Recognize Shape (AI)** button.
- **Theme Switching** – Switch themes for your convenience (light/dark mode).
- **Auto Save** – Your work is automatically saved and restored when you reload the page.
- **User-Friendly Design** – Clean UI with responsive layout and easy navigation.
- **Responsive & Adaptive UI** – The editor is fully optimized for desktops, tablets, and mobile devices.


---
## 📸 Screens

### 🏠 Home Page

![Home Screenshot](https://github.com/exslym/vidext_test_task/blob/main/public/home-page.png "Home Page")

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### 🖌 Editor Page

![Editor Screenshot](https://github.com/exslym/vidext_test_task/blob/main/public/editor-page.png "Editor in Action")

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🛠 Technologies Used

### Frontend

- **[Next.js](https://nextjs.org/)** – Provides SSR and API routes, ensuring fast and efficient rendering.
- **[React](https://react.dev/)** – Enables dynamic and component-based UI interactions.
- **[TailwindCSS](https://tailwindcss.com/)** – A utility-first CSS framework for quick and beautiful styling.
- **[Shadcn/UI](https://ui.shadcn.com/)** – Delivers high-quality UI components for a smooth user experience.
- **[Tldraw](https://tldraw.com/)** – The core library behind the drawing editor, providing shape manipulation tools.

### Backend

- **[tRPC](https://trpc.io/)** – Ensures type-safe API communication between frontend and backend.
- **[Zod](https://zod.dev/)** – Used for input validation and schema enforcement.
- **[Lodash Debounce](https://lodash.com/docs/4.17.15#debounce)** – Optimizes auto-save by reducing redundant API calls.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🚀 Getting Started

### ✅ Prerequisites

- **Node.js** (v16 or later)
- **npm** (v8 or later)

### 📦 Installation

1. Clone the repository:

```sh
git clone https://github.com/exslym/vidext_test_task.git
cd vidext_test_task
```

2. Install dependencies:
```sh
npm install
```

3. Create a .env file in the root of the project
4. Sign in the [OPENROUTER.AI](https://openrouter.ai/models) ( via Google or Github)
5. Choose and click on prefered visual understanding model (**Qwen2.5 VL 72B Instruct (FREE)** is used in this project)
6. Then go to tab **API** and click **Create API key**
7. Add your key as **NEXT_PUBLIC_OPENROUTER_API_KEY** in .env

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### 🏃 Running the App Locally
1. Start the development server:

```sh
npm run dev
```

2. Open your browser and go to:

```sh
http://localhost:3000
```

### 🏗 How to Use
- **Go to the Editor** – Navigate to the editor page from the homepage.
- **Draw & Edit Shapes** – Use the interactive canvas to create and modify shapes.
- **Modify a Shape** – Select a shape and click the Modify Shape button to change its type.
- **Recognize a Shape (AI)** – Select a shape and click Recognize Shape (AI) to detect its type.
- **Theme Switching** – Click Theme Switcher to switch between light and dark mode.
- **Auto Save** – Your progress is saved automatically.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---
