import React from "react";

import Link from "next/link";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Wrapper, InnerWrap } from "@/lib/atoms";
import { TitleBlock } from "@/components/ui/titleblock";
const jobList = [
  {
    title: "Videographer",
    slug: "videographer",
    location: "Remote",
    type: "Freelance",
  },
  {
    title: "Sales Assistant",
    slug: "sales-assistant",
    location: "Remote",
    type: "Freelance",
  },
  {
    title: "Sales Admin",
    slug: "sales-admin",
    location: "Remote",
    type: "Freelance",
  },
];

const CareersPage = () => {
  return (
    <main className="mx-auto fillscreen">
      <Wrapper>
        <InnerWrap className="flex w-full max-w-6xl">
          <TitleBlock
            heading="Careers at Our Company"
            body="Join our team and help us create amazing experiences for our clients. We are a dynamic company with a passion for innovation and excellence."
            subheading="Available Roles"
            theme="light"
            orientation="left"
          />
          <div className="w-full flex border rounded-xl p-4 mt-12">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobList.map((job) => (
                  <TableRow key={job.slug}>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.type}</TableCell>
                    <TableCell>
                      <Link href={`/careers/${job.slug}`}>
                        <div className="text-blue-500 hover:underline">
                          View Details
                        </div>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </InnerWrap>
      </Wrapper>
    </main>
  );
};

export default CareersPage;
