import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useSegmentos } from "@/hooks/useSegmentos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Footer } from "@/components/Footer";
import nutrimilhoLogo from "@/assets/nutrimilho-logo.png";

export default function Segmentos() {
  const { segmentos, loading, addSegmento, removeSegmento } = useSegmentos();
  const [novo, setNovo] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novo.trim()) return;
    addSegmento(novo);
    setNovo("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <img src={nutrimilhoLogo} alt="Nutrimilho" className="h-10 object-contain" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Segmentos</h1>
              <p className="text-sm text-muted-foreground">Cadastre os segmentos disponíveis para os pedidos</p>
            </div>
          </div>

          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft size={16} /> Voltar ao dashboard
            </Button>
          </Link>

          <form onSubmit={handleAdd} className="bg-card rounded-lg shadow-sm p-5 border space-y-3">
            <Label>Novo segmento</Label>
            <div className="flex gap-2">
              <Input value={novo} onChange={(e) => setNovo(e.target.value)} placeholder="Ex: Equinos" />
              <Button type="submit" className="gap-2">
                <Plus size={16} /> Adicionar
              </Button>
            </div>
          </form>

          <div className="bg-card rounded-lg shadow-sm border overflow-hidden">
            <div className="p-5 border-b">
              <h3 className="font-semibold text-card-foreground">Segmentos cadastrados</h3>
            </div>
            <div className="divide-y">
              {loading && <p className="p-5 text-sm text-muted-foreground">Carregando...</p>}
              {!loading && segmentos.length === 0 && (
                <p className="p-5 text-sm text-muted-foreground">Nenhum segmento cadastrado</p>
              )}
              {!loading && segmentos.map((s) => (
                <div key={s} className="flex items-center justify-between px-5 py-3">
                  <span className="text-sm text-card-foreground">{s}</span>
                  <Button
                    variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={() => removeSegmento(s)}
                    title="Remover"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
