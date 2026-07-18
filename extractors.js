// extractors.js
// Historical Document Investigator
// Entity extraction helpers

function extractGrantor(text) {
    const patterns = [
        /between\s+([A-Z][A-Za-z\s.]+?)\s+and/i,
        /from\s+([A-Z][A-Za-z\s.]+?)\s+to/i
    ];

    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) return cleanName(match[1]);
    }

    return null;
}

function extractGrantee(text) {
    const patterns = [
        /to\s+([A-Z][A-Za-z\s.]+?)(?:,|\n|for|being|$)/i,
        /and\s+([A-Z][A-Za-z\s.]+?)\s+witnesseth/i
    ];

    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) return cleanName(match[1]);
    }

    return null;
}

function extractWitnesses(text) {

    const witnesses = [];

    const regex = /witness(?:es)?[:\s]+([^\n]+)/gi;

    let match;

    while ((match = regex.exec(text)) !== null) {

        match[1]
            .split(/,|;/)
            .map(n => cleanName(n))
            .filter(Boolean)
            .forEach(n => witnesses.push(n));

    }

    return [...new Set(witnesses)];

}

function extractSurveyor(text){

    const match = text.match(
        /survey(?:ed)?\s+by\s+([A-Z][A-Za-z\s.]+)/i
    );

    return match ? cleanName(match[1]) : null;

}

function extractCounty(text){

    const match = text.match(
        /([A-Z][A-Za-z]+ County)/i
    );

    return match ? match[1] : null;

}

function extractLandDescription(text){

    const keywords = [
        "beginning",
        "thence",
        "vara",
        "league",
        "labor",
        "acre",
        "acres"
    ];

    const lines = text.split("\n");

    return lines.filter(line => {

        const lower = line.toLowerCase();

        return keywords.some(k => lower.includes(k));

    });

}

function surnameFirst(name){

    const parts = name.trim().split(/\s+/);

    if(parts.length < 2)
        return name;

    const last = parts.pop();

    return `${last}, ${parts.join(" ")}`;

}

function cleanName(name){

    return name
        .replace(/[.,;:]/g,"")
        .replace(/\s+/g," ")
        .trim();

}
