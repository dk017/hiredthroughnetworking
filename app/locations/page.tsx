import Link from 'next/link';
import React from 'react';

const JobLocations = () => {
  return (
    <div>
      <h1>Job Locations</h1>
      <ul>
        <li>
          <Link href="/jobs/jobs-in-chennai">Jobs in Chennai</Link>
        </li>
        <li>
          <Link href="/jobs/jobs-in-bangalore">Jobs in Bangalore</Link>
        </li>
        {/* Add more job locations as needed */}
      </ul>
    </div>
  );
};

export default JobLocations;