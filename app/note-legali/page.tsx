export default function NoteLegaliPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-sm text-slate-100 bg-[#050507]">
      <h1 className="text-2xl font-bold mb-4">Note legali / Impressum</h1>

      <p className="mb-4 text-slate-300">
        Le presenti note legali regolano l’accesso e l’utilizzo del luogo web e sono fornite ai sensi della normativa italiana vigente.
        Il sito è di proprietà e gestito da una società registrata con partita IVA e iscrizione presso il Registro delle Imprese.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3 text-slate-200">Dati della società</h2>
      <ul className="mb-6 list-disc pl-5 text-slate-300">
        <li>
          <strong>Ragione sociale:</strong> TechSolutions S.r.l. (esempio: sostituisci con la tua)
        </li>
        <li>
          <strong>Sede legale:</strong> Via Milano 45, 23871 Lomagna (LC), Italia
        </li>
        <li>
          <strong>Partita IVA:</strong> IT01234567890
        </li>
        <li>
          <strong>REA:</strong> LC‑123456
        </li>
        <li>
          <strong>Registro Imprese:</strong> Lecco (LC), n. iscrizione 123456789
        </li>
        <li>
          <strong>Capitale sociale:</strong> € 10.000,00 interamente versato (esempio: adatta al tuo valore)
        </li>
        <li>
          <strong>Contatti:</strong> email@techsolutions.it — Tel. +39 039 1234567
        </li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-3 text-slate-200">Responsabilità e copyright</h2>
      <p className="mb-3 text-slate-300">
        Il contenuto del sito (testi, immagini, loghi, software, grafiche) è di proprietà esclusiva di TechSolutions S.r.l. o dei rispettivi proprietari.
        È vietata la riproduzione, anche parziale, dei contenuti senza autorizzazione scritta del titolare.
      </p>
      <p className="mb-4 text-slate-300">
        La società declina ogni responsabilità per eventuali informazioni non aggiornate o per i contenuti di siti terzi raggiunti tramite link esterni.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3 text-slate-200">Svizzera (se applicabile)</h2>
      <p className="mb-3 text-slate-300">
        In caso di attività in Svizzera, i servizi sono erogati da TechSolutions GmbH (esempio: adatta alla tua realtà) con sede in:
      </p>
      <ul className="mb-4 list-disc pl-5 text-slate-300">
        <li>
          <strong>Nominativo:</strong> TechSolutions GmbH
        </li>
        <li>
          <strong>Sede:</strong> Bahnhofstrasse 1, 8001 Zürich, Svizzera
        </li>
        <li>
          <strong>CHE‑numero:</strong> CHE‑123.456.789
        </li>
        <li>
          <strong>Contatti:</strong> info@techsolutions.ch — Tel. +41 44 123 45 67
        </li>
      </ul>

      <p className="text-slate-400">
        © {new Date().getFullYear()} TechSolutions S.r.l. Tutti i diritti riservati. Per informazioni sul trattamento dei dati personali,
        si rinvia all’apposita pagina di Privacy Policy.
      </p>
    </main>
  );
}