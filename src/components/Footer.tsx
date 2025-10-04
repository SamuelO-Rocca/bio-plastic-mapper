import React from 'react';

export function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
      © {new Date().getFullYear()} Plastic Busters — IA & Biotecnologia • MVP
    </footer>
  );
}
