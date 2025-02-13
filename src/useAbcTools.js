function parseABC(abcText) {
    const tunes = [];
    const blocks = abcText.trim().split(/\n(?=X: \d+)/);
    
    blocks.forEach(block => {
        const lines = block.split('\n');
        const tune = {
            title: "",
            composer: "",
            key: "",
            transposition: "",
            tuning: "",
            links: [],
            linkStarts: [],
            linkEnds: [],
            notes: ""
        };
        console.log(block)
        // var foundStart = false
        // var foundEnd = false
        // var foundLink = false
        lines.forEach(line => {
            
            if (line.startsWith("T:")) {
                tune.title = line.substring(2).trim();
            } else if (line.startsWith("C:")) {
                tune.composer = line.substring(2).trim();
            } else if (line.startsWith("K:")) {
                tune.key = line.substring(2).trim();
            } else if (line.startsWith("M:")) {
                tune.meter = line.substring(2).trim() ? line.substring(2).trim() : 'C';
            } else if (line.startsWith("L:")) {
                tune.noteLength = line.substring(2).trim() ? line.substring(2).trim() : '';
            } else if (line.startsWith("% abcbook-transpose")) {
                tune.transposition = line.substring(19).trim();
                if (parseInt(tune.transposition) > 0 || parseInt(tune.transposition) < 0 ) {
                    try {
                        tune.transposed_key = transposeKeySignature(tune.key, parseInt(tune.transposition))
                    }  catch (e) {}
                } else {
                    tune.transposed_key = tune.key
                }
            } else if (line.startsWith("% abcbook-tuning")) {
                tune.tuning = line.substring(17).trim();
            } else if (line.match(/^% abcbook-link-\d+/)) {
                tune.links.push(line.substring(line.indexOf(" ",2) + 1).trim());
                // foundLink = true
            } else if (line.match(/^% abcbook-link-start-at-\d+/)) {
                tune.linkStarts.push(line.substring(line.indexOf(" ",2) + 1).trim());
                // foundStart = true
            } else if (line.match(/^% abcbook-link-end-at-\d+/)) {
                tune.linkEnds.push(line.substring(line.indexOf(" ",2) + 1).trim());
                // foundEnd = true
            }
            
        });


        tune.notes = extractNotesWithSpacing(block).trim()
        console.log(tune)
        tunes.push(tune);
    });
    
    return tunes;
}
const NOTES = [
    "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
];

const FLAT_NOTES = [
    "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"
];

const MAJOR_KEYS = {
    "C": 0, "G": 1, "D": 2, "A": 3, "E": 4, "B": 5, "F#": 6, "C#": 7,
    "F": -1, "Bb": -2, "Eb": -3, "Ab": -4, "Db": -5, "Gb": -6, "Cb": -7
};

const MINOR_KEYS = {
    "A": 0, "E": 1, "B": 2, "F#": 3, "C#": 4, "G#": 5, "D#": 6, "A#": 7,
    "D": -1, "G": -2, "C": -3, "F": -4, "Bb": -5, "Eb": -6, "Ab": -7
};

function transposeKeySignature(key, semitones) {
    let isMinor = key.endsWith("m");
    let baseKey = isMinor ? key.slice(0, -1) : key;
    let keyMap = isMinor ? MINOR_KEYS : MAJOR_KEYS;

    if (!(baseKey in keyMap)) {
        throw new Error("Invalid key signature");
    }
    
    let noteIndex = NOTES.indexOf(baseKey);
    if (noteIndex === -1) noteIndex = FLAT_NOTES.indexOf(baseKey);
    if (noteIndex === -1) throw new Error("Invalid key signature");
    
    let transposedIndex = (noteIndex + semitones + 12) % 12;
    let transposedKey = key.includes("b") ? FLAT_NOTES[transposedIndex] : NOTES[transposedIndex];
    
    return isMinor ? transposedKey + "m" : transposedKey;
}
function extractNotesWithSpacing(abcString) {
    return abcString
        .split("\n")
        .map(line => {
            const l = line.trim()
            // Remove metadata and comment lines but keep bar lines
            if (/^(?![|]).*[A-Za-z]:/.test(l) || /^%/.test(l)) return "";
            return l;
        })
        .join("\n"); // Preserve original formatting
}

// Example usage:
// const abcNotation = `
// X:1
// T:Example Tune
// M:4/4
// K:C
// C D E F  GABc |  cBAG FEDC |
// `;

// console.log(extractNotesWithSpacing(abcNotation));
// Output: "C D E F  GABc |  cBAG FEDC |"

// // Example usage:
// const abcExample = `
// X:1
// T: Sample Tune
// C: John Doe
// K: D Major
// % abcbook-transpose 1
// % abcbook-tuning EADGBE
// % abcbook-link-1 http://example.com/tune
// % abcbook-link-2 http://example.com/extra-link

// X:2
// T: Another Tune
// C: Jane Smith
// K: G Major
// % abcbook-transpose -2
// % abcbook-tuning DADGAD
// % abcbook-link-1 http://example.com/another-tune
// `;

// console.log(parseABC(abcExample));

export default function() { return {parseABC, transposeKeySignature}}