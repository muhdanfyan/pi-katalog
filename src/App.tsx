import { useState, useMemo } from 'react';
import { 
  Search, ExternalLink, Github, Code2, Smartphone, Bot, Layout, 
  Database, Sparkles, X, HeartHandshake, Eye
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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-emerald-600 selection:text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo Pondok Informatika" className="w-10 h-10 object-contain drop-shadow-sm" />
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-950 block leading-none">
                Katalog<span className="text-emerald-600">Santri</span>
              </span>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                Pondok Informatika Portfolio
              </span>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <a
              href="https://profile.pondokinformatika.id"
              className="hidden sm:inline-flex px-4 py-2 text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors"
            >
              Tentang Pondok
            </a>
            <a
              href="https://wa.me/6283134086899?text=Halo%20Pondok%20Informatika,%20saya%20tertarik%20untuk%20merekrut%20atau%20bekerja%20sama%20dengan%20talenta%20santri."
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Hire Talenta Santri</span>
            </a>
          </div>
        </div>
      </nav>

      {/* HEADER SECTION */}
      <header className="pt-32 pb-12 sm:pt-40 sm:pb-16 text-center relative bg-gradient-to-b from-emerald-50/60 via-white to-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-bold mb-4 shadow-sm">
            <Code2 className="w-3.5 h-3.5 text-emerald-600" />
            Showcase Hasil Belajar &amp; Rekayasa Software Santri
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Karya Nyata Generasi <span className="text-emerald-600">Teknologi Qur'ani</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Jelajahi berbagai proyek aplikasi web, mobile, bot otomatisasi, dan arsitektur sistem yang dikembangkan santri dengan standar industri teknologi terkini.
          </p>

          {/* SEARCH */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama proyek, teknologi (React, Laravel, Flutter), atau nama santri..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-sm"
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
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                  active 
                    ? 'bg-emerald-600 text-white shadow-emerald-600/20' 
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
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
            <p className="text-slate-500 text-sm">Tidak ada proyek yang sesuai dengan pencarian Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col group"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {p.categoryLabel}
                    </span>
                    {p.featured && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        <Sparkles className="w-3 h-3" /> Unggulan
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-950 group-hover:text-emerald-700 transition-colors mb-2">
                    {p.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-5">
                    {p.desc}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={p.santri.avatar}
                        alt={p.santri.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900 leading-tight">{p.santri.name}</p>
                        <p className="text-[10px] text-slate-500">{p.santri.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setActiveProject(p)}
                        className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors cursor-pointer"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 border border-emerald-200 transition-all"
                        title="Buka Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {p.tech.map((t, i) => (
                    <span key={i} className="text-[10px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* DETAIL MODAL */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-950 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {activeProject.categoryLabel}
            </span>

            <h2 className="text-xl sm:text-2xl font-black text-slate-950 mt-3 mb-2">
              {activeProject.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              {activeProject.desc}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Teknologi Digunakan</h4>
              <div className="flex flex-wrap gap-2">
                {activeProject.tech.map((t, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={activeProject.santri.avatar}
                  alt={activeProject.santri.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h5 className="text-xs font-bold text-slate-950">{activeProject.santri.name}</h5>
                  <p className="text-[11px] text-slate-500">{activeProject.santri.role} • {activeProject.santri.angkatan}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={activeProject.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
              >
                <span>Kunjungi Demo Langsung</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/6283134086899?text=Halo%20Pondok%20Informatika,%20saya%20tertarik%20dengan%20proyek%20${encodeURIComponent(activeProject.title)}%20karya%20${encodeURIComponent(activeProject.santri.name)}.`}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm"
              >
                Tanya Creator
              </a>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-50 border-t border-slate-200 py-10 text-center text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Katalog Karya Santri — Pondok Informatika.</p>
          <div className="flex items-center gap-4 text-slate-500 font-medium">
            <a href="https://pondokinformatika.id" className="hover:text-slate-900">Portal Utama</a>
            <a href="https://profile.pondokinformatika.id" className="hover:text-slate-900">Profile</a>
            <a href="https://produk.pondokinformatika.id" className="hover:text-slate-900">Produk</a>
            <a href="https://donasi.pondokinformatika.id" className="hover:text-slate-900">Donasi</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
