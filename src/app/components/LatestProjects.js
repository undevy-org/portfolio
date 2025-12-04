'use client';

import { useSession } from '../context/SessionContext';
import { useState, useEffect } from 'react';
import { Bot, LineChart, Sparkles, Code, Rocket, Zap } from 'lucide-react';
import ProjectWidget from './ProjectWidget';

// Icon mapping - maps string names to Lucide icon components
const iconMap = {
    Bot,
    LineChart,
    Sparkles,
    Code,
    Rocket,
    Zap
};

export default function LatestProjects() {
    const { currentScreen, currentDomain } = useSession();
    const [widgets, setWidgets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Wait for domain detection
        if (!currentDomain) return;

        const fetchWidgets = async () => {
            try {
                const response = await fetch(`/api/widgets?domain=${currentDomain}`);
                if (response.ok) {
                    const data = await response.json();
                    setWidgets(data.widgets?.featuredProjects || []);
                } else {
                    console.error('Failed to fetch widgets:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching widgets:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWidgets();
    }, [currentDomain]);

    // Only show on Entry screen
    if (currentScreen !== 'Entry') {
        return null;
    }

    // Don't render anything while loading or if no widgets
    if (isLoading || widgets.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col sm:flex-row gap-3 w-full">
            {widgets.map((widget, index) => {
                // Get the icon component from the map, default to Sparkles
                const IconComponent = iconMap[widget.icon] || Sparkles;

                return (
                    <ProjectWidget
                        key={index}
                        title={widget.title}
                        description={widget.description}
                        status={widget.status}
                        link={widget.link}
                        icon={IconComponent}
                        label={widget.label}
                    />
                );
            })}
        </div>
    );
}
