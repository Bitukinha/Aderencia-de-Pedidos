import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type DelayedOrder, MESES, SEGMENTOS } from "@/data/orders";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (order: DelayedOrder) => void;
  order?: DelayedOrder | null;
}

const currentYear = new Date().getFullYear();

const emptyOrder: DelayedOrder = {
  cliente: "",
  produto: "",
  quantidade: "",
  dataPrevista: "",
  dataEntregue: "",
  diasAtraso: 0,
  motivo: "",
  mes: "Janeiro",
  ano: currentYear,
  segmento: "",
};

export function OrderFormDialog({ open, onClose, onSave, order }: Props) {
  const [form, setForm] = useState<DelayedOrder>(emptyOrder);

  useEffect(() => {
    setForm(order ?? emptyOrder);
  }, [order, open]);

  const set = (field: keyof DelayedOrder, value: string | number) =>
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if ((field === "dataPrevista" || field === "dataEntregue") && updated.dataPrevista && updated.dataEntregue) {
        const prevista = new Date(updated.dataPrevista);
        const entregue = new Date(updated.dataEntregue);
        if (!isNaN(prevista.getTime()) && !isNaN(entregue.getTime())) {
          updated.diasAtraso = Math.max(0, Math.round((entregue.getTime() - prevista.getTime()) / 86400000));
        }
      }
      return updated;
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.cliente || !form.produto || !form.dataPrevista || !form.motivo) return;
    onSave(form);
    onClose();
  };

  const selectClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{order ? "Editar Pedido" : "Novo Pedido Atrasado"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Cliente</Label>
              <Input value={form.cliente} onChange={(e) => set("cliente", e.target.value)} placeholder="Nome do cliente" required />
            </div>
            <div className="space-y-1.5">
              <Label>Segmento</Label>
              <select value={form.segmento} onChange={(e) => set("segmento", e.target.value)} className={selectClass}>
                <option value="">Selecione...</option>
                {SEGMENTOS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Produto</Label>
              <Input value={form.produto} onChange={(e) => set("produto", e.target.value)} placeholder="Nome do produto" required />
            </div>
            <div className="space-y-1.5">
              <Label>Quantidade</Label>
              <Input value={form.quantidade} onChange={(e) => set("quantidade", e.target.value)} placeholder="Ex: 14.000" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Mês</Label>
              <select value={form.mes} onChange={(e) => set("mes", e.target.value)} className={selectClass}>
                {MESES.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Ano</Label>
              <Input type="number" min={2020} max={2030} value={form.ano} onChange={(e) => set("ano", Number(e.target.value))} required />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Data Prevista</Label>
              <Input type="date" value={form.dataPrevista} onChange={(e) => set("dataPrevista", e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>Data Entregue</Label>
              <Input type="date" value={form.dataEntregue} onChange={(e) => set("dataEntregue", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Dias Atraso</Label>
              <Input
                type="number" min={0} value={form.diasAtraso}
                onChange={(e) => set("diasAtraso", Number(e.target.value))}
                readOnly={!!(form.dataPrevista && form.dataEntregue)}
                className={form.dataPrevista && form.dataEntregue ? "bg-muted cursor-not-allowed" : ""}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Motivo</Label>
            <Input value={form.motivo} onChange={(e) => set("motivo", e.target.value)} placeholder="Motivo do atraso" required />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">{order ? "Salvar" : "Incluir"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
