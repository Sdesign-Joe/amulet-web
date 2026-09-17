const LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/amuletaqua",
    path: "M13.5 22v-8h2.7l.4-3.1h-3.1V9c0-.9.25-1.5 1.55-1.5H16.7V4.7C16.4 4.66 15.4 4.58 14.2 4.58c-2.4 0-4.05 1.47-4.05 4.16v2.16H7.4v3.1h2.75V22h3.35Z",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/amulet_aqua/",
    path: "M12 8.7a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6ZM12 4.2c-2.12 0-2.39.01-3.22.05-.83.04-1.4.17-1.9.37-.51.2-.95.47-1.38.9-.43.43-.7.87-.9 1.38-.2.5-.33 1.07-.37 1.9-.04.83-.05 1.1-.05 3.22s.01 2.39.05 3.22c.04.83.17 1.4.37 1.9.2.51.47.95.9 1.38.43.43.87.7 1.38.9.5.2 1.07.33 1.9.37.83.04 1.1.05 3.22.05s2.39-.01 3.22-.05c.83-.04 1.4-.17 1.9-.37.51-.2.95-.47 1.38-.9.43-.43.7-.87.9-1.38.2-.5.33-1.07.37-1.9.04-.83.05-1.1.05-3.22s-.01-2.39-.05-3.22c-.04-.83-.17-1.4-.37-1.9a3.72 3.72 0 0 0-.9-1.38 3.72 3.72 0 0 0-1.38-.9c-.5-.2-1.07-.33-1.9-.37-.83-.04-1.1-.05-3.22-.05Zm0 3a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm4.99-.2a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0Z",
  },
  {
    name: "X",
    href: "https://x.com/Amulet_aqua",
    path: "M17.53 4.5h2.83l-6.18 7.06 7.27 9.94h-5.69l-4.46-5.83-5.1 5.83H3.36l6.6-7.55L2.98 4.5h5.84l4.03 5.33L17.53 4.5Zm-.99 15.3h1.57L7.53 6.1H5.84l10.7 13.7Z",
  },
];

export default function SocialLinks() {
  return (
    <div className="mt-4 flex items-center gap-3">
      {LINKS.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors hover:bg-brand-navy hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d={link.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}
