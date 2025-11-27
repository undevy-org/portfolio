import { ExternalLink } from 'lucide-react';

export default function ProjectWidget({
    title,
    description,
    status,
    link,
    icon: Icon,
    label = "$latest_project"
}) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block border rounded bg-main border-primary p-3 hover:border-primary hover:bg-[var(--color-btn-bg-hover)] transition-all cursor-pointer group text-decoration-none w-full"
        >
            <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm text-command flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {label}
                </h3>
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-primary group-hover:text-white-black transition-colors">{title}</span>
                        <span
                            className="text-xs px-1.5 py-0.5 rounded border border-secondary text-secondary"
                            style={{ backgroundColor: 'var(--color-btn-bg)' }}
                        >
                            {status}
                        </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-secondary group-hover:text-primary transition-colors ml-2" />
                </div>
                <p className="text-xs text-secondary">
                    {description}
                </p>
            </div>
        </a>
    );
}
