import { useState } from 'react';
import { BookOpen, Snowflake, MapPin, Compass, Lightbulb, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { useStats } from '@/hooks/useApi';

const sections = [
  {
    id: 'intro',
    icon: Snowflake,
    title: 'What is Polar Science?',
    color: 'from-polar-500 to-polar-600',
    content: `Polar science is the study of Earth's polar regions — the Arctic and Antarctic. It encompasses atmospheric science, oceanography, glaciology, biology, and geology.

Scientists study polar regions to understand:
• Climate change and its global impacts
• Global weather patterns and atmospheric circulation
• Unique polar ecosystems and biodiversity
• Earth's geological history through ice cores
• Ocean currents and their role in global climate

India has been contributing to polar science since 1981 through its Antarctic Programme and since 2007 through its Arctic Programme.`,
  },
  {
    id: 'stations',
    icon: MapPin,
    title: "India's Research Stations",
    color: 'from-ice-500 to-ice-600',
    content: `India operates four polar research stations:

🏔️ Dakshin Gangotri (1983–1990)
India's first Antarctic station, now decommissioned and buried under ice. It served as a historic milestone.

❄️ Maitri (1989–present)
Located on Schirmacher Oasis in Antarctica (70°46'S, 11°44'E). Conducts geology, geography, and medical experiments.

🏗️ Bharati (2012–present)
India's newest Antarctic station at Larsemann Hills (69°24'S, 76°11'E). Built from 134 shipping containers. Focuses on oceanography and geology.

🏔️ Himadri (2008–present)
India's Arctic station at Ny-Ålesund, Svalbard, Norway (78°55'N, 11°56'E). 1,200 km from the North Pole. Named after the Himalayan range.`,
  },
  {
    id: 'expeditions',
    icon: Compass,
    title: 'Indian Polar Expeditions',
    color: 'from-aurora-500 to-aurora-600',
    content: `India's polar expedition history spans over four decades:

📜 1981: First expedition to Antarctica ("Operation Gangotri") with 21 members
📜 1983: India signs the Antarctic Treaty, becomes 15th Consultative Member
📜 1983: Dakshin Gangotri established
📜 1989: Maitri station commissioned
📜 2007: First Indian Arctic expedition
📜 2008: Himadri station inaugurated
📜 2012: Bharati station commissioned
📜 2023: First Indian winter Arctic expedition
📜 2024: 44th Antarctic expedition

Over 40 expeditions to Antarctica have been completed, with more than 1,300 Indians visiting the continent. India has published over 300 research papers from polar studies.`,
  },
  {
    id: 'research',
    icon: Lightbulb,
    title: 'Research Topics',
    color: 'from-amber-500 to-amber-600',
    content: `Indian polar research covers diverse scientific areas:

🌡️ Climate Change — Monitoring temperature changes, ice melt, and atmospheric composition
🧊 Glaciology — Studying glaciers, ice sheets, and ice cores for climate records
🌊 Oceanography — Analyzing ocean currents, salinity, and marine ecosystems
🌍 Geology — Mapping continental formations and mineral resources
🐧 Marine Biology — Documenting biodiversity in polar waters
🔬 Microbiology — Discovering new microbial species in extreme environments
📡 Space Weather — Monitoring aurora and magnetospheric activity
⚕️ Polar Medicine — Studying human adaptation to extreme cold`,
  },
  {
    id: 'facts',
    icon: GraduationCap,
    title: 'Interesting Facts',
    color: 'from-rose-500 to-rose-600',
    content: `🧊 Antarctica is the coldest, driest, and windiest continent on Earth
🌊 The Arctic is an ocean surrounded by land; Antarctica is land surrounded by ocean
🏗️ Bharati station was built from 134 shipping containers
📍 Himadri is 1,200 km from the North Pole
🔫 Arctic researchers must train with rifles for polar bear protection
📝 India has published over 300 research papers from Antarctic studies
👥 Over 1,300 Indians have visited Antarctica through the programme
💰 Each Antarctic expedition costs approximately ₹200 million (US$2.1 million)
🌍 India is the 11th country to set up a station in Ny-Ålesund, Svalbard
🔬 30 new microbial species were discovered by Indian scientists in Antarctica`,
  },
];

export default function EducationPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>('intro');
  const { data: stats } = useStats();

  return (
    <div className="py-12">
      <div className="container-wide">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-aurora-gradient">
            <GraduationCap className="h-7 w-7 text-polar-900" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl">Learn About Polar Science</h1>
          <p className="mt-3 text-surface-400">
            Discover India's polar research journey through simplified content and interesting facts.
            Designed for students and the general public.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Expeditions', value: stats?.expeditions || 44, sub: 'Since 1981' },
            { label: 'Stations', value: 4, sub: '2 active in Antarctic' },
            { label: 'Publications', value: stats?.publications || '300+', sub: 'Research papers' },
            { label: 'Scientists', value: '1300+', sub: 'Visited Antarctica' },
          ].map((stat) => (
            <div key={stat.label} className="card p-4 text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs font-medium text-surface-400">{stat.label}</div>
              <div className="text-xs text-surface-500">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Content Sections */}
        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="card overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-surface-800/50"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${section.color} text-white`}>
                  <section.icon className="h-5 w-5" />
                </div>
                <h2 className="flex-1 text-lg font-semibold text-white">{section.title}</h2>
                {expandedSection === section.id ? (
                  <ChevronUp className="h-5 w-5 text-surface-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-surface-400" />
                )}
              </button>

              {expandedSection === section.id && (
                <div className="border-t border-surface-800 px-5 pb-5 pt-4">
                  <div className="prose prose-invert max-w-none whitespace-pre-line text-sm leading-relaxed text-surface-300">
                    {section.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mx-auto mt-12 max-w-3xl text-center">
          <div className="card p-8">
            <h2 className="text-xl font-bold text-white">Ready to Explore Further?</h2>
            <p className="mt-2 text-surface-400">
              Dive into real expedition data, publications, and media from India's polar research.
            </p>
            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href="/expeditions" className="btn-primary">Browse Expeditions</a>
              <a href="/map" className="btn-secondary">View on Map</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
