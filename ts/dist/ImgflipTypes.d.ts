export interface Free {
    boxes?: any[];
    font?: string;
    max_font_size?: number;
    memes?: any[];
    no_watermark?: boolean;
    password: string;
    template_id: string;
    text0?: string;
    text1?: string;
    username: string;
}
export interface FreeLoadMatch {
    type?: string;
}
export interface FreeCreateData {
    boxes?: any[];
    font?: string;
    max_font_size?: number;
    memes?: any[];
    no_watermark?: boolean;
    password: string;
    template_id: string;
    text0?: string;
    text1?: string;
    username: string;
}
export interface Premium {
    boxes: any[];
    font?: string;
    include_nsfw?: number;
    max_font_size?: number;
    meme?: any;
    memes?: any[];
    model?: string;
    no_watermark?: boolean;
    password: string;
    prefix_text?: string;
    query: string;
    template_id?: string;
    text: string;
    type?: string;
    username: string;
}
export interface PremiumCreateData {
    boxes: any[];
    font?: string;
    include_nsfw?: number;
    max_font_size?: number;
    meme?: any;
    memes?: any[];
    model?: string;
    no_watermark?: boolean;
    password: string;
    prefix_text?: string;
    query: string;
    template_id: string;
    text: string;
    type?: string;
    username: string;
}
