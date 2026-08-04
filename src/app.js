import { PRODUCTS, RECIPES } from './catalog.js?v=11';

const STORAGE_KEY = 'speso-personale-v1';
const DEFAULT_STATE = {
  view: 'scelte',
  selectedRecipeIds: [],
  manualProductIds: [],
  customItems: [],
  checkedItemIds: [],
  completedItemIds: [],
  customRecipes: []
};

const AISLE_ORDER = ['frutta-verdura', 'pane', 'carne', 'pesce', 'latticini', 'frigo', 'colazione', 'dispensa', 'bevande', 'etnico', 'casa', 'igiene', 'altro'];
const AISLE_LABELS = {
  carne: 'Carne',
  pesce: 'Pesce',
  latticini: 'Formaggi e latticini',
  'frutta-verdura': 'Frutta e verdura',
  pane: 'Pane e prodotti da forno',
  frigo: 'Frigo e surgelati',
  colazione: 'Colazione e snack',
  dispensa: 'Dispensa',
  bevande: 'Bevande',
  etnico: 'Etnico',
  casa: 'Casa',
  igiene: 'Igiene',
  altro: 'Altro'
};

const ROUTINE_SECTIONS = [
  {
    id: 'casa',
    label: 'Casa e pulizia',
    productIds: ['lavatrice', 'ammorbidente', 'smacchiatore', 'piatti', 'lavastoviglie', 'sgrassatore', 'anticalcare', 'bagno', 'disinfettante', 'candeggina', 'pavimenti', 'vetri', 'spugne', 'guanti', 'sacchi', 'rotoloni', 'pellicola', 'alluminio', 'cartaforno', 'sacchettigelo', 'lampadine', 'pile']
  },
  {
    id: 'igiene',
    label: 'Igiene personale',
    productIds: ['cartaigienica', 'bagnoschiuma', 'shampoo', 'saponemani', 'detergenteintimo', 'dentifricio', 'spazzolino', 'collutorio', 'filointerdentale', 'deodorante', 'lamette', 'schiumabarba', 'cottonfioc', 'fazzoletti', 'cerotti', 'tachipirina']
  },
  {
    id: 'colazione',
    label: 'Colazione e snack',
    productIds: ['latte', 'yogurt', 'caffe', 'te', 'biscotti', 'cereali', 'fettebiscottate', 'marmellata', 'cremaspalmabile', 'miele', 'crackers', 'merendine', 'cioccolato', 'fruttasecca']
  },
  {
    id: 'bevande',
    label: 'Bevande',
    productIds: ['acqua', 'succhi', 'bibite', 'birra', 'vino']
  },
  {
    id: 'dispensa',
    label: 'Dispensa di base',
    productIds: ['pasta', 'spaghetti', 'orecchiette', 'riso', 'farro', 'olio', 'passata', 'pelati', 'fagioli', 'cannellini', 'ceci', 'lenticchie', 'piselli', 'tonno', 'sale', 'pepe', 'zucchero', 'farina', 'dado', 'pangrattato']
  },
  {
    id: 'freschi',
    label: 'Freschi',
    productIds: ['patate', 'cipolle', 'aglio', 'limoni', 'arance', 'pere', 'pomodori', 'pomodorini', 'zucchine', 'peperoni', 'insalata', 'carote']
  },
  {
    id: 'frigo',
    label: 'Frigo, pane e freezer',
    productIds: ['uova', 'burro', 'grana', 'mozzarella', 'scamorza', 'provola', 'cotto', 'crudo', 'mortadella', 'pane', 'focaccia', 'piadina', 'basepizza', 'verdure_surgelate', 'pizza_surgelata', 'patatine_surgelate', 'gelato']
  }
];

const RECIPE_AISLE_ORDER = AISLE_ORDER.filter(aisle => !['casa', 'igiene', 'colazione', 'bevande', 'altro'].includes(aisle));
const CATEGORY_LABELS = {
  carne: 'Carne',
  pesce: 'Pesce',
  pasta: 'Pasta',
  legumi: 'Legumi',
  zuppe: 'Zuppe',
  riso: 'Riso e cereali',
  uova: 'Uova',
  formaggi: 'Formaggi',
  verdure: 'Verdure',
  patate: 'Patate',
  forno: 'Forno e pizza',
  fredde: 'Senza cuocere',
  etnico: 'Etnico'
};

const CATEGORY_FILTERS = [
  { id: 'tutte', label: 'Tutte' },
  ...Object.entries(CATEGORY_LABELS).map(([id, label]) => ({ id, label }))
];

const INGREDIENT_FILTERS = [
  { id: 'tutti', label: 'Tutti', ingredientIds: null },
  { id: 'legumi', group: 'Legumi', label: 'Tutti i legumi', ingredientIds: ['fagioli', 'cannellini', 'ceci', 'lenticchie', 'fave', 'piselli', 'fagiolineri'] },
  { id: 'ceci', group: 'Legumi', label: 'Ceci', ingredientIds: ['ceci'] },
  { id: 'fagioli', group: 'Legumi', label: 'Fagioli e cannellini', ingredientIds: ['fagioli', 'cannellini', 'fagiolineri'] },
  { id: 'lenticchie', group: 'Legumi', label: 'Lenticchie', ingredientIds: ['lenticchie'] },
  { id: 'piselli', group: 'Legumi', label: 'Piselli', ingredientIds: ['piselli'] },
  { id: 'fave', group: 'Legumi', label: 'Fave', ingredientIds: ['fave'] },
  { id: 'pollo', group: 'Carne e pesce', label: 'Pollo e tacchino', ingredientIds: ['pollo', 'cosce', 'tacchino'] },
  { id: 'manzo', group: 'Carne e pesce', label: 'Manzo e vitello', ingredientIds: ['fettine', 'macinato', 'spezzatino', 'involtini', 'fegato'] },
  { id: 'maiale', group: 'Carne e pesce', label: 'Maiale e salumi', ingredientIds: ['salsiccia', 'braciole', 'bombette', 'costine', 'capocollo', 'crudo', 'cotto', 'mortadella', 'speck', 'pancetta', 'wurstel'] },
  { id: 'pesce', group: 'Carne e pesce', label: 'Pesce e frutti di mare', ingredientIds: ['orata', 'cozze', 'gamberi', 'calamari', 'polpo', 'seppie'] },
  { id: 'uova', group: 'Uova e formaggi', label: 'Uova', ingredientIds: ['uova'] },
  { id: 'formaggi', group: 'Uova e formaggi', label: 'Formaggi', ingredientIds: ['mozzarella', 'stracciatella', 'ricotta', 'caciocavallo', 'scamorza', 'provola', 'pecorino', 'grana', 'brie', 'feta', 'ricottaforte'] },
  { id: 'verdure', group: 'Verdure', label: 'Tutte le verdure', ingredientIds: ['pomodori', 'pomodorini', 'zucchine', 'peperoni', 'insalata', 'rucola', 'radicchio', 'carote', 'funghi', 'cicoria', 'broccoli', 'cavolfiore', 'verza', 'finocchi', 'carciofi', 'spinaci', 'fagiolini', 'asparagi', 'zucca', 'cetrioli', 'porri'] },
  { id: 'patate', group: 'Verdure', label: 'Patate', ingredientIds: ['patate'] },
  { id: 'pomodoro', group: 'Verdure', label: 'Pomodoro', ingredientIds: ['pomodori', 'pomodorini', 'passata', 'pelati'] },
  { id: 'zucchine', group: 'Verdure', label: 'Zucchine', ingredientIds: ['zucchine'] },
  { id: 'peperoni', group: 'Verdure', label: 'Peperoni', ingredientIds: ['peperoni'] },
  { id: 'funghi', group: 'Verdure', label: 'Funghi', ingredientIds: ['funghi'] },
  { id: 'broccoli', group: 'Verdure', label: 'Broccoli e cavolfiore', ingredientIds: ['broccoli', 'cavolfiore'] },
  { id: 'zucca', group: 'Verdure', label: 'Zucca', ingredientIds: ['zucca'] },
  { id: 'pasta', group: 'Pasta e cereali', label: 'Pasta', ingredientIds: ['pasta', 'spaghetti', 'orecchiette', 'noodles', 'ramen', 'udon'] },
  { id: 'riso', group: 'Pasta e cereali', label: 'Riso', ingredientIds: ['riso', 'basmati', 'risosushi'] },
  { id: 'farro', group: 'Pasta e cereali', label: 'Farro', ingredientIds: ['farro'] },
  { id: 'pane', group: 'Pasta e cereali', label: 'Pane, pizza e piadine', ingredientIds: ['pane', 'friselle', 'piadina', 'basepizza', 'tortillas'] }
];

const TIME_FILTERS = [
  { id: 'tutti', label: 'Qualsiasi', maxMinutes: null },
  { id: '15', label: 'Fino a 15 min', maxMinutes: 15 },
  { id: '30', label: 'Fino a 30 min', maxMinutes: 30 },
  { id: '45', label: 'Fino a 45 min', maxMinutes: 45 },
  { id: '60', label: 'Fino a 1 ora', maxMinutes: 60 }
];

const METHOD_FILTERS = [
  { id: 'tutti', label: 'Tutte' },
  { id: 'padella', label: 'Padella' },
  { id: 'pentola', label: 'Pentola o tegame' },
  { id: 'forno', label: 'Forno' },
  { id: 'aria', label: 'Friggitrice ad aria' },
  { id: 'freddo', label: 'Senza cottura' }
];

const SORT_FILTERS = [
  { id: 'catalogo', label: 'Catalogo' },
  { id: 'tempo-crescente', label: 'Più rapide' },
  { id: 'tempo-decrescente', label: 'Più lunghe' },
  { id: 'alfabetico', label: 'Nome A–Z' }
];

const DEFAULT_RECIPE_FILTERS = {
  category: 'tutte',
  ingredient: 'tutti',
  time: 'tutti',
  method: 'tutti',
  sort: 'catalogo'
};

const productById = new Map(PRODUCTS.map(product => [product.id, product]));
const INFERRED_INGREDIENT_RULES = [
  ['olio', /\bolio\b/i],
  ['sale', /\bsale\b/i],
  ['pepe', /\bpepe\b/i],
  ['aglio', /\baglio\b/i],
  ['limoni', /\blimone\b/i],
  ['burro', /\bburro\b/i],
  ['grana', /\bgrana\b/i],
  ['pecorino', /\bpecorino\b/i],
  ['passata', /\bpassata\b/i],
  ['pelati', /\bpelati\b/i],
  ['vino', /\bvino\b/i],
  ['aceto', /\baceto\b/i],
  ['farina', /\bfarina\b/i],
  ['pangrattato', /\bpangrattato\b/i],
  ['cipolle', /\bcipoll[ae]\b/i],
  ['pomodorini', /\bpomodorini\b/i],
  ['prezzemolo', /\bprezzemolo\b/i],
  ['basilico', /\bbasilico\b/i],
  ['origano', /\borigano\b/i],
  ['rosmarino', /\brosmarino\b/i],
  ['peperoncino', /\bpeperoncino\b/i],
  ['panna', /\bpanna\b/i],
  ['latte', /\blatte\b/i],
  ['mozzarella', /\bmozzarella\b/i],
  ['scamorza', /\bscamorza\b/i],
  ['feta', /\bfeta\b/i],
  ['olive', /\bolive\b/i],
  ['noci', /\bnoci\b/i]
];
const app = document.querySelector('#app');
const drawer = document.querySelector('#drawer');
const drawerBackdrop = document.querySelector('#drawerBackdrop');
const toast = document.querySelector('#toast');

let state = loadState();
let recipeQuery = '';
let recipeFilters = { ...DEFAULT_RECIPE_FILTERS };
let editingRecipeId = null;
let editorIngredientIds = [];
let toastTimer = null;

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function normalize(value) {
  return String(value ?? '').trim().toLocaleLowerCase('it');
}

function formatPortion(portion, multiplier = 1) {
  if (!portion) return '';
  if (portion.unit === 'q.b.') return 'q.b.';
  const amount = Number(portion.amount) * multiplier;
  if (!Number.isFinite(amount)) return '';
  return `${new Intl.NumberFormat('it-IT', { maximumFractionDigits: 1 }).format(amount)} ${portion.unit}`;
}

function uniqueStrings(value) {
  return Array.isArray(value) ? [...new Set(value.filter(item => typeof item === 'string'))] : [];
}

function sanitizeCustomRecipe(recipe) {
  if (!recipe || typeof recipe !== 'object' || !recipe.id || !recipe.name) return null;
  const minutes = Number(recipe.minutes);
  return {
    id: String(recipe.id),
    name: String(recipe.name).trim(),
    minutes: Number.isFinite(minutes) && minutes >= 0 ? minutes : 0,
    category: CATEGORY_LABELS[recipe.category] ? recipe.category : 'pasta',
    airFryer: Boolean(recipe.airFryer),
    servings: 1,
    ingredientIds: uniqueStrings(recipe.ingredientIds).filter(id => productById.has(id)),
    procedure: String(recipe.procedure ?? '').trim(),
    custom: true
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const customRecipes = Array.isArray(saved.customRecipes)
      ? saved.customRecipes.map(sanitizeCustomRecipe).filter(Boolean)
      : [];
    return {
      ...DEFAULT_STATE,
      view: ['scelte', 'ricette', 'spesa'].includes(saved.view) ? saved.view : 'scelte',
      selectedRecipeIds: uniqueStrings(saved.selectedRecipeIds),
      manualProductIds: uniqueStrings(saved.manualProductIds).filter(id => productById.has(id)),
      customItems: Array.isArray(saved.customItems)
        ? saved.customItems.filter(item => item && item.id && String(item.name || '').trim()).map(item => ({
            id: String(item.id),
            name: String(item.name).trim(),
            aisle: AISLE_LABELS[item.aisle] ? item.aisle : 'altro'
          }))
        : [],
      checkedItemIds: uniqueStrings(saved.checkedItemIds),
      completedItemIds: uniqueStrings(saved.completedItemIds),
      customRecipes
    };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function allRecipes() {
  return [...RECIPES, ...state.customRecipes];
}

function recipeIngredientIds(recipe) {
  const ids = new Set(recipe.ingredientIds);
  const text = `${recipe.name} ${recipe.procedure}`;
  INFERRED_INGREDIENT_RULES.forEach(([id, pattern]) => {
    if (productById.has(id) && pattern.test(text)) ids.add(id);
  });
  return [...ids];
}

function recipeMap() {
  return new Map(allRecipes().map(recipe => [recipe.id, recipe]));
}

function selectedRecipes() {
  const byId = recipeMap();
  return state.selectedRecipeIds.map(id => byId.get(id)).filter(Boolean);
}

function allShoppingItems({ includeCompleted = false } = {}) {
  const items = new Map();

  for (const recipe of selectedRecipes()) {
    for (const ingredientId of recipeIngredientIds(recipe)) {
      const product = productById.get(ingredientId);
      if (!product) continue;
      if (!items.has(product.id)) {
        items.set(product.id, {
          id: product.id,
          name: product.name,
          aisle: product.aisle,
          portion: product.portion,
          recipeIds: new Set(),
          manual: false,
          custom: false
        });
      }
      items.get(product.id).recipeIds.add(recipe.id);
    }
  }

  for (const productId of state.manualProductIds) {
    const product = productById.get(productId);
    if (!product) continue;
    if (!items.has(product.id)) {
      items.set(product.id, {
        id: product.id,
        name: product.name,
        aisle: product.aisle,
        portion: product.portion,
        recipeIds: new Set(),
        manual: true,
        custom: false
      });
    } else {
      items.get(product.id).manual = true;
    }
  }

  for (const item of state.customItems) {
    const id = `custom:${item.id}`;
    items.set(id, {
      id,
      name: item.name,
      aisle: AISLE_LABELS[item.aisle] ? item.aisle : 'altro',
      portion: null,
      recipeIds: new Set(),
      manual: true,
      custom: true,
      customId: item.id
    });
  }

  const completed = new Set(state.completedItemIds);
  return [...items.values()]
    .filter(item => includeCompleted || !completed.has(item.id))
    .sort((a, b) => {
      const aisle = AISLE_ORDER.indexOf(a.aisle) - AISLE_ORDER.indexOf(b.aisle);
      return aisle || a.name.localeCompare(b.name, 'it');
    });
}

function cleanState() {
  const validRecipeIds = new Set(allRecipes().map(recipe => recipe.id));
  state.selectedRecipeIds = state.selectedRecipeIds.filter(id => validRecipeIds.has(id));
  state.manualProductIds = state.manualProductIds.filter(id => productById.has(id));
  const visibleIds = new Set(allShoppingItems().map(item => item.id));
  state.checkedItemIds = state.checkedItemIds.filter(id => visibleIds.has(id));
}

function updateState(mutator) {
  mutator(state);
  cleanState();
  saveState();
  render();
}

function checkIcon() {
  return '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>';
}

function formatMinutes(minutes) {
  if (minutes === 0) return 'senza cottura';
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return `${hours} h${remainder ? ` ${remainder} min` : ''}`;
}

const ONE_POT_PASTA_IDS = new Set(['p08', 'p09', 'p10', 'p11']);
const POULTRY_IDS = new Set(['pollo', 'cosce', 'tacchino']);
const GROUND_MEAT_IDS = new Set(['macinato', 'salsiccia', 'wurstel', 'bombette']);
const FISH_IDS = new Set(['orata', 'cozze', 'gamberi', 'calamari', 'polpo', 'seppie']);

function recipePreparationStep(recipe) {
  if (recipe.category === 'pasta') {
    return ONE_POT_PASTA_IDS.has(recipe.id)
      ? 'Prepara tutti gli ingredienti prima di accendere il fuoco e tieni circa mezzo litro di acqua calda a portata di mano: servirà per cuocere e regolare la cremosità senza raffreddare il tegame.'
      : 'Metti sul fuoco una pentola con circa 1 litro d’acqua. Mentre arriva a bollore prepara e taglia tutti gli ingredienti del condimento, così la pasta non dovrà aspettare una volta scolata.';
  }
  if (recipe.category === 'uova') {
    return 'Prepara prima verdure, formaggi e salumi indicati. Rompi le uova una alla volta in una ciotola, così puoi controllarle prima di unirle o versarle in cottura.';
  }
  if (recipe.category === 'carne') {
    return 'Prepara e taglia tutti i contorni prima della carne. Asciuga la carne con carta da cucina e usa un tagliere separato; dopo averla maneggiata lava subito mani, coltello e superficie.';
  }
  if (recipe.category === 'pesce') {
    return 'Controlla che il pesce sia pulito, elimina eventuali lische e asciugalo bene. Prepara tutti gli altri ingredienti prima di iniziare: pesce e molluschi non devono aspettare in padella.';
  }
  if (recipe.category === 'riso') {
    return recipe.ingredientIds.some(id => ['basmati', 'risosushi'].includes(id))
      ? 'Sciacqua il riso in acqua fredda finché l’acqua diventa quasi limpida, poi scolalo bene. Prepara nel frattempo tutti gli ingredienti che lo accompagneranno.'
      : 'Pesa il riso e prepara tutti gli ingredienti prima di accendere il fuoco. Tieni pronta acqua calda nel caso serva correggere la cottura.';
  }
  if (recipe.category === 'verdure' || recipe.category === 'patate') {
    return 'Lava e asciuga bene le verdure. Tagliale in pezzi dello stesso spessore: pezzi uniformi cuociono insieme e non lasciano parti crude mentre altre bruciano.';
  }
  if (recipe.category === 'legumi') {
    return 'Se usi legumi in barattolo, scolali e sciacquali finché l’acqua non fa più schiuma. Prepara aromi e verdure prima di accendere il fuoco.';
  }
  if (recipe.category === 'fredde') {
    return 'Lava gli ingredienti freschi e asciugali molto bene. Taglia tutto prima di condire: sale e liquidi vanno aggiunti soltanto alla fine per non bagnare il piatto.';
  }
  if (recipe.category === 'forno') {
    return recipe.airFryer
      ? 'Prepara tutti gli ingredienti e scalda la friggitrice ad aria solo se previsto dal suo manuale. Disponi il cibo in un solo strato, senza riempire troppo il cestello.'
      : 'Accendi il forno alla temperatura indicata e lascialo arrivare a temperatura. Prepara teglia, carta forno e ingredienti prima di assemblare il piatto.';
  }
  if (recipe.category === 'zuppe') {
    return 'Lava e taglia le verdure in pezzi regolari. Tieni accanto acqua o brodo già caldi, così puoi aggiungerli senza interrompere la cottura.';
  }
  if (recipe.category === 'formaggi') {
    return 'Prepara prima pane e verdure, poi taglia il formaggio nello spessore indicato. Usa una padella antiaderente o una pirofila già pronta: il formaggio va servito appena raggiunge la consistenza giusta.';
  }
  if (recipe.category === 'etnico') {
    return 'Taglia e misura tutto prima di accendere il fuoco. Mescola in anticipo le salse indicate, così puoi seguire i passaggi nell’ordine senza interrompere la cottura.';
  }
  return 'Pesa gli ingredienti e prepara tutto sul piano di lavoro prima di iniziare, seguendo le dosi indicate per una persona.';
}

function recipeDonenessStep(recipe) {
  const ids = new Set(recipe.ingredientIds);
  if ([...POULTRY_IDS].some(id => ids.has(id))) {
    return 'Controlla il punto più spesso del pollo o del tacchino: deve raggiungere 74 °C al cuore. Se non hai un termometro, taglia il pezzo più grande e verifica che il centro non sia crudo.';
  }
  if ([...GROUND_MEAT_IDS].some(id => ids.has(id)) || recipe.id === 'c11' || recipe.id === 'c13') {
    return 'La carne macinata e gli insaccati devono essere ben cotti anche al centro; con un termometro verifica almeno 71 °C. Lascia riposare 3 minuti prima di mangiare.';
  }
  if (recipe.category === 'carne') {
    return 'Controlla la cottura nel punto più spesso. Per un taglio intero usa almeno 63 °C al cuore e lascialo riposare 3 minuti prima di tagliarlo, così i succhi restano nella carne.';
  }
  if ([...FISH_IDS].some(id => ids.has(id)) || recipe.category === 'pesce') {
    return 'Il pesce è pronto quando la parte più spessa è opaca e si separa facilmente; con un termometro verifica 63 °C. Elimina le cozze che restano chiuse dopo la cottura.';
  }
  if (recipe.category === 'pasta') {
    return 'Assaggia la pasta un minuto prima del tempo indicato sulla confezione. Tieni da parte una tazzina di acqua di cottura, completa la mantecatura nel condimento e servi appena la salsa aderisce bene.';
  }
  if (recipe.category === 'riso') {
    return 'Assaggia il riso: deve essere cotto fino al centro ma non sfatto. Spegni il fuoco, lascialo riposare coperto per 2 minuti e separa i chicchi con una forchetta.';
  }
  if (recipe.category === 'uova') {
    return 'Controlla la consistenza prima di spegnere: l’albume deve essere rappreso e, nelle frittate, il centro non deve restare liquido. Servi subito per non continuare la cottura con il calore residuo.';
  }
  if (recipe.category === 'fredde') {
    return 'Assaggia soltanto dopo aver mescolato bene. Regola sale e acidità poco alla volta e lascia riposare 5 minuti se il procedimento non indica un tempo diverso.';
  }
  if (recipe.category === 'verdure' || recipe.category === 'patate') {
    return 'Assaggia il pezzo più grande: deve essere cotto fino al centro. Per una superficie dorata, completa gli ultimi minuti senza coperchio e aggiusta il sale soltanto alla fine.';
  }
  if (recipe.category === 'legumi' || recipe.category === 'zuppe') {
    return 'Prima di servire controlla densità e sapore. Se è troppo denso aggiungi poca acqua calda; se è troppo liquido continua la cottura senza coperchio per qualche minuto.';
  }
  if (recipe.category === 'forno') {
    return 'Controlla 5 minuti prima del tempo indicato, perché ogni forno cuoce in modo diverso. Il piatto è pronto quando è caldo al centro e ben dorato in superficie; lascialo assestare 5 minuti.';
  }
  if (recipe.category === 'formaggi') {
    return 'Spegni appena il formaggio è fuso o dorato come indicato: continuando la cottura può separarsi e diventare gommoso. Servi subito.';
  }
  return 'Assaggia, regola il condimento poco alla volta e servi alla consistenza indicata nel procedimento.';
}

function procedureSteps(recipe) {
  const core = String(recipe.procedure || '')
    .replace(/(\d{2,3}) gradi\b/gi, '$1 °C')
    .split(/\n+|(?<=[.!?])\s+/)
    .map(step => step.trim())
    .filter(Boolean);
  const steps = [recipePreparationStep(recipe), ...core, recipeDonenessStep(recipe)];
  if (recipe.airFryer) {
    steps.push('I tempi della friggitrice ad aria cambiano in base a modello, quantità e spessore. Controlla 3 minuti prima, gira o scuoti quando indicato e aggiungi tempo soltanto se serve.');
  }
  return steps.filter((step, index) => steps.indexOf(step) === index);
}

function recipeMeta(recipe) {
  const parts = ['1 persona', CATEGORY_LABELS[recipe.category] || recipe.category, formatMinutes(recipe.minutes)];
  if (recipe.airFryer) parts.push('friggitrice ad aria');
  const ingredientCount = recipeIngredientIds(recipe).length;
  parts.push(`${ingredientCount} ${ingredientCount === 1 ? 'ingrediente' : 'ingredienti'}`);
  return parts.join(' · ');
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 1800);
}

function setView(view) {
  if (!['scelte', 'ricette', 'spesa'].includes(view)) return;
  state.view = view;
  saveState();
  render();
  app.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function renderNavigation(itemCount) {
  document.querySelectorAll('[data-view]').forEach(button => {
    const active = button.dataset.view === state.view;
    button.classList.toggle('active', active);
    button.setAttribute('aria-current', active ? 'page' : 'false');
  });
  for (const id of ['sideCount', 'bottomCount']) {
    const counter = document.getElementById(id);
    if (!counter) continue;
    counter.hidden = itemCount === 0;
    counter.textContent = String(itemCount);
  }
}

function renderSelectionRow(recipe) {
  return `
    <div class="selection-row">
      <button class="check-button selected" type="button" data-toggle-recipe="${esc(recipe.id)}" aria-label="Togli ${esc(recipe.name)} dalle scelte" aria-pressed="true">${checkIcon()}</button>
      <button class="row-main" type="button" data-open-recipe="${esc(recipe.id)}">
        <span class="row-title">${esc(recipe.name)}</span>
        <span class="row-meta">${esc(recipeMeta(recipe))}</span>
      </button>
      <button class="remove-button" type="button" data-toggle-recipe="${esc(recipe.id)}" aria-label="Togli ${esc(recipe.name)}">×</button>
    </div>`;
}

function renderSummary(items) {
  const preview = items.slice(0, 9);
  return `
    <aside class="summary-panel">
      <h2>Ingredienti</h2>
      <p class="summary-count">${items.length} ${items.length === 1 ? 'prodotto' : 'prodotti'} nella lista</p>
      ${preview.length ? `
        <div class="ingredient-preview">
          ${preview.map(item => `<div><span>${esc(item.name)}</span><small>${esc(AISLE_LABELS[item.aisle])}</small></div>`).join('')}
        </div>
        ${items.length > preview.length ? `<p class="count-note">Altri ${items.length - preview.length} prodotti</p>` : ''}
      ` : '<p class="count-note">Gli ingredienti compariranno qui.</p>'}
      <button class="secondary-button" type="button" data-action="add-products">Completa la spesa</button>
      <button class="primary-button terracotta" type="button" data-view="spesa">Vai alla spesa</button>
    </aside>`;
}

function renderSelections() {
  const recipes = selectedRecipes();
  const items = allShoppingItems();
  return `
    <div class="workspace with-summary">
      <section>
        <header class="page-header">
          <div>
            <h1>Cosa vuoi mangiare?</h1>
            <p class="subhead">Scegli le ricette: i loro ingredienti entrano direttamente nella spesa.</p>
          </div>
          <div class="button-row">
            <button class="primary-button" type="button" data-view="ricette">Scegli ricette</button>
          </div>
        </header>
        <div class="section-heading">
          <h2>Ricette scelte</h2>
          <span>${recipes.length}</span>
        </div>
        ${recipes.length
          ? `<div class="selection-list">${recipes.map(renderSelectionRow).join('')}</div>`
          : `<div class="empty"><h2>Nessuna ricetta scelta</h2><p>Apri il ricettario e seleziona quello che vuoi preparare.</p><button class="primary-button" type="button" data-view="ricette">Apri le ricette</button></div>`}
      </section>
      ${renderSummary(items)}
    </div>`;
}

function filteredRecipes() {
  const query = normalize(recipeQuery);
  const ingredientFilter = INGREDIENT_FILTERS.find(filter => filter.id === recipeFilters.ingredient) || INGREDIENT_FILTERS[0];
  const timeFilter = TIME_FILTERS.find(filter => filter.id === recipeFilters.time) || TIME_FILTERS[0];
  const recipes = allRecipes().filter(recipe => {
    if (recipeFilters.category !== 'tutte' && recipe.category !== recipeFilters.category) return false;
    const ingredientIds = recipeIngredientIds(recipe);
    if (ingredientFilter.ingredientIds && !ingredientFilter.ingredientIds.some(id => ingredientIds.includes(id))) return false;
    if (timeFilter.maxMinutes !== null && recipe.minutes > timeFilter.maxMinutes) return false;
    if (!recipeMatchesMethod(recipe, recipeFilters.method)) return false;
    if (!query) return true;
    const ingredients = recipeIngredientIds(recipe).map(id => productById.get(id)?.name || '').join(' ');
    return normalize(`${recipe.name} ${ingredients} ${recipe.procedure}`).includes(query);
  });

  if (recipeFilters.sort === 'tempo-crescente') return recipes.sort((a, b) => a.minutes - b.minutes || a.name.localeCompare(b.name, 'it'));
  if (recipeFilters.sort === 'tempo-decrescente') return recipes.sort((a, b) => b.minutes - a.minutes || a.name.localeCompare(b.name, 'it'));
  if (recipeFilters.sort === 'alfabetico') return recipes.sort((a, b) => a.name.localeCompare(b.name, 'it'));
  return recipes;
}

function recipeMatchesMethod(recipe, method) {
  if (method === 'tutti') return true;
  if (method === 'aria') return recipe.airFryer;
  if (method === 'freddo') return recipe.category === 'fredde';
  const text = normalize(`${recipe.name} ${recipe.procedure}`);
  if (method === 'padella') return /\bpadella\b/.test(text);
  if (method === 'pentola') return /\b(pentola|tegame|casseruola)\b/.test(text);
  if (method === 'forno') return !recipe.airFryer && (recipe.category === 'forno' || /\bforno\b/.test(text));
  return true;
}

function recipeFilterOptions(options, selectedId) {
  return options.map(option => `<option value="${esc(option.id)}" ${selectedId === option.id ? 'selected' : ''}>${esc(option.label)}</option>`).join('');
}

function ingredientFilterOptions(selectedId) {
  const ungrouped = INGREDIENT_FILTERS.filter(option => !option.group);
  const groups = [...new Set(INGREDIENT_FILTERS.map(option => option.group).filter(Boolean))];
  return [
    recipeFilterOptions(ungrouped, selectedId),
    ...groups.map(group => `<optgroup label="${esc(group)}">${recipeFilterOptions(INGREDIENT_FILTERS.filter(option => option.group === group), selectedId)}</optgroup>`)
  ].join('');
}

function activeRecipeFilterCount() {
  return Object.entries(recipeFilters).filter(([key, value]) => value !== DEFAULT_RECIPE_FILTERS[key]).length;
}

function renderRecipeRow(recipe) {
  const selected = state.selectedRecipeIds.includes(recipe.id);
  return `
    <div class="recipe-row">
      <button class="check-button ${selected ? 'selected' : ''}" type="button" data-toggle-recipe="${esc(recipe.id)}" aria-label="${selected ? 'Togli' : 'Scegli'} ${esc(recipe.name)}" aria-pressed="${selected}">${selected ? checkIcon() : ''}</button>
      <button class="row-main" type="button" data-open-recipe="${esc(recipe.id)}">
        <span class="row-title">${esc(recipe.name)}</span>
        <span class="row-meta">${esc(recipeMeta(recipe))}</span>
      </button>
      <button class="quiet-button" type="button" data-open-recipe="${esc(recipe.id)}">Apri</button>
    </div>`;
}

function renderRecipes() {
  const recipes = filteredRecipes();
  return `
    <div class="workspace">
      <header class="page-header">
        <div>
          <h1>Ricette</h1>
          <p class="subhead">Seleziona tutte quelle che vuoi includere nella prossima spesa.</p>
        </div>
        <div class="button-row">
          <button class="primary-button" type="button" data-action="new-recipe">Nuova ricetta</button>
        </div>
      </header>
      <div class="tools">
        <input class="search" id="recipeSearch" type="search" placeholder="Cerca ricetta o ingrediente" value="${esc(recipeQuery)}" autocomplete="off" aria-label="Cerca ricetta o ingrediente">
        <button class="secondary-button" type="button" data-view="scelte">Vedi scelte (${state.selectedRecipeIds.length})</button>
      </div>
      <section class="recipe-filter-panel" aria-labelledby="recipeFilterTitle">
        <div class="recipe-filter-heading">
          <div>
            <h2 id="recipeFilterTitle">Filtra ricette</h2>
            <p>Combina più criteri per restringere il catalogo.</p>
          </div>
          ${activeRecipeFilterCount() ? `<button class="quiet-button" type="button" data-action="clear-recipe-filters">Azzera filtri (${activeRecipeFilterCount()})</button>` : ''}
        </div>
        <div class="recipe-filter-grid">
          <label class="filter-field" for="recipeCategoryFilter"><span>Categoria</span><select id="recipeCategoryFilter" data-recipe-filter="category">${recipeFilterOptions(CATEGORY_FILTERS, recipeFilters.category)}</select></label>
          <label class="filter-field" for="recipeIngredientFilter"><span>Ingrediente chiave</span><select id="recipeIngredientFilter" data-recipe-filter="ingredient">${ingredientFilterOptions(recipeFilters.ingredient)}</select></label>
          <label class="filter-field" for="recipeTimeFilter"><span>Tempo massimo</span><select id="recipeTimeFilter" data-recipe-filter="time">${recipeFilterOptions(TIME_FILTERS, recipeFilters.time)}</select></label>
          <label class="filter-field" for="recipeMethodFilter"><span>Preparazione</span><select id="recipeMethodFilter" data-recipe-filter="method">${recipeFilterOptions(METHOD_FILTERS, recipeFilters.method)}</select></label>
          <label class="filter-field" for="recipeSortFilter"><span>Ordina</span><select id="recipeSortFilter" data-recipe-filter="sort">${recipeFilterOptions(SORT_FILTERS, recipeFilters.sort)}</select></label>
        </div>
      </section>
      <div class="section-heading">
        <h2>Ricette trovate</h2>
        <span>${recipes.length}</span>
      </div>
      ${recipes.length
        ? `<div class="recipe-list">${recipes.map(renderRecipeRow).join('')}</div>`
        : '<div class="empty"><h2>Nessun risultato</h2><p>Prova con un altro nome o ingrediente.</p></div>'}
    </div>`;
}

function groupByAisle(items) {
  return AISLE_ORDER.map(aisle => ({
    aisle,
    items: items.filter(item => item.aisle === aisle)
  })).filter(group => group.items.length);
}

function renderShoppingRow(item) {
  const checked = state.checkedItemIds.includes(item.id);
  let trailing = '';
  if (item.recipeIds.size) {
    const quantity = formatPortion(item.portion, item.recipeIds.size);
    const recipeCount = item.recipeIds.size > 1 ? ` · ${item.recipeIds.size} ricette` : '';
    trailing = `<span class="shopping-quantity">${esc(quantity)}${recipeCount}</span>`;
  } else if (item.custom) {
    trailing = `<button class="quiet-button" type="button" data-remove-custom-item="${esc(item.customId)}">Togli</button>`;
  } else {
    trailing = `<button class="quiet-button" type="button" data-remove-manual-product="${esc(item.id)}">Togli</button>`;
  }
  return `
    <div class="shopping-row ${checked ? 'checked' : ''}">
      <button class="check-button ${checked ? 'checked' : ''}" type="button" data-shopping-check="${esc(item.id)}" aria-label="${checked ? 'Deseleziona' : 'Spunta'} ${esc(item.name)}" aria-pressed="${checked}">${checked ? checkIcon() : ''}</button>
      <span class="shopping-name">${esc(item.name)}</span>
      ${trailing}
    </div>`;
}

function renderShoppingSubsections(items) {
  return groupByAisle(items).map(group => `
    <section class="list-subsection">
      <h3>${esc(AISLE_LABELS[group.aisle])}</h3>
      <div class="shopping-list">${group.items.map(renderShoppingRow).join('')}</div>
    </section>`).join('');
}

function renderRoutinePanel() {
  return `
    <section class="routine-panel" aria-labelledby="routineTitle">
      <div class="routine-panel-heading">
        <div>
          <h2 id="routineTitle">Spesa abituale</h2>
          <p>Controlla cosa manca e aggiungilo alla lista.</p>
        </div>
        <button class="secondary-button" type="button" data-action="add-products">Apri elenco</button>
      </div>
      <div class="routine-grid">
        ${ROUTINE_SECTIONS.map(section => {
          const selected = section.productIds.filter(id => state.manualProductIds.includes(id)).length;
          return `<button class="routine-card" type="button" data-action="add-products" data-routine-section="${esc(section.id)}"><strong>${esc(section.label)}</strong><span>${section.productIds.length} prodotti${selected ? ` · ${selected} in lista` : ''}</span></button>`;
        }).join('')}
      </div>
    </section>`;
}

function renderShopping() {
  const items = allShoppingItems();
  const checkedCount = state.checkedItemIds.length;
  return `
    <div class="workspace">
      <header class="page-header">
        <div>
          <h1>Spesa</h1>
          <p class="subhead">${items.length} ${items.length === 1 ? 'cosa da comprare' : 'cose da comprare'}.</p>
        </div>
      </header>
      <div class="shopping-actions">
        <button class="primary-button" type="button" data-action="add-products">Completa la spesa</button>
        <button class="secondary-button" type="button" data-action="copy-list" ${items.length ? '' : 'disabled'}>Copia lista</button>
        <button class="danger-button" type="button" data-action="clear-checked" ${checkedCount ? '' : 'disabled'}>Togli spuntati${checkedCount ? ` (${checkedCount})` : ''}</button>
      </div>
      ${items.length ? `
        <section class="shopping-group">
          <h2>Da comprare</h2>
          ${renderShoppingSubsections(items)}
        </section>
      ` : `
        <div class="empty">
          <h2>La lista è vuota</h2>
          <p>Scegli una ricetta oppure aggiungi i prodotti che mancano in casa.</p>
          <div class="button-row"><button class="primary-button" type="button" data-view="ricette">Scegli ricette</button><button class="secondary-button" type="button" data-action="add-products">Spesa abituale</button></div>
        </div>`}
      ${renderRoutinePanel()}
    </div>`;
}

function render() {
  cleanState();
  const itemCount = allShoppingItems().length;
  if (state.view === 'ricette') app.innerHTML = renderRecipes();
  else if (state.view === 'spesa') app.innerHTML = renderShopping();
  else app.innerHTML = renderSelections();
  renderNavigation(itemCount);
}

function openDrawer(content) {
  drawer.innerHTML = `<button class="drawer-close" type="button" data-action="close-drawer" aria-label="Chiudi">×</button>${content}`;
  drawerBackdrop.hidden = false;
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  drawer.querySelector('button, input, select, textarea')?.focus({ preventScroll: true });
}

function closeDrawer() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  drawerBackdrop.hidden = true;
  document.body.style.overflow = '';
  drawer.innerHTML = '';
}

function openRecipe(recipeId) {
  const recipe = recipeMap().get(recipeId);
  if (!recipe) return;
  const selected = state.selectedRecipeIds.includes(recipe.id);
  const ingredients = recipeIngredientIds(recipe).map(id => productById.get(id)).filter(Boolean);
  openDrawer(`
    <h2>${esc(recipe.name)}</h2>
    <p class="drawer-meta">${esc(recipeMeta(recipe))}</p>
    <div class="button-row">
      <button class="primary-button ${selected ? '' : 'terracotta'}" type="button" data-toggle-recipe="${esc(recipe.id)}">${selected ? 'Togli dalle scelte' : 'Scegli questa ricetta'}</button>
      ${recipe.custom ? `<button class="secondary-button" type="button" data-action="edit-recipe" data-recipe-id="${esc(recipe.id)}">Modifica</button><button class="danger-button" type="button" data-action="delete-recipe" data-recipe-id="${esc(recipe.id)}">Elimina</button>` : ''}
    </div>
    <section class="detail-section">
      <h3>Ingredienti · 1 persona</h3>
      <div class="ingredient-list">${ingredients.map(product => `<div><span>${esc(product.name)}</span><strong>${esc(formatPortion(product.portion))}</strong></div>`).join('')}</div>
    </section>
    <section class="detail-section">
      <h3>Procedimento</h3>
      <ol class="procedure-steps">
        ${procedureSteps(recipe).map(step => `<li><p>${esc(step)}</p></li>`).join('')}
      </ol>
    </section>`);
}

function pickerRows(selectedIds, actionName, aisles = RECIPE_AISLE_ORDER) {
  return aisles.map(aisle => {
    const products = PRODUCTS.filter(product => product.aisle === aisle);
    if (!products.length) return '';
    return `<section class="picker-section"><h3>${esc(AISLE_LABELS[aisle])}</h3><div class="picker-list">
      ${products.map(product => {
        const selected = selectedIds.includes(product.id);
        return `<div class="picker-row" data-picker-row data-search="${esc(normalize(product.name))}"><span>${esc(product.name)}</span><button class="${selected ? 'selected' : ''}" type="button" data-${actionName}="${esc(product.id)}">${selected ? 'Aggiunto' : 'Aggiungi'}</button></div>`;
      }).join('')}
    </div></section>`;
  }).join('');
}

function routinePickerRows() {
  return ROUTINE_SECTIONS.map(section => `
    <section class="picker-section" data-routine-picker-section="${esc(section.id)}">
      <h3>${esc(section.label)}</h3>
      <div class="picker-list">
        ${section.productIds.map(id => productById.get(id)).filter(Boolean).map(product => {
          const selected = state.manualProductIds.includes(product.id);
          return `<div class="picker-row" data-picker-row data-search="${esc(normalize(product.name))}"><span>${esc(product.name)}</span><button class="${selected ? 'selected' : ''}" type="button" data-toggle-product="${esc(product.id)}">${selected ? 'Aggiunto' : 'Aggiungi'}</button></div>`;
        }).join('')}
      </div>
    </section>`).join('');
}

function openProductPicker(sectionId = '') {
  openDrawer(`
    <h2>Spesa abituale</h2>
    <p class="drawer-meta">Scegli cosa manca. Gli ingredienti delle ricette entrano nella lista automaticamente.</p>
    <input class="search" id="productPickerSearch" type="search" placeholder="Cerca tra i prodotti abituali" autocomplete="off" aria-label="Cerca tra i prodotti abituali">
    <div id="productPickerRows">${routinePickerRows()}</div>
    <section class="custom-item-panel">
      <h3>Altro</h3>
      <form class="inline-form" id="customItemForm">
        <input class="text-input" id="customItemName" name="name" placeholder="Scrivi una voce" autocomplete="off" aria-label="Scrivi un prodotto o altro">
        <select class="select-input" name="aisle" aria-label="Reparto della voce">
          ${AISLE_ORDER.map(aisle => `<option value="${aisle}" ${aisle === 'altro' ? 'selected' : ''}>${esc(AISLE_LABELS[aisle])}</option>`).join('')}
        </select>
        <button class="primary-button" type="submit">Aggiungi</button>
      </form>
    </section>`);
  if (sectionId) {
    const targetSection = drawer.querySelector(`[data-routine-picker-section="${CSS.escape(sectionId)}"]`);
    if (targetSection) drawer.scrollTop = Math.max(0, targetSection.offsetTop - 24);
  }
}

function selectedIngredientTokens() {
  if (!editorIngredientIds.length) return '<span class="count-note">Nessun ingrediente selezionato.</span>';
  return editorIngredientIds.map(id => {
    const product = productById.get(id);
    return product ? `<span class="ingredient-token">${esc(product.name)}<button type="button" data-editor-remove="${esc(id)}" aria-label="Togli ${esc(product.name)}">×</button></span>` : '';
  }).join('');
}

function openRecipeEditor(recipeId = null) {
  const recipe = recipeId ? state.customRecipes.find(item => item.id === recipeId) : null;
  editingRecipeId = recipe?.id || null;
  editorIngredientIds = [...(recipe?.ingredientIds || [])];
  openDrawer(`
    <h2>${recipe ? 'Modifica ricetta' : 'Nuova ricetta'}</h2>
    <form class="form-grid" id="recipeForm">
      <div class="field"><label for="recipeName">Nome</label><input class="text-input" id="recipeName" name="name" value="${esc(recipe?.name || '')}" required autocomplete="off"></div>
      <div class="field-row">
        <div class="field"><label for="recipeMinutes">Minuti</label><input class="text-input" id="recipeMinutes" name="minutes" type="number" min="0" step="1" value="${esc(recipe?.minutes ?? 15)}" required></div>
        <div class="field"><label for="recipeCategory">Categoria</label><select class="select-input" id="recipeCategory" name="category">${Object.entries(CATEGORY_LABELS).map(([id, label]) => `<option value="${id}" ${recipe?.category === id ? 'selected' : ''}>${esc(label)}</option>`).join('')}</select></div>
      </div>
      <label class="switch-field"><input type="checkbox" name="airFryer" ${recipe?.airFryer ? 'checked' : ''}> Friggitrice ad aria</label>
      <div class="field"><label>Ingredienti</label><div class="selected-ingredients" id="selectedIngredients">${selectedIngredientTokens()}</div></div>
      <div class="field"><label for="ingredientPickerSearch">Aggiungi ingredienti</label><input class="search" id="ingredientPickerSearch" type="search" placeholder="Cerca ingrediente" autocomplete="off"></div>
      <div id="ingredientPickerRows">${pickerRows(editorIngredientIds, 'editor-add')}</div>
      <div class="field"><label for="recipeProcedure">Procedimento · un passaggio per riga</label><textarea class="text-area" id="recipeProcedure" name="procedure" placeholder="Preparazione\nCottura\nCome capire quando è pronto" required>${esc(recipe?.procedure || '')}</textarea></div>
      <button class="primary-button terracotta" type="submit">Salva ricetta</button>
    </form>`);
}

function refreshEditorIngredients() {
  const tokens = drawer.querySelector('#selectedIngredients');
  if (tokens) tokens.innerHTML = selectedIngredientTokens();
  drawer.querySelectorAll('[data-editor-add]').forEach(button => {
    const selected = editorIngredientIds.includes(button.dataset.editorAdd);
    button.classList.toggle('selected', selected);
    button.textContent = selected ? 'Aggiunto' : 'Aggiungi';
  });
}

function toggleRecipe(recipeId) {
  const recipe = recipeMap().get(recipeId);
  if (!recipe) return;
  updateState(current => {
    if (current.selectedRecipeIds.includes(recipeId)) {
      current.selectedRecipeIds = current.selectedRecipeIds.filter(id => id !== recipeId);
    } else {
      current.selectedRecipeIds.push(recipeId);
      current.completedItemIds = current.completedItemIds.filter(id => !recipe.ingredientIds.includes(id));
    }
  });
  if (drawer.classList.contains('open') && drawer.querySelector(`[data-toggle-recipe="${CSS.escape(recipeId)}"]`)) {
    closeDrawer();
  }
}

function toggleManualProduct(productId, button) {
  if (!productById.has(productId)) return;
  updateState(current => {
    if (current.manualProductIds.includes(productId)) {
      current.manualProductIds = current.manualProductIds.filter(id => id !== productId);
    } else {
      current.manualProductIds.push(productId);
      current.completedItemIds = current.completedItemIds.filter(id => id !== productId);
    }
  });
  const selected = state.manualProductIds.includes(productId);
  button.classList.toggle('selected', selected);
  button.textContent = selected ? 'Aggiunto' : 'Aggiungi';
}

function toggleShoppingItem(itemId) {
  updateState(current => {
    if (current.checkedItemIds.includes(itemId)) current.checkedItemIds = current.checkedItemIds.filter(id => id !== itemId);
    else current.checkedItemIds.push(itemId);
  });
}

function clearCheckedItems() {
  if (!state.checkedItemIds.length) return;
  updateState(current => {
    const checked = new Set(current.checkedItemIds);
    current.completedItemIds = [...new Set([...current.completedItemIds, ...current.checkedItemIds])];
    current.manualProductIds = current.manualProductIds.filter(id => !checked.has(id));
    current.customItems = current.customItems.filter(item => !checked.has(`custom:${item.id}`));
    current.checkedItemIds = [];
  });
  showToast('Voci spuntate rimosse');
}

function copyShoppingList() {
  const unchecked = allShoppingItems().filter(item => !state.checkedItemIds.includes(item.id));
  const lines = ['Spesa'];
  for (const group of groupByAisle(unchecked)) {
    lines.push('', AISLE_LABELS[group.aisle].toUpperCase());
    group.items.forEach(item => {
      const quantity = item.recipeIds.size ? formatPortion(item.portion, item.recipeIds.size) : '';
      lines.push(`- ${item.name}${quantity ? ` — ${quantity}` : ''}`);
    });
  }
  navigator.clipboard.writeText(lines.join('\n')).then(
    () => showToast('Lista copiata'),
    () => showToast('Copia non disponibile')
  );
}

function resetAll() {
  if (!window.confirm('Azzero scelte e lista della spesa? Le ricette personali restano salvate.')) return;
  state = { ...DEFAULT_STATE, customRecipes: state.customRecipes };
  saveState();
  closeDrawer();
  render();
  showToast('Scelte e lista azzerate');
}

function filterPicker(input, containerId) {
  const query = normalize(input.value);
  drawer.querySelectorAll(`#${containerId} [data-picker-row]`).forEach(row => {
    row.hidden = Boolean(query) && !row.dataset.search.includes(query);
  });
  drawer.querySelectorAll(`#${containerId} .picker-section`).forEach(section => {
    section.hidden = [...section.querySelectorAll('[data-picker-row]')].every(row => row.hidden);
  });
}

document.addEventListener('click', event => {
  const viewControl = event.target.closest('[data-view]');
  if (viewControl) {
    setView(viewControl.dataset.view);
    return;
  }

  const viewLink = event.target.closest('[data-view-link]');
  if (viewLink) {
    event.preventDefault();
    setView(viewLink.dataset.viewLink);
    return;
  }

  const recipeToggle = event.target.closest('[data-toggle-recipe]');
  if (recipeToggle) {
    toggleRecipe(recipeToggle.dataset.toggleRecipe);
    return;
  }

  const recipeOpen = event.target.closest('[data-open-recipe]');
  if (recipeOpen) {
    openRecipe(recipeOpen.dataset.openRecipe);
    return;
  }

  const productToggle = event.target.closest('[data-toggle-product]');
  if (productToggle) {
    toggleManualProduct(productToggle.dataset.toggleProduct, productToggle);
    return;
  }

  const shoppingCheck = event.target.closest('[data-shopping-check]');
  if (shoppingCheck) {
    toggleShoppingItem(shoppingCheck.dataset.shoppingCheck);
    return;
  }

  const removeManual = event.target.closest('[data-remove-manual-product]');
  if (removeManual) {
    updateState(current => { current.manualProductIds = current.manualProductIds.filter(id => id !== removeManual.dataset.removeManualProduct); });
    return;
  }

  const removeCustom = event.target.closest('[data-remove-custom-item]');
  if (removeCustom) {
    updateState(current => { current.customItems = current.customItems.filter(item => item.id !== removeCustom.dataset.removeCustomItem); });
    return;
  }

  const editorAdd = event.target.closest('[data-editor-add]');
  if (editorAdd) {
    const id = editorAdd.dataset.editorAdd;
    if (editorIngredientIds.includes(id)) editorIngredientIds = editorIngredientIds.filter(item => item !== id);
    else editorIngredientIds.push(id);
    refreshEditorIngredients();
    return;
  }

  const editorRemove = event.target.closest('[data-editor-remove]');
  if (editorRemove) {
    editorIngredientIds = editorIngredientIds.filter(id => id !== editorRemove.dataset.editorRemove);
    refreshEditorIngredients();
    return;
  }

  const actionControl = event.target.closest('[data-action]');
  if (!actionControl) return;
  const action = actionControl.dataset.action;
  if (action === 'close-drawer') closeDrawer();
  if (action === 'add-products') openProductPicker(actionControl.dataset.routineSection || '');
  if (action === 'clear-checked') clearCheckedItems();
  if (action === 'copy-list') copyShoppingList();
  if (action === 'new-recipe') openRecipeEditor();
  if (action === 'edit-recipe') openRecipeEditor(actionControl.dataset.recipeId);
  if (action === 'clear-recipe-filters') {
    recipeFilters = { ...DEFAULT_RECIPE_FILTERS };
    render();
  }
  if (action === 'reset') resetAll();
  if (action === 'delete-recipe') {
    const recipeId = actionControl.dataset.recipeId;
    const recipe = state.customRecipes.find(item => item.id === recipeId);
    if (recipe && window.confirm(`Elimino “${recipe.name}”?`)) {
      updateState(current => {
        current.customRecipes = current.customRecipes.filter(item => item.id !== recipeId);
        current.selectedRecipeIds = current.selectedRecipeIds.filter(id => id !== recipeId);
      });
      closeDrawer();
    }
  }
});

document.addEventListener('input', event => {
  if (event.target.id === 'recipeSearch') {
    recipeQuery = event.target.value;
    const caret = event.target.selectionStart;
    render();
    const replacement = document.querySelector('#recipeSearch');
    replacement?.focus();
    replacement?.setSelectionRange(caret, caret);
  }
  if (event.target.id === 'productPickerSearch') filterPicker(event.target, 'productPickerRows');
  if (event.target.id === 'ingredientPickerSearch') filterPicker(event.target, 'ingredientPickerRows');
});

document.addEventListener('change', event => {
  const filter = event.target.closest('[data-recipe-filter]');
  if (!filter) return;
  const key = filter.dataset.recipeFilter;
  if (!(key in DEFAULT_RECIPE_FILTERS)) return;
  recipeFilters = { ...recipeFilters, [key]: filter.value };
  render();
});

document.addEventListener('submit', event => {
  if (event.target.id === 'customItemForm') {
    event.preventDefault();
    const input = event.target.elements.name;
    const name = input.value.trim();
    const aisle = event.target.elements.aisle.value;
    if (!name) return;
    updateState(current => {
      current.customItems.push({
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name,
        aisle: AISLE_LABELS[aisle] ? aisle : 'altro'
      });
    });
    input.value = '';
    showToast('Voce aggiunta');
    return;
  }

  if (event.target.id === 'recipeForm') {
    event.preventDefault();
    const form = new FormData(event.target);
    const name = String(form.get('name') || '').trim();
    const minutes = Number(form.get('minutes'));
    const procedure = String(form.get('procedure') || '').trim();
    if (!name || !Number.isFinite(minutes) || minutes < 0 || !procedure || !editorIngredientIds.length) {
      showToast('Completa nome, minuti, ingredienti e procedimento');
      return;
    }
    const recipe = sanitizeCustomRecipe({
      id: editingRecipeId || `mia-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name,
      minutes,
      category: form.get('category'),
      airFryer: form.get('airFryer') === 'on',
      ingredientIds: editorIngredientIds,
      procedure,
      custom: true
    });
    updateState(current => {
      const index = current.customRecipes.findIndex(item => item.id === recipe.id);
      if (index >= 0) current.customRecipes[index] = recipe;
      else current.customRecipes.push(recipe);
    });
    closeDrawer();
    showToast(editingRecipeId ? 'Ricetta aggiornata' : 'Ricetta salvata');
  }
});

drawerBackdrop.addEventListener('click', closeDrawer);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
});

window.addEventListener('pagehide', saveState);

render();

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
