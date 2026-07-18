// analysis.js
// Historical Document Investigator
// Basic document analysis engine

function analyzeDocument(text) {

    const report = {
        type: detectDocumentType(text),
        date: detectDate(text),
        names: detectNames(text),
        signatures: estimateSignatures(text),
        counties: detectCounties(text),
        importance: calculateImportance(text),
        value: estimateValue(text),
        buyers: suggestBuyers(text)
    };

    return report;

}

function detectDocumentType(text){

    const t=text.toLowerCase();

    if(t.includes("last will")) return "Last Will and Testament";

    if(t.includes("probate")) return "Probate Record";

    if(t.includes("administrator")) return "Probate Administration";

    if(t.includes("deed")) return "Land Deed";

    if(t.includes("indenture")) return "Indenture";

    if(t.includes("survey")) return "Land Survey";

    if(t.includes("grant")) return "Land Grant";

    if(t.includes("marriage")) return "Marriage Record";

    if(t.includes("birth")) return "Birth Record";

    if(t.includes("death")) return "Death Record";

    if(t.includes("letter")) return "Letter";

    return "Unknown Historical Document";

}

function detectDate(text){

    const years=text.match(/\b(16|17|18|19)\d{2}\b/g);

    if(years && years.length>0){

        return years[0];

    }

    return "Unknown";

}

function detectNames(text){

    const regex=/\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)+/g;

    const matches=text.match(regex)||[];

    return [...new Set(matches)].sort();

}

function estimateSignatures(text){

    let total=0;

    const lower=text.toLowerCase();

    if(lower.includes("signed")) total++;

    if(lower.includes("seal")) total++;

    if(lower.includes("witness")) total++;

    return total;

}

function detectCounties(text){

    const regex=/([A-Z][a-z]+ County)/g;

    return [...new Set(text.match(regex)||[])];

}

function calculateImportance(text){

    let score=25;

    const lower=text.toLowerCase();

    if(lower.includes("texas")) score+=10;

    if(lower.includes("republic")) score+=20;

    if(lower.includes("land")) score+=10;

    if(lower.includes("grant")) score+=10;

    if(lower.includes("governor")) score+=15;

    if(lower.includes("judge")) score+=10;

    if(lower.includes("survey")) score+=5;

    if(lower.includes("probate")) score+=5;

    if(score>100) score=100;

    return score;

}

function estimateValue(text){

    const score=calculateImportance(text);

    if(score>=90)
        return "$5,000+ (Preliminary Estimate)";

    if(score>=75)
        return "$1,500–$5,000";

    if(score>=60)
        return "$500–$1,500";

    if(score>=40)
        return "$200–$500";

    return "Under $200";

}

function suggestBuyers(text){

    const buyers=[];

    buyers.push("Historical collectors");

    buyers.push("Genealogists");

    buyers.push("County historical societies");

    if(text.toLowerCase().includes("texas")){

        buyers.push("Texas State Library & Archives");

        buyers.push("Texas manuscript collectors");

    }

    if(text.toLowerCase().includes("land")){

        buyers.push("Land history researchers");

    }

    if(text.toLowerCase().includes("military")){

        buyers.push("Military history collectors");

    }

    return buyers;

}
