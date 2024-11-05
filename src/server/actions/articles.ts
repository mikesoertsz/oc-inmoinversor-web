"use server";
import { CUSTOM_MDX_COMPONENTS } from "@/components/ui/mdx";
import { awaitAllSettled } from "@/lib/await-settled";
import { fAfter, fSameOrBefore } from "@/lib/format-time";
import { Article, FrontMatterFields } from "@/lib/types";
import { limit } from "@/lib/utils";
import { promises as fs } from "fs";
import { compileMDX, MDXRemoteProps } from "next-mdx-remote/rsc";
import path from "path";

const articlesDir = path.join(process.cwd(), "./articles");

const genArticles = async (): Promise<Article[]> => {
  const filenames = await fs.readdir(articlesDir);
  const files = await awaitAllSettled(filenames, async (filename) => {
    const file = await fs.readFile(
      path.join(articlesDir, `${filename}`),
      "utf-8"
    );

    const { content, frontmatter } = await compileMDX<FrontMatterFields>({
      source: file,
      options: {
        parseFrontmatter: true,
      },
      components: CUSTOM_MDX_COMPONENTS as MDXRemoteProps["components"],
    });

    return {
      filename,
      content,
      ...frontmatter,
      slug: frontmatter.slug ?? filename.replace(".mdx", ""),
    };
  });

  return files
    .filter((file) => {
      if (fAfter(file.date)) return false;
      return true;
    })
    .toSorted((a, b) => {
      return fSameOrBefore(a.date, b.date) ? 1 : -1;
    });
};

export async function getAllArticlesAction(): Promise<Article[]> {
  const files = await genArticles();
  return files;
}

export async function getAllFeaturedArticlesAction(): Promise<Article[]> {
  const files = await genArticles();
  const data = files.filter((file) => file.featured);
  return data;
}

export async function getAllShortsArticlesAction(): Promise<Article[]> {
  const files = await genArticles();
  const data = files.filter((file) => file.shorts);
  return data;
}

export async function getLatestArticleAction(): Promise<Article> {
  const files = await genArticles();
  return limit(files, 1)[0];
}

export async function getArticleBySlugAction(
  slug: string
): Promise<Article | undefined> {
  const files = await genArticles();
  const data = files.find((file) => file.slug === slug);
  return data;
}

export async function getRelatedArticlesAction(
  slugs?: string[]
): Promise<Article[]> {
  const files = await genArticles();
  const data = files.filter((file) => slugs?.includes(file.slug));
  return data || [];
}
