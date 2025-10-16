/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** HealthResponse */
export interface HealthResponse {
  /** Status */
  status: string;
}

/** LapTime */
export interface LapTime {
  /** Lap */
  lap: number;
  /** Time */
  time: number;
}

/** ModelData */
export interface ModelData {
  /** Model Id */
  model_id: string;
  data: PerformanceData;
}

/** PerformanceData */
export interface PerformanceData {
  metrics: PerformanceMetrics;
  /** Training Progress */
  training_progress: TrainingProgress[];
  /** Lap Times */
  lap_times: LapTime[];
  /** Speed Metrics */
  speed_metrics: SpeedMetric[];
  /** Reward Breakdown */
  reward_breakdown: RewardData[];
}

/** PerformanceMetrics */
export interface PerformanceMetrics {
  /** Best Lap Time */
  best_lap_time: number;
  /** Avg Completion */
  avg_completion: number;
  /** Total Reward */
  total_reward: number;
  /** Training Time */
  training_time: number;
}

/** RewardData */
export interface RewardData {
  /** Category */
  category: string;
  /** Value */
  value: number;
}

/** SpeedMetric */
export interface SpeedMetric {
  /** Segment */
  segment: string;
  /** Speed */
  speed: number;
}

/** TrainingProgress */
export interface TrainingProgress {
  /** Episode */
  episode: number;
  /** Reward */
  reward: number;
  /** Completion */
  completion: number;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

export type CheckHealthData = HealthResponse;

export interface GetPerformanceDataParams {
  /**
   * Model Id
   * @default "model-v2"
   */
  model_id?: string;
}

export type GetPerformanceDataData = PerformanceData;

export type GetPerformanceDataError = HTTPValidationError;

/** Response List Models */
export type ListModelsData = ModelData[];
