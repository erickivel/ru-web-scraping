import puppeteer from "puppeteer";

const main = async () => {
  const browser = await puppeteer.launch({ headless: false });
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

    const breakfastHTML: any = document.querySelectorAll(
      "tbody > tr:nth-child(2)"
    );
    const lunchHTML: any = document.querySelectorAll("tbody > tr:nth-child(4)");
    const dinnerHTML: any = document.querySelectorAll(
      "tbody > tr:nth-child(6)"
    );
    const daysHTML: any = document.querySelectorAll("p > strong");

    const availableTables = 

    //const days = [daysHTML[0].innerText, daysHTML[1].innerText];
    const days = [daysHTML[1].innerText];

    const titles = days.map((_, index) => {
      return {
        breakfast: breakfastTitle[index].innerText,
        lunch: lunchTitle[index].innerText,
        dinner: dinnerTitle[index].innerText,
      };
    });

    const menus = days.map((_, index) => {
      return {
        breakfast: breakfastHTML[index].innerText,
        lunch: lunchHTML[index].innerText,
        dinner: dinnerHTML[index].innerText,
      };
    });

    //const splitted = menus[0].lunch
    //.toString()
    //.split("\n")
    //.map((meal: string) => meal.trim());
    //console.log(splitted);

    let menuResponse = [];
    //if (
    //document.querySelector("p + figure")?.children.toString() ===
    //"[object HTMLTableElement]"
    //) {

    //}

    if (breakfastHTML.length === 2) {
      menuResponse = days.map((_, index) => {
        return {
          weekDay: days[index],
          breakfast: {
            title: titles[index].breakfast,
            menu: menus[index].breakfast,
          },
          lunch: {
            title: titles[index].lunch,
            menu: menus[index].lunch,
          },
          dinner: {
            title: titles[index].dinner,
            menu: menus[index].dinner,
          },
        };
      });
    } else {
      let dayIndex: number;

      // Checks if the first menu day has a table withe the menu
      if (
        document.querySelector("p + figure")?.children.toString() ===
        "[object HTMLTableElement]"
      ) {
        dayIndex = 0;
      } else {
        dayIndex = 1;
      }
      menuResponse = [
        {
          weekDay: days[dayIndex],
          breakfast: {
            title: titles[dayIndex].breakfast,
            menu: menus[dayIndex].breakfast,
          },
          lunch: {
            title: titles[dayIndex].lunch,
            menu: menus[dayIndex].lunch,
          },
          dinner: {
            title: titles[dayIndex].dinner,
            menu: menus[dayIndex].dinner,
          },
        },
      ];
    }

    return menuResponse;
  });

  console.log(response);

  //await browser.close();
};

main();
