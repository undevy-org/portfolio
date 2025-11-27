'use client';

import { useSession } from '../context/SessionContext';
import { Bot, ExternalLink } from 'lucide-react';

export default function LatestProjectWidget({
    title = "Binance Trading Bot",
    description = "Automated OCO Strategy & Risk Management",
    status = "IN DEV",
    link = "https://github.com/undevy-org/binance-manual-oco",
    icon: Icon = Bot
}) {
    const { currentScreen } = useSession();

    // Only show on Entry screen
    if (currentScreen !== 'Entry') {
        return null;
    }

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block border rounded bg-main border-primary p-3 hover:bg-hover hover:border-primary transition-all cursor-pointer group text-decoration-none"
        >
            <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm text-command flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    $latest_project
                </h3>
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-primary group-hover:text-white-black transition-colors">{title}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded border border-secondary text-secondary">
                            {status}
                        </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
                </div>
                <p className="text-xs text-secondary">
                    {description}
                </p>
            </div>
        </a>
    );
}
