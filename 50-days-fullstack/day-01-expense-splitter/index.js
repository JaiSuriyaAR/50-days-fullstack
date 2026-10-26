import { expenses } from "./expenses.js";
import { calculateBalances, totalPaid, settleUp } from "./calculator.js";

const line = "─".repeat(40);

console.log(`\n EXPENSE SPLITTER\n${line}`);

console.log("\n Expenses");
expenses.forEach(({ description, amount, paidBy, splitBetween }) => {
  console.log(`  • ${description}: ₹${amount} paid by ${paidBy} (split ${splitBetween.length} ways)`);
});

console.log(`\n Total paid per person`);
Object.entries(totalPaid(expenses)).forEach(([person, amount]) => {
  console.log(`  ${person.padEnd(8)} ₹${amount}`);
});

const balances = calculateBalances(expenses);

console.log(`\n  Net balances`);
Object.entries(balances).forEach(([person, bal]) => {
  const status = bal >= 0 ? `gets back ₹${bal}` : `owes ₹${Math.abs(bal)}`;
  console.log(`  ${person.padEnd(8)} ${status}`);
});

console.log(`\n Settle up\n${line}`);
const payments = settleUp(balances);
payments.length === 0
  ? console.log("  All settled!")
  : payments.forEach(({ from, to, amount }) => console.log(`  ${from} pays ${to} ₹${amount}`));

console.log();
