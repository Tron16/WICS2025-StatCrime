# StatCrime

*Know before you go. Stay safe with data-driven crime insights.*

---

## Table of Contents

- [Demo](#demo)  
- [Features](#features)  
- [Technology Stack](#technology-stack)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [Challenges & Learnings](#challenges--learnings)  
- [Future Improvements](#future-improvements)  

---

## Demo

- Live site: https://statcrime.vercel.app  
- GitHub repo: https://github.com/Tron16/WICS2025-StatCrime  

---

## Features

- **City Safety Scores**  
  - Predicted average daily safety score (0–100) for the most crime-dense area in each city  
  - Interactive hourly safety score graph to spot trends throughout the day  

- **Heat Maps**  
  - Simple overlay showing crime “hot spots”  
  - Detailed density map with color-coded safety scores (0–1 scale)  

- **Multi-City Support**  
  - Insights for Houston, Los Angeles, Chicago, New York City, and Washington, DC  

---

## Technology Stack

- **Frontend**  
  - React  
  - Tailwind CSS  
  - shadcn/ui  
  - Framer Motion  

- **Data Analysis & Machine Learning**  
  - Python, Pandas, NumPy  
  - Scikit-learn (K-Nearest Neighbors & KernelDensity)  
  - Matplotlib  
  - GeoPy  

- **Data Sources**  
  - Public crime datasets from Houston, Los Angeles, Chicago, New York City, and Washington, DC city portals  

---

## Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/Tron16/WICS2025-StatCrime.git
   cd WICS2025-StatCrime
   ```

2. **Setup Frontend**  
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Setup ML Backend**  
   ```bash
   cd ../ml-model
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   # preprocess data and train models
   python train_models.py
   ```

4. **Run Servers**  
   - Frontend: http://localhost:3000  
   - Backend API: http://localhost:5000  

---

## Usage

1. Open the homepage and select a city from the dropdown.  
2. View the **daily safety score** and **hourly trend** graph.  
3. Explore the **heat map** to identify high-risk areas.  
4. Use insights to plan safer routes or choose less risky times to visit neighborhoods.

---

## Project Structure

```
WICS2025-StatCrime/
├── frontend/           # React + Tailwind + Framer Motion UI
│   ├── public/
│   └── src/
├── ml-model/           # Data processing & ML scripts
│   ├── data/           # Raw & processed datasets
│   ├── train_models.py
│   └── requirements.txt
└── README.md
```

---

## Challenges & Learnings

- **Heterogeneous Data Formats**  
  Each city publishes crime data with different schemas and timestamp conventions. We wrote custom parsers to normalize date/time and location fields.

- **Performance Constraints**  
  Full datasets (50k+ records per city) led to long model training times. We experimented with sampling and dimensionality reduction to meet hackathon deadlines.

- **Rapid Tool Adoption**  
  Learned to integrate GeoPy for geospatial calculations and used KernelDensity clustering in scikit-learn to generate smooth heatmaps—all within a 24-hour sprint.

---

## Future Improvements

- **Universal Crime API**  
  Replace static datasets with a live API endpoint to support any city worldwide.

- **User-Provided Locations**  
  Allow users to input a ZIP code or coordinates and receive localized safety metrics on demand.

- **Real-Time Data Ingestion**  
  Automate data pipelines for near-real-time crime updates and alerts.
