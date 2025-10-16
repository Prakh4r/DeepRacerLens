from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
import random

router = APIRouter()

class PerformanceMetrics(BaseModel):
    best_lap_time: float
    avg_completion: float
    total_reward: float
    training_time: float

class TrainingProgress(BaseModel):
    episode: int
    reward: float
    completion: float

class LapTime(BaseModel):
    lap: int
    time: float

class SpeedMetric(BaseModel):
    segment: str
    speed: float

class RewardData(BaseModel):
    category: str
    value: float

class PerformanceData(BaseModel):
    metrics: PerformanceMetrics
    training_progress: list[TrainingProgress]
    lap_times: list[LapTime]
    speed_metrics: list[SpeedMetric]
    reward_breakdown: list[RewardData]

class ModelData(BaseModel):
    model_id: str
    data: PerformanceData

# Generate unique data for each model
def generate_model_data(model_id: str) -> PerformanceData:
    if model_id == "model-v1":
        # Model v1 - Beginner performance, slower but steady
        return PerformanceData(
            metrics=PerformanceMetrics(
                best_lap_time=22.8,
                avg_completion=68.5,
                total_reward=145.2,
                training_time=3.8
            ),
            training_progress=[
                TrainingProgress(episode=0, reward=8, completion=12),
                TrainingProgress(episode=10, reward=35, completion=28),
                TrainingProgress(episode=20, reward=65, completion=45),
                TrainingProgress(episode=30, reward=95, completion=58),
                TrainingProgress(episode=40, reward=125, completion=65),
                TrainingProgress(episode=50, reward=145, completion=68),
            ],
            lap_times=[
                LapTime(lap=1, time=32.5),
                LapTime(lap=2, time=28.3),
                LapTime(lap=3, time=25.7),
                LapTime(lap=4, time=24.1),
                LapTime(lap=5, time=22.8),
            ],
            speed_metrics=[
                SpeedMetric(segment="Straight", speed=2.8),
                SpeedMetric(segment="Curve-Light", speed=2.2),
                SpeedMetric(segment="Curve-Sharp", speed=1.5),
                SpeedMetric(segment="Hairpin", speed=1.1),
            ],
            reward_breakdown=[
                RewardData(category="Center Line", value=45),
                RewardData(category="Speed", value=28),
                RewardData(category="Progress", value=38),
                RewardData(category="Heading", value=34),
            ]
        )
    elif model_id == "model-v2":
        # Model v2 - Intermediate performance, balanced
        return PerformanceData(
            metrics=PerformanceMetrics(
                best_lap_time=18.2,
                avg_completion=87.3,
                total_reward=192.5,
                training_time=4.2
            ),
            training_progress=[
                TrainingProgress(episode=0, reward=12, completion=15),
                TrainingProgress(episode=10, reward=55, completion=42),
                TrainingProgress(episode=20, reward=98, completion=65),
                TrainingProgress(episode=30, reward=145, completion=78),
                TrainingProgress(episode=40, reward=175, completion=85),
                TrainingProgress(episode=50, reward=192, completion=87),
            ],
            lap_times=[
                LapTime(lap=1, time=28.4),
                LapTime(lap=2, time=24.1),
                LapTime(lap=3, time=21.8),
                LapTime(lap=4, time=19.5),
                LapTime(lap=5, time=18.2),
            ],
            speed_metrics=[
                SpeedMetric(segment="Straight", speed=3.5),
                SpeedMetric(segment="Curve-Light", speed=2.8),
                SpeedMetric(segment="Curve-Sharp", speed=2.0),
                SpeedMetric(segment="Hairpin", speed=1.4),
            ],
            reward_breakdown=[
                RewardData(category="Center Line", value=58),
                RewardData(category="Speed", value=42),
                RewardData(category="Progress", value=52),
                RewardData(category="Heading", value=40),
            ]
        )
    else:  # model-v3
        # Model v3 - Advanced performance, fast and aggressive
        return PerformanceData(
            metrics=PerformanceMetrics(
                best_lap_time=15.6,
                avg_completion=94.8,
                total_reward=248.7,
                training_time=5.1
            ),
            training_progress=[
                TrainingProgress(episode=0, reward=18, completion=22),
                TrainingProgress(episode=10, reward=72, completion=55),
                TrainingProgress(episode=20, reward=128, completion=75),
                TrainingProgress(episode=30, reward=185, completion=88),
                TrainingProgress(episode=40, reward=225, completion=92),
                TrainingProgress(episode=50, reward=248, completion=94),
            ],
            lap_times=[
                LapTime(lap=1, time=24.2),
                LapTime(lap=2, time=20.1),
                LapTime(lap=3, time=17.8),
                LapTime(lap=4, time=16.5),
                LapTime(lap=5, time=15.6),
            ],
            speed_metrics=[
                SpeedMetric(segment="Straight", speed=4.2),
                SpeedMetric(segment="Curve-Light", speed=3.4),
                SpeedMetric(segment="Curve-Sharp", speed=2.6),
                SpeedMetric(segment="Hairpin", speed=1.8),
            ],
            reward_breakdown=[
                RewardData(category="Center Line", value=72),
                RewardData(category="Speed", value=65),
                RewardData(category="Progress", value=68),
                RewardData(category="Heading", value=43),
            ]
        )

@router.get("/performance-data")
def get_performance_data(model_id: str = "model-v2") -> PerformanceData:
    """
    Get performance data for a specific DeepRacer model.
    Returns different performance characteristics for each model version.
    """
    return generate_model_data(model_id)

@router.get("/models")
def list_models() -> list[ModelData]:
    """
    List all available models with their performance data.
    """
    return [
        ModelData(model_id="model-v1", data=generate_model_data("model-v1")),
        ModelData(model_id="model-v2", data=generate_model_data("model-v2")),
        ModelData(model_id="model-v3", data=generate_model_data("model-v3")),
    ]
