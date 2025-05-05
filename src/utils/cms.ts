
import { Job } from "@/types/types";
import matter from "gray-matter";

// This function fetches jobs from Netlify CMS's markdown files in the public/jobs folder
export async function fetchJobs(): Promise<Job[]> {
  try {
    // Get the list of markdown files from the jobs directory
    const jobFiles = import.meta.glob('/public/jobs/*.md', { eager: true, as: 'raw' });
    
    // Process each file and convert to Job objects
    const jobs = await Promise.all(
      Object.entries(jobFiles).map(async ([path, content]) => {
        // Extract the slug from the file path
        const slug = path.replace('/public/jobs/', '').replace('.md', '');
        
        // Parse front matter from markdown
        const { data } = matter(content as string);
        
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
      })
    );
    
    // Sort jobs by createdAt date, newest first
    return jobs.sort((a, b) => {
      return new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime();
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
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
