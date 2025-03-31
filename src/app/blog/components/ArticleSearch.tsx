"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/paths";

interface Article {
  title: string;
  slug: string;
  description: string;
  image: string;
  alt_text: string;
  featured?: boolean;
}

interface ArticleSearchProps {
  articles: Article[];
}

export function ArticleSearch({ articles }: ArticleSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-medium mb-4">
          ¿Qué te gustaría aprender hoy?
        </h1>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full flex items-center">
            <Search className="absolute left-3 text-gray-500" size={20} />
            <Input
              placeholder="Buscar artículos..."
              className="w-full h-12 pl-10 text-sm rounded-full border-2 focus:border-primary bg-white"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (!open) setOpen(true);
              }}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Buscar artículos..."
              value={query}
              onValueChange={setQuery}
            />
            <CommandEmpty>No se encontraron artículos.</CommandEmpty>
            <CommandGroup>
              {filteredArticles.slice(0, 5).map((article) => (
                <CommandItem
                  key={article.slug}
                  onSelect={() => {
                    router.push(paths.blog.slug(article.slug));
                    setOpen(false);
                    setQuery("");
                  }}
                  className="flex flex-col items-start gap-1 py-3"
                >
                  <div className="font-medium">{article.title}</div>
                  <div className="text-xs text-gray-500 line-clamp-1">
                    {article.description}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
