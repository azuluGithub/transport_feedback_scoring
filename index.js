const fs = require('fs');

const avgRouteScoresPerDayOfWeek = () => {
    //read from reference-data.txt and scores.txt to arrays
    let refDataArr = [];
    let scoresArr = [];

    fs.readFileSync('reference-data.txt', 'utf-8').split(/\r?\n/).forEach(function(line) {
        refDataArr.push(line);
    })

    fs.readFileSync('scores.txt', 'utf-8').split(/\r?\n/).forEach(function(line) {
        scoresArr.push(line);
    })

    //create and initialize result object for storing routes and days of week
    let resObj = {};
    let i = 0;
    while (i < refDataArr.length) {
        //grab route_id and route_name and insert into result object together with days of week
        let routeId = refDataArr[i].split(" ")[0];
        let routeName = refDataArr[i].split(";")[1];

        resObj[routeId] = {
            name: routeName,
            Mon: { sum: 0, count: 0, avg: 0 },
            Tue: { sum: 0, count: 0, avg: 0 },
            Wed: { sum: 0, count: 0, avg: 0 },
            Thu: { sum: 0, count: 0, avg: 0 },
            Fri: { sum: 0, count: 0, avg: 0 },
            Sat: { sum: 0, count: 0, avg: 0 },
            Sun: { sum: 0, count: 0, avg: 0 }
        }
        i++;
    }

    //calculate sum of scores and number of numbers [count]
    let j = 0;
    while (j < scoresArr.length) {
        //grab day and score from strings on scoresArr
        let fullDate = scoresArr[j].split(";")[0];
        let day = fullDate.split("/")[2];
        let score = parseInt(scoresArr[j].split(" ")[1]);
        let routeIdWithDate =  scoresArr[j].split(" ")[0];
        let routeId = routeIdWithDate.split(";")[1];

        //Mondays
        if (day === '01' || day === '08' || day === '15') {
            if (score > 0 && score < 10) { //0 and 10 is ignored
                resObj[routeId].Mon.sum += score;
                resObj[routeId].Mon.count += 1;
                if (resObj[routeId].Mon.count !== 0) {
                    resObj[routeId].Mon.avg = (resObj[routeId].Mon.sum / resObj[routeId].Mon.count);
                }
            }
        }
        //Tuesdays
        if (day === '02' || day === '09' || day === '16') {
            if (score > 0 && score < 10) { //0 and 10 is ignored
                resObj[routeId].Tue.sum += score;
                resObj[routeId].Tue.count += 1;
                if (resObj[routeId].Tue.count !== 0) {
                    resObj[routeId].Tue.avg = (resObj[routeId].Tue.sum / resObj[routeId].Tue.count);
                }
            }
        }
        //Wednesdays
        if (day === '03' || day === '10' || day === '17') {
            if (score > 0 && score < 10) { //0 and 10 is ignored
                resObj[routeId].Wed.sum += score;
                resObj[routeId].Wed.count += 1;
                if (resObj[routeId].Wed.count !== 0) {
                    resObj[routeId].Wed.avg = (resObj[routeId].Wed.sum / resObj[routeId].Wed.count);
                }
            }
        }
        //Thursdays
        if (day === '04' || day === '11' || day === '18') {
            if (score > 0 && score < 10) { //0 and 10 is ignored
                resObj[routeId].Thu.sum += score;
                resObj[routeId].Thu.count += 1;
                if (resObj[routeId].Thu.count !== 0) {
                    resObj[routeId].Thu.avg = (resObj[routeId].Thu.sum / resObj[routeId].Thu.count);
                }
            }
        }
        //Fridays
        if (day === '05' || day === '12' || day === '19') {
            if (score > 0 && score < 10) { //0 and 10 is ignored
                resObj[routeId].Fri.sum += score;
                resObj[routeId].Fri.count += 1;
                if (resObj[routeId].Fri.count !== 0) {
                    resObj[routeId].Fri.avg = (resObj[routeId].Fri.sum / resObj[routeId].Fri.count);
                }
            }
        }
        //Saturdays
        if (day === '06' || day === '13' || day === '20') {
            if (score > 0 && score < 10) { //0 and 10 is ignored
                resObj[routeId].Sat.sum += score;
                resObj[routeId].Sat.count += 1;
                if (resObj[routeId].Sat.count !== 0) {
                    resObj[routeId].Sat.avg = (resObj[routeId].Sat.sum / resObj[routeId].Sat.count);
                }
            }
        }
        //Sundays
        if (day === '07' || day === '14' || day === '21') {
            if (score > 0 && score < 10) { //0 and 10 is ignored
                resObj[routeId].Sun.sum += score;
                resObj[routeId].Sun.count += 1;
                if (resObj[routeId].Sun.count !== 0) {
                    resObj[routeId].Sun.avg = (resObj[routeId].Sun.sum / resObj[routeId].Sun.count);
                }
            }
        }
        j++;
    }
    
    //sorting data in descending order
    let resultArr = [];
    for (let route in resObj) {

        let sortable = [
            [resObj[route].name, "Monday", resObj[route].Mon.avg], 
            [resObj[route].name, "Tuesday", resObj[route].Tue.avg], 
            [resObj[route].name, "Wednesday", resObj[route].Wed.avg], 
            [resObj[route].name, "Thursday", resObj[route].Thu.avg], 
            [resObj[route].name, "Friday", resObj[route].Fri.avg], 
            [resObj[route].name, "Saturday", resObj[route].Sat.avg], 
            [resObj[route].name, "Sunday", resObj[route].Sun.avg]
        ];

        sortable.sort(function(a, b) {
            return b[2] - a[2];
        });

        sortable.forEach(function(item) {
            resultArr.push(`${item[0]} ${item[1]} ${item[2].toFixed(2)}`);
        })
    }
    
    //printing results.txt
    fs.writeFileSync('results.txt', '');
    for (let data of resultArr) {
        fs.appendFileSync('results.txt', `${data}\n`);
    }
}

avgRouteScoresPerDayOfWeek();