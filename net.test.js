let page;

const {
  clickElement,
  getText,
  clickDay,
  clickMoviTime,
  clickSeat,
  checkCodeQR,
} = require("./lib/commands");

const { generateData } = require("./lib/util");

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Ticket booking", () => {
  beforeEach(async () => {
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  test("Positive - Should book 1 seat", async () => {
    const data = generateData();
    const moviNumber = 2;
    const timeNumber = 2;
    const rowNumber = 11;
    const seatNumber = 9;
    await clickDay(page, data);
    await clickMoviTime(page, moviNumber, timeNumber);
    await page.waitForSelector("h1");
    await clickSeat(page, rowNumber, seatNumber);
    await clickElement(page, ".acceptin-button");
    await page.waitForSelector("h1");
    await clickElement(page, ".acceptin-button");
    await checkCodeQR(page);
    const actual = await getText(page, "h2");
    expect(actual).toContain("Электронный билет");
  });

  test("Positive - Should book 3 seats", async () => {
    const data = generateData();
    const moviNumber = 2;
    const timeNumber = 2;
    const rowNumber1 = 7;
    const seatNumber1 = 8;
    const rowNumber2 = 4;
    const seatNumber2 = 5;
    const rowNumber3 = 6;
    const seatNumber3 = 7;
    await clickDay(page, data);
    await clickMoviTime(page, moviNumber, timeNumber);
    await page.waitForSelector("h1");
    await clickSeat(page, rowNumber1, seatNumber1);
    await clickSeat(page, rowNumber2, seatNumber2);
    await clickSeat(page, rowNumber3, seatNumber3);
    await clickElement(page, ".acceptin-button");
    await page.waitForSelector("h1");
    await clickElement(page, ".acceptin-button");
    await page.waitForSelector("h1");
    await checkCodeQR(page);
    const actual = await getText(page, "h2");
    expect(actual).toContain("Электронный билет");
  });

  test("Positive - Should book 2 seats", async () => {
    const data = generateData();
    const moviNumber = 2;
    const timeNumber = 2;
    const rowNumber1 = 3;
    const seatNumber1 = 7;
    const rowNumber2 = 6;
    const seatNumber2 = 8;
    await clickDay(page, data);
    await clickMoviTime(page, moviNumber, timeNumber);
    await page.waitForSelector("h1");
    await clickSeat(page, rowNumber1, seatNumber1);
    await clickSeat(page, rowNumber2, seatNumber2);
    await clickElement(page, ".acceptin-button");
    await page.waitForSelector("h1");
    await clickElement(page, ".acceptin-button");
    await page.waitForSelector("h1");
    await checkCodeQR(page);
    const actual = await getText(page, "h2");
    expect(actual).toContain("Электронный билет");
  });

  test("Negative - Should not book any seats", async () => {
    const data = generateData();
    const moviNumber = 2;
    const timeNumber = 2;
    await clickDay(page, data);
    await clickMoviTime(page, moviNumber, timeNumber);
    await page.waitForSelector("h1");
    await clickElement(page, ".acceptin-button");
    const actual = await page.$eval(".acceptin-button", (button) =>
      button.hasAttribute("disabled")
    );
    expect(actual).toBe(true);
  });
});
