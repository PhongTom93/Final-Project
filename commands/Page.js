const { Builder, By, until, ElementNotInteractableException, ElementClickInterceptedException, WebElement, WebDriver } = require('selenium-webdriver');
//const { alertIsPresent, elementTextContains } = require('selenium-webdriver/lib/until');
//const {By, until} = require('selenium-webdriver');
var debug = require('debug');
var webdriver = require('selenium-webdriver');
var assert = require('assert');

const Home_Page = require('../data/Home_Page.json');
const Signin_Page = require('../data/Signin_Page.json');
const Contact_us = require('../data/Contact us_Page.json');
const Checkout = require('../data/Checkout.json');
const { win32 } = require('path');
//const { exception } = require('console');

class Page {
    constructor() {

        const driver = new Builder().forBrowser("chrome").build();
        const actions = driver.actions({async: true});
        var nodeURL = 'http://10.10.31.211:6666/wd/hub'
        // var driver = new webdriver.Builder()
        //     .usingServer(nodeURL)
        //     .withCapabilities(webdriver.Capabilities.chrome())
        //     .build();

        this.getweb = async function (ULR) {
            await driver.get(ULR);
        };

        this.closeweb = async function () {
            (await driver).quit();
        };

        this.maximizePage = async function () {
            driver.manage().window().maximize();
        }

        this.click = async function (xpath) {
            let el = await this.findElementByXpath(xpath, 10000);
            await el.click();

        };

        this.click_xpath = async function (xpath) {

            let el = await driver.findElement(By.xpath(xpath));
            await el.click();
        }
        this.click_css = async function (css) {
            let el = await this.findElementByCss(css, 10000)
            await el.click()
        };


        this.log = async function (xpath) {
            console.log(xpath)
        }

        this.await = async function (time_delay) {
            (await driver).sleep(time_delay);
        }

        this.senKey = async function (xpath, key) {
            let keys = await this.findElementByXpath(xpath);
            await keys.sendKeys(key);
        };

        this.checkprice = async function (xpath) {
            let gettext = await this.findElementByXpath(xpath).getText();
            console.log(gettext);
            assert.equal(gettext, "$51.53");
        };

        this.check_mess = async function (xpath, check_text) {
            let text = await this.findElementByXpath(xpath).getAttribute("value");
            //console.log(text);
            assert.notStrictEqual(text, "Search");
        };

        this.check_Search = async function (xpath) {
            let clear = await this.findElementByXpath(xpath).clear();
            //console.log(clear);
            let check = await this.findElementByXpath(xpath).getAttribute("placeholder");
            //console.log(check);
            assert.equal(check, "Search");
        };

        this.check_buy_sucess = async function (xpath, mess_order_sucess) {
            let check_sucess = await this.findElementByXpath(xpath).getText();
            assert.equal(check_sucess, mess_order_sucess);
        };

        this.uploadFile = async function (xpath, link) {
            let uploadFile = await this.findElementByXpath(xpath);
            uploadFile.sendKeys(link);
        };

        this.findElementByXpath = function (xpath, timeout) {
            const el = driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
            return driver.wait(until.elementIsVisible(el), timeout);
        };

        this.findElementByCss = function (css, timeout) {
            const el = driver.wait(until.elementLocated(By.css(css)), timeout);
            return driver.wait(until.elementIsVisible(el), timeout);
        };

        this.login = async function () {
            await this.click(Signin_Page.btn_signin);
            await this.senKey(Signin_Page.box_emaillogin, Signin_Page.email);
            await this.senKey(Signin_Page.box_password, Signin_Page.password);
            await this.click(Signin_Page.btn_submitlogin);
            await this.click(Home_Page.btn_homepage);
            await this.maximizePage()
        }

        this.add_check_price = async function () {
            let price_list= await this.getPriceList();
            var product_list = await this.getProductList()
            this.await(5000)
            let index = Math.floor(Math.random() * (product_list.length - 1));
            await (product_list[index]).click()
            this.await(5000)
            await this.click(Checkout.btn_add_to_cart);
            await this.click(Checkout.btn_continue_shopping);
            await this.click(Checkout.btn_quality_plus);
            await this.click(Checkout.btn_add_to_cart);
            await this.click_css(Checkout.btn_checkout); 
            let check_price = price_list[index] *3 + 2;
            let total_price = await this.findElementByXpath(Checkout.box_total_price).getText();
            total_price= total_price.substr(1)
            total_price.substr(check_price)
            
            
        }

        this.TotalPrice = async () => {
            var TotalPriceArray = new Array(7);
            var showList = await this.getPrice();
            //console.log(showList);
            for (var j = 0; j < 7; j++) {
                //console.log(showList[j])
                let total = (showList[j] * 3).toFixed(2);
                //console.log(total);
                TotalPriceArray[j] = total;
                //console.log(TotalPriceArray[j]);
            }
            //console.log(TotalPriceArray);
            return TotalPriceArray()
        }

        this.checkEl_Addcart = async function () {
            for (var i = 0; i < 5; i++) {
                let product_list = await this.getProductList()
                let index = Math.floor(Math.random() * 7)
                await product_list[index].click()
                await this.click(Checkout.btn_add_to_cart)
                await this.click(Checkout.btn_continue_shopping)
                await this.click(Home_Page.btn_homepage);
            }

        }

        this.ChangeQuantity = async function () {
            await this.click(Home_Page.btn_view_cart);
            var quantity = await driver.findElements(By.xpath(Home_Page.locator_quantity));
            let quantity_cart = new Array();
            let i = 0;
            for (let x of quantity) {
                quantity_cart[i] = await x.getAttribute('value');
                i++;

            }
            for (let j = 0; j < quantity_cart.length; j++) {
                if (quantity_cart[j] == 1) {
                    quantity_cart[j] = 3;
                    break;
                }
                break;
            }
        }

        this.DeleteProduct = async function(){
            var deleteList = await driver.findElements(By.xpath(Checkout.btn_delete));
            let count = Math.floor(Math.random() * (deleteList.length - 1));
            await deleteList[count].click()
        }


        this.checkSearch = async function () {
            this.await(3000);
            await driver.wait(until.elementLocated(By.xpath(Home_Page.box_search_result)), 50000);
            let search = await driver.findElements(By.xpath(Home_Page.box_search_result));
            let search_result = new Array();
            let i = 0;
            for (let x of search) {
                search_result[i] = await x.getText();
                i++;
            }
            for (let j = 0; j < search_result.length; j++) {
                search_result[j].includes("dress");
            }

            let count = Math.floor(Math.random() * (search.length - 1));
            await search[count].click();
            var verify_text = await (await driver).findElement(By.xpath(Home_Page.box_name_search)).getText();
            search_result[count].includes(verify_text);
        }

        this.searchWrong = async function () {
            await this.senKey(Home_Page.box_Search, "dressss");
            await this.click(Home_Page.btn_submit_search);
            let mess = await (await this.findElementByXpath(Home_Page.box_warning_search)).getText();
            console.log(mess);
            assert.equal(Home_Page.mess_warning_search, mess);
        }


        this.DissmissAlert = async function () {
            const alert = driver.wait(until.alertIsPresent());
            return driver.wait(until.alertIsPresent());

        }

        this.getProductList = async function () {

            var product_list = await driver.findElements(By.xpath(Home_Page.product_list));
            return product_list;
            //console.log(product_list);

        }

        this.getPriceList = async function(){

            var price = await driver.findElements(By.xpath(Home_Page.price_list));
            //console.log("-------------" + price_list)
            let price_list = new Array();
            let i = 0;
            for (let x of price) {
                price_list[i] = await x.getText();
                i++;
            }
            for (let j=0; j<price_list.length; j++) {
                if (price_list[j].charAt(0) == '$') price = price_list[j].substr(1);
                price_list[j] = price;
            }
            //console.log(price_list)
            return price_list;


        }

        this.GetDiscount = async function(){
            let Add_List = await this.Get_add_List()
            //console.log(Add_List)
            let DiscountList = await driver.findElements(By.xpath(Home_Page.discount_list));
            let i = 0;
            var Discount = new Array()
            for (let x of DiscountList) {
                Discount[i] = await x.getText();
                i++;
            }
            let index = Math.floor(Math.random() * (Discount.length - 1));
            driver.executeScript("window.scrollBy(0,1000)")
            //console.log(Discount)
            if( DiscountList[index]=="-20%"){
                await DiscountList[index].click()
                await actions.move(DiscountList[index]).pause(5000).perform();
            }
            for (let j=0; j<Add_List.length; j++){
                if(await driver.wait(until.elementLocated(Add_List[j])))
                {
                    await Add_List[j].click()
                }
            }

        }
        
        this.Get_add_List = async function(){
            var Add_List = await driver.findElements(By.xpath(Checkout.btn_add));
            return Add_List
        }

        this.compareStr = async function (xpath, check_mess) {
            let text = await this.findElementByXpath(xpath).getText();
            text.includes(check_mess)

        }

    }
}

module.exports = Page;
