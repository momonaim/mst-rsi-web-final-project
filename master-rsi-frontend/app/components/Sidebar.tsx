"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
  { name: "Matrices Manipulation", path: "/projects/matrices" },
  { name: "Form Handling", path: "/projects/formulaires" },
  { name: "Image Management", path: "/projects/images" },
  { name: "Quiz", path: "/projects/quiz" },
  { name: "Statistics with ChartJS", path: "/projects/statistics" },
  { name: "Geolocation", path: "/projects/geolocation" },
];

const navItems = [
  { name: "Accueil", path: "/", icon: "🏠" },
  { name: "Mes Projets", path: "/projects", icon: "📁" },
  { name: "À propos", path: "/about", icon: "👨🏻‍💻" },
];

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-white px-8 py-10 border-r border-gray-100 shadow-sm">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-gray-800 mb-8 flex items-center gap-2"
      >
        <span className="text-blue-500">🎓</span>
        <span>Mon Portfolio</span>
      </motion.h2>

      <nav className="flex flex-col space-y-3">
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={item.path}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 text-gray-700 hover:text-blue-600"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>

            {item.name === "Mes Projets" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="ml-6 mt-2 space-y-2 pl-4 border-l-2 border-gray-100"
              >
                {projects.map((project) => (
                  <Link
                    key={project.path}
                    href={project.path}
                    className="block py-2 px-3 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors duration-150 text-sm"
                  >
                    <span className="text-blue-400 mr-2">•</span>
                    {project.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </nav>
    </aside>
  );
}
