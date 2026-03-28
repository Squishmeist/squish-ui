export type NavSection = {
  title?: string;
  items: NavItem[];
};

export type NavItem = {
  title: string;
  href: string;
};

export const navigation: NavSection[] = [
  {
    items: [{ title: "Introduction", href: "/docs" }],
  },
  {
    title: "Web Components",
    items: [
      { title: "Installation", href: "/docs/components/web/installation" },
      { title: "Button", href: "/docs/components/web/button" },
      { title: "Input", href: "/docs/components/web/input" },
      { title: "Textarea", href: "/docs/components/web/textarea" },
      { title: "Checkbox", href: "/docs/components/web/checkbox" },
      { title: "Select", href: "/docs/components/web/select" },
    ],
  },
  {
    title: "Mobile Components",
    items: [
      { title: "Installation", href: "/docs/components/mobile/installation" },
      { title: "Button", href: "/docs/components/mobile/button" },
      // { title: "Input", href: "/docs/components/mobile/input" },
    ],
  },
];
