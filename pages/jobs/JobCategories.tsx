import React from 'react';
import Link from 'next/link';

const jobCategories = [
  { title: 'Java Jobs in Chennai', link: '/jobs/java-jobs-in-chennai' },
  { title: 'JavaScript Jobs in Bangalore', link: '/jobs/javascript-jobs-in-bangalore' },
  { title: 'Python Jobs in Mumbai', link: '/jobs/python-jobs-in-mumbai' },
  // Add more categories as needed
];

const JobCategories: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold mb-4">The Most Popular Job Searches</h1>
      <ul className="list-disc pl-5">
        {jobCategories.map((category, index) => (
          <li key={index} className="mb-2">
            <Link href={category.link} className="text-blue-600 hover:underline">
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobCategories;