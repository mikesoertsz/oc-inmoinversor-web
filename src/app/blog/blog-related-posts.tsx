import { InnerWrap, Wrapper } from "@/lib/atoms";
import Image from "next/image";
import Link from "next/link";

const relatedPosts = {
  title: "Related Articles",
  description: "You might find these articles interesting.",
  posts: [
    {
      category: "Invest",
      title: "Top Tips for First-Time Investors",
      description:
        "Discover essential strategies for successful real estate investments in Spain.",
      author: "John Doe",
      date: "11 Jan 2022",
      readTime: "5 min read",
    },
    {
      category: "Market",
      title: "Understanding Property Valuation in Spain",
      description:
        "Learn how to accurately assess property values for investments.",
      author: "Alex Smith",
      date: "10 Feb 2022",
      readTime: "5 min read",
    },
    {
      category: "Finance",
      title: "Navigating Mortgages for Investment Properties",
      description:
        "Essential tips for securing financing for your real estate investments.",
      author: "Alex Johnson",
      date: "15 Mar 2022",
      readTime: "7 min read",
    },
  ],
};

export default function BlogRelatedPosts() {
  return (
    <Wrapper className="py-[5dvh]">
      <InnerWrap>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-gray-200 bg-gray-100 rounded-xl p-8">
          <div className="flex flex-col justify-start items-start">
            <h2 className="text-3xl font-bold mb-2">{relatedPosts.title}</h2>
            <p className="mb-8">{relatedPosts.description}</p>
          </div>
          <ul className="grid grid-cols-1 gap-2">
            {relatedPosts.posts.map((post, index) => (
              <li key={index} className="flex items-center mb-4">
                <Link href="/" className="flex items-center w-full">
                  <Image
                    src="/images/placeholder.jpg"
                    alt={post.title}
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
