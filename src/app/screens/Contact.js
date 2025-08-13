'use client';

import { useSession } from '../context/SessionContext';
import { getAvailabilityDate } from '../utils/formatters';
import { Mail, Globe, ExternalLink, Copy, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const { sessionData, theme, addLog, currentDomain, domainData } = useSession();
  const [emailCopied, setEmailCopied] = useState(false);

  // WHY: This makes the code more readable and easier to maintain.
  const mainTextClasses = theme === 'dark' ? 'text-dark-text-white' : 'text-light-text-black';
  const mainBorderClasses = theme === 'dark' ? 'border-dark-border hover:bg-dark-hover' : 'border-light-border hover:bg-light-hover';

  const baseContact = sessionData?.contact || {};
  const profileStatus = sessionData?.profile?.status || {};

  // The contact data now comes entirely from domainData (loaded from domains.json)
  // This ensures full portability - no personal data in the code
  const getDomainSpecificContact = () => {
    const contact = { ...baseContact };
    
    // domainData is fetched from the API and contains configuration for the current domain
    if (domainData) {
      contact.email = domainData.email || baseContact.email;
      contact.telegram = domainData.telegram || baseContact.telegram;
      contact.website = domainData.website || baseContact.website;
    }
    
    // These come from .env file, not hardcoded in the source
    if (!contact.email) {
      contact.email = process.env.NEXT_PUBLIC_DEFAULT_CONTACT_EMAIL || 'contact@example.com';
    }
    if (!contact.telegram) {
      contact.telegram = process.env.NEXT_PUBLIC_DEFAULT_CONTACT_TELEGRAM || 'https://t.me/example';
    }
    if (!contact.website) {
      contact.website = process.env.NEXT_PUBLIC_DEFAULT_CONTACT_WEBSITE || 'https://example.com';
  }
    
  return contact;
  };

  const contactData = getDomainSpecificContact();

  // NOTE: Email copy logic remains unchanged.
  const handleCopyEmail = async () => {
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

  const availabilityDate = getAvailabilityDate();

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
            /* CHANGED: Simplified telegram button to use contactData.telegram directly */
            /* The telegram URL is now complete (https://t.me/...) from configuration */
            <button onClick={() => handleExternalLink('Telegram', contactData.telegram)} className={`w-full p-3 border rounded flex items-center justify-between transition-colors ${mainBorderClasses}`}>
            <div className="flex items-center">
                <MessageCircle className={`w-5 h-5 mr-3 ${yellowClasses}`} />
                {/* CHANGED: Extract handle from telegram URL for display */}
                <span className={mainTextClasses}>
                  {contactData.telegram.includes('t.me/') 
                    ? '@' + contactData.telegram.split('t.me/')[1]
                    : contactData.telegram
                  }
                </span>
            </div>
              <ExternalLink className={`w-4 h-4 ${valueClasses}`} />
          </button>
        )}
        </div>
      </div>

      {/* 
        WHY: It centralizes the user's current work status in the most logical place—the contact screen.
        The data is now a mix of hardcoded values, dynamic calculations, and content from content.json for maximum flexibility.
      */}
      <div className="panel-base panel-theme">
        <h3 className="title-command">
          $current_status
          </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
          <span className="key-label">$seeking:</span>
          <span className="key-label">{profileStatus.seeking || 'Not specified'}</span>

          <span className="key-label">$location:</span>
          <span className="key-label">Remote, EMEA</span>

          <span className="key-label">$target_comp:</span>
          <span className="key-label">{profileStatus.salary || 'Negotiable'}</span>
          
          <span className="key-label">$availability:</span>
          <span className="key-label">{availabilityDate}</span>
        </div>
      </div>
    </div>
  );
}
