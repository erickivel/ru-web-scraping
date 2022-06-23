import puppeteer from "puppeteer";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://pra.ufpr.br/ru/ru-centro-politecnico/");

  await page.waitForSelector("tbody");

  const response = await page.evaluate(() => {
    const breakfastTitle: any = document.querySelectorAll(
      "tbody > tr:nth-child(1)"
    );
    const lunchTitle: any = document.querySelectorAll(
      "tbody > tr:nth-child(3)"
    );
    const dinnerTitle: any = document.querySelectorAll(
      "tbody > tr:nth-child(5)"
    );

    const titles = [
      breakfastTitle[0].innerText,
      lunchTitle[0].innerText,
      dinnerTitle[0].innerText,
    ];

    const breakfast: any = document.querySelectorAll("tbody > tr:nth-child(2)");
    const lunch: any = document.querySelectorAll("tbody > tr:nth-child(4)");
    const dinner: any = document.querySelectorAll("tbody > tr:nth-child(6)");

    const menus = [
      breakfast[0].innerText,
      lunch[0].innerText,
      dinner[0].innerText,
    ];

    return {
      breakfast: {
        title: titles[0],
        menu: menus[0],
      },
      lunch: {
        title: titles[1],
        menu: menus[1],
      },
      dinner: {
        title: titles[2],
        menu: menus[2],
      },
    };
  });

  console.log(response);

  await browser.close();
};

main();
