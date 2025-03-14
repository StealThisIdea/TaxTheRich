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
    'Braun'
]
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

    document.querySelector('#search').addEventListener('input', (e => {
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
