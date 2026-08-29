
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEAM_MEMBERS.map((m) => (
              <div key={m.name} className="rounded-2xl bg-surface-900/50 border border-surface-800 p-6 hover:border-polar-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <img src={m.avatar} alt={m.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div><h3 className="text-lg font-semibold text-white">{m.name}</h3><p className="text-sm text-polar-400 font-medium">{m.role}</p></div>
                </div>
                <p className="mt-4 text-sm text-surface-400 leading-relaxed">{m.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">{m.skills.map((s) => (<span key={s} className="px-2.5 py-1 rounded-lg bg-surface-800 text-surface-300 text-xs font-medium">{s}</span>))}</div>
                <div className="mt-4 flex items-center gap-4">
                  <a href={m.email} className="flex items-center gap-1.5 text-xs text-surface-500 hover:text-polar-400 transition-colors"><Mail className="h-3.5 w-3.5" /> Email</a>
                  <a href={m.github} className="flex items-center gap-1.5 text-xs text-surface-500 hover:text-polar-400 transition-colors"><Github className="h-3.5 w-3.5" /> GitHub</a>
                </div>
              </div>
            ))}
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
              <li>- <strong className="text-white">Ministry of Earth Sciences</strong> - For the problem statement and institutional context.</li>
              <li>- <strong className="text-white">Smart India Hackathon 2026</strong> - For the platform to innovate.</li>
              <li>- <strong className="text-white">Open Source Community</strong> - React, Vite, Tailwind CSS, Express.js, Prisma, Leaflet.</li>
              <li>- <strong className="text-white">Our College</strong> - For supporting our participation in SIH 2026.</li>
            </ul>
            <p className="mt-4 text-surface-500 italic">Built with care by Team POLARIS for Smart India Hackathon 2026.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
