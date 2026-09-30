# Bank of Cyprus Transaction Dashboard

A small Vue 3 + Tailwind CSS transaction dashboard built for a frontend technical exercise.

## Technical decisions

- Vue 3 + Composition API
- Tailwind CSS
- Local mock data: `src/data/transactions.js`
- Money formatting: `Intl.NumberFormat`
- Sorting/filtering
- Responsive UX
- Transaction details

## Cases covered

- Loading state
- Empty account state
- No filter results
- Pending and declined statuses
- Credit/debit presentation
- Positive and negative amounts
- Different currencies
- Long descriptions
- Simulated load failure structure

## If I had more time

- Replace the local mock with a typed API layer and request cancellation.
- Add pagination for a larger transaction history.
- Replace the hardcoded exchange rates with actual ones from an API.
- Add proper currency/exchange-rate handling based on the transaction date.
- Persist filters and pagination state in the URL so that the view can be shared or restored.
- Add transaction categories and support filtering by category.
