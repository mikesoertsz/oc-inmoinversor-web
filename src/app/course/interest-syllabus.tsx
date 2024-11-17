"use client";
import { Button } from "@/components/ui/button";
import { GreyBlock, InnerWrap, Wrapper } from "@/lib/atoms";
import { useState } from "react";
import {
  RiInformationLine,
  RiMouseLine,
  RiPresentationFill,
} from "react-icons/ri";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiOutlineClock } from "react-icons/hi2";
import { LuGoal } from "react-icons/lu";
import { MdOutlineCode, MdOutlineSmartDisplay } from "react-icons/md";
import { TiDocument } from "react-icons/ti";
import ReactPlayer from "react-player";
import CourseSectionHeader from "@/components/blocks/course-section-header";

export type Syllabus = {
  header: string | React.ReactNode;
  chapters: {
    title: string;
    description: string;
    sections: {
      preview: boolean;
      previewlink: string;
      type: string;
      title: string;
      duration: number;
    }[];
    totalduration: number;
    free: boolean;
  }[];
};

export default function CourseSyllabus({ syllabus }: { syllabus: Syllabus }) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleExpandAll = () => {
    if (expandedItems.length > 0) {
      setExpandedItems([]);
    } else {
      setExpandedItems(syllabus.chapters.map((_, index) => `item-${index}`));
    }
  };

  return (
    <Wrapper className="" id="syllabus">
      <InnerWrap>
        <div className="flex flex-col w-full md:px-0">
          <CourseSectionHeader
            header={{
              preheading: "Programa",
              title: "Catálogo del Curso",
              subtitle: "Desglose de los módulos y materiales del curso.",
              icon: <LuGoal size={18} />,
              description:
                "El programa está diseñado para enseñar de manera práctica y acumulativa, asegurando que aprendas las mejores prácticas a lo largo del curso.",
            }}
            right={
              <Button
                className="mt-2 text-xs text-gray-800 hover:text-black"
                variant="link"
                onClick={handleExpandAll}
              >
                Abrir/Cerrar Todo
              </Button>
            }
          />
          <div className="hidden mb-4 text-xs text-gray-700">
            {syllabus.chapters.length} secciones •{" "}
            {syllabus.chapters.reduce(
              (lectureCount, chapter) => lectureCount + chapter.sections.length,
              0
            )}{" "}
            módulos •{" "}
            {(() => {
              const totalSeconds = syllabus.chapters.reduce(
                (totalDuration, chapter) =>
                  totalDuration + chapter.totalduration,
                0
              );
              const hours = Math.floor(totalSeconds / 3600);
              const minutes = Math.floor((totalSeconds % 3600) / 60);
              const seconds = totalSeconds % 60;
              return `${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`;
            })()}{" "}
            duración total
          </div>
          <GreyBlock>
            <Accordion
              type="multiple"
              className="w-full"
              value={expandedItems}
              onValueChange={setExpandedItems}
            >
              {syllabus.chapters.map((chapter, index) => (
                <AccordionItem
                  key={`chapter-${index}`}
                  value={`item-${index}`}
                  className="px-4 mt-2 transition ease-in-out bg-white border border-gray-200 rounded-lg shadow-sm duratin-300 first:mt-0 hover:shadow-md"
                >
                  <AccordionTrigger>
                    <div className="flex items-center justify-between w-full group">
                      <div className="flex items-start justify-start">
                        <div className="flex items-center justify-center w-5 h-5 mr-4 font-medium rounded-sm bg-brand-o0 text-[0.8em] border border-brand-o2">
                          {index + 1}
                        </div>
                        <div className="transition duration-300 ease-in-out group-hover:translate-x-1">
                          {chapter.title}
                        </div>
                        {chapter.free && (
                          <span className="px-3 ml-4 text-[10px] font-medium text-gray-900 bg-green-200 rounded-full">
                            Gratis
                          </span>
                        )}
                      </div>
                      <div className="hidden mr-8 text-xs font-normal text-gray-500 md:block">
                        {chapter.sections.length}{" "}
                        {chapter.sections.length === 1
                          ? "sección"
                          : "secciones"}{" "}
                        •{" "}
                        {new Date(chapter.totalduration * 1000)
                          .toISOString()
                          .substr(14, 5)}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="">
                    <p className="pb-3 text-xs text-left text-gray-600 pl-9">
                      {chapter.description}
                    </p>
                    <ul
                      role="list"
                      className="gap-1 px-4 pt-2 text-xs text-gray-600 border-t"
                    >
                      {chapter.sections.map((section, index) => (
                        <div
                          key={`section-${index}`}
                          className="relative flex items-center justify-start pr-1 mt-1 rounded-md hover:bg-slate-50"
                        >
                          {section.type === "lecture" ? (
                            <RiPresentationFill
                              className="relative text-gray-500 z-10 pr-[1px] bg-white"
                              size={18}
                            />
                          ) : section.type === "demo" ? (
                            <RiMouseLine
                              className="relative text-gray-600 z-10 pr-[1px] bg-white rounded-full p-[2px] border"
                              size={18}
                            />
                          ) : section.type === "document" ? (
                            <TiDocument
                              className="relative text-gray-600 z-10 pr-[1px] bg-white rounded-full p-[2px] border"
                              size={18}
                            />
                          ) : section.type === "code" ? (
                            <MdOutlineCode
                              className="relative text-gray-600 z-10 pr-[1px] bg-white rounded-full p-[2px] border"
                              size={18}
                            />
                          ) : section.type === "video" ? (
                            <MdOutlineSmartDisplay
                              className="relative text-gray-600 z-10 pr-[1px] bg-white"
                              size={18}
                            />
                          ) : (
                            <RiInformationLine
                              className="relative text-gray-600 z-10 pr-[1px] bg-white rounded-full p-[2px] border"
                              size={18}
                            />
                          )}
                          {index < chapter.sections.length - 1 && (
                            <div className="absolute flex left-[7.5px] top-4 -bottom-5 w-[1px] bg-gray-200 z-0 first:top-5 last:pb-[50%]"></div>
                          )}
                          <div className="flex items-center justify-center w-full ">
                            <div className="flex justify-start flex-1 py-1">
                              <div className="ml-4 text-[1.1em] font-normal text-gray-900">
                                {section.title}
                              </div>
                            </div>
                            <div className="flex items-center">
                              {section.type === "video" && section.previewlink && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <button className="mr-2 text-xs font-normal text-blue-500 hover:underline">
                                      Vista Previa
                                    </button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-4xl">
                                    <DialogHeader>
                                      <DialogTitle className="pb-2">
                                        {section.title}
                                      </DialogTitle>
                                      <DialogDescription className="pt-2">
                                        <ReactPlayer
                                          url={section.previewlink}
                                          width="100%"
                                          height="100%"
                                          controls={true}
                                          pip
                                          className="flex min-w-full overflow-hidden border rounded-xl bg-slate-50 aspect-video"
                                        ></ReactPlayer>
                                      </DialogDescription>
                                    </DialogHeader>
                                  </DialogContent>
                                </Dialog>
                              )}
                              {section.duration > 0 && (
                                <div className="flex items-center justify-center gap-1 text-xs font-normal text-gray-500">
                                  <HiOutlineClock
                                    size={12}
                                    className="text-gray-800"
                                  />
                                  {new Date(section.duration * 1000)
                                    .toISOString()
                                    .substr(14, 5)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </GreyBlock>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
