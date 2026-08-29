import { Link } from 'react-router-dom';
import { Mail, ExternalLink } from 'lucide-react';
import PolarLogo from '@/components/ui/PolarLogo';

const footerLinks = {
  'Explore': [
    { label: 'Expeditions', href: '/expeditions' },
    { label: 'Publications', href: '/publications' },
    { label: 'Datasets', href: '/datasets' },
    { label: 'Media Gallery', href: '/gallery' },
  ],
  'Learn': [
    { label: 'Education', href: '/education' },
    { label: 'Interactive Map', href: '/map' },
    { label: 'Research Areas', href: '/search?sort=newest' },
  ],
  'About': [
    { label: 'NCPOR', href: 'https://ncpor.res.in', external: true },
    { label: 'Ministry of Earth Sciences', href: 'https://moes.gov.in', external: true },
    { label: 'Antarctic Treaty', href: 'https://www.ats.aq', external: true },
    { label: 'Team & Credits', href: '/credits' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-surface-800 bg-polar-950">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <PolarLogo size="md" showText showSubtitle />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-surface-400">
              One digital gateway to India's polar knowledge. Bringing together expeditions,
              research, publications, and media from India's polar research programme under
              NCPOR, Ministry of Earth Sciences.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-surface-400">
              <Mail className="h-4 w-4" />
              <span>polaris@ncpor.res.in</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-surface-400 transition-colors hover:text-white"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-surface-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-surface-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-surface-500">
              © 2026 POLARIS — Polar Research & Information System. A project for Smart India Hackathon 2026.
            </p>
            <p className="text-xs text-surface-500">
              Under NCPOR, Ministry of Earth Sciences, Government of India.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
