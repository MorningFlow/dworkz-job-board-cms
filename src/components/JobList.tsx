
import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JobModal from "./JobModal";
import { Job } from "@/types/types";

interface JobListProps {
  jobs: Job[];
  searchQuery: string;
  typeFilter: string;
  locationFilter: string;
}

const JobList = ({ jobs, searchQuery, typeFilter, locationFilter }: JobListProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);

  useEffect(() => {
    const filtered = jobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
      
      const matchesType = !typeFilter || job.type === typeFilter;
      const matchesLocation = !locationFilter || 
        job.location.toLowerCase().includes(locationFilter.toLowerCase());
      
      return matchesSearch && matchesType && matchesLocation;
    });
    
    setFilteredJobs(filtered);
  }, [jobs, searchQuery, typeFilter, locationFilter]);

  const handleOpenModal = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <div className="py-6">
      {filteredJobs.length === 0 ? (
        <div className="text-center p-12">
          <h3 className="text-xl font-medium text-gray-600">No jobs match your search</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onClick={() => handleOpenModal(job)}
            />
          ))}
        </div>
      )}
      
      <JobModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default JobList;
