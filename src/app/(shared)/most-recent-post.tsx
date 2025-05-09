import { InnerWrap, Wrapper } from "@/lib/atoms";
import { Article } from "@/lib/types";
import Image from "next/image";
import { limit } from "../../lib/utils";

const mostRecentPost = {
  title: "Unlock Expert Real Estate Investment Insights",
  description:
    "Join our YouTube community for invaluable real estate investment advice tailored for Spain. Stay updated with the latest trends and strategies to maximize your investment potential.",
  features: [
    {
      icon: "", // Replace with your icon path
      title: "Exclusive Content",
      description:
        "Access in-depth tutorials and market analysis directly from industry experts.",
    },
    {
      icon: "", // Replace with your icon path
      title: "Real-Time Updates",
      description:
        "Receive timely notifications on new videos and investment opportunities.",
    },
  ],
  imageUrl: "/img/related-post.jpg",
};

interface MostRecentPostProps {
  articles: Article[];
}

export default function MostRecentPost({ articles }: MostRecentPostProps) {
  return (
    <Wrapper>
      <InnerWrap>
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2">
          <div className="flex-1 text-left">
            <h2 className="mb-2 text-sm font-medium text-gray-500">
              Subscribe
            </h2>
            <h3 className="mb-4 text-3xl font-bold">{mostRecentPost.title}</h3>
            <p className="mb-8">{mostRecentPost.description}</p>
            <div className="grid w-full grid-cols-1 gap-4 mb-8 md:grid-cols-2">
              {limit(articles, 2).map((feature: Article, index: number) => (
                <div key={index} className="flex items-start w-full">
                  <div className="w-10 h-10 mr-4">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{feature.title}</h4>
                    <p className="text-gray-700">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-4">
              <button className="px-6 py-2 text-white bg-gray-800 rounded hover:bg-gray-700">
                Learn More
              </button>
              <button className="px-6 py-2 text-gray-800 bg-transparent border border-gray-800 rounded hover:bg-gray-100">
                Sign Up
              </button>
            </div>
          </div>
          <div className="flex w-full h-full aspect-video bg-slate-100">
            <div className="relative overflow-hidden rounded-lg aspect-video bg-slate-100">
              <Image
                src={mostRecentPost.imageUrl}
                alt={mostRecentPost.title}
                layout="fill"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
