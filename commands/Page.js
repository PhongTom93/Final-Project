const { Builder, By, until, ElementNotInteractableException, ElementClickInterceptedException, WebElement, WebDriver } = require('selenium-webdriver');
//const { alertIsPresent, elementTextContains } = require('selenium-webdriver/lib/until');
//const {By, until} = require('selenium-webdriver');
var debug = require('debug');
var webdriver = require('selenium-webdriver');
var assert = require('assert');
const Home_Page = require('../data/Home_Page.json');
const Signin_Page = require('../data/Signin_Page.json');
const Contact_us= require('../data/Contact us_Page.json');
//const { exception } = require('console');

class Page {
    constructor() {

        var driver = new Builder().forBrowser("chrome").build();
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

        this.click_xpath = async function(xpath){

            let el= await driver.findElement(By.xpath(xpath));
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
        
        this.login = async function (btn_signin, box_emaillogin, email, box_password, password, btn_submitlogin, btn_homepage) {
            await this.click(btn_signin);
            await this.senKey(box_emaillogin, email);
            await this.senKey(box_password, password);
            await this.click(btn_submitlogin);
            await this.click(btn_homepage);
        }

        this.getPrice = async () => {
            var priceArray = new Array(7);
            for (var i = 0; i < 7; i++) {
                var price = await (await driver.findElement(By.xpath(account.product[i].price)).getText());
                while (price.charAt(0)=='$') price=price.substr(1);
                //console.log(price);
                priceArray[i] = price;
                //console.log(priceArray[i]);
            }
            //console.log(priceArray);
            return priceArray;
            
        }
        this.add_product = async function(){
            var count = Math.floor(Math.random() * 7);
            var product = product_list[count];
            product.click();
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

        this.checkEl_Addcart = async function(){
                for (var i=0;i<5;i++){
                    let count = Math.floor(Math.random() * 7);
                    await this.click(account.product[count].add_to_cart);
                    await this.await(3000);
                    await this.click(account.btn_continue_shopping);
                    await this.await(3000);
                }
                
            }

        this.getTextFunc =async function(){
            await this.click(account.btn_view_cart);
            var quantity = await driver.findElements(By.xpath(account.locator_quantity));
            //console.log(quantity);
            let quantity_cart = new Array();
            let i=0;
            for (let x of quantity){
                quantity_cart[i] = await x.getAttribute('value');  
                i++;

            }
            //console.log('--------'+quantity_cart);
            for (let j=0; j<quantity_cart.length; j++)
            {
                if(quantity_cart[j]==1){
                    quantity_cart[j]=3;
                    break;
                }
                break;
            }
            //console.log('--------'+quantity_cart);
            var deleteList_Array = new Array();
            let z=0;
            var deleteList = await driver.findElements(By.xpath(account.btn_delete));
            //console.log(deleteList);
            for(let y of deleteList){
                deleteList_Array[z]= await y.getAttribute('id');
                z++;
            }
            //console.log(deleteList_Array);
            let count = Math.floor(Math.random() * (deleteList_Array.length-1));
            let product_delete = "//*[@id='" + deleteList_Array[count] + "']";
            console.log(product_delete);
            await this.click(product_delete);
        }

        this.checkSearch = async function(){
            this.await(3000);
            //let search = await driver.findElements(By.xpath(account.box_search_result));
            await driver.wait(until.elementLocated(By.xpath(Home_Page.box_search_result)), 50000);
            let search = await driver.findElements(By.xpath(Home_Page.box_search_result));
            //console.log('-----'+search.length);
            
            let search_result = new Array();
            let i=0;
            for (let x of search){
                search_result[i] = await x.getText();  
                i++;  
            }
            //console.log('------'+search_result)
            for (let j = 0; j < search_result.length; j++)
            {
                //console.log('------'+search_result[i]);
                search_result[j].includes("dress");
            }
            
            let count = Math.floor(Math.random() * (search.length-1));
            await search[count].click();   
            var verify_text= await (await driver).findElement(By.xpath(Home_Page.box_name_search)).getText();
            search_result[count].includes(verify_text);
        }

        this.searchWrong = async function(){
            await this.senKey(Home_Page.box_Search,"dressss");
            await this.click(Home_Page.btn_submit_search);
            let mess= await (await this.findElementByXpath(Home_Page.box_warning_search)).getText();
            console.log(mess);
            assert.equal(Home_Page.mess_warning_search,mess);
        }


        this.DissmissAlert = async function () {
            const alert = driver.wait(until.alertIsPresent());
            return driver.wait(until.alertIsPresent());

        }

        this.getProductList = async function(){
            for (var i=0;i<5;i++){
                var product_list = await this.findElementByXpath(account.product_list);
                console.log(product_list);
               
            }     
        }
    

        this.compareStr = async function(xpath,check_mess){
            let text = await this.findElementByXpath(xpath).getText();
            text.includes(check_mess)
        }

    }
}

module.exports = Page;
