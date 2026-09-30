export const transactions = [
  {
    id: "1001",
    merchant: "Blue Bottle Coffee",
    date: "2026-09-29T09:42:00Z",
    amount: -4.8,
    currency: "EUR",
    type: "debit",
    status: "completed",
    description: "Flat white and almond croissant",
  },
  {
    id: "1002",
    merchant: "Payroll",
    date: "2026-09-28T07:15:00Z",
    amount: 3250.0,
    currency: "EUR",
    type: "credit",
    status: "completed",
    description: "September salary",
  },
  {
    id: "1003",
    merchant: "Amazon",
    date: "2026-09-27T14:20:00Z",
    amount: -12.99,
    currency: "USD",
    type: "debit",
    status: "completed",
    description:
      "Professional cloud storage subscription with extended retention",
  },
  {
    id: "1004",
    merchant: "Metro Transit",
    date: "2026-09-26T08:02:00Z",
    amount: -2.4,
    currency: "EUR",
    type: "debit",
    status: "pending",
    description: "Contactless metro journey",
  },
  {
    id: "1005",
    merchant: "Supermarket",
    date: "2026-09-25T18:31:00Z",
    amount: -67.42,
    currency: "EUR",
    type: "debit",
    status: "declined",
    description: "Groceries — payment was declined by issuer",
  },
  {
    id: "1006",
    merchant: "Electricity Provider",
    date: "2026-09-24T11:11:00Z",
    amount: -84.1,
    currency: "EUR",
    type: "debit",
    status: "completed",
    description: "Monthly electricity bill",
  },
  {
    id: "1007",
    merchant: "Rental Income",
    date: "2026-09-22T16:05:00Z",
    amount: 480.0,
    currency: "EUR",
    type: "credit",
    status: "completed",
    description: "Monthly rent payment received",
  },
  {
    id: "1008",
    merchant: "Airlines",
    date: "2026-09-20T10:48:00Z",
    amount: -245.75,
    currency: "GBP",
    type: "debit",
    status: "completed",
    description: "Athens to London flight reservation",
  },
  {
    id: "1009",
    merchant: "Internet Provider",
    date: "2026-09-18T10:20:00Z",
    amount: -39.9,
    currency: "EUR",
    type: "debit",
    status: "pending",
    description: "Monthly internet bill",
  },
  {
    id: "1010",
    merchant: "Freelance Client",
    date: "2026-09-17T15:30:00Z",
    amount: 750.0,
    currency: "EUR",
    type: "credit",
    status: "completed",
    description: "Freelance project payment",
  },
  {
    id: "1011",
    merchant: "Restaurant",
    date: "2026-09-15T20:10:00Z",
    amount: -42.5,
    currency: "EUR",
    type: "debit",
    status: "completed",
    description: "Dinner with friends",
  },
  {
    id: "1012",
    merchant: "Gym Membership",
    date: "2026-09-12T09:00:00Z",
    amount: -29.99,
    currency: "EUR",
    type: "debit",
    status: "completed",
    description: "Monthly gym membership",
  },
  {
    id: "1013",
    merchant: "Insurance Company",
    date: "2026-09-10T11:45:00Z",
    amount: -115.0,
    currency: "EUR",
    type: "debit",
    status: "pending",
    description: "Monthly insurance payment",
  },
];

const exchangeRates = {
  EUR: 1,
  USD: 0.85,
  GBP: 1.17,
};

export const account = {
  name: "My Personal Account",
  currency: "EUR",

  get balance() {
    return transactions
      .filter((transaction) => transaction.status === "completed")
      .reduce((total, transaction) => {
        const rate = exchangeRates[transaction.currency] || 1;

        return total + transaction.amount * rate;
      }, 0)
      .toFixed(2);
  },
};
