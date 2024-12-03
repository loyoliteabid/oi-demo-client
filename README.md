# OI Demo App

This app provides a demonstration of how to analyze and visualize air quality data using interactive tools. The dataset consists of 9,358 hourly records collected from March 2004 to February 2005 by an air quality monitoring device located in an Italian city.

---

## Features

1. **Data Check and Upload**

   - The app first checks if data is available on the connected server.
   - If not, it redirects to the file upload page, where you can upload a CSV file.
   - Ensure your CSV file matches the required format, with headers:
     ```
     Date;Time;CO(GT);PT08.S1(CO);NMHC(GT);C6H6(GT);PT08.S2(NMHC);NOx(GT);PT08.S3(NOx);NO2(GT);PT08.S4(NO2);PT08.S5(O3);T;RH;AH;
     ```
   - Download the correct CSV file from the [UCI Air Quality Dataset](https://archive.ics.uci.edu/dataset/360/air+quality).

2. **Pages and Functionalities**
   - **Home Page**: A welcome page with an overview of the app.
   - **Chart Page**: Visualizes data as a line chart.
     - Filter parameters (e.g., CO, Benzene) and select date ranges for analysis.
   - **AQI Page**: Displays Air Quality Index (AQI) as a line chart based on the selected date range.

---

## AQI Calculation

- The AQI is calculated using predefined breakpoints for pollutants such as PM2.5, PM10, NO₂, and CO.
- For a given pollutant concentration, the AQI is interpolated linearly between breakpoint values.
- The overall AQI for a dataset is the maximum AQI among all pollutants.

---

## Technical Details

### Tools and Libraries Used

- **Charting**: `echarts-for-react` (ECharts)
- **Animations**: `Framer Motion`
- **Framework**: `React` with `Vite`
- **Language**: TypeScript
- **Routing**: `react-router-dom`

### Backend Server

- **Language**: Node.js
- **Database**: MongoDB
- **Data Ingestion**: Python script for fetching air quality data in CSV format

### Project Structure

```plaintext
src
├── components
├── context
├── data
├── hooks
├── routes
├── utils
└── App.tsx (root file)
```

The project uses React's component-based architecture, leveraging reusable components for modularity.

---

## Getting Started

### Clone the Project

```bash
git clone https://github.com/loyoliteabid/oi-demo-client
```

### Install Dependencies

```bash
npm install
```

### Start the Server App

Ensure the backend server is running. Clone and start it from:
[OI Demo Server](https://github.com/loyoliteabid/oi-demo-server)

### Run the App

```bash
npm run dev
```

The app will be accessible at [http://localhost:5173](http://localhost:5173).

---

## Notes

- Ensure the backend server is running before using the app.
- Use the correct dataset to avoid errors.

Feel free to explore the features and visualize air quality data interactively!
