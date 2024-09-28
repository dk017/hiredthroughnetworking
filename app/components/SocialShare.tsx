import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const SocialShare: React.FC = () => {
  const currentUrl = window.location.origin; // Get the base URL of the site
  const title = "Check out this amazing job!";

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title)}%20${encodeURIComponent(currentUrl)}`, '_blank');
  };

  return (
    <div className="flex space-x-4 pt-4">
      <button onClick={shareOnFacebook} className="flex items-center text-blue-600">
        <FontAwesomeIcon color='black' icon={faFacebook} className="h-8 w-8 mr-1" />
      </button>
      <button onClick={shareOnTwitter} className="flex items-center text-blue-400">
        <FontAwesomeIcon color='black' icon={faXTwitter} className="h-8 w-8 mr-1" />
      </button>
      <button onClick={shareOnLinkedIn} className="flex items-center text-blue-700">
        <FontAwesomeIcon color='black' icon={faLinkedin} className="h-8 w-8 mr-1" />
      </button>
      <button onClick={shareOnWhatsApp} className="flex items-center text-green-500">
        <FontAwesomeIcon color='black' icon={faWhatsapp} className="h-8 w-8 mr-1" />
      </button>
    </div>
  );
};

export default SocialShare;