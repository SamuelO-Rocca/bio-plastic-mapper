import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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

type DegradationMeasure = {
  id: string;
  date: string;
  plasticAmount: number;
  fungusAmount: number;
  fungusType: string;
  degradationRate: number;
};

export default function Index() {
  const [route, setRoute] = useState('home');
  const [dark, setDark] = useState(true);

  const [selectedPlastic, setSelectedPlastic] = useState<PlasticData>({
    scientificName: 'PET (polietileno tereftalato)',
    commonName: 'PET',
    molecularStructure: '—(O-CH2-CH2-O-CO-C6H4-CO)-',
    formula: 'C10H8O4',
    application: 'Garrafas, embalagens',
    deteriorationTime: '≈ 450 anos'
  });

  const [selectedFungus, setSelectedFungus] = useState<FungusData>({
    scientificName: 'Ideafungus plasticae',
    taxonomy: 'Fungi > Basidiomycota',
    enzyme: 'Plastase-A',
    degradation: 'Alta',
    maturation: '6 semanas'
  });

  const [plasticPreview, setPlasticPreview] = useState<string | null>(null);
  const [fungusPreview, setFungusPreview] = useState<string | null>(null);
  
  // Dashboard degradation data
  const [degradationMeasures, setDegradationMeasures] = useState<DegradationMeasure[]>([]);
  const [newMeasure, setNewMeasure] = useState({
    plasticAmount: '',
    fungusAmount: '',
    fungusType: '',
    degradationRate: ''
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
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

  function Home() {
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
                <div className="mt-2 font-semibold text-foreground">Oceano Pacífico</div>
                <div className="text-sm text-primary">120,000 un</div>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="text-sm text-muted-foreground">Maior potencial de fungos</div>
                <div className="mt-2 font-semibold text-foreground">Basidiomycota</div>
                <div className="text-sm text-primary">92% eficácia</div>
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
              Nossa solução combina ingestão de dados, processamento analítico e aplicação de fungos com habilidade comprovada para degradar polímeros comuns.
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
              alert('Dados salvos com sucesso!');
            }}
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nome Científico / Técnico
              </label>
              <input
                value={selectedPlastic.scientificName}
                onChange={(e) => setSelectedPlastic({ ...selectedPlastic, scientificName: e.target.value })}
                className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nome Popular
              </label>
              <input
                value={selectedPlastic.commonName}
                onChange={(e) => setSelectedPlastic({ ...selectedPlastic, commonName: e.target.value })}
                className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Estrutura Molecular
              </label>
              <textarea
                value={selectedPlastic.molecularStructure}
                onChange={(e) => setSelectedPlastic({ ...selectedPlastic, molecularStructure: e.target.value })}
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
                  value={selectedPlastic.formula}
                  onChange={(e) => setSelectedPlastic({ ...selectedPlastic, formula: e.target.value })}
                  className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Aplicação
                </label>
                <input
                  value={selectedPlastic.application}
                  onChange={(e) => setSelectedPlastic({ ...selectedPlastic, application: e.target.value })}
                  className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tempo de Deteriorização
              </label>
              <input
                value={selectedPlastic.deteriorationTime}
                onChange={(e) => setSelectedPlastic({ ...selectedPlastic, deteriorationTime: e.target.value })}
                className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Imagem
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
                onClick={() => alert('Exportação em desenvolvimento')}
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
              alert('Dados salvos com sucesso!');
            }}
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nome Científico
              </label>
              <input
                value={selectedFungus.scientificName}
                onChange={(e) => setSelectedFungus({ ...selectedFungus, scientificName: e.target.value })}
                className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Taxonomia
              </label>
              <input
                value={selectedFungus.taxonomy}
                onChange={(e) => setSelectedFungus({ ...selectedFungus, taxonomy: e.target.value })}
                className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Enzima
                </label>
                <input
                  value={selectedFungus.enzyme}
                  onChange={(e) => setSelectedFungus({ ...selectedFungus, enzyme: e.target.value })}
                  className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Degradação
                </label>
                <input
                  value={selectedFungus.degradation}
                  onChange={(e) => setSelectedFungus({ ...selectedFungus, degradation: e.target.value })}
                  className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Maturação
              </label>
              <input
                value={selectedFungus.maturation}
                onChange={(e) => setSelectedFungus({ ...selectedFungus, maturation: e.target.value })}
                className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Imagem
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
                onClick={() => alert('Exportação em desenvolvimento')}
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

  function MapPlaceholder() {
    return (
      <section className="pt-28 pb-20 px-4 min-h-screen">
        <div className="max-w-6xl mx-auto bg-card border border-border rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Mapa de Monitoramento</h2>
          <p className="text-muted-foreground mb-6">
            Visualização geoespacial de pontos de coleta de microplásticos ao redor do mundo.
          </p>
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center border border-border">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <div className="text-lg font-medium">Mapa Interativo</div>
              <div className="text-sm text-muted-foreground mt-2">Funcionalidade completa disponível em breve</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function Dashboard() {
    const addMeasure = (e: React.FormEvent) => {
      e.preventDefault();
      
      const measure: DegradationMeasure = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('pt-BR'),
        plasticAmount: parseFloat(newMeasure.plasticAmount),
        fungusAmount: parseFloat(newMeasure.fungusAmount),
        fungusType: newMeasure.fungusType,
        degradationRate: parseFloat(newMeasure.degradationRate)
      };
      
      setDegradationMeasures([...degradationMeasures, measure]);
      setNewMeasure({ plasticAmount: '', fungusAmount: '', fungusType: '', degradationRate: '' });
    };

    const removeMeasure = (id: string) => {
      setDegradationMeasures(degradationMeasures.filter(m => m.id !== id));
    };

    return (
      <section className="pt-28 pb-20 px-4 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Dashboard Analítico</h2>
            <p className="text-muted-foreground mb-8">
              Análise de degradação de plástico através da ação de fungos
            </p>

            {/* Formulário de inserção */}
            <div className="bg-muted/50 border border-border rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Adicionar Nova Medição</h3>
              <form onSubmit={addMeasure} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Plástico (kg)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newMeasure.plasticAmount}
                    onChange={(e) => setNewMeasure({ ...newMeasure, plasticAmount: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Fungo (g)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newMeasure.fungusAmount}
                    onChange={(e) => setNewMeasure({ ...newMeasure, fungusAmount: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tipo de Fungo
                  </label>
                  <input
                    type="text"
                    required
                    value={newMeasure.fungusType}
                    onChange={(e) => setNewMeasure({ ...newMeasure, fungusType: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="Ex: Aspergillus"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Taxa Degradação (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    required
                    value={newMeasure.degradationRate}
                    onChange={(e) => setNewMeasure({ ...newMeasure, degradationRate: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="0.0"
                  />
                </div>
                
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity text-sm"
                  >
                    Adicionar
                  </button>
                </div>
              </form>
            </div>

            {/* Gráfico de degradação */}
            {degradationMeasures.length > 0 ? (
              <div className="space-y-6">
                <div className="bg-background border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Gráfico de Capacidade de Degradação</h3>
                  
                  {/* Chart visual representation */}
                  <div className="h-64 flex items-end gap-2 border-b border-l border-border pb-2 pl-2 mb-4">
                    {degradationMeasures.map((measure, idx) => (
                      <div key={measure.id} className="flex-1 flex flex-col items-center gap-2">
                        <div className="text-xs text-muted-foreground font-medium">
                          {measure.degradationRate}%
                        </div>
                        <div 
                          className="w-full bg-gradient-to-t from-primary to-accent rounded-t-md transition-all hover:opacity-80 cursor-pointer"
                          style={{ height: `${(measure.degradationRate / 100) * 100}%` }}
                          title={`${measure.fungusType}: ${measure.degradationRate}%`}
                        />
                        <div className="text-xs text-muted-foreground text-center">
                          <div className="font-medium truncate max-w-[80px]">{measure.fungusType}</div>
                          <div>{measure.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-t from-primary to-accent rounded" />
                      <span className="text-muted-foreground">Taxa de Degradação</span>
                    </div>
                  </div>
                </div>

                {/* Tabela de medições */}
                <div className="bg-background border border-border rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left p-4 text-sm font-semibold text-foreground">Data</th>
                          <th className="text-left p-4 text-sm font-semibold text-foreground">Tipo de Fungo</th>
                          <th className="text-right p-4 text-sm font-semibold text-foreground">Plástico (kg)</th>
                          <th className="text-right p-4 text-sm font-semibold text-foreground">Fungo (g)</th>
                          <th className="text-right p-4 text-sm font-semibold text-foreground">Degradação (%)</th>
                          <th className="text-right p-4 text-sm font-semibold text-foreground">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {degradationMeasures.map((measure) => (
                          <tr key={measure.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                            <td className="p-4 text-sm text-foreground">{measure.date}</td>
                            <td className="p-4 text-sm text-foreground font-medium">{measure.fungusType}</td>
                            <td className="p-4 text-sm text-foreground text-right">{measure.plasticAmount.toFixed(2)}</td>
                            <td className="p-4 text-sm text-foreground text-right">{measure.fungusAmount.toFixed(2)}</td>
                            <td className="p-4 text-sm text-right">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                                {measure.degradationRate.toFixed(1)}%
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => removeMeasure(measure.id)}
                                className="text-sm text-destructive hover:text-destructive/80 transition-colors font-medium"
                              >
                                Remover
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Estatísticas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-background border border-border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Total de Medições</div>
                    <div className="text-2xl font-bold text-foreground">{degradationMeasures.length}</div>
                  </div>
                  <div className="bg-background border border-border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Plástico Total (kg)</div>
                    <div className="text-2xl font-bold text-foreground">
                      {degradationMeasures.reduce((sum, m) => sum + m.plasticAmount, 0).toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-background border border-border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Fungo Total (g)</div>
                    <div className="text-2xl font-bold text-foreground">
                      {degradationMeasures.reduce((sum, m) => sum + m.fungusAmount, 0).toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-background border border-border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Degradação Média (%)</div>
                    <div className="text-2xl font-bold text-primary">
                      {(degradationMeasures.reduce((sum, m) => sum + m.degradationRate, 0) / degradationMeasures.length).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-muted/30 border-2 border-dashed border-border rounded-xl p-12 text-center">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma medição registrada</h3>
                <p className="text-sm text-muted-foreground">
                  Adicione medições de plástico e fungos para visualizar o gráfico de capacidade de degradação
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <Header route={route} setRoute={setRoute} dark={dark} setDark={setDark} />

      <main>
        {route === 'home' && <Home />}
        {route === 'about' && <About />}
        {route === 'map' && <MapPlaceholder />}
        {route === 'dashboard' && <Dashboard />}
        {route === 'plastico' && <PlasticoForm />}
        {route === 'fungos' && <FungosForm />}
      </main>

      <Footer />
    </div>
  );
}
