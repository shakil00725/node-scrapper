const puppeteer = require('puppeteer');
var fs = require("fs");

(async () => {
    try{
        const browser = await puppeteer.launch({headless:true});
        const page = await browser.newPage();
        await page.goto('https://www.imdb.com/search/title/?count=100&groups=top_1000&sort=user_rating');

        var Results = await page.evaluate(()=>{

            var names = document.querySelectorAll('h3.lister-item-header>a')
            var ratings = document.querySelectorAll('div.ratings-imdb-rating>strong')

            var result = [];
            for( var i=0;i<names.length;i++)
            {
                result[i] = {
                    name:names[i].innerText.trim(),
                    rating:ratings[i].innerText.trim(),
                } 
            }

            return result;
        })
        var jsonOutputs = JSON.stringify(Results);
        fs.writeFile("Movies.json", jsonOutputs, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }       
            console.log("The file was saved!");
        }); 
      
        await browser.close();
    }
    catch(error){
        console.log(error)
    }
})();