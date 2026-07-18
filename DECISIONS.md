# DECISIONS.md

## Architectural Decision

One of the main architectural decisions I made was how to manage application state. I considered using Redux Toolkit since an e-commerce application naturally has shared state like the shopping cart, selected variants, and UI interactions. However, after reviewing the assignment scope, I felt Redux would introduce unnecessary boilerplate for a relatively small application.

Instead, I used React Context only for the shopping cart because it is shared across multiple pages, while keeping page-specific state such as pagination, search, selected size, selected color, and the Quick Add drawer inside their respective components using `useState`. This kept the application easier to understand and avoided adding complexity where it wasn't needed.

Another decision was around product variants. The Fake Store API doesn't provide sizes or colors, but the assignment required variant selection and deep-linkable URLs. Rather than modifying the API response or introducing another data layer, I created a small local variant configuration and synchronized the selected size and color with the URL using React Router's query parameters. This keeps the selected variant shareable and persists correctly after a page refresh while keeping the implementation lightweight.

Overall, I tried to choose the simplest solution that met the requirements without introducing abstractions that would not provide much value for the size of the project.

## What I Would Improve With More Time

Given the timeline, I focused on implementing the required features with clean and maintainable code instead of building a highly scalable architecture.

If I had more time, I would first improve testing by adding unit tests for the cart flow, variant selection, and utility functions, along with a few integration tests for the checkout journey. I would also replace the mock Add to Cart implementation with a real backend integration and improve error handling for network failures.

From a product perspective, I would enhance the shopping experience by adding recently viewed products, product recommendations based on category, and image zoom on the product details page. I would also improve accessibility with more comprehensive keyboard navigation and ARIA attributes, and further optimize performance with responsive images and server-side pagination for larger product catalogs.

The goal throughout the assignment was to keep the code simple, readable, and easy to maintain while delivering a complete user experience within the given time constraints.
