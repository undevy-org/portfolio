// src/app/screens/Contact.js
'use client';

import { useSession } from '../context/SessionContext';
import { Mail, Globe, ExternalLink, Copy, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const { sessionData, theme, addLog, currentDomain, domainData } = useSession();
  const [emailCopied, setEmailCopied] = useState(false);

  // ADDED: Centralized theme classes for cleaner code, mirroring other components.
  // WHY: This makes the code more readable and easier to maintain.
  const yellowClasses = theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command';
  const labelClasses = theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary';
  const valueClasses = theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary';
  const mainTextClasses = theme === 'dark' ? 'text-dark-text-white' : 'text-light-text-black';
  const mainBorderClasses = theme === 'dark' ? 'border-dark-border hover:bg-dark-hover' : 'border-light-border hover:bg-light-hover';

  const baseContact = sessionData?.contact || {};
  const profileStatus = sessionData?.profile?.status || {};

  // --- Start of logic section ---

  // NOTE: Domain-specific contact logic remains unchanged.
  const getDomainSpecificContact = () => {
    const contact = { ...baseContact };
    if (domainData) {
      contact.email = domainData.email;
      contact.telegram = domainData.telegram;
      contact.website = domainData.website;
    }
    return contact;
  };

  const contactData = getDomainSpecificContact();

  // NOTE: Email copy logic remains unchanged.
  const handleCopyEmail = async () => {
    // ... (logic is identical to the original)
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(contactData.email);
        setEmailCopied(true);
        addLog(`EMAIL COPIED: ${contactData.email}`);
      } catch (err) {
        console.error('Failed to copy text: ', err);
        addLog(`ERROR: Failed to copy email`);
      }
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = contactData.email;
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setEmailCopied(true);
        addLog(`EMAIL COPIED (fallback): ${contactData.email}`);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        addLog(`ERROR: Fallback copy failed`);
      }
      document.body.removeChild(textArea);
    }

    setTimeout(() => setEmailCopied(false), 2000);
  };

  // NOTE: External link logic remains unchanged.
  const handleExternalLink = (label, url) => {
    addLog(`EXTERNAL LINK: ${label}`);
    window.open(url, '_blank');
  };

  // ADDITION: Dynamic availability date calculation.
  // WHY: To provide an accurate, up-to-date availability date without manual updates.
  // This function calculates a date two weeks from now and ensures it's a weekday.
  const getAvailabilityDate = () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 14); // Add 14 days

    const dayOfWeek = futureDate.getDay(); // Sunday = 0, Saturday = 6

    if (dayOfWeek === 6) { // If it's Saturday
      futureDate.setDate(futureDate.getDate() + 2); // Move to Monday
    } else if (dayOfWeek === 0) { // If it's Sunday
      futureDate.setDate(futureDate.getDate() + 1); // Move to Monday
    }

    // Format the date as "DD Month, YYYY" (e.g., "22 July, 2025")
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    // FIX: Corrected the method name from toLocaleDateDateString to toLocaleDateString.
    return futureDate.toLocaleDateString('en-US', options);
  };

  const availabilityDate = getAvailabilityDate();

  // --- End of logic section ---

  return (
    <div className="p-4">
      {/* NOTE: Top contact buttons section remains unchanged. */}
      <div className="flex flex-col gap-3 mb-4">
        <button
          onClick={handleCopyEmail}
          className={`w-full p-3 border rounded flex items-center justify-between transition-colors ${mainBorderClasses}`}
        >
          <div className="flex items-center">
            <Mail className={`w-5 h-5 mr-3 ${yellowClasses}`} />
            <span className={mainTextClasses}>{contactData.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Copy className={`w-4 h-4 ${valueClasses}`} />
            <span className={`text-xs ${emailCopied ? (theme === 'dark' ? 'text-dark-success' : 'text-light-success') : valueClasses}`}>
              {emailCopied ? 'COPIED!' : 'COPY'}
            </span>
          </div>
        </button>
        <div className="flex flex-col md:flex-row gap-3">
          <button onClick={() => handleExternalLink('Portfolio website', contactData.website)} className={`w-full p-3 border rounded flex items-center justify-between transition-colors ${mainBorderClasses}`}>
          <div className="flex items-center">
              <Globe className={`w-5 h-5 mr-3 ${yellowClasses}`} />
              <span className={mainTextClasses}>{contactData.website?.replace('https://', '')}</span>
          </div>
            <ExternalLink className={`w-4 h-4 ${valueClasses}`} />
        </button>
        {contactData.telegram && (
          <button onClick={() => handleExternalLink('Telegram', contactData.telegram)} className={`w-full p-3 border rounded flex items-center justify-between transition-colors ${mainBorderClasses}`}>
            <div className="flex items-center">
                <MessageCircle className={`w-5 h-5 mr-3 ${yellowClasses}`} />
                <span className={mainTextClasses}>{contactData.telegram.replace('https://t.me/', '@')}</span>
            </div>
              <ExternalLink className={`w-4 h-4 ${valueClasses}`} />
          </button>
        )}
        </div>
      </div>

      {/* 
        MODIFICATION: This block replaces the old $availability_status.
        WHY: It centralizes the user's current work status in the most logical place—the contact screen.
        The data is now a mix of hardcoded values, dynamic calculations, and content from content.json for maximum flexibility.
      */}
      <div className={`p-4 border rounded ${theme === 'dark' ? 'border-dark-border-darker' : 'border-light-border-lighter'}`}>
        <h3 className={`text-base mb-2 ${yellowClasses}`}>
          $current_status
          </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm">
          {/* Seeking */}
          <span className={labelClasses}>$seeking:</span>
          <span className={valueClasses}>{profileStatus.seeking || 'Not specified'}</span>

          {/* Location - Now a fixed value */}
          <span className={labelClasses}>$location:</span>
          <span className={valueClasses}>Remote, EMEA</span>

          {/* Target Compensation - Pulled from a different field */}
          <span className={labelClasses}>$target_comp:</span>
          <span className={valueClasses}>{profileStatus.salary || 'Negotiable'}</span>
          
          {/* Availability - Now dynamically calculated */}
          <span className={labelClasses}>$availability:</span>
          <span className={valueClasses}>{availabilityDate}</span>
        </div>
      </div>
    </div>
  );
}
