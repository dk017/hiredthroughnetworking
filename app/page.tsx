"use client"

import { Badge } from './components/ui/badge'
import Link from "next/link"
import { LinkedinIcon } from './components/LinkedinIcon'
import { MailIcon } from "./components/MailIcon"
import { TwitterIcon } from "./components/TwitterIcon"
import { MapPinIcon } from "./components/MapPinIcon"
import { useCallback, useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import  Tag  from "./components/Tag"
import React from 'react';
import { supabase } from '../app/supabaseClient'; // Adjust the import based on your project structure
import { XIcon } from '@heroicons/react/solid';
import EmailCaptureModal from '../app/components/EmailCaptureComponent';





const JobBoard: React.FC = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]); // Specify the type for selectedSkills
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [inputValueSkill, setInputValueSkill] = useState("");
  const [inputValueLocation, setInputValueLocation] = useState("");
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
  const [inputValueTitle, setInputValueTitle] = useState("");
  const [isLoading] = useState(false)
  const [isDarkMode] = useState(false)
  const [fadeIn] = useState(false);
  const [displayedJobs, setDisplayedJobs] = useState<{ id: number; title: string; email:string; company: string; skills: string; description: string; post_url:string;author_profile:string; location: string; category: string; is_linkedin:boolean;}[]>([]); // Replace JobType with your actual job type
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSources, setSelectedSources] = useState<string[]>(['twitter', 'linkedin']);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const itemsPerPage = 10; // Adjust this value as needed

  const fetchJobs = useCallback(async () => {
    if (typeof window === 'undefined') return;

    try {
      const query = supabase
        .from('jobs_nh')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply category filter if not "all"
      if (selectedTitles.length > 0) {
        query.or(selectedTitles.map(title => `title.ilike.%${title}%`).join(','));
      }

      // Apply skills filter if any skills are selected
      if (selectedSkills.length > 0) {
        query.or(selectedSkills.map(skill => `skills.ilike.%${skill}%`).join(','));
      }

      // Apply location filter if not "all"
      if (selectedLocations.length > 0) {
        query.or(selectedLocations.map(location => `location.ilike.%${location}%`).join(','));
      }

      if (selectedSources.length > 0) {
        query.or(selectedSources.map(source => source === 'twitter' ? 'is_linkedin.eq.false' : 'is_linkedin.eq.true').join(','));
      }

      const { data, error } = await query.range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

      if (error) {
        throw new Error(`Error fetching jobs: ${error.message}`);
      }
      if (currentPage === 1) {
        setDisplayedJobs(data); // Replace existing jobs if on the first page
      } else {
        setDisplayedJobs(prevJobs => [...prevJobs, ...data]); // Append jobs if not on the first page
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  }, [selectedTitles, selectedSkills, selectedLocations, selectedSources, currentPage]);

  const handleKeyDownForTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValueTitle.trim()) {
      if (!selectedTitles.includes(inputValueTitle.trim())) {
        setSelectedTitles([...selectedTitles, inputValueTitle.trim()]);
      }
      setInputValueTitle("");
      setCurrentPage(1); // Reset to first page
      fetchJobs();
      e.preventDefault();
    }
  };

  const handleCloseModal = useCallback(() => {
    setShowEmailModal(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEmailModal(true);
    }, 45000);

    return () => clearTimeout(timer);
  }, []);

  const handleEmailSubmit = async (name:string, email: string, searchTerms: string) => {
    const { data, error } = await supabase
      .from('preferences')
      .insert({ id: uuidv4(), name, email, search_terms: searchTerms });
    if (error) {
      console.error('Error:', error);
      throw new Error(`Error inserting user details: ${error.message}`);
    } else {
      console.log('User details inserted successfully', data);
    }
  };

  // Handle removing a job title tag
  const removeTitle = (title: string) => {
    setSelectedTitles(selectedTitles.filter((t) => t !== title));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValueSkill.trim()) {
      if (!selectedSkills.includes(inputValueSkill.trim())) {
        setSelectedSkills([...selectedSkills, inputValueSkill.trim()]);
      }
      setInputValueSkill("");
      setCurrentPage(1); // Reset to first page
      fetchJobs();
      e.preventDefault();
    }
  };

  const handleKeyDownForLocation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValueLocation.trim()) {
      if (!selectedLocations.includes(inputValueLocation.trim())) {
        setSelectedLocations([...selectedLocations, inputValueLocation.trim()]);
      }
      setInputValueLocation("");
      setCurrentPage(1); // Reset to first page
      fetchJobs();
      e.preventDefault();
    }
  };


  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 5) { // Adjust the threshold as needed
      setCurrentPage(prevPage => prevPage + 1);
    }
  }, []); // Added dependency

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);  

      };
    }
  }, [handleScroll]);  
  // Updated dependency

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const removeLocation = (location: string) => {
    setSelectedLocations(selectedLocations.filter((s) => s !== location));
  };

  useEffect(() => {
    fetchJobs(); // Fetch jobs on initial load and when filters change
  }, [selectedTitles,selectedSources, selectedSkills, selectedLocations, currentPage, fetchJobs]);

  const toggleSource = (source: string) => {
    if (selectedSources.includes(source)) {
      setSelectedSources(selectedSources.filter((s) => s !== source));
    } else {
      setSelectedSources([...selectedSources, source]);
    }
    setCurrentPage(1); // Reset to first page
    fetchJobs(); // Fetch jobs based on the selected sources
  };

  // const resetFilters = () => {
  //   setSelectedCategory("all");
  //   setSelectedSkills([]);
  //   setSelectedLocation("all");
  //   fetchJobs(); // Fetch all jobs again
  // };

  return (
    <div
  className={`w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 `}
  >
  <div className="flex items-center justify-between mb-8">
    <h1 className="text-3xl font-bold">ViaNetworking</h1>
  </div>

  <div className="flex flex-wrap gap-4 items-center justify-between mb-4 w-full">
  <div className="w-full sm:w-1/4">
    <div className="flex flex-wrap items-center gap-2 p-1 border border-gray-300 rounded-md">
      {selectedTitles.map((title) => (
        <div
          key={title}
          className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full"
        >
          <span>{title}</span>
          <button onClick={() => removeTitle(title)} className="ml-2">
            <XIcon className="h-4 w-4 text-purple-800" />
          </button>
        </div>
      ))}
      <input
        type="text"
        value={inputValueTitle}
        onChange={(e) => setInputValueTitle(e.target.value)}
        onKeyDown={handleKeyDownForTitle}
        placeholder="Type a job title and press Enter"
        className="flex-grow bg-transparent outline-none px-3 py-1"
      />
    </div>
  </div>

  <div className="w-full sm:w-1/4">
    <div className="flex flex-wrap items-center gap-2 p-1 border border-gray-300 rounded-md">
      {selectedSkills.map((skill) => (
        <div
          key={skill}
          className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
        >
          <span>{skill}</span>
          <button onClick={() => removeSkill(skill)} className="ml-2">
            <XIcon className="h-4 w-4 text-blue-800" />
          </button>
        </div>
      ))}
      <input
        type="text"
        value={inputValueSkill}
        onChange={(e) => setInputValueSkill(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press Enter"
        className="flex-grow bg-transparent outline-none px-3 py-1"
      />
    </div>
  </div>

  <div className="w-full sm:w-1/4">
    <div className="flex flex-wrap items-center gap-2 p-1 border border-gray-300 rounded-md">
      {selectedLocations.map((location) => (
        <div
          key={location}
          className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full"
        >
          <span>{location}</span>
          <button onClick={() => removeLocation(location)}>
            <XIcon className="h-4 w-4 text-green-800" />
          </button>
        </div>
      ))}
      <input
        type="text"
        value={inputValueLocation}
        onChange={(e) => setInputValueLocation(e.target.value)}
        onKeyDown={handleKeyDownForLocation}
        placeholder="Type a location and press Enter"
        className="flex-grow bg-transparent outline-none px-3 py-1"
      />
    </div>
  </div>

  {/* Social Media Source Filter */}
  <div className="flex items-center gap-2">
    <button
      className={`p-1 rounded-full ${
        selectedSources.includes("twitter") ? "bg-blue-500 text-white" : "bg-gray-300"
      }`}
      onClick={() => toggleSource("twitter")}
    >
      <TwitterIcon className="w-5 h-5" />
    </button>

    <button
      className={`p-1 rounded-full ${
        selectedSources.includes("linkedin") ? "bg-blue-700 text-white" : "bg-gray-300"
      }`}
      onClick={() => toggleSource("linkedin")}
    >
      <LinkedinIcon className="w-5 h-5" />
    </button>
  </div>
</div>



  <div
    className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}
  >
    {displayedJobs.map((job, index) => (
      <div
        key={`${job.id}-${index}`}
        className={`rounded-lg shadow-md p-6 ${
          isDarkMode ? "bg-background-dark text-foreground-dark" : "bg-background text-foreground"
        } ${fadeIn ? "fade-in" : ""}`}
      >
        {job.post_url ? (
          <Link href={job.post_url} target="_blank" prefetch={false}>
            <h3 className="text-xl font-bold mb-2">{job.title}</h3>
          </Link>
        ) : (
          <span>{job.title}</span>
        )}
        <div className="flex items-center gap-2 mb-4">
          {job.company && job.company.trim() !== '' && (
                <span className={`${isDarkMode ? "text-muted-foreground-dark" : "text-muted-foreground"}`}>
                  {job.company}
                </span>
            )}
          <div className="flex items-center gap-2">
            {job.is_linkedin ? (
              <Link href={job.author_profile || '#'} target="_blank" prefetch={false}>
                <LinkedinIcon
                  className={`w-5 h-5 ${
                    isDarkMode
                      ? "text-muted-foreground-dark hover:text-primary-dark"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                />
              </Link>
            ) : (
              <Link href={job.author_profile} target="_blank" prefetch={false}>
                <TwitterIcon
                  className={`w-5 h-5 ${
                    isDarkMode
                      ? "text-muted-foreground-dark hover:text-primary-dark"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                />
              </Link>
            )}
            {job.email && (
              <Link href={`mailto:${job.email}`} prefetch={false}>
                <MailIcon
                  className={`w-5 h-5 ${
                    isDarkMode
                      ? "text-muted-foreground-dark hover:text-primary-dark"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                />
              </Link>
            )}
          </div>
        </div>
        <div className="mb-4">
          <h4 className="text-base font-semibold mb-2">Required Skills</h4>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(job.skills) ? job.skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className={"inline-block bg-muted text-muted-foreground px-2 py-1 rounded-full"}
              >
                {skill}
              </Badge>
            )) : null}
          </div>
        </div>
        <p className="mb-4">{job.description}</p>
        <div className="flex flex-wrap gap-2 items-center">
          {job.skills ? job.skills.split(',').map((skill) => (
            <Tag key={skill.trim()} skill={skill.trim()} /> // Trim whitespace
          )) : null}
        </div>
        <div
          className={`flex items-center gap-2 ${
            isDarkMode ? "text-muted-foreground-dark" : "text-muted-foreground"
          }`}
        >
          <MapPinIcon className="w-5 h-5" />
          <span>{job.location}</span>
        </div>
      </div>
    ))}
  </div>

  {isLoading && (
    <div className="flex justify-center mt-8">
      <div />
    </div>
  )}

    <EmailCaptureModal
        isOpen={showEmailModal}
        onClose={handleCloseModal}
        onSubmit={handleEmailSubmit}
      />
</div>

  )
}

export default JobBoard;