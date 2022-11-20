const { apiKey } = process.env;
const { calendarId } = process.env;

module.exports = () => new Promise((resolve, reject) => {

    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };

    Date.prototype.reomveDays = function (days) {
        this.setDate(this.getDate() - parseInt(days));
        return this;
    };

    let currentDate = new Date();
    let todayUpdated = currentDate.reomveDays(1).toISOString().slice(0, 10);
    const threeDaysOutDate = currentDate.addDays(3).toISOString().slice(0, 10);

    const http = require('https');
    const options = {
        hostname: 'api.teamup.com',
        path: `/${calendarId}/events?startDate=${todayUpdated}&endDate=${threeDaysOutDate}`,
        method: 'GET',
        headers: {
            'Teamup-Token': apiKey,
        },
    };
    let data = '';
    const request = http.request(options, (response) => {
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            try {
                var json = JSON.parse(data)
                let firstTitle, secondTitle, thirdTitle, fourthTitle, fifthTitle, sixthTitle;
                let firstWho, secondWho, thirdWho, forthWho, fifthWho, sixthWho;
                let firstDescription, secondDescription, thirdDescription, forthDescription, fifthDescription, sixthDescription;
                let firstStartDate, secondStartDate, thirdStartDate, forthStartDate, fifthStartDate, sixthStartDate;

                if (json.events[0] != undefined) {
                    firstTitle = json.events[0].title
                    firstWho = json.events[0].who
                    firstDescription = json.events[0].notes
                    firstStartDate = json.events[0].start_dt
                } else {
                    firstTitle, firstStartDate = "TBD EVENT"
                }
                if (json.events[1] != undefined) {
                    secondTitle = json.events[1].title
                    secondWho = json.events[1].who
                    secondDescription = json.events[1].notes
                    secondStartDate = json.events[1].start_dt
                } else {
                    secondTitle = "TBD EVENT"
                }
                if (json.events[2] != undefined) {
                    thirdTitle = json.events[2].title
                    thirdWho = json.events[2].who
                    thirdDescription = json.events[2].notes
                    thirdStartDate = json.events[2].start_dt
                } else {
                    thirdTitle = "TBD EVENT"
                }
                if (json.events[3] != undefined) {
                    fourthTitle = json.events[3].title
                    forthWho = json.events[3].who
                    forthDescription = json.events[3].notes
                    forthStartDate = json.events[3].start_dt
                } else {
                    fourthTitle = "TBD EVENT"
                }
                if (json.events[4] != undefined) {
                    fifthTitle = json.events[4].title
                    fifthWho = json.events[4].who
                    fifthDescription = json.events[4].notes
                    fifthStartDate = json.events[4].start_dt
                } else {
                    fifthTitle = "TBD EVENT"
                }
                if (json.events[5] != undefined) {
                    sixthTitle = json.events[5].title
                    sixthWho = json.events[5].who
                    sixthDescription = json.events[5].notes
                    sixthStartDate = json.events[5].start_dt
                } else {
                    sixthTitle = "TBD EVENT"
                }

                resolve({
                    firstTitle: firstTitle, secondTitle: secondTitle, thirdTitle: thirdTitle, fourthTitle: fourthTitle, fifthTitle: fifthTitle, sixthTitle: sixthTitle,
                    firstWho: firstWho, secondWho: secondWho, thirdWho: thirdWho, forthWho: forthWho, fifthWho: fifthWho, sixthWho: sixthWho,
                    firstDescription: firstDescription, secondDescription: secondDescription, thirdDescription: thirdDescription, forthDescription: forthDescription, fifthDescription: fifthDescription, sixthDescription: sixthDescription,
                    firstStartDate: firstStartDate, secondStartDate: secondStartDate, thirdStartDate: thirdStartDate, forthStartDate: forthStartDate, fifthStartDate: fifthStartDate, sixthStartDate: sixthStartDate
                })
            } catch (error) {
                console.error(error.message);
            };
        });
    });
    request.on('error', (error) => {
        console.error(error);
    });
    request.end();
});