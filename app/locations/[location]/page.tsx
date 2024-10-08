"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../supabaseClient';
import Link from 'next/link';
import { MapPinIcon } from '../../components/MapPinIcon';
import { useParams } from 'next/navigation'; // Import useParams
import { LinkedinIcon } from '../../components/LinkedinIcon';
import { TwitterIcon } from '../../components/TwitterIcon';
import { MailIcon } from '../../components/MailIcon';
import Tag from '../../components/Tag';
import JobDetailModal from '../../components/JobDetailModal';
export const runtime = 'experimental-edge';




interface Job {
  id: number;
  title: string;
  description: string;
  email: string;
  company: string;
  skills: string;
  post_url: string;
  author_profile: string;
  location: string;
  is_linkedin: boolean;
  category: string;
}

type JobListingsProps = {
  params: {
    location: string;
  };
};
const JobListings: React.FC<JobListingsProps> = () => {
  const params = useParams<{ location: string }>(); // Get title from route parameters
  const location = params?.location; // Use optional chaining to safely access title

  // Ensure title is a string or provide a default value
  if (!location) {
    throw new Error('Title is not provided in the route parameters');
  }

  const [selectedSources, setSelectedSources] = useState<string[]>(['twitter', 'linkedin']);
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode] = useState(false);
  const itemsPerPage = 10;

  const formatLocation = useCallback((location: string) => {
    const trimmedLocation = location.slice(8); // Slicing after 8 characters
    return trimmedLocation.charAt(0).toUpperCase() + trimmedLocation.slice(1); // Capitalizing first character
  }, []);

  const formattedLocation = formatLocation(location); // Format the title
  const fetchJobs = useCallback(async () => {
    if (typeof window === 'undefined' || !formatLocation) return; // Check jobType here
    setIsLoading(true);

    try {
      let query = supabase
        .from('jobs_nh')
        .select('*')
        .order('created_at', { ascending: false });

      // Conditionally add ilike for title and skills if not empty
      if (formattedLocation) {
        query = query.or(`location.ilike.%${formattedLocation}%`);
      }

      if (selectedSources.length > 0) {
        query = query.or(selectedSources.map(source => source === 'twitter' ? 'is_linkedin.eq.false' : 'is_linkedin.eq.true').join(','));
      }

      // Debugging: Log the query before executing it

      const { data, error } = await query.range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

      // Debugging: Log the response from Supabase

      if (error) {
        throw new Error(`Error fetching jobs: ${error.message}`);
      }

      setDisplayedJobs(prevJobs => currentPage === 1 ? data : [...prevJobs, ...data]);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setIsLoading(false);
    }
  }, [formatLocation, formattedLocation, selectedSources, currentPage]); // Add jobType to dependencies

  // Fetch jobs when jobType changes
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !isLoading) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleSource = (source: string) => {
    setSelectedSources(prev =>
      prev.includes(source) ? prev.filter(s => s !== source) : [...prev, source]
    );
    setCurrentPage(1); // Reset the page
  };

  const truncateDescription = (description: string, wordLimit: number) => {
    const words = description.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : description;
  };

  useEffect(() => {
    fetchJobs(); // Fetch jobs when currentPage changes
  }, [currentPage, fetchJobs]);

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12`}>
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="text-3xl font-bold hover:underline">ViaNetworking</Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">
        {`Jobs In ${formattedLocation}`}
      </h1>
      <p className="mb-8">
            Uncover the latest job openings in {formattedLocation} shared on LinkedIn and Twitter (X) that often fly under the radar of traditional job boards. <br />
            Our platform aggregates fresh opportunities directly from social media posts, giving you a competitive edge in your job search.
            <br /><br />
            - <strong>Direct Access</strong>: Engage with post creators who are often hiring managers or company insiders. <br />
            - <strong>Referral Advantage</strong>: Leverage these connections to secure valuable referrals, significantly boosting your chances of landing an interview.
            <br /><br />
            1. <strong>Real-Time Opportunities</strong>: Access job openings as soon as they are shared, sometimes before they hit official channels. <br />
            2. <strong>Insider Information</strong>: Gain insights directly from employees and hiring managers. <br />
            3. <strong>Network Building</strong>: Expand your professional network while job hunting.
            <br /><br />
            Traditional job application methods are becoming less effective in today’s competitive landscape. Our approach helps you: <br />
            - Bypass automated screening systems <br />
            - Get your application noticed by decision-makers <br />
            - Increase your chances of securing interviews and offers
            <br /><br />
            Start your smart job search today and transform how you approach your career opportunities!
      </p>


      <div className="flex flex-wrap gap-4 items-center justify-between mb-4 w-full">
        {/* Source Toggles */}
        <div className="w-full flex flex-row gap-4 justify-center">
          <button
            className={`p-2 rounded-full ${selectedSources.includes("twitter") ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            onClick={() => toggleSource("twitter")}
          >
            <TwitterIcon className="w-6 h-6" />
          </button>
          <button
            className={`p-2 rounded-full ${selectedSources.includes("linkedin") ? "bg-blue-700 text-white" : "bg-gray-300"}`}
            onClick={() => toggleSource("linkedin")}
          >
            <LinkedinIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
        {displayedJobs.map((job, index) => (
          <div
            key={`${job.id}-${job.title}-${index}`} // Adding index to ensure uniqueness
            onClick={() => setSelectedJob(job)}
            className={`rounded-lg shadow-md p-6 ${isDarkMode ? "bg-background-dark text-foreground-dark" : "bg-background text-foreground"} cursor-pointer`}
          >
            <h3 className="text-xl font-bold mb-2">
              {job.post_url ? (
                <Link href={job.post_url} target="_blank" prefetch={false}>
                  {job.title}
                </Link>
              ) : (
                job.title
              )}
            </h3>
            <div className="flex items-center gap-2 mb-4">
              {job.company && <span className="text-muted-foreground">{job.company}</span>}
              <div className="flex items-center gap-2">
                {job.is_linkedin ? (
                  <Link href={job.author_profile || '#'} target="_blank" prefetch={false}>
                    <LinkedinIcon className="w-5 h-5 text-muted-foreground hover:text-primary" />
                  </Link>
                ) : (
                  <Link href={job.author_profile} target="_blank" prefetch={false}>
                    <TwitterIcon className="w-5 h-5 text-muted-foreground hover:text-primary" />
                  </Link>
                )}
                {job.email && (
                  <Link href={`mailto:${job.email}`} prefetch={false}>
                    <MailIcon className="w-5 h-5 text-muted-foreground hover:text-primary" />
                  </Link>
                )}
              </div>
            </div>
            <div className="mb-4">
              <h4 className="text-base font-semibold mb-2">Required Skills</h4>
              {/* Add skills display if needed */}
            </div>
            <p className="mb-4">{truncateDescription(job.description, 35)}</p>
            <div className="flex flex-wrap gap-2 items-center mb-4">
              {job.skills.split(',').map((skill) => (
                <Tag key={skill.trim()} skill={skill.trim()} />
              ))}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPinIcon className="w-5 h-5" />
              <span>{job.location}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}

      {isLoading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
        </div>
      )}
    </div>
  );
};

export default JobListings;
