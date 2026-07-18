// history.js
// Historical research helper

const HISTORICAL_KEYWORDS = [
    "republic of texas",
    "texas",
    "grant",
    "patent",
    "league",
    "labor",
    "vara",
    "county",
    "surveyor",
    "governor",
    "probate",
    "deed",
    "indenture",
    "witness",
    "heirs",
    "estate",
    "administrator",
    "executor",
    "clerk",
    "justice of the peace"
];

function buildHistoricalSummary(text, report){

    const lower = text.toLowerCase();

    const findings = [];

    HISTORICAL_KEYWORDS.forEach(word => {

        if(lower.includes(word)){

            findings.push(word);

        }

    });

    const research = [];

    if(findings.includes("republic of texas")){

        research.push(
            "Possible Republic of Texas era document (1836–1846)."
        );

    }

    if(findings.includes("grant")){

        research.push(
            "May relate to an original land grant."
        );

    }

    if(findings.includes("probate")){

        research.push(
            "Likely probate court record."
        );

    }

    if(findings.includes("deed")){

        research.push(
            "Appears to involve a transfer of real property."
        );

    }

    if(report.names.length){

        research.push(
            "Search the extracted names in county deed books and probate indexes."
        );

    }

    return {

        keywords: findings,

        researchNotes: research,

        archiveSuggestions: [

            "Texas State Library & Archives",

            "County Clerk Records",

            "General Land Office",

            "FamilySearch",

            "National Archives"

        ]

    };

}
