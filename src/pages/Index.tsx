
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import JobList from "@/components/JobList";
import { Job } from "@/types/types";
import { fetchJobs } from "@/utils/cms";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Fetch jobs from Netlify CMS
  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Show error toast if jobs fetch fails
  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading jobs",
        description: "Could not load jobs. Please try again later.",
        variant: "destructive",
      });
      console.error("Error fetching jobs:", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onSearch={setSearchQuery}
        onTypeChange={setTypeFilter}
        onLocationChange={setLocationFilter}
      />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
          </div>
        ) : (
          <JobList 
            jobs={jobs}
            searchQuery={searchQuery}
            typeFilter={typeFilter}
            locationFilter={locationFilter}
          />
        )}
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} dWorkz. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
