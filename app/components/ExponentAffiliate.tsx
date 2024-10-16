import React from "react";
import Link from "next/link";

const ExponentAffiliate: React.FC = () => {
  return (
    <div className="rounded-lg shadow-md p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h3 className="text-2xl font-bold mb-3">
        Land Your Dream Tech Job with Exponent
      </h3>
      <p className="mb-4">
        Join over 500,000 professionals who hve secured offers at top tech
        companies like Google, Facebook, and Amazon.
      </p>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>Expert-led interview prep courses</li>
        <li>Real interview questions from top companies</li>
        <li>1-on-1 mock interviews with industry professionals</li>
        <li>Personalized coaching for career advancement</li>
      </ul>
      <p className="mb-4 font-semibold">
        Boost your chances of getting better offers and accelerate your tech
        career!
      </p>
      <Link
        href="https://www.tryexponent.com/?ref=mzc4yja"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300">
          Start Your Success Story
        </span>
      </Link>
    </div>
  );
};

export default ExponentAffiliate;
