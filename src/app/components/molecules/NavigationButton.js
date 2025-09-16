// src/app/components/molecules/NavigationButton.js
'use client';

import { useSession } from '../../context/SessionContext';
import Button from '../ui/Button';

export default function NavigationButton({
  screen,
  label,
  icon,
  onClick, // Called BEFORE navigation
  logMessage, // Optional custom log message
  className = ''
}) {
  const { navigate, addLog } = useSession();

  const handleClick = () => {
    // Custom log message or default
    addLog(logMessage || `NAVIGATE: ${label}`);

    // Call custom onClick first if provided
    if (onClick) {
      onClick();
    }

    // Then navigate
    navigate(screen);
  };

  return (
    <Button
      onClick={handleClick}
      icon={icon}
      iconPosition="left"
      variant="flex"
      className={className}
    >
      {label}
    </Button>
  );
}
