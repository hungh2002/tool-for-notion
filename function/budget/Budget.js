import 'dotenv/config';

import { databaseQuery, pageCreate, pageUpdate } from './Database.js';

const budget = () => {
  setInterval(budgetUpdate, 30000);
};

const budgetUpdate = async () => {
  let date = new Date();
  let income = 0;
  let expense = 0;

  income = await databaseQuery(process.env.INCOME_DATABASE_ID, 'Thu vào');
  expense = await databaseQuery(process.env.EXPENSE_DATABASE_ID, 'Chi ra');

  // Update budget data every month.
  if (date.getDate() == 1) {
    setTimeout(async () => {
      await pageCreate(process.env.MONTHLY_BUDGET_PAGE_ID, income, expense);
    }, 86460000);
  }

  await pageUpdate(process.env.BUDGET_PAGE_ID, {
    title: {
      title: [
        {
          text: {
            content: `Hiện có ${income - expense}`,
          },
        },
      ],
    },
  });

  await pageUpdate(process.env.DAILY_INCOME_PAGE_ID, {
    Tags: {
      type: 'number',
      number: {
        format: 'yen',
      },
      number: income,
    },
  });

  await pageUpdate(process.env.DAILY_EXPENSE_PAGE_ID, {
    Tags: {
      type: 'number',
      number: {
        format: 'yen',
      },
      number: expense,
    },
  });

  await pageUpdate(process.env.DAILY_BUDGET_PAGE_ID, {
    Tags: {
      type: 'number',
      number: {
        format: 'yen',
      },
      number: income - expense,
    },
  });
};

export default budget;
