import React from 'react';

export function Footer() {
  const links = [
    'Help',
    'API',
    'Privacy',
    'Terms',
    'Locations',
    'Contact',
  ];

  return (
    <footer className="mt-24 pb-8 text-center text-gray-400">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4 text-xs">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-gray-300 transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center justify-center gap-4 text-xs">
          <select
            className="bg-transparent border-none text-gray-400 focus:outline-none cursor-pointer"
            defaultValue="en"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
          <span>© 2024 Koko</span>
        </div>
      </div>
    </footer>
  );
}