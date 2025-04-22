import { notFound } from "next/navigation";
import { Wrapper, InnerWrap } from "@/lib/atoms";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface JobParams {
  params: Promise<{ jobSlug: string }>;
}

async function fetchJobData(slug: string) {
  try {
    const response = await import(`../${slug}.json`);
    return response.default;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: JobParams) {
  const { jobSlug } = await params;
  const job = await fetchJobData(jobSlug);
  if (!job) {
    return {};
  }

  return {
    title: job.title,
    description: job.company.description,
  };
}

export default async function Job({ params }: JobParams) {
  const { jobSlug } = await params;
  const job = await fetchJobData(jobSlug);

  if (!job) {
    return notFound();
  }

  return (
    <Wrapper>
      <InnerWrap>
        <Link href="/careers">
          <a className="text-blue-500 hover:underline">
            &larr; Back to Careers
          </a>
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl font-medium tracking-tight">
              {job.title}
            </CardTitle>
            <div className="flex space-x-2">
              <Badge variant="outline">{job.employment_type}</Badge>
              <Badge variant="outline">{job.location.type}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Company Overview</h2>
              <p>{job.company.description}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Requirements</h2>
              <ul className="list-disc list-inside space-y-1">
                {job.requirements.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
              <ul className="list-disc list-inside space-y-1">
                {job.responsibilities.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Benefits</h2>
              <ul className="list-disc list-inside space-y-1">
                {job.compensation.benefits.map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                Technologies & Tools
              </h2>
              <ul className="list-disc list-inside space-y-1">
                {[...job.technologies, ...job.tools].map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Skills</h2>
              <ul className="list-disc list-inside space-y-1">
                {[...job.skills, ...job.soft_skills].map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Education</h2>
              <p>Required: {job.education.required}</p>
              <p>Preferred: {job.education.preferred}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Languages</h2>
              <p>Required: {job.languages.required.join(", ")}</p>
              <p>Preferred: {job.languages.preferred.join(", ")}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                Application Process
              </h2>
              <ul className="list-disc list-inside space-y-1">
                {job.application.application_process.map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex justify-between">
              <p>Posted at: {job.posted_at}</p>
              <p>Updated at: {job.updated_at}</p>
            </div>
          </CardFooter>
        </Card>
      </InnerWrap>
    </Wrapper>
  );
}
