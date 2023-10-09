import { conjunctions, adjectives, nouns, verbs, adverbs, spatialPrepositions, questionWords } from "./vocab.js";

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const startsWithVowelSound = (word) => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return vowels.includes(word[0].toLowerCase());
};

const irregularPlurals = {
    box: "boxes",
    fox: "foxes",
    man: "men",
    child: "children",
    fish: "fishes",
    milk: "milk"
    // Add more as needed
};

const irregularVerbs = {
    buy: "buys",
    have: "has",
    be: "is",
    run: "runs", // added because "ran" is also in your list
    // Add more as needed
};

const pluralizeVerb = (verb) => {
    if (irregularVerbs[verb]) {
        return irregularVerbs[verb];
    }
    if (verb.endsWith("y")) {
        return verb.slice(0, -1) + "ies";
    } else if (verb.endsWith("s") || verb.endsWith("x") || verb.endsWith("z")) {
        return verb + "es";
    } else {
        return verb + "s";
    }
};


const pluralizeNoun = (noun) => {
    if (irregularPlurals[noun]) {
        return irregularPlurals[noun];
    }
    if (noun.endsWith("y")) {
        return noun.slice(0, -1) + "ies";
    } else {
        return noun + "s";
    }
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const getRandomElementScaled = (arr, count) => {
    return arr[Math.floor(Math.random() * count)];
};

const generatePhrase = (length, adjLevel = 1, nounLevel = 1, verbLevel = 1, adverbLevel = 1) => {
    const adjCount = Math.max(3, Math.floor(adjectives.length * adjLevel));
    const nounCount = Math.max(3, Math.floor(nouns.length * nounLevel));
    const verbCount = Math.max(3, Math.floor(verbs.length * verbLevel));
    const adverbCount = Math.max(3, Math.floor(adverbs.length * adverbLevel));

    let phrase = "";
    let lastConjunction = "";
    let noun = "";
    let isPlural = false;
    let verb = "";
    let shouldAddConjunction = false;
    let isQuestion = Math.random() > 0.8;  // New line

  

    if (isQuestion) {  // New line
        const questionWord = getRandomElement(questionWords);
        phrase += questionWord + " ";
    }

    for (let i = 0; i < length; i++) {
        if (shouldAddConjunction && i % 4 === 0 && i > 0) {
            const conjunction = getRandomElement(conjunctions);
            if (conjunction !== lastConjunction) {
                phrase = phrase.trim() + ', ' + conjunction + ' ';
                lastConjunction = conjunction;
            }
            shouldAddConjunction = false;
        }

        if (i % 4 === 0) {
            noun = getRandomElementScaled(nouns, nounCount);
            isPlural = Math.random() > 0.5;

            if (isPlural) {
                noun = pluralizeNoun(noun);
            }

            const article = isPlural ? "the" : (startsWithVowelSound(noun) ? "an" : "a");
            phrase += article + " ";
        } else if (i % 4 === 1) {
            phrase += getRandomElementScaled(adjectives, adjCount) + " ";
        } else if (i % 4 === 2) {
            phrase += noun + " ";
        } else if (i % 4 === 3) {
            verb = getRandomElementScaled(verbs, verbCount);

            if (isPlural) {
                verb = verb.replace(/s$/, '').replace(/es$/, '');
            } else {
                verb = pluralizeVerb(verb);
            }

            phrase += verb + " ";

            if (Math.random() > 0.7) {
                const spatialPreposition = getRandomElement(spatialPrepositions);
                phrase += spatialPreposition + " ";
            }

            shouldAddConjunction = true;

            if (Math.random() > 0.5) {
                phrase += getRandomElementScaled(adverbs, adverbCount) + " ";
            }
        }
    }

    phrase = phrase.replace(/, (and|or|but|so|yet|for|nor) $/, '').trim();

    if (length % 4 !== 0) {
        const lastIndex = phrase.lastIndexOf(',');
        if (lastIndex !== -1) {
            phrase = phrase.substring(0, lastIndex);
        }
    }

    if (isQuestion) {  // New line
        return capitalizeFirstLetter(phrase) + "?";
    }

    return capitalizeFirstLetter(phrase) + ".";
};

export default generatePhrase;
