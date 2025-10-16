import {
  CheckHealthData,
  GetPerformanceDataData,
  GetPerformanceDataError,
  GetPerformanceDataParams,
  ListModelsData,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Brain<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   *
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  check_health = (params: RequestParams = {}) =>
    this.request<CheckHealthData, any>({
      path: `/_healthz`,
      method: "GET",
      ...params,
    });

  /**
   * @description Get performance data for a specific DeepRacer model. Returns different performance characteristics for each model version.
   *
   * @tags dbtn/module:deepracer
   * @name get_performance_data
   * @summary Get Performance Data
   * @request GET:/routes/performance-data
   */
  get_performance_data = (query: GetPerformanceDataParams, params: RequestParams = {}) =>
    this.request<GetPerformanceDataData, GetPerformanceDataError>({
      path: `/routes/performance-data`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description List all available models with their performance data.
   *
   * @tags dbtn/module:deepracer
   * @name list_models
   * @summary List Models
   * @request GET:/routes/models
   */
  list_models = (params: RequestParams = {}) =>
    this.request<ListModelsData, any>({
      path: `/routes/models`,
      method: "GET",
      ...params,
    });
}
