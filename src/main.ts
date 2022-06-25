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

    const breakfastHTML: any = document.querySelectorAll(
      "tbody > tr:nth-child(2)"
    );
    const lunchHTML: any = document.querySelectorAll("tbody > tr:nth-child(4)");
    const dinnerHTML: any = document.querySelectorAll(
      "tbody > tr:nth-child(6)"
    );
    let daysHTML: any = document.querySelectorAll("figure + p > strong");

    const numberOfTables = document.querySelectorAll("table").length;

    let days = [""];

    if (numberOfTables === 1) {
      // Checks if the first day has a table
      if (
        document.querySelector("p + figure")?.children.toString() ===
        "[object HTMLTableElement]"
      ) {
        days = [daysHTML[0].innerText.toString()];
      } else {
        days = [daysHTML[1].innerText.toString()];
      }
    } else {
      console.log("1 tabela");
      days = [
        daysHTML[0].innerText.toString(),
        daysHTML[1].innerText.toString(),
      ];
    }

    const titles = days.map((_, index) => {
      return {
        breakfast: breakfastTitle[index].innerText,
        lunch: lunchTitle[index].innerText,
        dinner: dinnerTitle[index].innerText,
      };
    });

    const parseMenu = (menu: any): string => {
      return menu
        .toString()
        .split("\n")
        .map((meal: string, index: number) => {
          if (index === 0) {
            return `\n*-* ${meal.trim()}`;
          }
          return `*-* ${meal.trim()}`;
        })
        .join("\n");
    };

    const menus = days.map((_, index) => {
      return {
        breakfast: parseMenu(breakfastHTML[index].innerText),
        lunch: parseMenu(lunchHTML[index].innerText),
        dinner: parseMenu(dinnerHTML[index].innerText),
      };
    });

    let menuResponse = [];

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

    return menuResponse;
  });

  console.log(response);

  await browser.close();
};

main();
