import React, { useState, useEffect, useRef } from 'react';
import { XIcon } from 'lucide-react';

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string, searchTerms: string) => void;
}

const EmailCaptureModal: React.FC<EmailCaptureModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [searchTerms, setSearchTerms] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleSubmit = (e: Event) => {
      e.preventDefault();
      onSubmit(name, email, searchTerms);
      onClose();
    };

    const handleClose = () => {
      onClose();
    };

    const currentForm = formRef.current;
    const currentCloseButton = closeButtonRef.current;

    if (currentForm) {
      currentForm.addEventListener('submit', handleSubmit);
    }

    if (currentCloseButton) {
      currentCloseButton.addEventListener('click', handleClose);
    }
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      if (currentForm) {
        currentForm.removeEventListener('submit', handleSubmit);
      }
      if (currentCloseButton) {
        currentCloseButton.removeEventListener('click', handleClose);
      }
    };
  }, [name, email, searchTerms, onSubmit, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" ref={modalRef}>
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Stay Updated</h2>
          <button ref={closeButtonRef} className="text-gray-500 hover:text-gray-700">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <form ref={formRef}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="searchTerms" className="block text-sm font-medium text-gray-700 mb-2">
              Search Terms (comma-separated)
            </label>
            <input
              type="text"
              id="searchTerms"
              value={searchTerms}
              onChange={(e) => setSearchTerms(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-between space-x-2">
            <button
              type="submit"
              className="w-1/2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailCaptureModal;
