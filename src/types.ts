// src/types.ts
export interface Mahasiswa {
  NIM: string;
  Name: string;
  Gender: 'L' | 'P';
  BirthDate: string; // ISO date string format "YYYY-MM-DD"
  Address: string;
  Contact: string;
  Status: boolean;
}