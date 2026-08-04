# Speso

PWA personale per scegliere ricette per una persona e ottenere una lista della spesa unica, ordinata per reparto del supermercato.

## Flusso

1. Apri **Ricette** e seleziona ciò che vuoi preparare.
2. Gli ingredienti vengono uniti automaticamente in **Spesa**, le dosi vengono sommate e tutto viene diviso per reparto.
3. Da **Aggiungi prodotti** puoi inserire alimentari, prodotti per la casa, igiene o una voce libera assegnandole il reparto corretto.
4. Durante la spesa puoi spuntare le righe e rimuovere quelle completate.

Ogni ricetta è impostata per una persona. Le ricette create nell'app usano lo stesso catalogo e lo stesso flusso delle ricette incluse; possono inoltre essere modificate o eliminate.

## Struttura

- `index.html`: struttura dell'app.
- `styles.css`: interfaccia responsive.
- `src/app.js`: stato e interazioni.
- `src/catalog.js`: prodotti e ricette.
- `sw.js`: cache offline.
- `manifest.json`: installazione PWA.

Non servono build, dipendenze o servizi esterni. I dati personali restano nel `localStorage` del dispositivo.

## Avvio locale

Servi la cartella con un server HTTP, per esempio:

```powershell
python -m http.server 4173
```

Poi apri `http://127.0.0.1:4173/`.
