const puppeteer = require('puppeteer');
(async () => {
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0); 
	await page.goto("https://www.nollywoodreinvented.com/list-of-all-reviews", {
    timeout: 0
  });
  
  var films = []
  var lastpage = 7
  for(let j = 1; j <= lastpage; j++){
	const data = await page.evaluate(() => {
		let movies = [];
    let i = 1
		let elements = document.querySelectorAll("div.loop.grid.row")[0].childNodes;
    
		for (element of elements) {
			movies.push({
				title: document.querySelector("#content-anchor-inner > div > div > div > div > div.content-inner > div.loop.grid.row > div:nth-child(" + i + ") > div.article-image-wrapper > div > h3 > a")?.text.trim(),
				date: document.querySelector("#content-anchor-inner > div > div > div > div > div.content-inner > div.loop.grid.row > div:nth-child(" + i + ") > div.authorship.type-date > span")?.textContent,
				review: document.querySelector("#content-anchor-inner > div > div > div > div > div.content-inner > div.loop.grid.row > div:nth-child(" + i + ") > div.article-image-wrapper > div > div.rating.user_rating.percentage_wrapper.clearfix > div")?.textContent
			})
      i++
		}
    
		return movies;
	})
  films.push(data)
  if (j <= 5) {
    await page.click("#content-anchor-inner > div > div > div > div > div:nth-child(2) > div > a:nth-child(" + j + ")");
  }else{
    await page.click("#content-anchor-inner > div > div > div > div > div:nth-child(2) > div > a:nth-child(6)");  
  }  
  await page.waitForTimeout(5000)
}
	console.log(films);
	await browser.close();
})();