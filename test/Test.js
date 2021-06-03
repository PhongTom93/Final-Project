const { Builder, By, until, WebDriver } = require('selenium-webdriver');
var mocha = require('mocha')
const Page = require('../commands/Page');
var assert = require('assert');
const Home_Page = require('../data/Home_Page.json');
const Signin_Page = require('../data/Signin_Page.json');
const Contact_us= require('../data/Contact us_Page.json')
const Checkout = require('../data/Checkout.json');
const TweetPage = require('../data/Tweet_Page.json')

describe('Final Project', async function () {
    describe('#checkIndex negative()', async function () {
        
        var page = new Page()
        ////////TC1//////////////////////////////
        it ('Create Account Error', async function () { 
            await page.getweb(Home_Page.URLweb);
            await page.click(Signin_Page.btn_signin);
            await page.senKey(Signin_Page.box_emailcreate,Signin_Page.invalidemail);
            await page.click(Signin_Page.btn_creatacc);
            await page.compareStr(Signin_Page.box_creatacc_error,Signin_Page.mess_createacc_error);
            await page.closeweb();

        })
        // /////////////TC2////////////////////////
        it('Create Account Sucessful', async function(){
            await page.getweb(Home_Page.URLweb);
            await page.click(Signin_Page.btn_signin);
            await page.senKey(Signin_Page.box_emaillogin, Signin_Page.email);
            await page.click(Signin_Page.btn_creatacc);
            await page.closeweb();
        })

        ////////////////TC3////////////////////////////
        it ('Newsletter', async function(){
            await page.getweb(Home_Page.URLweb);
            await page.senKey(Home_Page.box_newsletter, Signin_Page.email);
            await page.click(Home_Page.btn_newsletter);
            await page.compareStr(Home_Page.box_newsletter_success, Home_Page.mess_newsletter);
            await page.closeweb();
        })

        ///////////////////////TC4////////////////////////////////
        it ('Contact Us', async function(){
            await page.getweb(Home_Page.URLweb);
            await page.click(Contact_us.btn_contactus);
            await page.click_xpath(Contact_us.btn_contact_subject);npm 
            await page.click_xpath(Contact_us.btn_contact_Customer);
            await page.senKey(Contact_us.box_emaillogin, Signin_Page.email);
            await page.senKey(Contact_us.box_contact_order, Contact_us.oder_reference);
            await page.uploadFile(Contact_us.btn_contact_fileUpload, Contact_us.link_upFile);
            await page.senKey(Contact_us.box_contact_message, "Test Selenium");
            await page.click(Contact_us.btn_contact_submitmess);
            await page.checkmessage(Contact_us.box_contact_sucess, Contact_us.expect_mess_contact);
            await page.closeweb();
        })

        ////////////////////TC5/////////////////////////////////
        it(('Check Search'), async function(){

            await page.getweb(Home_Page.URLweb);
            await page.senKey(Home_Page.box_Search, "Test Selenium");
            await page.check_mess(Home_Page.box_Search,Home_Page.check_text);
            await page.check_Search(Home_Page.box_Search);
            await page.closeweb();
        })

        /////////////////TC6-7//////////////////////////////////
        it(('Search'), async function(){
            await page.getweb(Home_Page.URLweb);
            await page.senKey(Home_Page.box_Search, "Dress");
            await page.await(5000);
            await page.checkSearch();
            await page.searchWrong()
            await page.closeweb();
        })

        //////////////TC8/////////////////////////////////////
        it('Buy Product', async function () {
            await page.getweb(Home_Page.URLweb);
            await page.login()
            await page.add_check_price()
            await page.click(Checkout.btn_checkout_sumary);
            await page.click(Checkout.btn_checkout_adress);
            await page.click(Checkout.check_box);
            await page.click(Checkout.btn_checkout_ship);
            await page.click(Checkout.box_pay_by_check);
            await page.click(Checkout.btn_checkout_final); 
            await page.check_buy_sucess(Checkout.box_mess_sucess, Checkout.mess_order_sucess);
            await page.closeweb();
        })


        /////////////////////TC9///////////////////////////////
        it('Buy Product Edit Information', async function(){
            await page.getweb(Home_Page.URLweb)
            await page.login()  
            await page.checkEl_Addcart()
            await page.ChangeQuantity()
            await page.DeleteProduct()
            await page.click(Checkout.btn_checkout_sumary);
            await page.click(Checkout.btn_checkout_adress);
            await page.click(Checkout.btn_checkout_ship);
            await page.click(Checkout.btn_close_alert);
            await page.click(Checkout.check_box);
            await page.click(Checkout.btn_checkout_ship);
            await page.click(Checkout.box_pay_by_check);
            await page.click(Checkout.btn_checkout_final);
            await page.check_buy_sucess(Checkout.box_mess_sucess, Checkout.mess_order_sucess);
            await page.closeweb();
        })

        /////////////////TC10////////////////////////////////////
        it('Buy sale', async function(){
            await page.getweb(Home_Page.URLweb)
            await page.login()
            await page.GetDiscount()
            await page.click(Checkout.btn_checkout_sumary);
            await page.click(Checkout.btn_checkout_adress);
            await page.click(Checkout.check_box);
            await page.click(Checkout.btn_checkout_ship);
            await page.click(Checkout.box_pay_by_check);
            await page.click(Checkout.btn_checkout_final); 
            await page.check_buy_sucess(Checkout.box_mess_sucess, Checkout.mess_order_sucess);
            await page.closeweb();    
        })

        ////////////////////TC11///////////////////////////////////

        it('View Large', async function(){
            await page.getweb(Home_Page.URLweb);
            var Name_List = await page.GetProductName()
            var Product_List =  await page.getProductList()
            let index = Math.floor(Math.random() * (Product_List.length - 1))
            await Product_List[index].click()
            await page.click(Home_Page.btn_view_large)
            await page.compareStr(Home_Page.box_title_product_image_large,Name_List[index])
            //////////////////////////////////////////
            await page.click(Home_Page.btn_close_image)
            await page.findElementByXpath(Home_Page.box_quality).clear()
            await page.senKey(Home_Page.box_quality,"0")
            await page.click(Checkout.btn_add_to_cart)
            await page.compareStr(Home_Page.box_null_quantity, Home_Page.mess_null_quantity)
            await page.click(Home_Page.btn_close_null)
            //////////////////////////////////////////
            await page.findElementByXpath(Home_Page.box_quality).clear()
            await page.senKey(Home_Page.box_quality,"1")
            await page.click(Checkout.btn_add_to_cart)
            await page.compareStr(Checkout.box_add_sucess,Checkout.mess_add_sucess)
            await page.closeweb();
        })


        ///////////////////TC12////////////////////////////////////
        it('Share to TWitter', async function(){
            await page.getweb(Home_Page.URLweb);
            await page.maximizePage()
            var Product_List =  await page.getProductList()
            let index = Math.floor(Math.random() * (Product_List.length - 1))
            await Product_List[index].click()
            await page.click(TweetPage.btn_share_tweet)
            await page.SwitchWindow();

            await page.senKey(TweetPage.box_signin_tweet_email,Signin_Page.email);
            await page.senKey(TweetPage.box_signin_tweet_pass,Signin_Page.password);
            await page.click(TweetPage.btn_login_tweet);
            await page.click(TweetPage.btn_tweet);
            await page.closeweb();
        })

        ///////////////////TC13//////////////////////////////
        it('Write review', async function(){
            await page.getweb(Home_Page.URLweb)
            await page.login()
            await page.maximizePage()
            var Product_List =  await page.getProductList()
            let index = Math.floor(Math.random() * (Product_List.length - 1))
            await Product_List[index].click()
            await page.click(Home_Page.box_write_review)
            await page.senKey(Home_Page.box_title_review, "Test Selenium")
            await page.senKey(Home_Page.box_content_review, "lqa tester")
            await page.click(Home_Page.btn_send_review)
            await page.compareStr(Home_Page.box_send_review_sucess,Home_Page.mess_send_review_sucess)
            await page.closeweb();
        });

        ///////////////////////TC14//////////////////////////
        it('Send to friend', async function(){
            await page.getweb(Home_Page.URLweb);
            await page.maximizePage()
            var Product_List =  await page.getProductList()
            let index = Math.floor(Math.random() * (Product_List.length - 1))
            await Product_List[index].click()
            await page.click(Home_Page.btn_send_email);
            await page.senKey(Home_Page.box_friend_name,Signin_Page.invalidemail);
            await page.senKey(Home_Page.box_friend_mail,Signin_Page.email);
            await page.click(Home_Page.btn_send)
            await page.compareStr(Home_Page.box_sendmail_sucess, Home_Page.mess_sendmail_sucess)
            await page.closeweb();
        })
    });
});

