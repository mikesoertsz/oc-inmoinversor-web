import Link from "next/link";
import type { MDXComponents } from "mdx/types";

// This file is required to use MDX in `app` directory
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="text-3xl font-medium mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-medium mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium mb-2">{children}</h3>
    ),
    a: ({ children, href }) =>
      href ? <Link href={href}>{children}</Link> : <a>{children}</a>,
    // Pass through any other components
    ...components,
  };
}
