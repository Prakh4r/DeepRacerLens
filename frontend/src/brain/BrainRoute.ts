import { CheckHealthData, GetPerformanceDataData, ListModelsData } from "./data-contracts";

export namespace Brain {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  export namespace check_health {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CheckHealthData;
  }

  /**
   * @description Get performance data for a specific DeepRacer model. Returns different performance characteristics for each model version.
   * @tags dbtn/module:deepracer
   * @name get_performance_data
   * @summary Get Performance Data
   * @request GET:/routes/performance-data
   */
  export namespace get_performance_data {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Model Id
       * @default "model-v2"
       */
      model_id?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPerformanceDataData;
  }

  /**
   * @description List all available models with their performance data.
   * @tags dbtn/module:deepracer
   * @name list_models
   * @summary List Models
   * @request GET:/routes/models
   */
  export namespace list_models {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListModelsData;
  }
}
