import { useState, useMemo } from 'react';
import { 
  Search, ExternalLink, Github, Code2, Smartphone, Bot, Layout, 
  Database, Sparkles, Filter, Users, ArrowUpRight, CheckCircle2, 
  MessageSquare, Star, Laptop, ShieldCheck, HeartHandshake, Eye
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: 'web' | 'mobile' | 'ai' | 'backend' | 'design';
  categoryLabel: string;
  desc: string;
  tech: string[];
  santri: {
    name: string;
    role: string;
    angkatan: string;
    avatar: string;
  };
  demoUrl: string;
  githubUrl?: string;
  featured?: boolean;
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "PiSantri Multi-Tenant ERP",
      category: "web",
      categoryLabel: "Web App",
      desc: "Sistem Manajemen Pesantren & Sekolah Modern dengan fitur Akademik, Tahfidz 30 Juz, Keuangan SPP, Time Tracking Santri, dan Multi-Tenancy.",
      tech: ["React", "Laravel 11", "PostgreSQL", "Tailwind CSS", "Docker"],
      santri: {
        name: "Aiman & Tim Santri Dev",
        role: "Fullstack Team",
        angkatan: "Angkatan 2024",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      },
      demoUrl: "https://dev.pondokinformatika.id",
      featured: true
    },
    {
      id: 2,
      title: "Al-Muyassar Digital Quran",
      category: "mobile",
      categoryLabel: "Mobile & Web",
      desc: "Aplikasi Mushaf Al-Qur'an digital interaktif dengan audio murottal 30 juz, penanda tajwid berwarna, dan catatan setoran hafalan harian.",
      tech: ["Flutter", "Dart", "Supabase", "Audio Streaming"],
      santri: {
        name: "Muhammad Rizki",
        role: "Mobile Specialist",
        angkatan: "Angkatan 2024",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
      },
      demoUrl: "https://pondokinformatika.id",
      featured: true
    },
    {
      id: 3,
      title: "OpenWA Microservice Gateway",
      category: "backend",
      categoryLabel: "Backend & Bot",
      desc: "WhatsApp API Gateway berperforma tinggi untuk pengiriman notifikasi kehadiran santri, invoice otomatis, dan broadcast pengumuman wali santri.",
      tech: ["Node.js", "Baileys", "Fastify", "Redis", "Docker"],
      santri: {
        name: "Fajar Ramadhan",
        role: "Backend Engineer",
        angkatan: "Angkatan 2023",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
      },
      demoUrl: "https://api.pondokinformatika.id",
      featured: true
    },
    {
      id: 4,
      title: "Santri AI Assistant & Tutor",
      category: "ai",
      categoryLabel: "AI Agent",
      desc: "Asisten kecerdasan buatan berbasis LLM untuk menjawab pertanyaan seputar ilmu syar'i, panduan coding, dan analisis portofolio karya santri.",
      tech: ["Gemini Pro", "Python", "LangChain", "Vector DB", "React"],
      santri: {
        name: "Zaid Abdullah",
        role: "AI Engineer",
        angkatan: "Angkatan 2024",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80"
      },
      demoUrl: "https://pondokinformatika.id",
      featured: false
    },
    {
      id: 5,
      title: "E-Retribusi Daerah Dashboard",
      category: "web",
      categoryLabel: "Web App",
      desc: "Dashboard monitoring retribusi pasar dan PAD berbasis real-time data visualizer, geolocation map, dan laporan keuangan komprehensif.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Recharts", "PHP 8"],
      santri: {
        name: "Hamzah Al-Faruq",
        role: "Frontend Engineer",
        angkatan: "Angkatan 2023",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80"
      },
      demoUrl: "https://dev.pondokinformatika.id",
      featured: false
    },
    {
      id: 6,
      title: "DonasiSantri Crowdfunding",
      category: "web",
      categoryLabel: "Web App",
      desc: "Platform penggalangan dana infaq & wakaf sarana santri dengan integrasi QRIS dinamis otomatis dan laporan mutasi real-time.",
      tech: ["Vite", "React", "Midtrans", "Tailwind CSS"],
      santri: {
        name: "Ibrahim Malik",
        role: "Fullstack Dev",
        angkatan: "Angkatan 2024",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
      },
      demoUrl: "https://donasi.pondokinformatika.id",
      featured: false
    }
  ];

  const categories = [
    { key: 'all', label: 'Semua Karya', icon: Sparkles },
    { key: 'web', label: 'Web Application', icon: Layout },
    { key: 'mobile', label: 'Mobile Apps', icon: Smartphone },
    { key: 'ai', label: 'AI & Automation', icon: Bot },
    { key: 'backend', label: 'Backend & API', icon: Database }
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.santri.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo Pondok Informatika" className="w-10 h-10 object-contain drop-shadow" />
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white block leading-none">
                Katalog<span className="text-emerald-400">Santri</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                Pondok Informatika Portfolio
              </span>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <a
              href="https://profile.pondokinformatika.id"
              className="hidden sm:inline-flex px-4 py-2 text-xs font-bold text-slate-300 hover:text-white transition-colors"
            >
              Tentang Pondok
            </a>
            <a
              href="https://wa.me/6282293827200?text=Halo%20Pondok%20Informatika,%20saya%20tertarik%20untuk%20merekrut%20atau%20bekerja%20sama%20dengan%20talenta%20santri."
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Hire Talenta Santri</span>
            </a>
          </div>
        </div>
      </nav>

      {/* HEADER SECTION */}
      <header className="pt-32 pb-12 sm:pt-40 sm:pb-16 text-center relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-4">
            <Code2 className="w-3.5 h-3.5" />
            Showcase Hasil Belajar &amp; Rekayasa Software Santri
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Karya Nyata Generasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">Teknologi Qur'ani</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Jelajahi berbagai proyek aplikasi web, mobile, bot otomatisasi, dan arsitektur sistem yang dikembangkan santri dengan standar industri teknologi terkini.
          </p>

          {/* SEARCH & FILTERS */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama proyek, teknologi (React, Laravel, Flutter), atau nama santri..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all shadow-inner"
              />
            </div>
          </div>
        </div>
      </header>

      {/* CATEGORY FILTER PILLS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center justify-center flex-wrap gap-2">
          {categories.map((c) => {
            const Icon = c.icon;
            const active = selectedCategory === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  active 
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' 
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PROJECTS GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 flex-1">
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-slate-400 text-sm">Tidak ada proyek yang sesuai dengan pencarian Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => (
              <div 
                key={p.id}
                className="rounded-3xl bg-slate-900/90 border border-slate-800/90 p-5 sm:p-6 flex flex-col justify-between hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 group shadow-lg"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-emerald-400 border border-slate-700/60">
                      {p.categoryLabel}
                    </span>
                    {p.featured && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        Pilihan
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {p.desc}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {p.tech.map((t, i) => (
                      <span 
                        key={i}
                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Creator info + Link */}
                <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={p.santri.avatar} 
                      alt={p.santri.name} 
                      className="w-8 h-8 rounded-full object-cover border border-slate-700" 
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-200 leading-tight">{p.santri.name}</h4>
                      <p className="text-[10px] text-slate-400">{p.santri.role} • {p.santri.angkatan}</p>
                    </div>
                  </div>

                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-colors"
                    title="Buka Demo Proyek"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* HIRE BANNER */}
        <div className="mt-16 rounded-3xl p-8 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Kemitraan Industri</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Butuh Software Engineer Berkualitas &amp; Berakhlak?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl">
              Kami menyalurkan lulusan santri siap kerja full-time, magang industri, atau pengerjaan project freelance software house Anda.
            </p>
          </div>

          <a
            href="https://wa.me/6282293827200?text=Halo%20Admin%20Pondok%20Informatika,%20kami%20ingin%20membahas%20kebutuhan%20rekrutmen/proyek%20IT."
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-emerald-500/20 whitespace-nowrap transition-all"
          >
            Konsultasi Rekrutmen WhatsApp
          </a>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Katalog Karya Santri — Pondok Informatika. All rights reserved.</p>
      </footer>
    </div>
  );
}
