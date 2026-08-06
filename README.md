# Speso — decidi le cene, la lista si scrive da sola

App a file singolo per cucina e spesa: decidi le cene della settimana e la lista
si compila da sola, ordinata secondo le corsie del tuo supermercato. Nessuna libreria, nessun build, nessun server.
Tutti i dati restano sul dispositivo di chi la usa.

L'unica risorsa esterna sono i caratteri, presi da Google Fonts al primo
avvio e poi tenuti in cache dal service worker: offline continuano a
funzionare. Se non arrivano, l'app usa i caratteri di sistema.

## Online

1. Il repo è [Spidahh/Speso](https://github.com/Spidahh/Speso).
2. I file stanno nella radice del repo.
3. Vai su **Settings → Pages**.
4. In *Source* scegli `Deploy from a branch`, branch `main`, cartella `/ (root)`.
5. L'indirizzo è **https://spidahh.github.io/Speso/**

## Da telefono

Apri l'indirizzo in Safari o Chrome, poi *Aggiungi a schermata Home*.
Da lì si comporta come un'app: si apre a schermo intero e ricorda i tuoi dati.

## Dove sono salvati i dati

In `localStorage`, cioè nel browser del telefono. Non escono da lì e non finiscono
su nessun server. Se cancelli i dati del sito, riparti da zero.

## Come è fatta

- `index.html` contiene tutto: struttura, stile e logica in JavaScript senza librerie.
- L'elenco dei prodotti è nell'array `PRODOTTI`.
- L'elenco delle cene è nell'array `CENE`.

Per aggiungere una cena, copia una riga esistente e cambia i campi:

```js
{id:'x1', n:'Nome della cena', m:15, cat:'uova', ff:false, ing:['uova','patate']}
```

- `m` sono i minuti (`0` se non si accende niente)
- `cat` è la categoria, obbligatoria. Vale una fra: `carne`, `pasta`, `uova`,
  `etnico`, `verdure`, `formaggi`, `fredde`, `riso`, `legumi`, `patate`,
  `pesce`, `forno`, `zuppe`
- `stop` si mette **solo** se devi passare in bottega, e vale `'macellaio'`,
  `'caseificio'`, `'panificio'` o `'pescheria'`. Se non ti fermi, ometti il campo
- `ff` a `true` se si fa in friggitrice ad aria
- `ing` sono gli `id` presi da `PRODOTTI`

Se fra gli ingredienti c'è roba del giorno (carne, pesce, mozzarella, focaccia)
la cena deve dichiarare la `stop` corrispondente: è così che l'app sa avvisarti
di fermarti e non ti mette quella roba nella spesa in anticipo.

Il procedimento va aggiunto in `PROC`, con la stessa `id` della cena.

## File del progetto

| File | A cosa serve |
|---|---|
| `index.html` | L'app intera |
| `manifest.json` | Installazione come app sul telefono |
| `sw.js` | Funzionamento offline |
| `icona.svg` | Icona dell'app (browser e Android) |
| `logotipo.svg` | Il nome, usato nell'intestazione |
| `marchio-completo.svg` | Simbolo e nome insieme |
| `foto/` | Le 10 fotografie dei piatti, per categoria |
| `branding/` | Il materiale originale del marchio |
| `marchio.svg` | Marchio nudo, usato nell'intestazione |
| `icona-180.png` | Icona sulla schermata Home di iPhone e iPad |
| `icona-512.png` | Icona grande per Android |

## Sincronizzare fra telefono e PC (facoltativo)

Serve un progetto Supabase. Crea la tabella con questa query nell'SQL Editor:

```sql
create table cucina_stato (   -- nome storico: non cambiarlo o perdi i dati già sincronizzati
  id text primary key,
  dati jsonb not null,
  aggiornato timestamptz default now()
);

alter table cucina_stato enable row level security;

create policy "accesso libero" on cucina_stato
  for all using (true) with check (true);
```

Poi in app: **⚙ Opzioni → Sincronizza**, incolla l'indirizzo del progetto e la chiave
anon, salva, e usa *Carica* dal dispositivo aggiornato e *Scarica* sull'altro.

Nota: con questa policy chiunque abbia la chiave anon può leggere e scrivere quella
tabella. Vanno bene per dati come questi; non metterci altro.

## Identità

Marchio, colori e caratteri vengono da `branding-speso.svg`.

| Ruolo | Colore |
|---|---|
| Verde scuro — marchio, carta di stasera | `#283A2A` |
| Oliva — conferme, avanzamento | `#6D7633` |
| Terracotta — finito, allarmi | `#CD591E` |
| Ambra — poco, attenzione | `#E4AC55` |
| Grigio caldo — testo secondario | `#7A725E` |
| Guscio — pastiglie | `#F1E9E0` |
| Crema — sfondo | `#FAF5EF` |

Sono le variabili CSS in cima a `index.html`: `--bosco`, `--oliva`, `--terra`,
`--ambra`, `--pietra`, `--guscio`, `--crema`.

Caratteri: **Sora** per i titoli, **Inter** per il testo.

I piatti non hanno fotografie: al loro posto c'è una pastiglia con un'emoji
scelta dagli ingredienti e colorata per categoria (`EMOJI_ING` e `COLORE_CAT`).

Sotto i 900 px di larghezza il menù sta in basso, sopra passa di lato.

## Cosa fa, in breve

**Stasera** — cosa mangi oggi, se ti devi fermare da qualche parte, avanzi da finire,
cosa è di stagione, quale festa sta arrivando, e il piano della settimana.

**Lista** — la spesa raggruppata per reparto, nell'ordine delle corsie del tuo
supermercato. Modalità supermercato a tutto schermo con barra di avanzamento.
Copia come testo per mandarla a qualcuno.

**Dispensa** — cosa hai, cosa scarseggia, cosa è finito, da quanti giorni una cosa
è in casa e quando controllarla. Il cestino registra cosa butti.

**Cene** — 209 piatti con procedimento, divisi in 13 categorie e per tempo di
preparazione. Ricerca su nome, ingredienti e procedimento. Modalità cucina passo
per passo con cronometro.

**Casa** — faccende ricorrenti con scadenza (bucato, lenzuola, bagno, filtri,
spazzolino) e scorte di detersivi e igiene.
