import { Award, Code, Globe, Users, Heart, Github, Mail } from 'lucide-react';

const TEAM_LEADER = {
  name: 'Bhuwanesh P',
  role: 'Team Leader / Full-Stack Developer',
  bio: 'Led the overall architecture and development of POLARIS.',
  avatar: '/bhuwanesh.jpg',
  skills: ['React', 'Node.js', 'Database', 'Express.js', 'Prisma', 'Tailwind CSS'],
  github: 'https://github.com/Bhuwan1906',
  email: 'techbhuwan1906@example.com',
};

const TEAM_MEMBERS = [
  { name: 'E Hanush', color: 'bg-green-500' },
  { name: 'S.v.Akshaya', color: 'bg-orange-500' },
  { name: 'Hatni negiha', color: 'bg-purple-500' },
  { name: 'K.Jayashree', color: 'bg-pink-500' },
  { name: 'Dharshini. V', color: 'bg-teal-500' },
];

const HACKATHON_INFO = {
  name: 'Smart India Hackathon 2026',
  psId: 'SIH26063',
  title: 'Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal',
  organization: 'Ministry of Earth Sciences (MoES)',
  department: 'National Centre for Polar and Ocean Research (NCPOR)',
  theme: 'Smart Education',
  category: 'Software',
};

const TECH_STACK = [
  { name: 'React', icon: String.fromCodePoint(0x269B, 0xFE0F), desc: 'Frontend UI' },
  { name: 'Vite', icon: String.fromCodePoint(0x26A1), desc: 'Build tool' },
  { name: 'Tailwind', icon: String.fromCodePoint(0x1F3A8), desc: 'CSS framework' },
  { name: 'Express', icon: String.fromCodePoint(0x1F680), desc: 'API server' },
  { name: 'Prisma', icon: String.fromCodePoint(0x1F48E), desc: 'ORM' },
  { name: 'SQLite', icon: String.fromCodePoint(0x1F5C2), desc: 'Database' },
  { name: 'Leaflet', icon: String.fromCodePoint(0x1F5FA, 0xFE0F), desc: 'Maps' },
  { name: 'JWT', icon: String.fromCodePoint(0x1F510), desc: 'Auth' },
];

const STATS = [
  { label: 'Files Created', value: '97+' },
  { label: 'API Endpoints', value: '40+' },
  { label: 'Database Models', value: '15+' },
  { label: 'Frontend Pages', value: '20+' },
  { label: 'Demo Data Entries', value: '80+' },
  { label: 'Dev Hours', value: '40+' },
];

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-surface-950">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-polar-900/20 via-surface-950 to-surface-950" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-polar-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-aurora-500/5 rounded-full blur-3xl" />
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-polar-500/10 border border-polar-500/20 mb-6">
            <Award className="h-4 w-4 text-polar-400" />
            <span className="text-sm text-polar-400">{HACKATHON_INFO.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Team <span className="text-gradient">POLARIS</span></h1>
          <p className="text-lg text-surface-400 max-w-2xl mx-auto mb-2">Built with passion for Smart India Hackathon 2026</p>
          <p className="text-sm text-surface-500">PS ID: {HACKATHON_INFO.psId} | {HACKATHON_INFO.category}</p>
        </div>
      </section>
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto rounded-2xl bg-surface-900/50 border border-surface-800 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><Award className="h-6 w-6 text-polar-400" /> Hackathon Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{l:"Problem Statement",v:HACKATHON_INFO.title},{l:"Organization",v:HACKATHON_INFO.organization},{l:"Department",v:HACKATHON_INFO.department},{l:"Theme",v:HACKATHON_INFO.theme}].map((i) => (
              <div key={i.l}><p className="text-sm text-surface-500 mb-1">{i.l}</p><p className="text-white font-medium">{i.v}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3"><Users className="h-6 w-6 text-polar-400" /> Our Team</h2>
          <div className="rounded-2xl bg-surface-900/50 border border-polar-500/30 p-8 mb-6 hover:border-polar-400/50 transition-all duration-300 shadow-lg shadow-polar-500/5">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative">
                <img src={TEAM_LEADER.avatar} alt={TEAM_LEADER.name} className="w-24 h-24 rounded-2xl object-cover ring-2 ring-polar-500/50" />
                <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-aurora-gradient flex items-center justify-center">
                  <Award className="h-4 w-4 text-polar-900" />
                </div>
              </div>
              <div className="text-center sm:text-left flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <h3 className="text-2xl font-bold text-white">{TEAM_LEADER.name}</h3>
                  <span className="inline-block px-3 py-0.5 rounded-full bg-polar-500/10 border border-polar-500/20 text-xs font-semibold text-polar-400 w-fit">Team Leader</span>
                </div>
                <p className="text-polar-400 font-medium mb-3">{TEAM_LEADER.role}</p>
                <p className="text-sm text-surface-400 leading-relaxed max-w-xl">{TEAM_LEADER.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                  {TEAM_LEADER.skills.map((s) => (
                    <span key={s} className="px-3 py-1 rounded-lg bg-surface-800 text-surface-300 text-xs font-medium border border-surface-700">{s}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-4 justify-center sm:justify-start">
                  <a href={TEAM_LEADER.email} className="flex items-center gap-1.5 text-sm text-surface-400 hover:text-polar-400 transition-colors"><Mail className="h-4 w-4" /> Email</a>
                  <a href={TEAM_LEADER.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-surface-400 hover:text-polar-400 transition-colors"><Github className="h-4 w-4" /> GitHub</a>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-surface-900/50 border border-surface-800 p-8 hover:border-polar-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex -space-x-3">
                {TEAM_MEMBERS.map((m) => (
                  <div key={m.name} className={"w-10 h-10 rounded-full " + m.color + " flex items-center justify-center text-white text-sm font-bold ring-2 ring-surface-900"}>
                    {m.name.charAt(0)}
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Team Members</h3>
                <p className="text-xs text-surface-500">{TEAM_MEMBERS.length} members</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {TEAM_MEMBERS.map((m) => (
                <div key={m.name} className="flex items-center gap-3 p-3 rounded-xl bg-surface-800/50 border border-surface-700/50">
                  <div className={"w-10 h-10 rounded-full " + m.color + " flex items-center justify-center text-white text-sm font-bold flex-shrink-0"}>
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{m.name}</p>
                    <p className="text-xs text-surface-500">Contributor</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3"><Code className="h-6 w-6 text-polar-400" /> Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TECH_STACK.map((t) => (
              <div key={t.name} className="rounded-xl bg-surface-900/50 border border-surface-800 p-4 text-center hover:border-polar-500/30 transition-all">
                <span className="text-3xl">{t.icon}</span>
                <p className="mt-2 text-sm font-semibold text-white">{t.name}</p>
                <p className="mt-1 text-xs text-surface-500">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-br from-polar-900/30 via-surface-900/50 to-aurora-900/30 border border-surface-800 p-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3"><Globe className="h-6 w-6 text-polar-400" /> Project at a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {STATS.map((s) => (<div key={s.label} className="text-center"><p className="text-3xl font-bold text-gradient">{s.value}</p><p className="mt-1 text-sm text-surface-400">{s.label}</p></div>))}
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto rounded-2xl bg-surface-900/50 border border-surface-800 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><Heart className="h-6 w-6 text-polar-400" /> Acknowledgments</h2>
          <div className="space-y-4 text-surface-400 text-sm leading-relaxed">
            <p>We gratefully acknowledge the following for making this project possible:</p>
            <ul className="space-y-2 ml-4">
              <li>- <strong className="text-white">NCPOR</strong> - National Centre for Polar and Ocean Research.</li>
              <li>- <strong className="text-white">Ministry of Earth Sciences</strong> - For the problem statement.</li>
              <li>- <strong className="text-white">Smart India Hackathon 2026</strong> - For the platform to innovate.</li>
              <li>- <strong className="text-white">Open Source Community</strong> - React, Vite, Tailwind, Express, Prisma, Leaflet.</li>
              <li>- <strong className="text-white">Our College</strong> - For supporting our participation.</li>
            </ul>
            <p className="mt-4 text-surface-500 italic">Built with care by Team POLARIS for Smart India Hackathon 2026.</p>
          </div>
        </div>
      </section>
    </div>
  );
}