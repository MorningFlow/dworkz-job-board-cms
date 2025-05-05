
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import { Job } from "@/types/types";

interface JobModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const JobModal = ({ job, isOpen, onClose }: JobModalProps) => {
  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand-dark">{job.title}</DialogTitle>
          {job.companyName && (
            <DialogDescription className="text-base font-medium">{job.companyName}</DialogDescription>
          )}
        </DialogHeader>
        <div className="mt-2 space-y-3">
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

          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="font-medium mb-2">Job Description</h3>
            <div className="text-sm text-gray-800 whitespace-pre-line">{job.description}</div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button 
            asChild
            className="bg-brand-primary hover:bg-brand-secondary text-white"
          >
            <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
              Apply Now
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobModal;
