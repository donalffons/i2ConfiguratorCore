/*jshint esversion: 6 */

const puppeteer = require('puppeteer');
const delay = require('delay');

exports.allTests = async function(test){
    test.equals(1, 5, "Dummy test");
    process.on('unhandledRejection', up => { throw up });

    console.log("Waiting 3 seconds for server to load up...\n");
    await delay(3000);
    console.log('Continuing...\n');

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(1000*60*5);
    page.on('console', function(msg) { console.log('browser console: ', msg.text()); });
    page.on("pageerror", function(err) { console.log("browser page error: " + err.toString()); test.ok(false); });
    page.on("error", function(err) { console.log("browser error: " + err.toString()); test.ok(false); });
    page.on("response", function(response) { console.log("server response: " + response._status); test.ok(response._status <= 400, "server/client error"); });
    await page.goto('http://127.0.0.1:3000/test/test01.html', {waitUntil: 'networkidle2'});

    await console.log("-----Finish Testing-----\n");
    await browser.close();
    test.done();
};
