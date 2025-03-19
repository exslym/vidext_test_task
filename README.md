<a id="readme-top"></a>

# Tldraw Editor

An advanced, yet intuitive, shape editing tool built with modern web technologies. This application offers seamless drawing, shape modification, AI-powered shape recognition, and the ability to save projects to a gallery for future interaction and editing, providing a smooth and user-friendly experience.
<br/>
For the AI features is used free model **Qwen2.5 VL 72B Instruct (FREE)**.

<a href="https://tldraw-editor.vercel.app/" target="_blank" rel="noopener noreferrer">**Demo View on Vercel**</a>

## ✨ Features

- **Draw & Edit** – Create and modify sketches with an easy-to-use canvas.
- **Save Projects** – Save your projects to the gallery for easy access and future editing.
- **Shape Modification** – Select a shape and easily switch between different geometric shapes using a dedicated button.
- **Project Gallery** – Organize your saved projects in the gallery, preview them, and manage them effortlessly.
- **Export Options** - Download your work in multiple formats, including SVG and PNG.
- **AI Shape Recognition** – Select a hand-drawn shape and press the AI button to convert it into a precise geometric form.
- **User-Friendly Design** – Clean UI with responsive layout and easy navigation.
- **Responsive & Adaptive UI** – The editor is fully optimized for desktops, tablets, and mobile devices.

---

## 📸 Screens

### 🏠 Home Page

![Home Screenshot](https://github.com/exslym/vidext_test_task/blob/main/public/home_page.png 'Home Page')

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### 🖌 Gallery Page

![Gallery Screenshot](https://github.com/exslym/vidext_test_task/blob/main/public/gallery_page.png 'Gallery Page')

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### 🖌 Editor Page

![Editor Screenshot](https://github.com/exslym/vidext_test_task/blob/main/public/editor_page.png 'Editor Page')

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🛠 Technologies Used

### Frontend

- <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">**Next.js**</a> – Provides SSR and API routes, ensuring fast and efficient rendering.
- <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">**React**</a> – Enables dynamic and component-based UI interactions.
- <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">**TailwindCSS**</a> – A utility-first CSS framework for quick and beautiful styling.
- <a href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer">**Shadcn/UI**</a> – Delivers high-quality UI components for a smooth user experience.
- <a href="https://tldraw.com/" target="_blank" rel="noopener noreferrer">**Tldraw**</a> – The core library behind the drawing editor, providing shape manipulation tools.
- <a href="https://react-hot-toast.com/" target="_blank" rel="noopener noreferrer">**Toaster (react-hot-toast)**</a> – Cares of rendering all notifications emitted.

### Backend

- <a href="https://trpc.io/" target="_blank" rel="noopener noreferrer">**tRPC**</a> – Ensures type-safe API communication between frontend and backend.
- <a href="https://zod.dev/" target="_blank" rel="noopener noreferrer">**Zod**</a> – Used for input validation and schema enforcement.
- <a href="https://lodash.com/docs/4.17.15#debounce" target="_blank" rel="noopener noreferrer">**Lodash Debounce**</a> – Optimizes auto-save by reducing redundant API calls.

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
4. Sign in the <a href="https://openrouter.ai/models" target="_blank" rel="noopener noreferrer">**OPENROUTER.AI**</a> ( via Google or Github)
5. Choose and click on prefered visual understanding model (**Qwen2.5 VL 72B Instruct (FREE)** is used in this project)
6. Then go to tab **API** and click **Create API key**
7. Add your key as **NEXT_OPENROUTER_API_KEY** in .env

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

---

### 🏃 Test API calls

1. After runnig the app locally open a new browser tab and navigate to the following route:

```sh
http://localhost:3000/test-api
```
2. Available API Methods for Testing:

```sh
Get Data
Set Data
Delete All Data
Recognize Shape
```

The testing interface is intended for local development and debugging purposes only.

---

### 🏗 How to Use

- **Go to the Editor** – Navigate to the editor page from the homepage.
- **Draw & Edit Shapes** – Use the interactive canvas to create and modify shapes.
- **Modify a Shape** – Select a shape and click the Modify Shape button to change its type.
- **Recognize a Shape (AI)** – Select a shape and click Recognize Shape (AI) to detect its type.
- **Save Project** – Save your projects and see them in the gallery page.
- **Go to the Gallery** – Navigate to the gallery page from the homepage or editor page and there you can edit or delete your projects.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---
