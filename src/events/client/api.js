const { apiKey } = process.env;
const { calendarId } = process.env;

module.exports = () => new Promise((resolve, reject) => {
    const http = require('https');
    const options = {
        hostname: 'api.teamup.com',
        path: `/${calendarId}/events?startDate=2022-11-15`,
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
                resolve({title: json.events[0].title, who: json.events[0].who, description: json.events[0].notes, startdate: json.events[0].start_dt})
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