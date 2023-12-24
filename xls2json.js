const fs = require("fs")
const readline = require("readline")

var jsonOutput = {}

if (process.argv.length !== 3) {
    console.error("Expected one command line argument")
    process.exit(1)
}


// for (let series = 1; series < 6; series++) {

const path = process.argv.at(2) == "true" ? `./data/csv-data/AmiiboChecklistSeries${1}.csv` : `./data/csv-data/AmiiboChecklistSeries${process.argv.at(2)}.csv`
// if (process.argv.at(2) != "true") {
//     series = 99999;
// }
// const path = `./data/csv-data/AmiiboChecklistSeries${series}.csv`
console.log(path)



const readStream = fs.createReadStream(path);

const readInterface = readline.createInterface({
    input: readStream
});

var output = []

// Event handler for reading lines
readInterface.on("line", (line) => {
    const row = line.split(",");
    output.push(row);
});

// Event handler for the end of file
readInterface.on("close", () => {
    // console.log(output);
    // for (let i = 0; i < output.length; i++) {
    //     console.log(output[i])
    // }
    toJson(output)
});

// Event handler for handling errors
readInterface.on("error", (err) => {
    console.error("Error reading the CSV file:", err);
});


// At this point we should have an array of all the things in the file. Now we need to parse them into
// a JSON file

// JSON structure

/*
{
    "series": [
        {
            //series 1
            "amiibos": [
                {
                    "number": "001",
                    "name": "Isabelle",
                    "jp-name": "しずえ",
                    "type": "SP"
                },
                {

                },
                ...
                {

                }
            ]
        },
        {
            //series 2
        },
        {
            //series 3
        },
        {
            //series 4
        },
        {
            //series 5
        }
    ]
} 
*/
function toJson(output) {
    for (let i = 1; i < output.length; i++) {
        for (let j = 0; j < 4; j++) {
            console.log(output[i][j])
        }
    }
}
