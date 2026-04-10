'use client';

import React, {
  useState,
  useRef,
  ChangeEvent,
  FormEvent,
  JSX,
} from 'react';

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  marketing: boolean;
};

const emptyForm: FormState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  message: '',
  marketing: false,
};

export default function Home(): JSX.Element {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [activeCard, setActiveCard] = useState<'detailing' | 'cleaning' | null>(
    null,
  );

  const servicesRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault();

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      alert(
        data?.error ??
          'Errore durante l\'invio della richiesta. Riprova più tardi.',
      );
      return;
    }

    alert('Grazie! Ti ricontatteremo al più presto.');
    setForm(emptyForm);
  } catch (err) {
    console.error('[Contatto DSService] errore:', err);
    alert('Errore di connessione al server. Controlla la rete e riprova.');
  }
};




  const closeCard = (): void => setActiveCard(null);

  const scrollToServices = (): void => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = (): void => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#050507] text-slate-50">
      {/* NAVBAR */}
      <header className="border-b border-[#171a1d] bg-[#050507]/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-orange-500 text-xs font-black text-black">
              DS
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-slate-200">
                DSService
              </span>
              <span className="text-[0.65rem] text-slate-400">
                Detailing &amp; Cleaning
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden flex-col text-[0.65rem] text-slate-300 sm:flex">
              <span>+39 333 1234567</span>
              <span>info@dsservice.it</span>
            </div>
            <button
              onClick={scrollToContact}
              className="rounded-sm bg-orange-500 px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-wide text-black hover:bg-orange-400"
            >
              Richiedi un preventivo
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#171a1d] bg-[#050507]">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-tr from-orange-500 to-amber-400 [clip-path:polygon(0_100%,100%_60%,100%_100%,0_100%)]" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:items-center md:py-16">
          <div className="z-10 flex-1">
            <p className="text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-orange-300">
              Benvenuto in DSService
            </p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
              Detailing auto premium
              <br />
              e pulizie professionali che si notano.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
              Esperienza da showroom direttamente a casa tua o presso la tua
              azienda. Trattamenti di detailing e pulizie programmabili, nel
              rispetto delle normative italiane e svizzere sulla privacy.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-[0.75rem]">
              <button
                onClick={scrollToContact}
                className="rounded-sm bg-orange-500 px-4 py-2.5 font-semibold text-black shadow-lg shadow-orange-500/40 hover:bg-orange-400"
              >
                Prenota un appuntamento
              </button>
              <button
                onClick={scrollToServices}
                className="border border-slate-600 px-4 py-2.5 text-slate-200 hover:border-slate-400"
              >
                Scopri i servizi
              </button>
            </div>
          </div>

          {/* Logo grande */}
          <div className="z-10 flex-1">
            <div className="relative mx-auto flex h-64 max-w-md items-center justify-center overflow-hidden rounded-3xl border border-[#171a1d] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-orange-500/25 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-amber-400/30 to-transparent" />
              <div className="relative text-center">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-orange-300">
                  Premium Detailing &amp; Cleaning
                </p>
                <div className="mt-4 inline-flex items-center justify-center rounded-[1.5rem] border border-orange-400/80 bg-black/50 px-8 py-4 shadow-[0_0_40px_rgba(249,115,22,0.4)]">
                  <span className="text-3xl font-black tracking-[0.5em] text-orange-400">
                    DSSERVICE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* SERVIZI */}
      <section
        ref={servicesRef}
        className="border-b border-[#171a1d] bg-[#050507] py-10"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            I nostri servizi
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Clicca sulle card per vedere le informazioni dettagliate su car
            detailing e pulizie.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div
              className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg transition hover:border-orange-400 hover:translate-y-[-2px]"
              onClick={() => setActiveCard('detailing')}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.25em] text-slate-400">
                    Car Detailing
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-50">
                    Auto sempre da showroom
                  </h3>
                </div>
                <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[0.7rem] text-slate-200">
                  Clicca per approfondire
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                Lavaggi a mano, cura degli interni, lucidatura e protezioni per
                riportare la tua auto a uno stato da vetrina.
              </p>
            </div>

            <div
              className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg transition hover:border-orange-400 hover:translate-y-[-2px]"
              onClick={() => setActiveCard('cleaning')}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.25em] text-slate-400">
                    Pulizie
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-50">
                    Spazi puliti e accoglienti
                  </h3>
                </div>
                <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[0.7rem] text-slate-200">
                  Clicca per approfondire
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                Uffici, negozi, condomini e abitazioni sempre in ordine grazie a
                interventi programmati e squadre affidabili.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATTO */}
      <section
        ref={contactRef}
        className="bg-[#050507] py-10"
      >
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Contattaci
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Sito conforme a GDPR e LPD Svizzera: i tuoi dati saranno trattati
            solo per gestire la richiesta, secondo quanto indicato nella nostra{' '}
            <a href="/privacy" className="underline">
              informativa privacy
            </a>
            .
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-sm"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-200">
                  Nome
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  placeholder="Mario"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-200">
                  Cognome
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  placeholder="Rossi"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-200">
                  Telefono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  placeholder="+39 333 1234567"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-200">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  placeholder="nome.cognome@email.it"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-200">
                Messaggio
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                placeholder="Indica il servizio (auto, pulizie, entrambi), la zona e quando preferisci essere contattato."
              />
            </div>

            {/* Checkbox obbligatoria privacy */}
            <div className="flex items-start gap-2 text-[0.7rem] text-slate-300">
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                required
                className="mt-1 h-3 w-3 rounded border-slate-600 bg-slate-900"
                onChange={() => {}}
              />
              <label htmlFor="privacy">
                Ho letto l&apos;
                <a href="/privacy" className="underline">
                  informativa privacy
                </a>{' '}
                e acconsento al trattamento dei dati per la gestione della mia
                richiesta.
              </label>
            </div>

            {/* Checkbox opzionale marketing */}
            <div className="flex items-start gap-2 text-[0.7rem] text-slate-300">
              <input
                type="checkbox"
                id="marketing"
                name="marketing"
                checked={form.marketing}
                onChange={handleChange}
                className="mt-1 h-3 w-3 rounded border-slate-600 bg-slate-900"
              />
              <label htmlFor="marketing">
                Acconsento a ricevere comunicazioni promozionali da DSService
                (facoltativo).
              </label>
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-sm bg-orange-500 px-4 py-2.5 text-sm font-semibold text-black shadow-lg shadow-orange-500/40 hover:bg-orange-400"
            >
              Invia richiesta
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER LEGAL */}
      <footer className="border-t border-slate-800 bg-[#050507] py-4 text-[0.7rem] text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-semibold text-slate-200">
              DSService di Davide Daniel Sahlean 
            </span>{' '}
            • Via Cadorna 381 Lipomo (CO)• P.IVA IT04210660132 •
            Iscritta al Registro Imprese di Como
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/privacy" className="hover:text-slate-200">
              Privacy
            </a>
            <a href="/cookie-policy" className="hover:text-slate-200">
              Cookie
            </a>
            <a href="/note-legali" className="hover:text-slate-200">
              Note legali / Impressum
            </a>
          </div>
        </div>
      </footer>

      {/* OVERLAY CARD */}
      {activeCard && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={closeCard}
        >
          <div
            className="relative w-[90%] max-w-lg cursor-default"
            onClick={e => e.stopPropagation()}
          >
            <div className="rounded-3xl border border-slate-700 bg-slate-900/95 p-6 shadow-2xl animate-cardIn [transform-style:preserve-3d] [transform-origin:center]">
              {activeCard === 'detailing' ? (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.25em] text-slate-400">
                        Car Detailing
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-slate-50">
                        Dettaglio servizi Car Detailing
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={closeCard}
                      className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[0.7rem] text-slate-200 hover:bg-slate-800"
                    >
                      Chiudi
                    </button>
                  </div>
                  <ul className="mt-4 space-y-1.5 text-sm text-slate-200">
                    <li>• Lavaggio esterno a mano con prelavaggio e decontaminazione.</li>
                    <li>• Pulizia approfondita interni: tessuti, pelle, plastiche, vetri.</li>
                    <li>• Lucidatura carrozzeria e protezioni (cere, sigillanti, coating).</li>
                    <li>• Pacchetti periodici per mantenere il livello nel tempo.</li>
                  </ul>
                </>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.25em] text-slate-400">
                        Pulizie
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-slate-50">
                        Dettaglio servizi Pulizie
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={closeCard}
                      className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[0.7rem] text-slate-200 hover:bg-slate-800"
                    >
                      Chiudi
                    </button>
                  </div>
                  <ul className="mt-4 space-y-1.5 text-sm text-slate-200">
                    <li>• Pulizie per uffici, negozi, condomini, abitazioni e aree comuni.</li>
                    <li>• Interventi ordinari programmati e straordinari.</li>
                    <li>• Prodotti professionali e attrezzature dedicate.</li>
                    <li>• Orari flessibili per non interferire con il lavoro o la vita domestica.</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
