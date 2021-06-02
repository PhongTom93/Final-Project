const { Builder, By, until, WebDriver } = require('selenium-webdriver');
var mocha = require('mocha')
const Page = require('../commands/Page');
//const sign = require('../locator.json');

var assert = require('assert');
const Home_Page = require('../data/Home_Page.json');
const Signin_Page = require('../data/Signin_Page.json');
const Contact_us= require('../data/Contact us_Page.json')
const { sign } = require('crypto');

describe('Final Project', async function () {
    describe('#checkIndex negative()', async function () {
        
        var page = new Page()
        //////////TC1//////////////////////////////
        // it ('Create Account Error', async function () { 
        //     await page.getweb(Home_Page.URLweb);
        //     await page.click(Signin_Page.btn_signin);
        //     await page.senKey(Signin_Page.box_emailcreate,Signin_Page.invalidemail);
        //     await page.click(Signin_Page.btn_creatacc);
        //     await page.compareStr(Signin_Page.box_creatacc_error,Signin_Page.mess_createacc_error);
        //     await page.closeweb();

        // })
        // /////////////TC2////////////////////////
        // it('Create Account Sucessful', async function(){
        //     await page.getweb(Home_Page.URLweb);
        //     await page.click(Signin_Page.btn_signin);
        //     await page.senKey(Signin_Page.box_emaillogin, Signin_Page.email);
        //     await page.click(Signin_Page.btn_creatacc);
        //     await page.closeweb();
        // })

        ////////////////TC3////////////////////////////
        // it ('Newsletter', async function(){
        //     await page.getweb(Home_Page.URLweb);
        //     await page.senKey(Home_Page.box_newsletter, Signin_Page.email);
        //     await page.click(Home_Page.btn_newsletter);
        //     await page.compareStr(Home_Page.box_newsletter_success, Home_Page.mess_newsletter);
        //     await page.closeweb();
        // })

        ///////////////////////TC4////////////////////////////////
        // it ('Contact Us', async function(){
        //     await page.getweb(Home_Page.URLweb);
        //     await page.click(Contact_us.btn_contactus);
        //     await page.click_xpath(Contact_us.btn_contact_subject);npm 
        //     await page.click_xpath(Contact_us.btn_contact_Customer);
        //     await page.senKey(Contact_us.box_emaillogin, Signin_Page.email);
        //     await page.senKey(Contact_us.box_contact_order, Contact_us.oder_reference);
        //     await page.uploadFile(Contact_us.btn_contact_fileUpload, Contact_us.link_upFile);
        //     await page.senKey(Contact_us.box_contact_message, "Test Selenium");
        //     await page.click(Contact_us.btn_contact_submitmess);
        //     await page.checkmessage(Contact_us.box_contact_sucess, Contact_us.expect_mess_contact);
        // })

        ////////////////////TC5/////////////////////////////////
        // it(('Check Search'), async function(){

        //     await page.getweb(Home_Page.URLweb);
        //     await page.senKey(Home_Page.box_Search, "Test Selenium");
        //     await page.check_mess(Home_Page.box_Search,Home_Page.check_text);
        //     await page.check_Search(Home_Page.box_Search);
        //     await page.closeweb();
        // })

        /////////////////TC6-7//////////////////////////////////
        // it(('Search'), async function(){
        //     await page.getweb(Home_Page.URLweb);
        //     await page.senKey(Home_Page.box_Search, "Dress");
        //     await page.await(5000);
        //     await page.checkSearch();
        //     await page.searchWrong()
        //     await page.closeweb();
        // })

        //////////////TC8/////////////////////////////////////
        it('Buy Product', async function () {

            await page.getweb(Home_Page.URLweb);

            await page.login(Signin_Page.btn_signin,Signin_Page.box_emaillogin,account.email,account.box_password,account.password,account.btn_submitlogin,account.btn_homepage);

            await page.click(account.xpath_product[0]);
            await page.click(account.btn_add_to_cart);
            await page.click_css(account.btn_continue_shopping);
            await page.click(account.btn_quality_plus);
            await page.click(account.btn_add_to_cart);

            await page.click_css(account.btn_checkout);
            await page.checkprice(account.box_total_price);
            await page.click(account.btn_checkout_sumary);
            await page.click(account.btn_checkout_adress);
            await page.click(account.check_box);
            await page.click(account.btn_checkout_ship);
            await page.click(account.box_pay_by_check);
            await page.click(account.btn_checkout_final); 
            await page.check_buy_sucess(account.box_mess_sucess, account.mess_order_sucess);
            await page.closeweb();
        })


        ///////////////////////TC9///////////////////////////////
        // it('Buy Product Edit Information', async function(){
        //     await page.getweb(account.URLweb);
        //     await page.login(account.btn_signin,account.box_emaillogin,account.email,account.box_password,account.password,account.btn_submitlogin,account.btn_homepage);  
        //     await page.checkEl_Addcart();
        //     await page.getTextFunc();
        //     await page.click(account.btn_checkout_sumary);
        //     await page.click(account.btn_checkout_adress);
        //     await page.click(account.btn_checkout_ship);
        //     await page.click(account.btn_close_alert);
        //     await page.click(account.check_box);
        //     await page.click(account.btn_checkout_ship);
        //     await page.click(account.box_pay_by_check);
        //     await page.click(account.btn_checkout_final);
        //     await page.check_buy_sucess(account.box_mess_sucess, account.mess_order_sucess);
        // })

        ///////////////////TC10////////////////////////////////////
        // it('Buy sale', async function(){
        //     await page.getweb(account.URLweb);
        //     await page.login(account.btn_signin,account.box_emaillogin,account.email,account.box_password,account.password,account.btn_submitlogin,account.btn_homepage);
        //     await page.FindSale();
        //     await page.closeweb();
            
        // })
        ////////////////////TC11///////////////////////////////////

        // it('View Large', async function(){
        //     await page.getweb(account.URLweb);
        //     await page.ViewLagre();
        //     await page.closeweb();
        // })


        ///////////////////TC12////////////////////////////////////
        // it('Share to TWitter', async function(){
        //     await page.getweb(account.URLweb);
        //     var count = Math.floor(Math.random() * 7);
        //     await page.click(account.product[count].xpath);
        //     await page.switchWindows();

        //     await page.senKey(account.box_signin_tweet_email,account.email);
        //     await page.senKey(account.box_signin_tweet_pass,account.password);
        //     await page.click(account.btn_login_tweet);
        //     await page.click(account.btn_tweet);
            
        // })

        ///////////////////////TC14//////////////////////////
        // it('Send to friend', async function(){
        //     await page.getweb(account.URLweb);
        //     var count = Math.floor(Math.random() * 7);
        //     await page.click(account.product[count].xpath);
        //     await page.click(account.btn_send_email);
        //     //await page.switchFrame();
        //     await page.senKey(account.box_friend_name,account.invalidemail);
        //     await page.senKey(account.box_friend_mail,account.email);
        //     //await page.click(account.btn_send);
        //     await page.switchAlert();
        //     // var Text= page.getTextEl(account.box_sendmail);
        //     // console.log('----------'+Text);
        //     // assert.strictEqual(Text,account.mess_sendmail_sucess);

        // })
        //await page.getweb("http://automationpractice.com/index.php");
        //await page.getProductList();
    });
});




// //const { Builder, Buy, Key, util } = require("selenium-webdriver");
// const{Builder, By} = require('selenium-webdriver')
// async function example() {
//     let driver = await new Builder().forBrowser("chrome").build();
    
//     await driver.get("http://google.com");
//     await driver.findElement(By.name("q").sendKeys("Selenium", Key.RETURN));
// }
// example();
