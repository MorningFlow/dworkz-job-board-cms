
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
    // Import markdown files with frontmatter support using vite-plugin-markdown
    const jobModules = import.meta.glob('@/content/jobs/*.md', { 
      eager: true,
    });
    
    console.log("Job modules found:", Object.keys(jobModules).length);
    
    if (!jobModules || Object.keys(jobModules).length === 0) {
      console.warn("No job modules found, using sample data");
      return sampleJobs;
    }
    
    // Process each module and extract the job data
    const jobs: Job[] = Object.entries(jobModules).map(([path, module]) => {
      // Extract the slug from the file path
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      
      console.log("Processing job:", slug);
      console.log("Module content:", module);
      
      // Various ways that vite-plugin-markdown could expose the data
      let data: any = {};
      
      if ((module as any).default) {
        console.log("Module has default export");
        data = (module as any).default;
      }
      
      if ((module as any).attributes) {
        console.log("Module has attributes");
        data = (module as any).attributes;
      } else if ((module as any).frontmatter) {
        console.log("Module has frontmatter");
        data = (module as any).frontmatter;
      } else {
        // If the module itself is the data
        data = module;
      }
      
      // Debug the data structure
      console.log("Job data for", slug, ":", data);
      
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
    
    console.log("Total jobs parsed:", jobs.length);
    console.log("Parsed jobs data:", jobs);
    
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
