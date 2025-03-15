const list = [
    'Coca Cola',
    'Kraft',
    'Nestle',
    'Nescafe',
    "Kellogg's",
    'Mondelez',
    'Pepsico',
    'Mars',
    'P&G',
    'Johnson & Johnson',
    "L'oreal",
    'Iams',
    'Garnier',
    'Dawn',
    'Tide',
    'Purina',
    'Olay',
    'Cover Girl',
    'Beneful',
    'Dove',
    'Axe',
    'Unilever',
    'Oral-B',
    'Noutrogena',
    'Crest',
    'Splenda',
    'Cascade',
    'Gain',
    'Scope',
    'Tylenol',
    'Bandaid',
    'Listerene',
    'Gillette',
    'Old Spice',
    'Tampax',
    'Sudafed',
    'Bengay',
    'Duracell',
    'Pantene',
    'Pampers',
    'Braun',
    'Sour Patch',
    'Maynards',
    'Cherry Ripe',
    'Crispy Crunch',
    'Twirl',
    'Caramilk',
    'Crunchie',
    'Ritz',
    'Triscuit',
    'belVita',
    'Cheese Nips',
    'Wheat Thins',
    "Snack Well's",
    'Vitamin Water',
    'Smart Water',
    'Sprite',
    'Mezzo Mix',
    'Minute Maid',
    'Fruitopia',
    'Five Alive',
    "Barq's",
    'Fanta',
    'Nestea',
    'PowerAid',
    'Mello Yello',
    'Full Throttle',
    'Nos',
    'Looza',
    'Mirinda',
    'Brisk',
    'Ocean Spray',
    'Mug Root Beer',
    'Mountain Dew',
    'Sobe',
    'Aquafina',
    'Lipton',
    '7 Up',
    'Tropicana',
    'Pepsi',
    'Gatorade',
    'Dole',
    'Ruffles',
    'Mrs Vickies',
    'Fritos',
    'Cheetos',
    'Cracker Jack',
    'Sun Chips',
    'Tostitos',
    'Rold Gold',
    'Spitz',
    "Lay's",
    'Doritos',
    'Green Giant',
    'Hamburger Helper',
    'Betty Crocker',
    'Old El Paso',
    'Val Nature',
    'Bugles',
    'Pop Tarts',
    'Eggo',
    'Kashi',
    'Pringles',
    'Cheez-it',
    'Nutri Grain',
    'Freedent',
    '5 Gum',
    "Wrigley's",
    'Excel',
    'Doublemint',
    'Juicy Fruit',
    'Big Red',
    'Extra',
    'Hubba Bubba',
    'Orbit',
];
const index = {};

function search (input) {
    if (!input) {
        return list.sort();
    }
    return Array.from(index[input]).sort();
}

function addToIndex(key, value) {
    if (!(key in index)) {
        index[key] = new Set();
    }
    index[key].add(value);
}

function build() {
    list.forEach(item => {
        let cleaned = item.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

        for (let i = 1; i < cleaned.length; i++) {
            for (let j = 0; j < cleaned.length; j++) {
                let key = cleaned.substring(j, j+i);
                addToIndex(key, item);
            }
        }

    });
}

function generateHTML(results) {
    return results.map(result => {
        return `<li>${result}</li>`;
    }).join('');;
}

function updatePage(html) {
    document.querySelector('#results').innerHTML = html;
}

function init() {
    build();
    let results = search('');
    let html = generateHTML(results);
    updatePage(html);

    const searcher = document.querySelector('#search');

    searcher.addEventListener('touch', (e => {
        searcher.scrollIntoView({behavior: 'smooth', block: 'start'});
    }));

    searcher.addEventListener('input', (e => {
        // debugger;
        let value = e.target.value;
        let results = search(value);
        let html = generateHTML(results);
        updatePage(html);
    }));
}

exports = {
    search,
    build
};
