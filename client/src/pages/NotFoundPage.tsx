import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Floating ice particles */}
      <div className="relative mb-8">
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-polar-500/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-5 -right-8 w-16 h-16 bg-aurora-500/10 rounded-full blur-2xl" />
        
        {/* Big 404 */}
        <div className="relative">
          <span className="text-[120px] md:text-[160px] font-black leading-none text-gradient select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Compass className="h-16 w-16 md:h-24 md:w-24 text-polar-400/30 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
        Lost in the Polar Region?
      </h1>
      <p className="text-surface-400 max-w-md mb-8 leading-relaxed">
        The page you are looking for has drifted away with the ice. 
        Let us help you find your way back to India polar research portal.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/" className="btn-primary gap-2">
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
        <Link to="/search" className="btn-secondary gap-2">
          <Search className="h-4 w-4" />
          Search Resources
        </Link>
        <button onClick={() => window.history.back()} className="btn-ghost gap-2">
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      </div>

      {/* Fun polar fact */}
      <div className="mt-16 max-w-sm rounded-xl border border-surface-800 bg-surface-900/50 p-4">
        <p className="text-xs text-surface-500">
          <span className="text-aurora-400 font-medium">Did you know?</span> India first 
          reached Antarctica in 1981 with the 1st Indian Scientific Expedition. Since then, 
          India has completed 44+ expeditions and established 3 polar stations.
        </p>
      </div>
    </div>
  );
}
