// src/app/screens/Contact.js
'use client';

import { useSession } from '../context/SessionContext';
import { Mail, Globe, Calendar, ExternalLink, Copy, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const { sessionData, theme, addLog, currentDomain, domainData } = useSession();
  const [emailCopied, setEmailCopied] = useState(false);

  const baseContact = sessionData?.contact || {};

  const getDomainSpecificContact = () => {
    const contact = { ...baseContact };
    
    if (currentDomain?.includes('foxous')) {
      contact.email = 'foxous@proton.me';
      contact.telegram = '@foxous';
      contact.website = 'https://foxous.design';
    } else if (currentDomain?.includes('undevy')) {
      contact.email = 'undevy@gmail.com';
      contact.telegram = '@undevy';
      contact.website = 'https://undevy.com';
    }
    
    return contact;
  };

  const contactData = getDomainSpecificContact();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    setEmailCopied(true);
    addLog(`EMAIL COPIED: ${contactData.email}`);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleExternalLink = (label, url) => {
    addLog(`EXTERNAL LINK: ${label}`);
    window.open(url, '_blank');
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <button
          onClick={handleCopyEmail}
          className={`w-full p-3 border rounded flex items-center justify-between transition-colors ${
            theme === 'dark'
              ? 'border-dark-border-darker hover:bg-dark-hover'
              : 'border-light-border-lighter hover:bg-light-hover'
          }`}
        >
          <div className="flex items-center">
            <Mail className={`w-5 h-5 mr-3 ${
              theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
            }`} />
            <span className={theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'}>
              {contactData.email}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Copy className={`w-4 h-4 ${
              theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
            }`} />
            <span className={`text-xs ${
              emailCopied 
                ? (theme === 'dark' ? 'text-dark-success' : 'text-light-success')
                : (theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary')
            }`}>
              {emailCopied ? 'COPIED!' : 'COPY'}
            </span>
          </div>
        </button>

        <button
          onClick={() => handleExternalLink('Portfolio website', contactData.website)}
          className={`w-full p-3 border rounded flex items-center justify-between transition-colors ${
            theme === 'dark'
              ? 'border-dark-border-darker hover:bg-dark-hover'
              : 'border-light-border-lighter hover:bg-light-hover'
          }`}
        >
          <div className="flex items-center">
            <Globe className={`w-5 h-5 mr-3 ${
              theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
            }`} />
            <span className={theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'}>
              {contactData.website?.replace('https://', '')}
            </span>
          </div>
          <ExternalLink className={`w-4 h-4 ${
            theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
          }`} />
        </button>

        {contactData.telegram && (
          <button
            onClick={() => handleExternalLink('Telegram', domainData?.telegram || `https://t.me/${contactData.telegram.replace('@', '')}`)}
            className={`w-full p-3 border rounded flex items-center justify-between transition-colors ${
              theme === 'dark'
                ? 'border-dark-border-darker hover:bg-dark-hover'
                : 'border-light-border-lighter hover:bg-light-hover'
            }`}
          >
            <div className="flex items-center">
              <MessageCircle className={`w-5 h-5 mr-3 ${
                theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
              }`} />
              <span className={theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'}>
                {contactData.telegram}
              </span>
            </div>
            <ExternalLink className={`w-4 h-4 ${
              theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
            }`} />
          </button>
        )}
      </div>

      <div className={`p-3 border rounded ${
        theme === 'dark' ? 'border-dark-border-darker' : 'border-light-border-lighter'
      }`}>
        <h3 className={`text-base mb-2 ${
            theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
          }`}>
            $availability_status
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <span className={theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'}>
              $location:
            </span>
            <span className={theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'}>
              {sessionData.profile.status.location || 'Not specified'}
            </span>

            <span className={theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'}>
              $work_type:
            </span>
            <span className={theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'}>
              {sessionData.profile.status.seeking || 'Not specified'}
            </span>

            <span className={theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'}>
              $target_comp:
            </span>
            <span className={theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'}>
              {sessionData.profile.status.salary || 'Not specified'}
            </span>
            <span className={theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'}>
              $start_date:
            </span>
            <span className={theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'}>
              {sessionData.profile.status.availability || 'Not specified'}
            </span>
        </div>
      </div>

      {contactData.social_links && (
        <div className={`mt-3 p-3 border rounded ${
          theme === 'dark' ? 'border-dark-border' : 'border-light-border'
        }`}>
          <h3 className={`font-bold text-base mb-2 ${
            theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
          }`}>
            $social_links
          </h3>
          <div className="flex gap-2">
            {Object.entries(contactData.social_links).map(([platform, url]) => (
              <button
                key={platform}
                onClick={() => handleExternalLink(platform, url)}
                className={`px-2 py-1 border rounded text-xs transition-colors ${
                  theme === 'dark'
                    ? 'border-dark-border hover:bg-dark-hover text-dark-text-primary'
                    : 'border-light-border hover:bg-light-hover text-light-text-primary'
                }`}
              >
                [{platform}]
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
