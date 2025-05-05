
import { Job } from "@/types/types";

// This function would typically fetch jobs from Netlify CMS
// For now, it's a placeholder for future implementation
export async function fetchJobs(): Promise<Job[]> {
  // In a real app, this would fetch from Netlify CMS API
  // For demo purposes, we'll return empty array since the data is hardcoded in the Index component
  return [];
}

// Helper function to convert Netlify CMS data format to our Job type
export function convertCmsJobsToJobType(cmsJobs: any[]): Job[] {
  return cmsJobs.map((job) => ({
    id: job.slug || String(Math.random()),
    title: job.title,
    location: job.location,
    deadline: job.deadline,
    type: job.type,
    applyLink: job.applyLink,
    description: job.description,
    companyName: job.companyName,
    companyLogo: job.companyLogo,
    createdAt: job.createdAt,
  }));
}
