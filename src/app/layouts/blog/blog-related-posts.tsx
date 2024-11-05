import { InnerWrap, Wrapper } from "@/lib/atoms";
import { Article } from "@/lib/types";
import { paths } from "@/routes/paths";
import Image from "next/image";
import Link from "next/link";

interface BlogRelatedPostsProps {
  relatedPosts?: Article[];
}

export function BlogRelatedPosts({ relatedPosts }: BlogRelatedPostsProps) {
  return (
    <Wrapper className="py-[5dvh]">
      <InnerWrap>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-gray-200 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-900 rounded-xl p-8">
          <div className="flex flex-col justify-start items-start">
            <h2 className="text-3xl font-bold mb-2">Related Articles</h2>
            <p className="mb-8">You might find these articles interesting.</p>
          </div>
          <ul className="grid grid-cols-1 gap-2">
            {relatedPosts?.map((post, index) => (
              <li key={index} className="flex items-center mb-4">
                <Link
                  href={paths.blog.slug(post.slug)}
                  className="flex items-center w-full"
                >
                  <Image
                    src={post.image}
                    alt={post.slug}
                    width={60}
                    height={60}
                    className="rounded mr-4"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{post.title}</span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
