'use client';

import { useSession } from '../context/SessionContext';
import { Bot, LineChart } from 'lucide-react';
import ProjectWidget from './ProjectWidget';

export default function LatestProjects() {
    const { currentScreen } = useSession();

    // Only show on Entry screen
    if (currentScreen !== 'Entry') {
        return null;
    }

    return (
        <div className="flex flex-col sm:flex-row gap-3 w-full">
            <ProjectWidget
                title="Binance Trading Bot"
                description="Automated OCO Strategy & Risk Management"
                status="IN DEV"
                link="https://github.com/undevy-org/binance-manual-oco"
                icon={Bot}
            />
            <ProjectWidget
                title="Ekiden"
                description="Institutional DeFi Trading Interface"
                status="TESTNET"
                link="https://ekiden.fi/"
                icon={LineChart}
                label="$perp_dex"
            />
        </div>
    );
}
