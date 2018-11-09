
var SunCalc = require('./suncalc'),
    t = require('tap'),
    execSync = require('child_process').execSync,
    fs = require('fs');

function near(val1, val2, margin) {
    return Math.abs(val1 - val2) < (margin || 1E-15);
}

var date = new Date('2013-03-05UTC'),
    lat = 50.5,
    lng = 30.5;

var testTimes = {
    solarNoon: '2013-03-05T10:10:57Z',
    nadir: '2013-03-04T22:10:57Z',
    sunrise: '2013-03-05T04:34:56Z',
    sunset: '2013-03-05T15:46:57Z',
    sunriseEnd: '2013-03-05T04:38:19Z',
    sunsetStart: '2013-03-05T15:43:34Z',
    dawn: '2013-03-05T04:02:17Z',
    dusk: '2013-03-05T16:19:36Z',
    nauticalDawn: '2013-03-05T03:24:31Z',
    nauticalDusk: '2013-03-05T16:57:22Z',
    nightEnd: '2013-03-05T02:46:17Z',
    night: '2013-03-05T17:35:36Z',
    goldenHourEnd: '2013-03-05T05:19:01Z',
    goldenHour: '2013-03-05T15:02:52Z'
};

t.test('getPosition returns azimuth and altitude for the given time and location', function (t) {
    var sunPos = SunCalc.getPosition(date, lat, lng);

    t.ok(near(sunPos.azimuth, -2.5003175907168385), 'azimuth');
    t.ok(near(sunPos.altitude, -0.7000406838781611), 'altitude');
    t.end();
});

t.test('getTimes returns sun phases for the given date and location', function (t) {
    var times = SunCalc.getTimes(date, lat, lng);

    for (var i in testTimes) {
        t.equal(new Date(testTimes[i]).toUTCString(), times[i].toUTCString(), i);
    }
    t.end();
});

t.test('getMoonPosition returns moon position data given time and location', function (t) {
    var moonPos = SunCalc.getMoonPosition(date, lat, lng);

    t.ok(near(moonPos.azimuth, -0.9783999522438226), 'azimuth');
    t.ok(near(moonPos.altitude, 0.014551482243892251), 'altitude');
    t.ok(near(moonPos.distance, 364121.37256256194), 'distance');
    t.end();
});

t.test('getMoonIllumination returns fraction and angle of moon\'s illuminated limb and phase', function (t) {
    var moonIllum = SunCalc.getMoonIllumination(date);

    t.ok(near(moonIllum.fraction, 0.4848068202456373), 'fraction');
    t.ok(near(moonIllum.phase, 0.7548368838538762), 'phase');
    t.ok(near(moonIllum.angle, 1.6732942678578346), 'angle');
    t.end();
});

t.test('getMoonTimes returns moon rise and set times', function (t) {
    var moonTimes = SunCalc.getMoonTimes(new Date('2013-03-04UTC'), lat, lng, true);

    t.equal(moonTimes.rise.toUTCString(), 'Mon, 04 Mar 2013 23:54:29 GMT');
    t.equal(moonTimes.set.toUTCString(), 'Mon, 04 Mar 2013 07:47:58 GMT');

    t.end();
});

t.test('there is no console.logs', function (t) {
    var file = fs.readFileSync('./suncalc.js', 'utf8');

    t.equal(file.includes('console.log'), false);

    t.end();
});

t.skip('getTimes day detection works with a variety of date times', function (t) {
    var latitude = 47.606209;
    var longitude = -122.332069;
    var targetDay = 4;
    var dateStrings = [
        'Mon, 04 Mar 2013 00:00:01 PDT',
        'Mon, 04 Mar 2013 12:00:00 PDT',
        'Mon, 04 Mar 2013 23:59:59 PDT'
    ];
    for (var i = 0, l = dateStrings.length; i < l; i++) {
        var dateString = dateStrings[i];
        var date = new Date(dateString);
        var times = SunCalc.getTimes(date, latitude, longitude);
        t.equal(times.solarNoon.getDate(), targetDay, dateString);
    }

    t.end();
});

t.test('should test that rebase exist', (t) => {
    const commit = execSync('git log HEAD~1', {encoding: 'utf8'}).trim();

    const areMessgAvailable = (
        commit.includes('Added my super cool test jajeejeajaja') &&
        commit.includes('Check coordinates') &&
        commit.includes('Added tests')
    );

    t.equal(areMessgAvailable, true);
});

t.test('should test that rebase exist', (t) => {
    t.equal();
});
t.test('should test that rebase exist', (t) => {
    t.equal();
});
t.test('should test that rebase exist', (t) => {
    t.equal();
});
