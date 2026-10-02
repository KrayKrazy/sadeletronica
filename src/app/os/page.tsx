"use client";

import { useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";

type Item = { id: number; desc: string; qtd: string; preco: string };

const PAGAMENTOS = ["Dinheiro", "Cartão Crédito", "Cartão Débito", "PIX"];

export default function OsPage() {
  const osPdfAreaRef = useRef<HTMLDivElement>(null);

  const [osNum, setOsNum] = useState("0001");
  const [nomeCliente, setNomeCliente] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [equipamento, setEquipamento] = useState("");
  const [modelo, setModelo] = useState("");
  const [serie, setSerie] = useState("");
  const [defeito, setDefeito] = useState("");
  const [laudo, setLaudo] = useState("");
  const [maoDeObra, setMaoDeObra] = useState("");
  const [pagamento, setPagamento] = useState<string[]>(["PIX"]);
  const [data, setData] = useState("");
  const [assinTecnico, setAssinTecnico] = useState("");
  const [assinCliente, setAssinCliente] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const [items, setItems] = useState<Item[]>(
    Array.from({ length: 6 }, (_, i) => ({ id: i + 1, desc: "", qtd: "", preco: "" }))
  );

  const num = (v: string) => parseFloat(v.replace(",", ".")) || 0;
  const totalPecas = items.reduce((acc, it) => acc + num(it.qtd) * num(it.preco), 0);
  const totalGeral = totalPecas + num(maoDeObra);

  const updateItem = (id: number, field: keyof Omit<Item, "id">, value: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  const togglePagamento = (op: string) =>
    setPagamento((prev) => (prev.includes(op) ? prev.filter((o) => o !== op) : [...prev, op]));

  const gerarECompartilharPDF = async () => {
    if (!osPdfAreaRef.current) return;
    setIsGenerating(true);
    try {
      const mod: any = await import("html2pdf.js");
      const html2pdf = mod.default || mod;
      const filename = `OS_${osNum || "0000"}_${(nomeCliente || "Cliente").trim()}`.replace(/\s+/g, "_") + ".pdf";
      const opt = {
        margin: 0,
        filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      const pdfBlob = await html2pdf().set(opt).from(osPdfAreaRef.current).output("blob");

      if (typeof navigator !== "undefined" && navigator.share && navigator.canShare) {
        const file = new File([pdfBlob], filename, { type: "application/pdf" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `Ordem de Serviço - ${nomeCliente || "Cliente"}`,
            text: "Segue em anexo a sua Ordem de Serviço da SAD Tec Eletrônica.",
            files: [file],
          });
          setIsGenerating(false);
          return;
        }
      }

      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
      alert("Ocorreu um erro ao gerar a O.S. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen font-sans pt-20">
      <SiteHeader active="os" />
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-cyan-400 uppercase tracking-[0.3em] mb-2">Área interna</p>
            <h1 className="text-3xl md:text-4xl font-black">Gerador de Ordem de Serviço</h1>
            <p className="text-gray-400 mt-2">Preencha os campos e gere o PDF para enviar ao cliente.</p>
          </div>

          <div className="flex flex-wrap justify-end gap-3 mb-6">
            <button onClick={gerarECompartilharPDF} disabled={isGenerating} className="bg-cyan-500 hover:bg-cyan-400 text-[#090A0F] px-6 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center gap-2 transition-all disabled:opacity-70">
              {isGenerating ? (<><i className="fa-solid fa-spinner fa-spin"></i> Gerando...</>) : (<><i className="fa-solid fa-file-arrow-down"></i> Gerar PDF</>)}
            </button>
            <button onClick={gerarECompartilharPDF} disabled={isGenerating} className="bg-[#00E5FF] hover:bg-white text-[#090A0F] px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-70">
              <i className="fa-brands fa-whatsapp text-xl"></i> Enviar no WhatsApp
            </button>
          </div>

          <div className="bg-[#161B29] border border-white/5 rounded-3xl p-4 md:p-8">
            <div className="overflow-x-auto">
              <div id="os-pdf-area" ref={osPdfAreaRef} className="os-paper mx-auto shadow-2xl" style={{ width: "210mm", minHeight: "297mm", padding: "12mm", boxSizing: "border-box" }}>
                {/* Cabeçalho */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #1f2937", paddingBottom: "12px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ fontWeight: 900, fontStyle: "italic", fontSize: "28px", border: "2px solid #111111", borderRadius: "4px", padding: "4px 8px" }}>SAD</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "18px" }}>Tec Eletrônica</div>
                      <div style={{ fontSize: "11px", color: "#475569" }}>Conserto Rápido: Seu Eletrodoméstico e Eletrônico em Boas Mãos!</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", fontSize: "11px" }}>
                    <div>(61) 98303-4759</div>
                    <div>(61) 98197-7940</div>
                  </div>
                </div>

                {/* Título + dados da empresa */}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", gap: "16px" }}>
                  <div>
                    <h2 style={{ fontWeight: 900, fontSize: "18px", letterSpacing: "1px", margin: 0 }}>ORDEM DE SERVIÇO</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                      <span className="os-label">Nº O.S:</span>
                      <input type="text" value={osNum} onChange={(e) => setOsNum(e.target.value)} style={{ width: "80px", border: "1px solid #cbd5e1", background: "#f8fafc", textAlign: "center", fontWeight: 700 }} />
                    </div>
                  </div>
                  <div style={{ textAlign: "right", fontSize: "11px", color: "#334155" }}>
                    <p style={{ margin: 0 }}><b>Razão Social:</b> Luiz Vieira Gloria</p>
                    <p style={{ margin: 0 }}><b>CNPJ/CPF:</b> 252.707.971-20</p>
                    <p style={{ margin: 0 }}>Quadra 14, Lote 09 - Parque 11A</p>
                    <p style={{ margin: 0 }}>Santo Antônio do Descoberto - GO</p>
                  </div>
                </div>

                {/* Cliente */}
                <div className="os-box os-grid" style={{ gridTemplateColumns: "1fr", marginBottom: "10px" }}>
                  <div>
                    <span className="os-label">CLIENTE</span>
                    <input type="text" placeholder="Nome do cliente" value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} />
                  </div>
                  <div className="os-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                    <div>
                      <span className="os-label">CPF / CNPJ</span>
                      <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                    </div>
                    <div>
                      <span className="os-label">TELEFONE</span>
                      <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <span className="os-label">ENDEREÇO</span>
                    <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                  </div>
                </div>

                {/* Equipamento */}
                <div className="os-box os-grid" style={{ gridTemplateColumns: "1.2fr 1fr 1fr", marginBottom: "10px" }}>
                  <div>
                    <span className="os-label">EQUIPAMENTO</span>
                    <input type="text" value={equipamento} onChange={(e) => setEquipamento(e.target.value)} />
                  </div>
                  <div>
                    <span className="os-label">MODELO</span>
                    <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} />
                  </div>
                  <div>
                    <span className="os-label">SÉRIE</span>
                    <input type="text" value={serie} onChange={(e) => setSerie(e.target.value)} />
                  </div>
                </div>

                {/* Defeito e Laudo */}
                <div className="os-box" style={{ marginBottom: "10px" }}>
                  <span className="os-label">DEFEITO APRESENTADO</span>
                  <textarea rows={2} value={defeito} onChange={(e) => setDefeito(e.target.value)} style={{ resize: "none" }} />
                </div>
                <div className="os-box" style={{ marginBottom: "10px" }}>
                  <span className="os-label">LAUDO TÉCNICO</span>
                  <textarea rows={2} value={laudo} onChange={(e) => setLaudo(e.target.value)} style={{ resize: "none" }} />
                </div>

                {/* Itens */}
                <table style={{ marginBottom: "10px" }}>
                  <thead>
                    <tr>
                      <th style={{ width: "40px", textAlign: "center" }}>Itens</th>
                      <th>DESCRIMINAÇÃO PEÇAS / SERVIÇOS</th>
                      <th style={{ width: "56px", textAlign: "center" }}>QTD</th>
                      <th style={{ width: "90px", textAlign: "right" }}>Preço Unit.</th>
                      <th style={{ width: "90px", textAlign: "right" }}>TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it, idx) => (
                      <tr key={it.id}>
                        <td style={{ textAlign: "center", fontWeight: 700 }}>{idx + 1}</td>
                        <td><input type="text" value={it.desc} onChange={(e) => updateItem(it.id, "desc", e.target.value)} /></td>
                        <td><input type="text" inputMode="decimal" value={it.qtd} onChange={(e) => updateItem(it.id, "qtd", e.target.value)} style={{ textAlign: "center" }} /></td>
                        <td><input type="text" inputMode="decimal" value={it.preco} onChange={(e) => updateItem(it.id, "preco", e.target.value)} style={{ textAlign: "right" }} /></td>
                        <td style={{ textAlign: "right", fontWeight: 500 }}>R$ {(num(it.qtd) * num(it.preco)).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={4} style={{ textAlign: "right", fontWeight: 700, background: "#f8fafc" }}>TOTAL PEÇAS</td>
                      <td style={{ textAlign: "right", fontWeight: 700, background: "#f8fafc" }}>R$ {totalPecas.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan={4} style={{ textAlign: "right", fontWeight: 700, background: "#f8fafc" }}>MÃO DE OBRA</td>
                      <td><input type="text" inputMode="decimal" value={maoDeObra} onChange={(e) => setMaoDeObra(e.target.value)} style={{ textAlign: "right", fontWeight: 700 }} /></td>
                    </tr>
                    <tr>
                      <td colSpan={4} style={{ textAlign: "right", fontWeight: 900, background: "#e2e8f0" }}>TOTAL GERAL</td>
                      <td style={{ textAlign: "right", fontWeight: 900, background: "#e2e8f0" }}>R$ {totalGeral.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>

                {/* Pagamento */}
                <div className="os-box" style={{ marginBottom: "10px" }}>
                  <div style={{ fontWeight: 700, fontSize: "11px", marginBottom: "6px" }}>CONDIÇÃO DE PAGAMENTO</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
                    {PAGAMENTOS.map((op) => (
                      <label key={op} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px" }}>
                        <input type="checkbox" checked={pagamento.includes(op)} onChange={() => togglePagamento(op)} />
                        {op}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Assinaturas + Data */}
                <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", marginTop: "28px" }}>
                  <div style={{ flex: 1, textAlign: "center", borderTop: "1px solid #111111", paddingTop: "6px" }}>
                    <div className="os-label">SERVIÇO AUTORIZADO POR</div>
                    <input type="text" placeholder="Técnico responsável" value={assinTecnico} onChange={(e) => setAssinTecnico(e.target.value)} style={{ textAlign: "center" }} />
                  </div>
                  <div style={{ flex: 1, textAlign: "center", borderTop: "1px solid #111111", paddingTop: "6px" }}>
                    <div className="os-label">CLIENTE</div>
                    <input type="text" placeholder="Nome do cliente" value={assinCliente} onChange={(e) => setAssinCliente(e.target.value)} style={{ textAlign: "center" }} />
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "18px" }}>
                  <span className="os-label">DATA</span>
                  <input type="text" placeholder="__/__/____" value={data} onChange={(e) => setData(e.target.value)} style={{ width: "120px", textAlign: "center", border: "1px solid #cbd5e1", background: "#f8fafc" }} />
                </div>

                {/* Rodapé */}
                <div style={{ marginTop: "24px", background: "#f1f5f9", color: "#334155", fontSize: "10px", textAlign: "center", padding: "8px" }}>
                  90 dias — Prazo para retirada do Equipamento (Art. 1.275, Lei nº 10.406/2002: perda por abandono). Garantia de peças e serviços: 90 dias.
                </div>



              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
