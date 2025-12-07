# React Analytics Dashboard

This project is an interactive and responsive analytics dashboard built with **React**. It focuses on **User Experience (UX)**, **Modularity**, and **Adaptability**, using SASS for styling and specialized libraries like Recharts for data visualization.

## Key Features

We have implemented several essential features for a modern dashboard application:

- **Dark Mode Implemented:** The design is fully optimized for a dark theme using SASS color variables for professional contrast.
- **Responsive Design:** Adapts to desktop and mobile devices with a **Toggleable Sidebar** controlled by React state.
- **Data Visualization:** Includes Line and Bar charts for viewing trends and distributions (**Recharts**).
- **Key Performance Indicators (KPIs):** Dynamic metric cards displaying values and percentage changes.
- **Loading State:** Implemented a custom `Spinner` to simulate API data fetching, providing clear visual feedback to the user.
- **Data Table:** A detailed view of recent transactions, including data formatting and conditional status badges.

---

## Technologies Used

- **React** (Bootstrapped with Create React App).
- **SASS** (Syntactically Awesome Stylesheets).
- **Recharts** (Data Visualization Library).
- **Mocked Data** (Local JSON file).

---

## Setup and Running the Project

Follow these steps to get a local copy up and running.

### Prerequisites

- Node.js (version 14 or higher)
- npm (or yarn)

### Installation

1.  Clone the repository:

    ```bash
    git clone [YOUR REPOSITORY URL]
    cd [project-name]
    ```

2.  Install the necessary dependencies:
    ```bash
    npm install
    ```

### Execution

Run the project in development mode. Open `http://localhost:3000` to view it in your browser.

```bash
npm start

## Key File Structure

| Path | Description |
| :--- | :--- |
| `src/App.js` | Main component, handles state, loading logic, and sidebar control. |
| `src/data/dashboardData.json` | Simulated data source for metrics, charts, and the table. |
| `src/components/` | Contains reusable components like Card, DataTable, Spinner, and charts. |
| `src/styles/` | Contains modular SASS logic (_variables.scss, _table.scss, etc.). |
```
