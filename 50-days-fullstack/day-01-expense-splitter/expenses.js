// Sample data: a 4-person weekend trip
const everyone = ["Arun", "Priya", "Sam", "Meena"];

export const expenses = [
  { description: "Hotel",
    amount: 12000, 
    paidBy: "Arun", 
    splitBetween: everyone },

  { description: "Dinner", 
    amount: 3200, 
    paidBy: "Priya", 
    splitBetween: everyone },

  { description: "Cab", 
    amount: 1800, 
    paidBy: "Sam", 
    splitBetween: ["Sam", "Meena", "Arun"] },

  { description: "Snacks", 
    amount: 600, 
    paidBy: "Meena", 
    splitBetween: ["Priya", "Meena"] },
];
