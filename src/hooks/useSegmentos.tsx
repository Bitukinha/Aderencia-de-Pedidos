import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SEGMENTOS as DEFAULT_SEGMENTOS } from "@/data/orders";

const hasSupabase = !!import.meta.env.VITE_SUPABASE_URL;
const LOCAL_KEY = "segmentos_local";

function loadLocal(): string[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [...DEFAULT_SEGMENTOS];
}

function saveLocal(segmentos: string[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(segmentos));
}

export function useSegmentos() {
  const [segmentos, setSegmentos] = useState<string[]>(hasSupabase ? [] : loadLocal());
  const [loading, setLoading] = useState(hasSupabase);

  const refresh = useCallback(async () => {
    if (!hasSupabase) {
      setSegmentos(loadLocal());
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.from("segmentos").select("*").order("nome");
      if (!error && data) {
        setSegmentos(data.map((r: { nome: string }) => r.nome));
      } else if (error) {
        // Tabela ainda não existe no banco (migration não aplicada): usa a lista padrão
        setSegmentos([...DEFAULT_SEGMENTOS]);
      }
    } catch {
      setSegmentos([...DEFAULT_SEGMENTOS]);
    }
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const addSegmento = async (nome: string) => {
    const trimmed = nome.trim();
    if (!trimmed || segmentos.includes(trimmed)) return;

    if (hasSupabase) {
      try {
        const { error } = await supabase.from("segmentos").insert([{ nome: trimmed }]);
        if (error) return;
      } catch { return; }
      await refresh();
    } else {
      const updated = [...segmentos, trimmed];
      setSegmentos(updated);
      saveLocal(updated);
    }
  };

  const removeSegmento = async (nome: string) => {
    if (hasSupabase) {
      try { await supabase.from("segmentos").delete().eq("nome", nome); } catch { /* ignore */ }
      await refresh();
    } else {
      const updated = segmentos.filter((s) => s !== nome);
      setSegmentos(updated);
      saveLocal(updated);
    }
  };

  return { segmentos, loading, addSegmento, removeSegmento };
}
