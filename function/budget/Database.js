import 'dotenv/config';

import { Client } from '@notionhq/client';
const notion = new Client({ auth: process.env.NOTION_KEY });

export const databaseQuery = async (databaseId, property) => {
  let sum = 0;

  try {
    const result = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: property,
        number: {
          is_not_empty: true,
        },
      },
    });
    result.results.forEach((Element) => {
      sum += Element.properties[property].number;
    });
    return sum;
  } catch (error) {
    console.error(error);
  }
};

export const pageCreate = async (databaseId, income, expense) => {
  try {
    await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        'Thu vào': {
          type: 'number',
          number: {
            format: 'yen',
          },
          number: income,
        },

        'Chi ra': {
          type: 'number',
          number: {
            format: 'yen',
          },
          number: expense,
        },

        'Tiền dư': {
          type: 'number',
          number: {
            format: 'yen',
          },
          number: income - expense,
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const pageUpdate = async (pageId, property) => {
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: property,
    });
  } catch (error) {
    console.error(error);
  }
};
