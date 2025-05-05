
import { Card, CardContent } from "@/components/ui/card";
import { Job } from "@/types/types";
import { MapPin, Calendar, Briefcase } from "lucide-react";

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

const JobCard = ({ job, onClick }: JobCardProps) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow animate-fade-in border border-gray-200"
      onClick={onClick}
    >
      <CardContent className="p-5">
        <h2 className="text-lg font-semibold mb-2 text-brand-dark">{job.title}</h2>
        {job.companyName && (
          <p className="text-sm text-gray-600 mb-3">{job.companyName}</p>
        )}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>Deadline: {job.deadline}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{job.type} Job</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
