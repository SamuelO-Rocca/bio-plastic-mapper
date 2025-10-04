import React from 'react';

type HeaderProps = {
  route: string;
  setRoute: (route: string) => void;
  dark: boolean;
  setDark: (dark: boolean) => void;
};

export function Header({ route, setRoute, dark, setDark }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full w-10 h-10 flex items-center justify-center bg-gradient-to-r from-primary to-accent text-white font-bold text-lg">
            PB
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-foreground">Plastic Busters</div>
            <div className="text-xs text-muted-foreground">IA • Biotecnologia • Remediação</div>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          {[
            { key: 'home', label: 'Home' },
            { key: 'about', label: 'Sobre' },
            { key: 'map', label: 'Mapa' },
            { key: 'dashboard', label: 'Dashboard' },
            { key: 'plastico', label: 'Plástico' },
            { key: 'fungos', label: 'Fungos' }
          ].map(r => (
            <button
              key={r.key}
              onClick={() => setRoute(r.key)}
              className={`px-3 py-2 rounded-md text-sm transition-colors ${
                route === r.key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
              }`}
            >
              {r.label}
            </button>
          ))}

          <button
            onClick={() => setDark(!dark)}
            className="ml-4 px-3 py-2 rounded-md bg-white/5 text-sm hover:bg-white/10 transition-colors"
          >
            {dark ? '🌙 Escuro' : '☀️ Claro'}
          </button>
        </nav>
      </div>
    </header>
  );
}
