"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Save,
  Shapes,
  Palette,
  Download,
  BrainCircuit,
} from "lucide-react";
import Header from "@/app/_components/Header";
import OpenButton from "@/app/_components/OpenButton";
import FeatureCard from "@/app/_components/FeatureCard";
import ThemeToggle from "@/components/ThemeToggle";

const HomePage: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header>
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/">
            <p className="text-3xl font-bold dark:text-gray-200">Tldraw</p>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <OpenButton />
          </div>
        </div>
      </Header>
      <main className="w-full h-full flex items-start justify-center bg-white px-4 dark:text-white dark:bg-dark-secondary">
        <section className="container py-14 flex flex-col items-center justify-start w-full text-center space-y-10">
          <h1 className="text-5xl font-bold dark:text-gray-200">
            Welcome to Tldraw Editor!
          </h1>
          <p className="text-xl text-gray-800 dark:text-gray-400">
            A simple and powerful drawing editor lets you create and save your
            sketches.
            <br />
            With this multifunctional tool you can do a lot of things.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full">
            <FeatureCard
              icon={<Pencil className="w-8 h-8 text-blue-500" />}
              title="Draw & Edit"
              description="Create and modify sketches with an easy-to-use canvas."
            />
            <FeatureCard
              icon={<Save className="w-8 h-8 text-yellow-500" />}
              title="Auto Save"
              description="Your sketches are saved automatically, so you never lose your progress."
            />
            <FeatureCard
              icon={<Shapes className="w-8 h-8 text-purple-500" />}
              title="Shape Modification"
              description="Select a shape and easily switch between different geometric shapes using a dedicated button."
            />
            <FeatureCard
              icon={<Palette className="w-8 h-8 text-red-500" />}
              title="Clean & User-friendly Design"
              description="Minimalist UI for distraction-free sketching and better user experience."
            />
            <FeatureCard
              icon={<Download className="w-8 h-8 text-indigo-500" />}
              title="Export Options"
              description="Download your work in multiple formats, including SVG and PNG."
            />
            <FeatureCard
              icon={<BrainCircuit className="w-8 h-8 text-green-500" />}
              title="AI Shape Recognition"
              description="Select a hand-drawn shape and press the AI button to convert it into a precise geometric form."
            />
          </div>

          <Link href="/editor">
            <Button
              className="px-5 py-2 bg-gray-secondary hover:bg-gray-600 rounded-lg shadow-lg dark:text-white dark:bg-gray-700 dark:hover:bg-gray-500"
              size="lg"
            >
              Open Editor
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
};
export default HomePage;
