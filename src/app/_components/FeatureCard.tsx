"use client";

export default function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <div className="p-3 rounded-full bg-gray-primary dark:bg-gray-700">
        {icon}
      </div>
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-700 dark:text-gray-400 text-sm text-center">
        {description}
      </p>
    </div>
  );
}
