const round = (n) => Math.round(n * 100) / 100;

// Net balance per person: positive = gets money back, negative = owes money
export const calculateBalances = (expenses) => {
  const balances = expenses.reduce((acc, { amount, paidBy, splitBetween }) => {
    const share = amount / splitBetween.length;

    acc[paidBy] = (acc[paidBy] ?? 0) + amount;
    splitBetween.forEach((person) => {
      acc[person] = (acc[person] ?? 0) - share;
    });

    return acc;
  }, {});

  // Round everything to 2 decimals
  return Object.fromEntries(
    Object.entries(balances).map(([person, value]) => [person, round(value)])
  );
};

// Total each person actually paid
export const totalPaid = (expenses) =>
  expenses.reduce((acc, { amount, paidBy }) => {
    acc[paidBy] = (acc[paidBy] ?? 0) + amount;
    return acc;
  }, {});

// Turn balances into a short list of "X pays Y" payments
export const settleUp = (balances) => {
  const debtors = Object.entries(balances)
    .filter(([, bal]) => bal < -0.01)
    .map(([name, bal]) => ({ name, amount: -bal }));
  const creditors = Object.entries(balances)
    .filter(([, bal]) => bal > 0.01)
    .map(([name, bal]) => ({ name, amount: bal }));

  const payments = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].amount, creditors[j].amount);

    payments.push({ from: debtors[i].name, to: creditors[j].name, amount: round(pay) });

    debtors[i].amount -= pay;
    creditors[j].amount -= pay;

    if (debtors[i].amount < 0.01) i++;
    if (creditors[j].amount < 0.01) j++;
  }

  return payments;
};
