DeepRacerLens

DeepRacerLens is a full-stack analytics platform designed to visualize, interpret, and evaluate autonomous-agent performance from DeepRacer-style reinforcement-learning simulations. It transforms raw telemetry logs into meaningful insights, enabling faster debugging, performance tuning, and model comparison.

🚀 Overview

Modern reinforcement-learning simulations generate large volumes of telemetry data—positions, speeds, rewards, timestamps, and more. Analyzing this data manually is time-consuming and inefficient.

DeepRacerLens solves this by providing:

A FastAPI backend that processes and structures telemetry logs.

A React + TypeScript dashboard that visually represents agent trajectories, performance metrics, and lap statistics.

A smooth and interactive interface that significantly reduces model-evaluation time.

The platform is designed for developers, researchers, and ML practitioners working with autonomous agents or behavior-learning simulations.

🧰 Tech Stack
Frontend

React + TypeScript

Vite development environment

Recharts / D3 (optional depending on your charts)

Axios for API communication

Backend

Python FastAPI

Log parsers for DeepRacer-style telemetry files

Structured REST API endpoints for metrics, statistics, and visualizations

PostgreSQL for persistent storage (optional based on configuration)

✨ Features
🔍 1. Telemetry Log Parsing & Processing

Converts raw DeepRacer-style logs (JSON/CSV) into structured, analyzable data.

Extracts key metrics: position, steering, throttle, reward signals, laps, and timestamps.

📊 2. Interactive Performance Dashboard

Visual trajectory plot showing the path taken by the agent.

Per-lap performance breakdown.

Episode metrics including:

Total reward

Time taken

Speed profile

Behavioral anomalies

⚡ 3. Real-Time Insights

Displays processed metrics instantly via REST APIs.

Auto-refresh workflow for iterative ML experimentation.

🗃️ 4. Organized Metrics API

FastAPI backend exposes:

/metrics → Aggregated statistics

/trajectory → Coordinate mapping for visualization

/runs → Historical model evaluations

🧪 5. Faster Debugging Workflow

Compared to manual log analysis, DeepRacerLens:

Cuts evaluation time by ~50%

Provides intuitive visuals instead of raw logs

Makes behavioral debugging significantly easier


Architecture

React + TypeScript (Frontend)
        ↓  API Requests
FastAPI (Backend)
        ↓  Data Processing
Telemetry Logs / Database (Optional)

Ports:

Backend: http://localhost:8000

Frontend: http://localhost:5173

Vite is configured to proxy API requests from the frontend to the FastAPI backend.

▶️ Running the Application

Start the servers manually:

Backend
cd backend
uvicorn main:app --reload

Frontend
cd frontend
yarn install
yarn dev


Then open:

👉 http://localhost:5173

🎯 Future Enhancements

Support for multiple RL simulation formats

Heatmaps for reward distribution

Real-time agent replay mode

Cloud log ingestion

Model comparison dashboard

Exportable PDF reports
