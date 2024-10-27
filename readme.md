# Country Explorer

An interactive project built with Vue 3 and the Composition API using TypeScript, designed to pull country data from the REST Countries API and display it in both light and dark color schemes. This project lets users explore country data through search, filtering, and detailed views, while providing a smooth, accessible, and user-friendly experience.

## Features

- **Homepage Display:** All countries from the REST Countries API are shown on the homepage.
- **Search & Filter:** Users can search by country name (with typo tolerance) and filter by region.
- **Detailed Country View:** Clicking on a country displays detailed information on a separate page, with the ability to view neighboring countries.
- **Light/Dark Mode Toggle:** Seamless color scheme toggling implemented without third-party libraries.
- **Sort Functionality:** Countries can be sorted by population or alphabetically by name.
- **Responsive Design:** Adapted for both mobile and desktop layouts, with UI following the provided design specifications.
- **Additional Enhancements:**
  - Lazy loading for country images and list items to improve performance.
  - URL query synchronization to maintain filter and sort states.
  - Flag display in a consistent 4:3 ratio.
  - Server-side rendering support with fallback handling for errors.

## Project Setup

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
