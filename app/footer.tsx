import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Search Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Search</h3>
            <ul className="space-y-2">
              <li><a href="/jobs/country">Search Jobs by country</a></li>
              <li><a href="/jobs/city">Search jobs by city</a></li>
              <li><a href="/jobs/state">Search jobs by state</a></li>
              <li><a href="/jobs/title">Search jobs by job title</a></li>
              <li><a href="/jobs/entry-level">Search entry-level jobs</a></li>
              <li><a href="/jobs/junior-level">Search junior-level jobs</a></li>
              <li><a href="/jobs/senior-level">Search senior-level jobs</a></li>
              <li><a href="/jobs/h1b">Search H1B visa jobs</a></li>
              <li><a href="/jobs/uk-skilled-worker">Search Skilled Worker Visa jobs in the UK</a></li>
              <li><a href="/jobs/tech-stack">Search jobs by tech stack</a></li>
              <li><a href="/jobs/contract">Search jobs by contract type</a></li>
              <li><a href="/internships">Search remote internships</a></li>
            </ul>
          </div>

          {/* Remote Jobs Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Remote Jobs</h3>
            <ul className="space-y-2">
              <li><a href="/jobs">Remote jobs Anywhere in the World</a></li>
              <li><a href="/companies">Companies Hiring Anywhere in the World</a></li>
              <li><a href="/companies/sales">Companies Hiring Sales People Anywhere in the World</a></li>
              <li><a href="/companies/software-engineers">Companies Hiring Software Engineers Anywhere in the World</a></li>
              <li><a href="/companies/us">Companies Hiring Remote in the United States</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/tips">Tips for finding remote jobs</a></li>
              <li><a href="/interview-questions">Interview questions and answers</a></li>
              <li><a href="/resume-examples">Resume examples</a></li>
              <li><a href="/cover-letter-examples">Cover letter examples</a></li>
              <li><a href="/privacy-policy">Privacy policy and terms of service</a></li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          {/* <div className="mb-4 md:mb-0">
            <a href="/facebook" className="mr-4">Join our Facebook group</a>
            <a href="/slack" className="bg-yellow-500 text-black px-3 py-1 rounded">👉 Remote Jobs Network</a>
          </div> */}
          <p className="text-sm">
            Built by <a href="https://x.com/dk_r017" className="underline">Dhineshkumar R</a>. I'd love to hear your feedback — Get in touch via DM or <a href="mailto:dhinesh217@gmail.com" className="underline">dhinesh217@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;