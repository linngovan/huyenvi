export enum LineType {
  Yin = 0,  // Broken line (--)
  Yang = 1, // Solid line (—)
}

export interface HexagramData {
  lines: LineType[]; // Bottom to Top
}

export type AppState = 'INTRO' | 'TOSSING' | 'CALCULATING' | 'RESULT';

export interface InterpretationResponse {
  hexagramName: string;
  originalText: string; // The Han-Viet name or poetic text
  generalMeaning: string;
  career: string;
  wealth: string;
  love: string;
  family: string;
  advice: string;
}