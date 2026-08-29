const fs = require('fs');
const f = 'client/src/pages/CreditsPage.tsx';

const part2 = `

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
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Award className="h-6 w-6 text-polar-400" /> Hackathon Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Problem Statement', value: HACKATHON_INFO.title },
              { label: 'Organization', value: HACKATHON_INFO.organization },
              { label: 'Department', value: HACKATHON_INFO.department },
              { label: 'Theme', value: HACKATHON_INFO.theme },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-sm text-surface-500 mb-1">{item.label}</p>
                <p className="text-white font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Users className="h-6 w-6 text-polar-400" /> Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.name} className="rounded-2xl bg-surface-900/50 border border-surface-800 p-6 hover:border-polar-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                    <p className="text-sm text-polar-400 font-medium">{member.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-surface-400 leading-relaxed">{member.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-lg bg-surface-800 text-surface-300 text-xs font-medium">{skill}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <a href={member.email} className="flex items-center gap-1.5 text-xs text-surface-500 hover:text-polar-400 transition-colors">
                    <Mail className="h-3.5 w-3.5" /> Email
                  </a>
                  <a href={member.github} className="flex items-center gap-1.5 text-xs text-surface-500 hover:text-polar-400 transition-colors">
                    <Github className="h-3.5 w-3.5" /> GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Code className="h-6 w-6 text-polar-400" /> Technology Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TECH_STACK.map((tech) => (
              <div key={tech.name} className="rounded-xl bg-surface-900/50 border border-surface-800 p-4 text-center hover:border-polar-500/30 transition-all">
                <span className="text-3xl">{tech.icon}</span>
                <p className="mt-2 text-sm font-semibold text-white">{tech.name}</p>
                <p className="mt-1 text-xs text-surface-500">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-br from-polar-900/30 via-surface-900/50 to-aurora-900/30 border border-surface-800 p-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
            <Globe className="h-6 w-6 text-polar-400" /> Project at a Glance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-gradient">{stat.value}</p>
                <p className="mt-1 text-sm text-surface-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto rounded-2xl bg-surface-900/50 border border-surface-800 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Heart className="h-6 w-6 text-polar-400" /> Acknowledgments
          </h2>
          <div className="space-y-4 text-surface-400 text-sm leading-relaxed">
            <p>We gratefully acknowledge the following for making this project possible:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2"><span className="text-polar-400 mt-1">{'\u2022'}</span> <span><strong className="text-white">NCPOR</strong> {'\u2014'} National Centre for Polar and Ocean Research for inspiring this platform with their remarkable polar research programme.</span></li>
              <li className="flex items-start gap-2"><span className="text-polar-400 mt-1">{'\u2022'}</span> <span><strong className="text-white">Ministry of Earth Sciences</strong> {'\u2014'} For providing the problem statement and institutional context.</span></li>
              <li className="flex items-start gap-2"><span className="text-polar-400 mt-1">{'\u2022'}</span> <span><strong className="text-white">Smart India Hackathon 2026</strong> {'\u2014'} For the platform to innovate and build solutions for real-world problems.</span></li>
              <li className="flex items-start gap-2"><span className="text-polar-400 mt-1">{'\u2022'}</span> <span><strong className="text-white">Open Source Community</strong> {'\u2014'} React, Vite, Tailwind CSS, Express.js, Prisma, Leaflet, and all the libraries that made this possible.</span></li>
              <li className="flex items-start gap-2"><span className="text-polar-400 mt-1">{'\u2022'}</span> <span><strong className="text-white">Our College/Institution</strong> {'\u2014'} For supporting our participation in SIH 2026.</span></li>
            </ul>
            <p className="mt-4 text-surface-500 italic
