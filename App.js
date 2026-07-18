const imageInput = document.getElementById("imageInput");
const scanBtn = document.getElementById("scanBtn");
const preview = document.getElementById("preview");
const loading = document.getElementById("loading");
const results = document.getElementById("results");

const documentType = document.getElementById("documentType");
const documentDate = document.getElementById("documentDate");
const people = document.getElementById("people");
const signatures = document.getElementById("signatures");
const importance = document.getElementById("importance");
const value = document.getElementById("value");
const buyers = document.getElementById("buyers");
const transcription = document.getElementById("transcription");

const pdfBtn = document.getElementById("pdfBtn");
const newBtn = document.getElementById("newBtn");

let selectedImages = [];

imageInput.addEventListener("change", () => {

    preview.innerHTML = "";
    selectedImages = [];

    for (const file of imageInput.files) {

        selectedImages.push(file);

        const img = document.createElement("img");

        img.src = URL.createObjectURL(file);

        preview.appendChild(img);

    }

});

scanBtn.addEventListener("click", async () => {

    if (selectedImages.length === 0) {

        alert("Please choose at least one document.");

        return;

    }

    loading.classList.remove("hidden");

    results.classList.add("hidden");

    await fakeAnalysis();

});

async function fakeAnalysis() {

    await new Promise(resolve => setTimeout(resolve,2000));

    loading.classList.add("hidden");

    results.classList.remove("hidden");

    showDemoResults();

}

function showDemoResults(){

    documentType.textContent="Historical Deed";

    documentDate.textContent="Estimated 1852";

    signatures.textContent="3 signatures detected";

    importance.textContent="86 / 100";

    value.textContent="$500 - $2,500 (Preliminary estimate)";

    transcription.value=
`Know all men by these presents...

William Ballard

John Smith

James Brown

Witnessed before the County Clerk...

`;

    people.innerHTML="";

    [
        "William Ballard",
        "John Smith",
        "James Brown"
    ].forEach(name=>{

        const li=document.createElement("li");

        li.textContent=name;

        people.appendChild(li);

    });

    buyers.innerHTML="";

    [

        "Texas collectors",

        "County historical societies",

        "Genealogists",

        "Manuscript auction houses"

    ].forEach(item=>{

        const li=document.createElement("li");

        li.textContent=item;

        buyers.appendChild(li);

    });

}

newBtn.addEventListener("click",()=>{

    imageInput.value="";

    preview.innerHTML="";

    results.classList.add("hidden");

    loading.classList.add("hidden");

    people.innerHTML="";

    buyers.innerHTML="";

    transcription.value="";

    selectedImages=[];

});

pdfBtn.addEventListener("click",()=>{

    alert("PDF export will be added in the next version.");

});
