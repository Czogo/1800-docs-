// ocr.js

async function runOCR(files) {

    let completeText = "";

    for (const file of files) {

        const result = await Tesseract.recognize(
            file,
            "eng",
            {
                logger: m => {

                    console.log(m);

                }
            }
        );

        completeText += "\n\n";

        completeText += result.data.text;

    }

    return completeText;

}
