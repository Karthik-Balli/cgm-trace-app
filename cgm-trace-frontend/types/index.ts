/**
 * Glucose data point from CGM device
 */
export interface GlucosePoint {
  timestamp: string;
  glucose_value: number;
}

/**
 * Glucose insights/statistics
 */
export interface Insights {
  avg_glucose: number;
  min_glucose: number;
  max_glucose: number;
  time_in_range_pct: number;
  total_points: number;
}

/**
 * API response for glucose points endpoint
 */
export interface GlucosePointsResponse {
  points: GlucosePoint[];
}

/**
 * API response for glucose insights endpoint
 */
export interface InsightsResponse {
  insights: Insights;
}

/**
 * File upload request/response
 */
export interface UploadResponse {
  message: string;
  filename?: string;
  status?: string;
}

/**
 * Generic API response wrapper (if backend uses this pattern)
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: string;
}

/**
 * Ant Design Upload component file type
 */
export interface UploadFile {
  file: File;
  name?: string;
}

/**
 * Custom upload request options for Ant Design Upload
 */
export interface UploadRequestOption<T = unknown> {
  file: File | Blob | string;
  filename?: string;
  action?: string;
  data?: Record<string, unknown>;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  onProgress?: (event: ProgressEvent) => void;
  onSuccess?: (response: T, file: File | Blob | string) => void;
  onError?: (error: Error | ProgressEvent) => void;
}
