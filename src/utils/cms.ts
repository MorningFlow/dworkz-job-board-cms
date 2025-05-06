
import { Job } from "@/types/types";

// Sample job data to use as fallback
const sampleJobs: Job[] = [
  {
    id: "sample-job-1",
    title: "Floor Cleaner",
    companyName: "ARK group of companies",
    location: "Kerala",
    deadline: "10th may 2025",
    type: "Private",
    applyLink: "dworkz.in",
    description: "s﻿alary upwards of 1 cr",
    createdAt: "2025-05-05T09:46:35.073Z"
  }
];

// This function fetches jobs from Netlify CMS's markdown files
export async function fetchJobs(): Promise<Job[]> {
  try {
    // In a browser environment, we'll fetch job data from the public directory
    // We can use import.meta.glob but don't use gray-matter directly
    const jobModules = import.meta.glob('@/content/jobs/*.md', { eager: true });
    
    if (!jobModules || Object.keys(jobModules).length === 0) {
      console.warn("No job modules found, using sample data");
      return sampleJobs;
    }
    
    // Process each module and extract the job data
    const jobs: Job[] = Object.entries(jobModules).map(([path, module]) => {
      // Extract the slug from the file path
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      
      // Access the frontmatter from the module (Vite handles this)
      const data = (module as any).frontmatter || (module as any).default?.attributes || {};
      
      // Convert to Job type
      return {
        id: slug,
        title: data.title || '',
        location: data.location || '',
        deadline: data.deadline || '',
        type: data.type || '',
        applyLink: data.applyLink || '',
        description: data.description || '',
        companyName: data.companyName || '',
        companyLogo: data.companyLogo || '',
        createdAt: data.createdAt || new Date().toISOString(),
      };
    });
    
    // If no jobs were parsed correctly, return the sample data
    if (jobs.length === 0) {
      console.warn("No jobs parsed correctly, using sample data");
      return sampleJobs;
    }
    
    // Sort jobs by createdAt date, newest first
    return jobs.sort((a, b) => {
      return new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime();
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    // Return sample jobs as fallback
    return sampleJobs;
  }
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
