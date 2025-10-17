import React from "react";
import { Github, Linkedin, Twitter, Globe } from "lucide-react";

interface LinkItem {
  name: string;
  url: string;
  icon: JSX.Element;
  color: string; // 배경색
}

const links: LinkItem[] = [
  {
    name: "GitHub",
    url: "https://github.com/Oldentomato",
    icon: <Github className="w-5 h-5" />,
    color: "bg-gray-800 hover:bg-gray-900",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/%EC%9A%B0%EC%84%B1-%EC%A1%B0-524ab4261/",
    icon: <Linkedin className="w-5 h-5" />,
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    name: "Blog",
    url: "https://odblog.vercel.app/",
    icon: <Globe className="w-5 h-5" />,
    color: "bg-green-500 hover:bg-green-600",
  },
];

const LinksComponent: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
        Connect with me
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-6 py-3 rounded-xl text-white font-medium transition ${link.color}`}
          >
            {link.icon}
            <span>{link.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default LinksComponent;