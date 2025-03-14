"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HomePage: React.FC = () => {
  return (
    <>
      <main className="w-screen h-screen flex items-center justify-center bg-gray-50">
        <section className="max-w-2xl text-center space-y-6 p-6 bg-white shadow-xl rounded-lg">
          <h1 className="text-4xl font-bold">Welcome to Tldraw Editor!</h1>
          <p className="text-lg text-gray-600">
            A simple and powerful drawing editor built with Tldraw, Next.js,
            TailwindCSS, and tRPC.
          </p>
          <ul className="list-disc list-inside text-left text-gray-700 space-y-2">
            <li>Create and edit shapes on the canvas</li>
            <li>Automatic saving and loading of canvas state</li>
            <li>Quick shape modification button</li>
            <li>Clean and user-friendly design</li>
          </ul>
          <Link href="/editor">
            <Button
              className="px-5 py-2 bg-blue-primary text-white rounded-lg shadow-md hover:bg-blue-400 transition"
              variant="default"
            >
              Open Editor
            </Button>
          </Link>
        </section>
      </main>
    </>
  );
};
export default HomePage;
