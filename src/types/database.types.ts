export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      consultations: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          phone: string
          email: string
          consultation_type: string | null
          project_type: string | null
          area: string | null
          budget: string | null
          preferred_date: string | null
          preferred_time: string | null
          message: string | null
          status: string
          admin_memo: string | null
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          phone: string
          email: string
          consultation_type?: string | null
          project_type?: string | null
          area?: string | null
          budget?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          message?: string | null
          status?: string
          admin_memo?: string | null
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          phone?: string
          email?: string
          consultation_type?: string | null
          project_type?: string | null
          area?: string | null
          budget?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          message?: string | null
          status?: string
          admin_memo?: string | null
          ip_address?: string | null
          user_agent?: string | null
        }
      }
      consultation_logs: {
        Row: {
          id: string
          consultation_id: string
          created_at: string
          previous_status: string | null
          new_status: string | null
          memo: string | null
          admin_email: string | null
        }
        Insert: {
          id?: string
          consultation_id: string
          created_at?: string
          previous_status?: string | null
          new_status?: string | null
          memo?: string | null
          admin_email?: string | null
        }
        Update: {
          id?: string
          consultation_id?: string
          created_at?: string
          previous_status?: string | null
          new_status?: string | null
          memo?: string | null
          admin_email?: string | null
        }
      }
      news: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          category: string
          content: string | null
          thumbnail_url: string | null
          is_notice: boolean
          is_published: boolean
          published_at: string
          views: number
          meta_description: string | null
          slug: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          category: string
          content?: string | null
          thumbnail_url?: string | null
          is_notice?: boolean
          is_published?: boolean
          published_at?: string
          views?: number
          meta_description?: string | null
          slug?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          category?: string
          content?: string | null
          thumbnail_url?: string | null
          is_notice?: boolean
          is_published?: boolean
          published_at?: string
          views?: number
          meta_description?: string | null
          slug?: string | null
        }
      }
      journals: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          category: string
          location: string | null
          progress_status: string | null
          description: string | null
          content: string | null
          thumbnail_url: string | null
          is_published: boolean
          published_at: string
          slug: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          category: string
          location?: string | null
          progress_status?: string | null
          description?: string | null
          content?: string | null
          thumbnail_url?: string | null
          is_published?: boolean
          published_at?: string
          slug?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          category?: string
          location?: string | null
          progress_status?: string | null
          description?: string | null
          content?: string | null
          thumbnail_url?: string | null
          is_published?: boolean
          published_at?: string
          slug?: string | null
        }
      }
      journal_images: {
        Row: {
          id: string
          journal_id: string
          image_url: string
          caption: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          journal_id: string
          image_url: string
          caption?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          journal_id?: string
          image_url?: string
          caption?: string | null
          sort_order?: number
          created_at?: string
        }
      }
      gallery_projects: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          category: string
          sub_category: string | null
          location: string | null
          area: string | null
          description: string | null
          thumbnail_url: string | null
          is_published: boolean
          sort_order: number
          page_type: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          category: string
          sub_category?: string | null
          location?: string | null
          area?: string | null
          description?: string | null
          thumbnail_url?: string | null
          is_published?: boolean
          sort_order?: number
          page_type?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          category?: string
          sub_category?: string | null
          location?: string | null
          area?: string | null
          description?: string | null
          thumbnail_url?: string | null
          is_published?: boolean
          sort_order?: number
          page_type?: string
        }
      }
      gallery_images: {
        Row: {
          id: string
          project_id: string
          image_url: string
          caption: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          image_url: string
          caption?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          image_url?: string
          caption?: string | null
          sort_order?: number
          created_at?: string
        }
      }
      portfolios: {
        Row: {
          id: string
          created_at: string
          year: number
          title: string
          structure_type: string | null
          sort_order: number
        }
        Insert: {
          id?: string
          created_at?: string
          year: number
          title: string
          structure_type?: string | null
          sort_order?: number
        }
        Update: {
          id?: string
          created_at?: string
          year?: number
          title?: string
          structure_type?: string | null
          sort_order?: number
        }
      }
      process_steps: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          step_number: string
          title: string
          description: string | null
          image_url: string | null
          sort_order: number
          is_published: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          step_number: string
          title: string
          description?: string | null
          image_url?: string | null
          sort_order?: number
          is_published?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          step_number?: string
          title?: string
          description?: string | null
          image_url?: string | null
          sort_order?: number
          is_published?: boolean
        }
      }
      faqs: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          question: string
          answer: string
          category: string
          sort_order: number
          is_published: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          question: string
          answer: string
          category?: string
          sort_order?: number
          is_published?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          question?: string
          answer?: string
          category?: string
          sort_order?: number
          is_published?: boolean
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: string | null
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          type: string
          name: string
          description: string | null
          color: string | null
          sort_order: number
          is_active: boolean
        }
        Insert: {
          id?: string
          type: string
          name: string
          description?: string | null
          color?: string | null
          sort_order?: number
          is_active?: boolean
        }
        Update: {
          id?: string
          type?: string
          name?: string
          description?: string | null
          color?: string | null
          sort_order?: number
          is_active?: boolean
        }
      }
      media: {
        Row: {
          id: string
          created_at: string
          file_name: string
          file_url: string
          file_type: string | null
          file_size: number | null
          folder: string
          alt_text: string | null
          uploaded_by: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          file_name: string
          file_url: string
          file_type?: string | null
          file_size?: number | null
          folder?: string
          alt_text?: string | null
          uploaded_by?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          file_name?: string
          file_url?: string
          file_type?: string | null
          file_size?: number | null
          folder?: string
          alt_text?: string | null
          uploaded_by?: string | null
        }
      }
      main_page_sections: {
        Row: {
          id: string
          section_key: string
          title: string | null
          subtitle: string | null
          description: string | null
          content: Json | null
          image_url: string | null
          is_visible: boolean
          sort_order: number
          updated_at: string
        }
        Insert: {
          id?: string
          section_key: string
          title?: string | null
          subtitle?: string | null
          description?: string | null
          content?: Json | null
          image_url?: string | null
          is_visible?: boolean
          sort_order?: number
          updated_at?: string
        }
        Update: {
          id?: string
          section_key?: string
          title?: string | null
          subtitle?: string | null
          description?: string | null
          content?: Json | null
          image_url?: string | null
          is_visible?: boolean
          sort_order?: number
          updated_at?: string
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
  }
}

// Helper types
export type Consultation = Database['public']['Tables']['consultations']['Row']
export type ConsultationInsert = Database['public']['Tables']['consultations']['Insert']
export type ConsultationUpdate = Database['public']['Tables']['consultations']['Update']

export type News = Database['public']['Tables']['news']['Row']
export type NewsInsert = Database['public']['Tables']['news']['Insert']
export type NewsUpdate = Database['public']['Tables']['news']['Update']

export type Journal = Database['public']['Tables']['journals']['Row']
export type JournalInsert = Database['public']['Tables']['journals']['Insert']
export type JournalUpdate = Database['public']['Tables']['journals']['Update']

export type GalleryProject = Database['public']['Tables']['gallery_projects']['Row']
export type GalleryProjectInsert = Database['public']['Tables']['gallery_projects']['Insert']
export type GalleryProjectUpdate = Database['public']['Tables']['gallery_projects']['Update']

export type Portfolio = Database['public']['Tables']['portfolios']['Row']
export type PortfolioInsert = Database['public']['Tables']['portfolios']['Insert']
export type PortfolioUpdate = Database['public']['Tables']['portfolios']['Update']

export type ProcessStep = Database['public']['Tables']['process_steps']['Row']
export type FAQ = Database['public']['Tables']['faqs']['Row']
export type SiteSetting = Database['public']['Tables']['site_settings']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Media = Database['public']['Tables']['media']['Row']
export type MainPageSection = Database['public']['Tables']['main_page_sections']['Row']
