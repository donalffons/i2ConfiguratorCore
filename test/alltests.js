/*jshint esversion: 6 */

const puppeteer = require('puppeteer');
const delay = require('delay');

exports.allTests = async function(test){
    test.equals(1, 1, "Dummy test");
    process.on('unhandledRejection', up => { throw up });

    console.log("Waiting 3 seconds for server to load up...\n");
    await delay(3000);
    console.log('Continuing...\n');

    const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']});
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(1000*60*5);
    page.on("pageerror", function(err) { console.log("browser page error: " + err.toString()); test.ok(false); });
    page.on("error", function(err) { console.log("browser error: " + err.toString()); test.ok(false); });
    page.on("response", function(response) { console.log("server response: " + response._status); test.ok(response._status <= 400, "server/client error"); });
    
    async function testFinished() {
        return new Promise(function(resolve, reject) {
            page.on('console', function(msg) {
                console.log('browser console: ', msg.text());
                if(msg.text() == "---TEST FINISHED---") {
                    resolve();
                }
                if(msg.type() == "error") {
                    test.ok(false);
                }
            });
        });
    }
    
    await console.log("---Starting Test: testphpinfo---\n");
    await page.goto('http://localhost/test/testphpinfo.php', {waitUntil: 'load'});
    let bodyHTML = await page.evaluate(() => document.body.innerHTML);
    console.log(bodyHTML);
    await console.log("---Finished Test: testphpinfo---\n");

    await console.log("---Starting Test: test01---\n");
    await page.goto('http://localhost/test/test01.html', {waitUntil: 'load'});
    await testFinished();
    await console.log("---Finished Test: test01---\n");

    await console.log("---Starting Test: test02---\n");
    await page.goto('http://localhost/test/test02.html', {waitUntil: 'load'});
    await testFinished();
    await console.log("---Finished Test: test02---\n");

    await console.log("---Finished all tests---\n");
    await browser.close();
    test.done();
};
