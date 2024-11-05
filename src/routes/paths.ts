export const ROOTS = {
  BASE: "https://inmoinversor.com",
  ABOUT: "/about",
  BLOG: "/blog",
};

export const paths = {
  base: {
    root: ROOTS.BASE,
    about: `${ROOTS.BASE}${ROOTS.ABOUT}`,
    blog: (slug: string) => `${ROOTS.BASE}${ROOTS.BLOG}/${slug}`,
  },
  about: {
    root: ROOTS.ABOUT,
  },
  blog: {
    root: ROOTS.BLOG,
    slug: (slug: string) => `${ROOTS.BLOG}/${slug}`,
  },
};
