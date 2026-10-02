"use client";

import { useEffect } from "react";
import { HeroSection } from "@/components/blocks/hero-section-dark";
import { SiteHeader } from "@/components/site-header";

const MAPS_DIR_URL =
  "https://www.google.com/maps/dir/-15.946726,-48.2842992/SAD+TEC+ELETRÔNICA,+Av.+Santa+Luzia+-+Parque+Estrela+Dalva+XI,+Santo+Antônio+do+Descoberto+-+GO,+72900-000/@-15.946726,-48.2842992,15z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x935bda54e902808b:0xd7633c4f88b71a1c!2m2!1d-48.2777458!2d-15.9515074?entry=ttu&g_ep=EgoyMDI2MDkyOS4wIKXMDSoASAFQAw%3D%3D";

const BRANDS = [
  { src: "/brands/philco.svg", name: "Philco" },
  { src: "/brands/lg.svg", name: "LG" },
  { src: "/brands/samsung.svg", name: "Samsung" },
  { src: "/brands/electrolux.svg", name: "Electrolux" },
  { src: "/brands/mondial.png", name: "Mondial" },
];

const SERVICES = [
  { icon: "fa-tv", title: "Conserto de TVs", desc: "LED, OLED, Smart e Borda Infinita. Troca de painel, backlight e placa." },
  { icon: "fa-snowflake", title: "Eletrodomésticos", desc: "Geladeiras, máquinas de lavar, micro-ondas e ar-condicionado." },
  { icon: "fa-microchip", title: "Microeletrônica", desc: "Reparo de placas em nível de componente com equipamento especializado." },
  { icon: "fa-file-lines", title: "Laudo Técnico", desc: "Diagnóstico detalhado e laudo para garantia e seguro." },
  { icon: "fa-shield-halved", title: "Garantia de 90 dias", desc: "Garantia de peças e serviços em todos os reparos realizados." },
  { icon: "fa-hand-holding-dollar", title: "Orçamento sem custo", desc: "Avaliação e orçamento transparente antes de qualquer serviço." },
];

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen font-sans">
      <SiteHeader active="home" />

      <HeroSection
        title="SAD Tec Eletrônica"
        subtitle={{ regular: "Assistência Técnica Autorizada ", gradient: "Philco e LG." }}
        description="Conserto especializado de TVs e eletrodomésticos, laudo técnico e garantia. Laboratório homologado e certificado em Santo Antônio do Descoberto - GO."
        ctaText="Emitir Ordem de Serviço"
        ctaHref="/os"
        bottomImage={{ light: "/tv_repair.jpg", dark: "/tv_repair.jpg" }}
      />

      {/* Marcas homologadas */}
      <section className="py-20 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.05)_0%,transparent_70%)]"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-[0.3em]">Laboratório Homologado e Certificado</h3>
          </div>
          <div className="bg-white rounded-2xl px-8 py-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-8 shadow-xl">
            {BRANDS.map((b) => (
              <img
                key={b.name}
                src={b.src}
                alt={b.name}
                className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Especialidades */}
      <section id="especialidades" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Nossas Especialidades</h2>
            <p className="text-gray-400 text-lg">Assistência técnica especializada com equipamentos de ponta.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-[#161B29] border border-white/5 rounded-2xl p-8 hover:border-cyan-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                  <i className={`fa-solid ${s.icon} text-xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Localização */}
      <section id="localizacao" className="py-24 bg-[#090A0F] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Onde Estamos</h2>
            <p className="text-gray-400 text-lg">Venha nos visitar ou chame no WhatsApp.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            <div className="bg-[#161B29] border border-white/5 rounded-2xl p-8 flex flex-col">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-location-dot text-xl text-white"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg">SAD Tec Eletrônica</h3>
                  <p className="text-gray-400">Av. Santa Luzia - Parque Estrela Dalva XI</p>
                  <p className="text-gray-400">Santo Antônio do Descoberto - GO, 72900-000</p>
                </div>
              </div>
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#00E5FF] flex items-center justify-center shrink-0">
                  <i className="fa-brands fa-whatsapp text-xl text-[#090A0F]"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg">WhatsApp</h3>
                  <p className="text-gray-400">(61) 98303-4759 · (61) 98197-7940</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <a href={MAPS_DIR_URL} target="_blank" rel="noreferrer" className="bg-cyan-500 hover:bg-cyan-400 text-[#090A0F] px-6 py-4 rounded-xl font-bold text-center transition-colors flex items-center justify-center gap-2">
                  <i className="fa-solid fa-diamond-turn-right"></i> Como chegar
                </a>
                <a href="https://wa.me/5561983034759" target="_blank" rel="noreferrer" className="bg-[#1C2233] border border-white/10 hover:border-cyan-500/40 text-white px-6 py-4 rounded-xl font-bold text-center transition-colors flex items-center justify-center gap-2">
                  <i className="fa-brands fa-whatsapp"></i> Falar no WhatsApp
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/5 shadow-2xl min-h-[320px]">
              <iframe title="Localização SAD Tec Eletrônica" src="https://www.google.com/maps?q=-15.9515074,-48.2777458&z=16&output=embed" className="w-full h-full min-h-[320px] border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
              <i className="fa-solid fa-microchip text-white"></i>
            </div>
            <span className="font-black text-xl text-white">SAD <span className="text-cyan-400">TEC</span></span>
          </div>
          <p className="text-gray-500 text-sm text-center">SAD Tec Eletrônica © {new Date().getFullYear()} — Assistência Técnica Autorizada.</p>
          <a href="/os" className="text-gray-500 hover:text-cyan-400 text-sm transition-colors">Portal O.S. (uso interno)</a>
        </div>
      </footer>

      {/* Botões flutuantes */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <a href="https://maps.app.goo.gl/5zZN1isS1f3BrFTM6?g_st=awb" target="_blank" rel="noreferrer" className="bg-[#161B29] text-yellow-400 border border-yellow-400/30 p-4 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:bg-[#1C2233] hover:scale-110 transition-all flex items-center justify-center group relative w-14 h-14">
          <i className="fa-solid fa-star text-2xl"></i>
          <span className="absolute right-16 bg-[#161B29] text-white border border-white/10 text-sm whitespace-nowrap px-4 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity font-bold">Avalie no Google</span>
        </a>
        <a href={MAPS_DIR_URL} target="_blank" rel="noreferrer" className="bg-[#161B29] text-cyan-400 border border-cyan-400/30 p-4 rounded-full shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:bg-[#1C2233] hover:scale-110 transition-all flex items-center justify-center group relative w-14 h-14">
          <i className="fa-solid fa-location-dot text-2xl"></i>
          <span className="absolute right-16 bg-[#161B29] text-white border border-white/10 text-sm whitespace-nowrap px-4 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity font-bold">Como chegar</span>
        </a>
        <a href="https://wa.me/5561983034759" target="_blank" rel="noreferrer" className="bg-[#00E5FF] text-[#090A0F] p-4 rounded-full shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:bg-white hover:scale-110 transition-all flex items-center justify-center group relative w-14 h-14">
          <i className="fa-brands fa-whatsapp text-3xl"></i>
          <span className="absolute right-16 bg-[#00E5FF] text-[#090A0F] text-sm whitespace-nowrap px-4 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity font-bold">Fale Conosco</span>
        </a>
      </div>

    </div>
  );
}
