import Link from 'next/link';
import React from 'react';

const cities = [
  "Dubai", "Seattle", "New York City", "Bangalore", "London",
  "Tokyo", "Berlin", "Boston", "Toronto", "Singapore",
  "Austin", "Tel Aviv", "Beijing", "Los Angeles", "Dublin",
  "Hyderabad", "Amsterdam", "Chicago", "Sydney", "Shanghai",
  "Atlanta", "Paris", "Mumbai", "Vancouver", "Stockholm",
  "Shenzhen", "Pune", "Helsinki", "Dallas", "Seoul"
];

// const titles = ["Software Developer Jobs in Bangalore","Data Scientist Jobs in San Francisco","Full Stack Engineer Jobs in New York City",
//   "Machine Learning Engineer Jobs in London","DevOps Specialist Jobs in Seattle","UX Designer Jobs in Tokyo","Cloud Architect Jobs in Singapore",
//   "Android Developer Jobs in Berlin","Cybersecurity Analyst Jobs in Toronto","Product Manager Jobs in Austin","AI Engineer Jobs in Boston",
//   "Frontend Developer Jobs in Amsterdam","Blockchain Developer Jobs in Dubai","iOS Developer Jobs in Sydney","Data Engineer Jobs in Chicago",
//   "Network Administrator Jobs in Mumbai","Game Developer Jobs in Los Angeles","Robotics Engineer Jobs in Munich","Big Data Analyst Jobs in Paris",
//   "React Developer Jobs in Tel Aviv","Systems Engineer Jobs in Dublin","Python Developer Jobs in Vancouver","Database Administrator Jobs in Stockholm",
//   "QA Engineer Jobs in Seoul","UI Designer Jobs in Melbourne","Java Developer Jobs in Atlanta","Embedded Systems Engineer Jobs in Shenzhen",
//   "Scrum Master Jobs in Helsinki","AR/VR Developer Jobs in Montreal","Node.js Developer Jobs in Barcelona","Technical Writer Jobs in Zurich",
//   ".NET Developer Jobs in Warsaw","Business Intelligence Analyst Jobs in Dallas","Salesforce Developer Jobs in Hyderabad",
//   "Site Reliability Engineer Jobs in Denver","Ruby on Rails Developer Jobs in Lisbon","Information Security Manager Jobs in Hong Kong",
//   "Kotlin Developer for Android Jobs in Copenhagen","Data Visualization Specialist Jobs in Buenos Aires",
//   "IT Project Manager Jobs in Mexico City","Quantum Computing Researcher Jobs in Beijing","Go Developer Jobs in Austin",
//   "Deep Learning Specialist Jobs in Taipei","WordPress Developer Jobs in Bangkok","Microservices Architect Jobs in Oslo",
//   "Flutter Developer Jobs in Lagos","IoT Solutions Engineer Jobs in Prague","Vue.js Frontend Developer Jobs in Madrid",
//   "Natural Language Processing Engineer Jobs in Moscow","Docker and Kubernetes Specialist Jobs in São Paulo"];


const skills = [
  "Python","JavaScript","Machine Learning", "AI","AWS", "Azure","Data Science","React.js","DevOps",
  "Java","Node.js","Cybersecurity","Kubernetes","Docker","SQL","Big Data Analytics","Artificial Intelligence",
  "Go","TypeScript","Blockchain","Full Stack Development","Angular","Natural Language Processing",
  "Deep Learning","Vue.js","Internet of Things","CI CD",
  "Microservices Architecture","Swift","Kotlin","Quantum Computing","AR VR Development"
];



const JobListingPage = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mt-8 mb-4">The Most Popular Jobs Based On Titles, Cities and Skills</h1>
      <p className="mb-8">
        Discover the most in-demand remote job titles, including software
        engineer, product manager, and customer service representative.
        Explore salary ranges, job descriptions, and companies hiring for
        remote positions in these roles.
      </p>

      {/* <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Most Popular Job Searches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {titles.map((title, index) => {
              const formattedTitle = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
              return (
                <Link href={`/jobs/${formattedTitle}`} key={index}>
                  <div className="p-2 cursor-pointer hover:bg-gray-100 transition-colors">
                    {index + 1}. {title}
                  </div>
                </Link>
              );
            })}
        </div>
      </section> */}

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Most Popular Jobs Based On Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, index) => {
              const formattedSkill = skill
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
              return (
                <Link href={`/skills/${formattedSkill}-jobs`} key={index}>
                  <div className="p-2 cursor-pointer hover:bg-gray-100 transition-colors">
                    {index + 1}. Jobs For {skill} Skilled Professionals
                  </div>
                </Link>
              );
            })}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Most Popular Jobs Based On Cities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.map((city, index) => {
              const formattedCity = city
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
              return (
                <Link href={`/locations/jobs-in-${formattedCity}`} key={index}>
                  <div className="p-2 cursor-pointer hover:bg-gray-100 transition-colors">
                    {index + 1}. Jobs In {city}
                  </div>
                </Link>
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default JobListingPage;