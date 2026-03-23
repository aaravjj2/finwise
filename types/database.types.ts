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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      badges: {
        Row: {
          created_at: string
          description_key: string
          icon_emoji: string
          id: string
          name_key: string
          slug: string
        }
        Insert: {
          created_at?: string
          description_key: string
          icon_emoji: string
          id?: string
          name_key: string
          slug: string
        }
        Update: {
          created_at?: string
          description_key?: string
          icon_emoji?: string
          id?: string
          name_key?: string
          slug?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_entries: {
        Row: {
          amount: number
          category: string
          created_at: string
          currency: string
          date: string
          description: string | null
          id: string
          synced: boolean
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          currency?: string
          date: string
          description?: string | null
          id?: string
          synced?: boolean
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          currency?: string
          date?: string
          description?: string | null
          id?: string
          synced?: boolean
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      institutions: {
        Row: {
          accepts_first_time_borrowers: boolean
          country_code: string
          created_at: string
          description: string
          id: string
          interest_rate_max: number | null
          interest_rate_min: number | null
          logo_url: string | null
          name: string
          phone: string | null
          requires_collateral: boolean
          type: string
          verified: boolean
          website: string | null
        }
        Insert: {
          accepts_first_time_borrowers?: boolean
          country_code: string
          created_at?: string
          description: string
          id?: string
          interest_rate_max?: number | null
          interest_rate_min?: number | null
          logo_url?: string | null
          name: string
          phone?: string | null
          requires_collateral?: boolean
          type: string
          verified?: boolean
          website?: string | null
        }
        Update: {
          accepts_first_time_borrowers?: boolean
          country_code?: string
          created_at?: string
          description?: string
          id?: string
          interest_rate_max?: number | null
          interest_rate_min?: number | null
          logo_url?: string | null
          name?: string
          phone?: string | null
          requires_collateral?: boolean
          type?: string
          verified?: boolean
          website?: string | null
        }
        Relationships: []
      }
      learning_modules: {
        Row: {
          created_at: string
          description_key: string
          difficulty: number
          estimated_minutes: number
          icon_emoji: string
          id: string
          order_index: number
          prerequisites: string[]
          slug: string
          title_key: string
        }
        Insert: {
          created_at?: string
          description_key: string
          difficulty: number
          estimated_minutes: number
          icon_emoji: string
          id?: string
          order_index: number
          prerequisites?: string[]
          slug: string
          title_key: string
        }
        Update: {
          created_at?: string
          description_key?: string
          difficulty?: number
          estimated_minutes?: number
          icon_emoji?: string
          id?: string
          order_index?: number
          prerequisites?: string[]
          slug?: string
          title_key?: string
        }
        Relationships: []
      }
      lesson_content: {
        Row: {
          audio_url: string | null
          content: string
          created_at: string
          id: string
          language: string
          lesson_id: string
          title: string
        }
        Insert: {
          audio_url?: string | null
          content: string
          created_at?: string
          id?: string
          language: string
          lesson_id: string
          title: string
        }
        Update: {
          audio_url?: string | null
          content?: string
          created_at?: string
          id?: string
          language?: string
          lesson_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_content_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          created_at: string
          estimated_minutes: number
          id: string
          module_id: string
          order_index: number
          slug: string
          title_key: string
        }
        Insert: {
          created_at?: string
          estimated_minutes?: number
          id?: string
          module_id: string
          order_index: number
          slug: string
          title_key: string
        }
        Update: {
          created_at?: string
          estimated_minutes?: number
          id?: string
          module_id?: string
          order_index?: number
          slug?: string
          title_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "learning_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          audio_url: string | null
          card_data: Json | null
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          audio_url?: string | null
          card_data?: Json | null
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          audio_url?: string | null
          card_data?: Json | null
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          created_at: string
          id: string
          lesson_id: string
          questions: Json
        }
        Insert: {
          created_at?: string
          id?: string
          lesson_id: string
          questions?: Json
        }
        Update: {
          created_at?: string
          id?: string
          lesson_id?: string
          questions?: Json
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: true
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      remittance_providers: {
        Row: {
          created_at: string
          exchange_rate_markup: number
          fee_percentage: number
          flat_fee: number | null
          id: string
          name: string
          receive_countries: string[]
          send_countries: string[]
          transfer_time: string
          website: string
        }
        Insert: {
          created_at?: string
          exchange_rate_markup?: number
          fee_percentage: number
          flat_fee?: number | null
          id?: string
          name: string
          receive_countries: string[]
          send_countries: string[]
          transfer_time: string
          website: string
        }
        Update: {
          created_at?: string
          exchange_rate_markup?: number
          fee_percentage?: number
          flat_fee?: number | null
          id?: string
          name?: string
          receive_countries?: string[]
          send_countries?: string[]
          transfer_time?: string
          website?: string
        }
        Relationships: []
      }
      savings_circles: {
        Row: {
          contribution_amount: number
          created_at: string
          creator_id: string | null
          currency_code: string | null
          current_cycle: number | null
          id: string
          invite_code: string | null
          max_members: number | null
          name: string
          period: string
          status: string | null
        }
        Insert: {
          contribution_amount: number
          created_at?: string
          creator_id?: string | null
          currency_code?: string | null
          current_cycle?: number | null
          id?: string
          invite_code?: string | null
          max_members?: number | null
          name: string
          period: string
          status?: string | null
        }
        Update: {
          contribution_amount?: number
          created_at?: string
          creator_id?: string | null
          currency_code?: string | null
          current_cycle?: number | null
          id?: string
          invite_code?: string | null
          max_members?: number | null
          name?: string
          period?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "savings_circles_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      savings_goals: {
        Row: {
          completed: boolean
          created_at: string
          currency: string
          current_amount: number
          id: string
          name: string
          target_amount: number
          target_date: string | null
          type: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          currency?: string
          current_amount?: number
          id?: string
          name: string
          target_amount: number
          target_date?: string | null
          type: string
          user_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          currency?: string
          current_amount?: number
          id?: string
          name?: string
          target_amount?: number
          target_date?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "savings_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      circle_members: {
        Row: {
          circle_id: string
          has_received_payout: boolean | null
          joined_at: string | null
          payout_position: number
          total_contributed: number | null
          user_id: string
        }
        Insert: {
          circle_id: string
          has_received_payout?: boolean | null
          joined_at?: string | null
          payout_position: number
          total_contributed?: number | null
          user_id: string
        }
        Update: {
          circle_id?: string
          has_received_payout?: boolean | null
          joined_at?: string | null
          payout_position?: number
          total_contributed?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "circle_members_circle_id_fkey"
            columns: ["circle_id"]
            isOneToOne: false
            referencedRelation: "savings_circles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "circle_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      circle_contributions: {
        Row: {
          amount: number
          circle_id: string | null
          confirmed_by: string[] | null
          created_at: string | null
          cycle: number
          disputed: boolean | null
          from_user_id: string | null
          id: string
          to_user_id: string | null
        }
        Insert: {
          amount: number
          circle_id?: string | null
          confirmed_by?: string[] | null
          created_at?: string | null
          cycle: number
          disputed?: boolean | null
          from_user_id?: string | null
          id?: string
          to_user_id?: string | null
        }
        Update: {
          amount?: number
          circle_id?: string | null
          confirmed_by?: string[] | null
          created_at?: string | null
          cycle?: number
          disputed?: boolean | null
          from_user_id?: string | null
          id?: string
          to_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "circle_contributions_circle_id_fkey"
            columns: ["circle_id"]
            isOneToOne: false
            referencedRelation: "savings_circles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "circle_contributions_from_user_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "circle_contributions_to_user_id_fkey"
            columns: ["to_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          lesson_id: string
          quiz_score: number | null
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id: string
          quiz_score?: number | null
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id?: string
          quiz_score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          country: string
          created_at: string
          currency: string
          has_bank_account: boolean
          id: string
          language: string
          literacy_description: string | null
          literacy_level: number
          monthly_income: number | null
          name: string | null
          onboarding_completed: boolean
          phone: string
          primary_goal: string | null
          updated_at: string
        }
        Insert: {
          country?: string
          created_at?: string
          currency?: string
          has_bank_account?: boolean
          id?: string
          language?: string
          literacy_description?: string | null
          literacy_level?: number
          monthly_income?: number | null
          name?: string | null
          onboarding_completed?: boolean
          phone: string
          primary_goal?: string | null
          updated_at?: string
        }
        Update: {
          country?: string
          created_at?: string
          currency?: string
          has_bank_account?: boolean
          id?: string
          language?: string
          literacy_description?: string | null
          literacy_level?: number
          monthly_income?: number | null
          name?: string | null
          onboarding_completed?: boolean
          phone?: string
          primary_goal?: string | null
          updated_at?: string
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
