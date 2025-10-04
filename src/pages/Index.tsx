import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import L from 'leaflet';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

type PlasticPoint = {
  id: number;
  type: 'aquatico' | 'terrestre';
  name: string;
  lat: number;
  lon: number;
  intensity: number;
};

type FungiRecord = {
  id: string;
  scientificName: string;
  taxonomy: string;
  enzyme: string;
  degradation: string;
  maturation: string;
  image: string | null;
};

type PlasticData = {
  scientificName: string;
  commonName: string;
  molecularStructure: string;
  formula: string;
  application: string;
  deteriorationTime: string;
};

type FungusData = {
  scientificName: string;
  taxonomy: string;
  enzyme: string;
  degradation: string;
  maturation: string;
};

export default function Index() {
  const [route, setRoute] = useState('home');
  const [dark, setDark] = useState(true);

  const [showAquatico, setShowAquatico] = useState(true);
  const [showTerrestre, setShowTerrestre] = useState(true);
  const [showTemperature, setShowTemperature] = useState(false);
  const [showPressure, setShowPressure] = useState(false);

  const [plasticPoints, setPlasticPoints] = useState<PlasticPoint[]>([]);
  const [fungiRecords, setFungiRecords] = useState<FungiRecord[]>([]);
  const [selectedPlastic, setSelectedPlastic] = useState<PlasticData | null>(null);
  const [selectedFungus, setSelectedFungus] = useState<FungusData | null>(null);

  const [plasticPreview, setPlasticPreview] = useState<string | null>(null);
  const [fungusPreview, setFungusPreview] = useState<string | null>(null);

  const fungusChartData = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [{
      label: 'Isolados / Estudo',
      data: [4, 7, 12, 20, 33, 45],
      tension: 0.3,
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
    }]
  };

  const plasticChartData = {
    labels: ['PET', 'PEAD', 'PVC', 'PP', 'PS'],
    datasets: [{
      label: 'Coleta (ton)',
      data: [1200, 900, 400, 700, 220],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(239, 68, 68, 0.8)',
      ],
    }]
  };

  useEffect(() => {
    setPlasticPoints([
      { id: 1, type: 'aquatico', name: 'Frags oceânicos', lat: 36.96, lon: -122.02, intensity: 120000 },
      { id: 2, type: 'terrestre', name: 'Depósito urbano', lat: -23.55, lon: -46.63, intensity: 80000 },
      { id: 3, type: 'aquatico', name: 'Litoral Nordeste', lat: -2.53, lon: -44.30, intensity: 60000 },
      { id: 4, type: 'terrestre', name: 'Aterro controlado', lat: 51.50, lon: -0.12, intensity: 40000 }
    ]);

    setFungiRecords([
      { id: 'f1', scientificName: 'Ideafungus plasticae', taxonomy: 'Basidiomycota > Agaricomycetes', enzyme: 'Plastase-A', degradation: 'Alta', maturation: '6 semanas', image: null },
    ]);

    setSelectedPlastic({ scientificName: 'PET (polietileno tereftalato)', commonName: 'PET', molecularStructure: '—(O-CH2-CH2-O-CO-C6H4-CO)-', formula: 'C10H8O4', application: 'Garrafas, embalagens', deteriorationTime: '≈ 450 anos' });
    setSelectedFungus({ scientificName: 'Ideafungus plasticae', taxonomy: 'Fungi > Basidiomycota', enzyme: 'Plastase-A', degradation: 'Alta', maturation: '6 semanas' });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark'); else root.classList.remove('dark');
  }, [dark]);

  function onPlasticImage(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setPlasticPreview(URL.createObjectURL(f));
  }

  function onFungusImage(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFungusPreview(URL.createObjectURL(f));
  }

  function MapViewController({ points }: { points: PlasticPoint[] }) {
    const map = useMap();
    useEffect(() => {
      if (!map || points.length === 0) return;
      const avgLat = points.reduce((s, p) => s + p.lat, 0) / points.length;
      const avgLon = points.reduce((s, p) => s + p.lon, 0) / points.length;
      map.setView([avgLat, avgLon], 3);
    }, [map, points]);
    return null;
  }

  function getRegionMostPlastic() {
    if (!plasticPoints.length) return { region: 'N/A', value: 0 };
    const top = plasticPoints.reduce((a, b) => (a.intensity > b.intensity ? a : b));
    return { region: top.name, value: top.intensity };
  }

  function getRegionMostFungi() {
    if (!fungiRecords.length) return { region: 'N/A', score: 0 };
    return { region: fungiRecords[0].taxonomy, score: 92 };
  }

  function Header() {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full w-10 h-10 flex items-center justify-center bg-gradient-to-r from-primary to-accent text-white font-bold text-lg">PB</div>
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
              onClick={() => setDark(d => !d)}
              className="ml-4 px-3 py-2 rounded-md bg-white/5 text-sm hover:bg-white/10 transition-colors"
            >
              {dark ? '🌙 Escuro' : '☀️ Claro'}
            </button>
          </nav>
        </div>
      </header>
    );
  }

  function Home() {
    const topPlastic = getRegionMostPlastic();
    const topFungi = getRegionMostFungi();
    
    return (
      <section className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
              Plastic Busters
            </h1>
            <h2 className="text-2xl font-semibold text-foreground mt-2">
              Remediando o planeta com biotecnologia
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Plataforma corporativa que integra monitoramento geoespacial, bancos de dados de microplásticos e isolados fúngicos, e ferramentas analíticas para acelerar operações de biorremediação.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setRoute('map')}
                className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Ver Mapa
              </button>
              <button
                onClick={() => setRoute('dashboard')}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Dashboard
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="text-sm text-muted-foreground">Região com mais plástico</div>
                <div className="mt-2 font-semibold text-foreground">{topPlastic.region}</div>
                <div className="text-sm text-primary">{Math.round(topPlastic.value).toLocaleString()} un</div>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="text-sm text-muted-foreground">Maior potencial de fungos</div>
                <div className="mt-2 font-semibold text-foreground">{topFungi.region}</div>
                <div className="text-sm text-primary">{topFungi.score}% eficácia</div>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="text-sm text-muted-foreground">Status plataforma</div>
                <div className="mt-2 font-semibold text-foreground">MVP Ativo</div>
                <div className="text-sm text-accent">Integração: Ready</div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground">Visão Rápida</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Nossa solução combina ingestão de dados, processamento analítico e aplicação de fungos com habilidade comprovada para degradar polímeros comuns. Disponibilizamos dashboards, API para ingestão de dados e módulos de pesquisa para bioprospecção.
            </p>

            <div className="mt-6 aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center border border-border">
              <div className="text-center">
                <div className="text-4xl mb-2">🌍</div>
                <div className="text-sm text-muted-foreground">Plastic Busters Platform</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function About() {
    return (
      <section className="pt-28 pb-20 px-4 min-h-screen">
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-8">
          <h2 className="text-3xl font-semibold text-foreground">Sobre a Plastic Busters</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Empresa de biotecnologia focada em pesquisa aplicada e remediação de microplásticos. Nossos protocolos combinam isolados fúngicos, otimização enzimática e implementação em locais críticos.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-primary/10 border border-primary/20 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">Missão</h3>
              <p className="text-sm text-muted-foreground">
                Reduzir impactos de microplásticos através de soluções biotecnológicas escaláveis.
              </p>
            </div>
            <div className="p-6 bg-accent/10 border border-accent/20 rounded-lg">
              <h3 className="font-semibold text-accent mb-2">Visão</h3>
              <p className="text-sm text-muted-foreground">
                Restaurar ecossistemas costeiros e terrestres com intervenções baseadas em ciência.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-muted rounded-lg">
            <h3 className="font-semibold text-foreground mb-3">Nossos Valores</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Inovação científica e tecnológica</li>
              <li>✓ Sustentabilidade ambiental</li>
              <li>✓ Transparência e colaboração</li>
              <li>✓ Impacto mensurável e escalável</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

  function MapSection() {
    const pointsToShow = plasticPoints.filter(p =>
      (p.type === 'aquatico' && showAquatico) || (p.type === 'terrestre' && showTerrestre)
    );

    return (
      <section className="pt-28 pb-20 px-4 min-h-screen">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-4 h-[72vh]">
            <MapContainer
              center={[0, 0]}
              zoom={2}
              style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
              <MapViewController points={pointsToShow} />

              {pointsToShow.map(pt => (
                <Marker key={pt.id} position={[pt.lat, pt.lon]}>
                  <Popup>
                    <div className="text-sm">
                      <div className="font-semibold">{pt.name}</div>
                      <div>Tipo: {pt.type}</div>
                      <div>Intensidade: {pt.intensity.toLocaleString()}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <aside className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground">Controles</h3>
            
            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAquatico}
                  onChange={(e) => setShowAquatico(e.target.checked)}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm">Aquático</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showTerrestre}
                  onChange={(e) => setShowTerrestre(e.target.checked)}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm">Terrestre</span>
              </label>

              <div className="pt-4 border-t border-border">
                <div className="text-sm font-medium mb-2">Sensores</div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showTemperature}
                    onChange={(e) => setShowTemperature(e.target.checked)}
                    className="w-4 h-4 rounded border-border"
                  />
                  <span className="text-sm">Temperatura</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer mt-2">
                  <input
                    type="checkbox"
                    checked={showPressure}
                    onChange={(e) => setShowPressure(e.target.checked)}
                    className="w-4 h-4 rounded border-border"
                  />
                  <span className="text-sm">Pressão Atmosférica</span>
                </label>
              </div>

              <div className="pt-4 border-t border-border space-y-2">
                <button
                  onClick={() => alert('Executar índice: Região com maior concentração de plástico')}
                  className="w-full py-2 bg-accent text-accent-foreground rounded-md text-sm hover:opacity-90 transition-opacity"
                >
                  Índice: Maior plástico
                </button>
                <button
                  onClick={() => alert('Executar índice: Região com maior concentração de fungos')}
                  className="w-full py-2 bg-primary text-primary-foreground rounded-md text-sm hover:opacity-90 transition-opacity"
                >
                  Índice: Maior fungos
                </button>
              </div>

              <div className="pt-4 border-t border-border text-xs text-muted-foreground">
                Nota: Para heatmaps e análises históricas, conecte este painel ao seu banco de dados.
              </div>
            </div>
          </aside>
        </div>
      </section>
    );
  }

  function Dashboard() {
    return (
      <section className="pt-28 pb-20 px-4 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">Dashboard Analítico</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => document.getElementById('fungus-chart')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:opacity-90 transition-opacity"
                  >
                    Fungos
                  </button>
                  <button
                    onClick={() => document.getElementById('plastic-chart')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-3 py-1 bg-accent text-accent-foreground rounded-md text-sm hover:opacity-90 transition-opacity"
                  >
                    Plástico
                  </button>
                </div>
              </div>

              <div id="fungus-chart" className="mb-8 p-4 bg-muted rounded-lg">
                <h4 className="font-medium text-foreground mb-4">Métricas: Fungos (Crescimento Anual)</h4>
                <div className="h-64">
                  <Line data={fungusChartData} options={{ maintainAspectRatio: false, responsive: true }} />
                </div>
              </div>

              <div id="plastic-chart" className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium text-foreground mb-4">Métricas: Plástico (Coleta por Tipo)</h4>
                <div className="h-64">
                  <Bar data={plasticChartData} options={{ maintainAspectRatio: false, responsive: true }} />
                </div>
              </div>
            </div>

            <aside className="bg-card border border-border rounded-2xl p-6">
              <h4 className="font-semibold text-foreground mb-2">Ações Rápidas</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Integrações sugeridas: Postgres, exports CSV/JSON.
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => alert('Ingestão dados plástico')}
                  className="w-full py-2 bg-muted rounded-md text-sm hover:bg-muted/80 transition-colors"
                >
                  Ingestão — Plástico
                </button>
                <button
                  onClick={() => alert('Ingestão dados fungos')}
                  className="w-full py-2 bg-muted rounded-md text-sm hover:bg-muted/80 transition-colors"
                >
                  Ingestão — Fungos
                </button>
                <button
                  onClick={() => alert('Executar pipeline de análises')}
                  className="w-full py-2 bg-primary text-primary-foreground rounded-md text-sm hover:opacity-90 transition-opacity"
                >
                  Executar Análise
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    );
  }

  function PlasticoForm() {
    return (
      <section className="pt-28 pb-20 px-4 min-h-screen">
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-foreground mb-6">Ficha Técnica — Plástico</h3>
          
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Salvar plástico');
            }}
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nome Científico / Técnico
              </label>
              <input
                value={selectedPlastic?.scientificName || ''}
                onChange={(e) => setSelectedPlastic({ ...selectedPlastic!, scientificName: e.target.value })}
                className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nome Popular
              </label>
              <input
                value={selectedPlastic?.commonName || ''}
                onChange={(e) => setSelectedPlastic({ ...selectedPlastic!, commonName: e.target.value })}
                className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Estrutura Molecular
              </label>
              <textarea
                value={selectedPlastic?.molecularStructure || ''}
                onChange={(e) => setSelectedPlastic({ ...selectedPlastic!, molecularStructure: e.target.value })}
                className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Fórmula
                </label>
                <input
                  value={selectedPlastic?.formula || ''}
                  onChange={(e) => setSelectedPlastic({ ...selectedPlastic!, formula: e.target.value })}
                  className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Aplicação Comercial
                </label>
                <input
                  value={selectedPlastic?.application || ''}
                  onChange={(e) => setSelectedPlastic({ ...selectedPlastic!, application: e.target.value })}
                  className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tempo de Deteriorização
              </label>
              <input
                value={selectedPlastic?.deteriorationTime || ''}
                onChange={(e) => setSelectedPlastic({ ...selectedPlastic!, deteriorationTime: e.target.value })}
                className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Imagem do plástico
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={onPlasticImage}
                className="w-full p-3 bg-muted border border-border rounded-md"
              />
              {plasticPreview && (
                <img src={plasticPreview} alt="preview" className="mt-4 w-48 rounded-md border border-border" />
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-accent-foreground rounded-md font-medium hover:opacity-90 transition-opacity"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => alert('Exportar')}
                className="px-6 py-3 bg-muted rounded-md font-medium hover:bg-muted/80 transition-colors"
              >
                Exportar
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }

  function FungosForm() {
    return (
      <section className="pt-28 pb-20 px-4 min-h-screen">
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-foreground mb-6">Ficha Técnica — Fungos</h3>
          
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Salvar fungo');
            }}
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nome Científico
              </label>
              <input
                value={selectedFungus?.scientificName || ''}
                onChange={(e) => setSelectedFungus({ ...selectedFungus!, scientificName: e.target.value })}
                className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Taxonomia
              </label>
              <input
                value={selectedFungus?.taxonomy || ''}
                onChange={(e) => setSelectedFungus({ ...selectedFungus!, taxonomy: e.target.value })}
                className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Enzima
                </label>
                <input
                  value={selectedFungus?.enzyme || ''}
                  onChange={(e) => setSelectedFungus({ ...selectedFungus!, enzyme: e.target.value })}
                  className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Degradação
                </label>
                <input
                  value={selectedFungus?.degradation || ''}
                  onChange={(e) => setSelectedFungus({ ...selectedFungus!, degradation: e.target.value })}
                  className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Maturação
              </label>
              <input
                value={selectedFungus?.maturation || ''}
                onChange={(e) => setSelectedFungus({ ...selectedFungus!, maturation: e.target.value })}
                className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Imagem do fungo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={onFungusImage}
                className="w-full p-3 bg-muted border border-border rounded-md"
              />
              {fungusPreview && (
                <img src={fungusPreview} alt="preview" className="mt-4 w-48 rounded-md border border-border" />
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => alert('Exportar')}
                className="px-6 py-3 bg-muted rounded-md font-medium hover:bg-muted/80 transition-colors"
              >
                Exportar
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }

  function Footer() {
    return (
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
        © {new Date().getFullYear()} Plastic Busters — IA & Biotecnologia • MVP
      </footer>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <Header />

      <main>
        {route === 'home' && <Home />}
        {route === 'about' && <About />}
        {route === 'map' && <MapSection />}
        {route === 'dashboard' && <Dashboard />}
        {route === 'plastico' && <PlasticoForm />}
        {route === 'fungos' && <FungosForm />}
      </main>

      <Footer />
    </div>
  );
}
