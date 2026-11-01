export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      card_benefits: {
        Row: {
          body: string | null
          bullets: string[] | null
          card_id: string
          id: string
          note: string | null
          sort_order: number
          title: string
        }
        Insert: {
          body?: string | null
          bullets?: string[] | null
          card_id: string
          id?: string
          note?: string | null
          sort_order?: number
          title: string
        }
        Update: {
          body?: string | null
          bullets?: string[] | null
          card_id?: string
          id?: string
          note?: string | null
          sort_order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "card_benefits_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
        ]
      }
      card_tabs: {
        Row: {
          body: string
          id: string
          label: string
          lead: string
          sort_order: number
        }
        Insert: {
          body: string
          id: string
          label: string
          lead: string
          sort_order?: number
        }
        Update: {
          body?: string
          id?: string
          label?: string
          lead?: string
          sort_order?: number
        }
        Relationships: []
      }
      cards: {
        Row: {
          description: string
          id: string
          image: string
          image_alt: string
          more_href: string
          sort_order: number
          title: string
        }
        Insert: {
          description: string
          id: string
          image: string
          image_alt: string
          more_href: string
          sort_order?: number
          title: string
        }
        Update: {
          description?: string
          id?: string
          image?: string
          image_alt?: string
          more_href?: string
          sort_order?: number
          title?: string
        }
        Relationships: []
      }
      footer_items: {
        Row: {
          answer: string
          id: string
          question: string
          sort_order: number
        }
        Insert: {
          answer: string
          id: string
          question: string
          sort_order?: number
        }
        Update: {
          answer?: string
          id?: string
          question?: string
          sort_order?: number
        }
        Relationships: []
      }
      hero_slides: {
        Row: {
          alt: string
          headline: string | null
          id: string
          image: string
          is_active: boolean
          sort_order: number
        }
        Insert: {
          alt: string
          headline?: string | null
          id: string
          image: string
          is_active?: boolean
          sort_order?: number
        }
        Update: {
          alt?: string
          headline?: string | null
          id?: string
          image?: string
          is_active?: boolean
          sort_order?: number
        }
        Relationships: []
      }
      loan_types: {
        Row: {
          id: string
          label: string
          max_amount: number
          sort_order: number
          step: number
        }
        Insert: {
          id: string
          label: string
          max_amount: number
          sort_order?: number
          step: number
        }
        Update: {
          id?: string
          label?: string
          max_amount?: number
          sort_order?: number
          step?: number
        }
        Relationships: []
      }
      news_items: {
        Row: {
          alt: string
          date_label: string
          excerpt: string | null
          id: string
          image: string
          sort_order: number
          title: string
        }
        Insert: {
          alt: string
          date_label: string
          excerpt?: string | null
          id: string
          image: string
          sort_order?: number
          title: string
        }
        Update: {
          alt?: string
          date_label?: string
          excerpt?: string | null
          id?: string
          image?: string
          sort_order?: number
          title?: string
        }
        Relationships: []
      }
      programs: {
        Row: {
          bullets: string[] | null
          description: string
          id: string
          image: string
          image_alt: string
          more_href: string
          sort_order: number
          title: string
        }
        Insert: {
          bullets?: string[] | null
          description: string
          id: string
          image: string
          image_alt: string
          more_href: string
          sort_order?: number
          title: string
        }
        Update: {
          bullets?: string[] | null
          description?: string
          id?: string
          image?: string
          image_alt?: string
          more_href?: string
          sort_order?: number
          title?: string
        }
        Relationships: []
      }
      savings_banner: {
        Row: {
          alt: string
          id: string
          image: string
        }
        Insert: {
          alt: string
          id: string
          image: string
        }
        Update: {
          alt?: string
          id?: string
          image?: string
        }
        Relationships: []
      }
      site_texts: {
        Row: {
          key: string
          value: string
        }
        Insert: {
          key: string
          value: string
        }
        Update: {
          key?: string
          value?: string
        }
        Relationships: []
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
