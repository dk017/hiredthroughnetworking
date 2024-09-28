import React from 'react';
import { XIcon } from '@heroicons/react/solid';
import { Dialog } from '@headlessui/react';
import SocialShare from './SocialShare';


interface JobDetailModalProps {
  job: {
    title: string;
    email: string;
    company: string;
    skills: string;
    description: string;
    post_url: string;
    author_profile: string;
    location: string;
    is_linkedin: boolean;
  };
  onClose: () => void;
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, onClose }) => {


    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.stopPropagation(); // Prevent the click from closing the modal
    };


  return (
    <Dialog open={true} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black bg-opacity-30" />
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{job.title}</h2>
              <button onClick={onClose}>
                <XIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <p className="mt-2 text-gray-600">{job.company}</p>
            <p className="mt-2 text-gray-600">{job.location}</p>
            <p className="mt-4">{job.description}</p>
            <h4 className="mt-4 font-semibold">Required Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.split(',').map((skill) => (
                <span key={skill.trim()} className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
                  {skill.trim()}
                </span>
              ))}
            </div>
            <div className="mt-4">
              {job.post_url && (
                <a
                href={job.post_url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 text-blue-500 underline"
                onClick={handleLinkClick}
              >
                View Job Posting
              </a>
              )}
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Share this job:</h4>
              <SocialShare />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default JobDetailModal;