export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      delayed_orders: {
        Row: {
          id: number
          cliente: string
          produto: string
          quantidade: string
          dataPrevista: string
          dataEntregue: string | null
          diasAtraso: number
          motivo: string
          mes: string
          ano: number
          segmento: string | null
          created_at: string | null
        }
        Insert: {
          id?: number
          cliente: string
          produto: string
          quantidade?: string
          dataPrevista: string
          dataEntregue?: string | null
          diasAtraso?: number
          motivo?: string
          mes: string
          ano?: number
          segmento?: string | null
          created_at?: string | null
        }
        Update: {
          id?: number
          cliente?: string
          produto?: string
          quantidade?: string
          dataPrevista?: string
          dataEntregue?: string | null
          diasAtraso?: number
          motivo?: string
          mes?: string
          ano?: number
          segmento?: string | null
          created_at?: string | null
        }
      }
      segmentos: {
        Row: {
          id: number
          nome: string
          created_at: string | null
        }
        Insert: {
          id?: number
          nome: string
          created_at?: string | null
        }
        Update: {
          id?: number
          nome?: string
          created_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
