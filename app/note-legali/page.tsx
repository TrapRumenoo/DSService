export default function NoteLegaliPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-sm text-slate-100 bg-[#050507]">
      <h1 className="text-2xl font-bold mb-4">Note legali / Impressum</h1>
      <p className="mb-2 text-slate-300">
        Inserisci qui le informazioni di legge richieste in Italia e Svizzera:
      </p>
      <ul className="mb-4 list-disc pl-5 text-slate-300">
        <li>Ragione sociale completa</li>
        <li>Indirizzo sede legale</li>
        <li>Partita IVA, REA, Registro Imprese (Italia)</li>
        <li>Numero CHE e altri dati richiesti in Svizzera (se applicabile)</li>
        <li>Contatti (email, telefono)</li>
      </ul>
    </main>
  );
}
