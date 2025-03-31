import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Add Link component to be available in MDX files
    Link,
    // Merge any custom components passed in
    ...components,
  };
}
