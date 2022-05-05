const fs = require("fs");
const path = require("path");

const faker = require("faker");

const navItem = () => {
  return {
    _id: faker.random.uuid(),
    children: [],
    name: faker.commerce.department(),
    navigation: {
      nav_title: faker.commerce.department()
    },
    site: {
      site_url: faker.internet.url()
    }
  };
};

const generateNavItems = () => {
  const navItems = [];
  for (let items = 0; items < 200; items++) {
    navItems.push(navItem());
  }
  return navItems;
};

const generateFakeData = () => {
  const boop = {
    children: generateNavItems(),
    _id: "/"
  };

  fs.writeFile(
    path.resolve(__dirname, "./fakedatboop.js"),
    `
export const fakeLeftNavData = 
${JSON.stringify(boop, null, "\t")}`,
    () => true
  );
};

generateFakeData();
