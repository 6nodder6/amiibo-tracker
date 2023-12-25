const fs = require("fs")
const readline = require("readline")

var jsonOutput = []

if (process.argv.length !== 3) {
    console.error("Expected one command line argument")
    process.exit(1)
}

var seriesNum = process.argv.at(2)

// for (let series = 1; series < 6; series++) {

const path = process.argv.at(2) == "true" ? `./data/csv-data/AmiiboChecklistSeries${1}.csv` : `./data/csv-data/AmiiboChecklistSeries${seriesNum}.csv`
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
        // for (let j = 0; j < 4; j++) {
        jsonOutput.push({
            "number": output[i][0],
            "name": output[i][1],
            "jp-name": output[i][2],
            "type": output[i][3],
            "series": seriesNum,
            "hasPicture": false,
            "isFavorite": false,
            "datePhotoGotten": "01/01/1970"
        })
        // }
    }
    const jsonContent = JSON.stringify(jsonOutput, null, 2);
    fs.writeFile("./data/json-data/amiiboS" + seriesNum + ".json", jsonContent, "utf8", function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Saved")
    })
}
