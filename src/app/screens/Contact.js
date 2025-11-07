// src/app/screens/Contact.js
'use client';

import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import { getAvailabilityDate } from '../utils/formatters';
import { Mail, Globe, ExternalLink, Copy, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const { sessionData, addLog, domainData } = useSession();
  const [emailCopied, setEmailCopied] = useState(false);
  
  const baseContact = sessionData?.contact || {};
  const profileStatus = sessionData?.profile?.status || {};

  // The contact data now comes entirely from domainData (loaded from domains.json)
  // This ensures full portability - no personal data in the code
  const getDomainSpecificContact = () => {
    const contact = { ...baseContact };
    
    // Domain-specific overrides from the API
    if (domainData) {
      contact.email = domainData.email || baseContact.email;
      contact.telegram = domainData.telegram || baseContact.telegram;
      contact.website = domainData.website || baseContact.website;
    }
    
    return contact;
  };

  const contactData = getDomainSpecificContact();

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

  const handleExternalLink = (label, url) => {
    addLog(`EXTERNAL LINK: ${label}`);
    window.open(url, '_blank');
  };

  const availabilityDate = getAvailabilityDate();

  return (
    <ScreenWrapper>
      <div className="flex flex-col gap-3 mb-4">
        <button
          onClick={handleCopyEmail}
          className="w-full p-3 border rounded flex items-center justify-between transition-colors border-primary bg-hover"
        >
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-3 text-command" />
            <span className="text-white-black">{contactData.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Copy className="w-4 h-4 text-secondary" />
            <span className={`text-xs ${emailCopied ? "text-success" : "text-secondary"}`}>
              {emailCopied ? 'COPIED!' : 'COPY'}
            </span>
          </div>
        </button>
        <div className="flex flex-col md:flex-row gap-3">
          <button onClick={() => handleExternalLink('Portfolio website', contactData.website)} className="w-full p-3 border rounded flex items-center justify-between transition-colors border-primary bg-hover">
          <div className="flex items-center">
              <Globe className="w-5 h-5 mr-3 text-command" />
              <span className="text-white-black">{contactData.website?.replace('https://', '')}</span>
          </div>
            <ExternalLink className="w-4 h-4 text-secondary" />
        </button>
        {contactData.telegram && (
            <button onClick={() => handleExternalLink('Telegram', contactData.telegram)} className="w-full p-3 border rounded flex items-center justify-between transition-colors border-primary bg-hover">
            <div className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-3 text-command" />
                <span className="text-white-black">
                  {contactData.telegram.includes('t.me/') 
                    ? '@' + contactData.telegram.split('t.me/')[1]
                    : contactData.telegram
                  }
                </span>
            </div>
              <ExternalLink className="w-4 h-4 text-secondary" />
          </button>
        )}
        </div>
      </div>

      <div className="p-4 border rounded border-secondary">
        <h3 className="text-base mb-2 text-command">
          $current_status
          </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <span className="text-primary">$seeking:</span>
          <span className="text-secondary">{profileStatus.seeking || 'Not specified'}</span>

          <span className="text-primary">$location:</span>
          <span className="text-secondary">Remote, EMEA</span>

          <span className="text-primary">$target_comp:</span>
          <span className="text-secondary">{profileStatus.salary || 'Negotiable'}</span>
          
          <span className="text-primary">$availability:</span>
          <span className="text-secondary">{availabilityDate}</span>
        </div>
      </div>
    </ScreenWrapper>
  );
}
