import { useState, useCallback } from "react";
import { notification } from "antd";
import Services from "../util/API/service";
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    async (url, responseHandler, payload, successMessage, errorHandler) => {
      setIsLoading(true);
      if (url?.endpoint && url?.type) {
        try {
          let response;
          switch (url.type) {
            case "POST":
              response = await Services.post(url.endpoint, payload);
              break;

            case "PUT":
              response = await Services.put(url.endpoint, payload);

              break;
            case "DELETE":
              response = await Services.delete(url.endpoint);
              break;

            case "PATCH":
              response = await Services.patch(url.endpoint, payload);
              break;

            default:
              const queryParams = buildQueryString(payload);
              response = await Services.get(url.endpoint + queryParams);
              break;
          }

          const data = await response.data;
          if (successMessage) {
            notification.success({ message: successMessage, duration: "3" });
          }
          try {
            if (responseHandler) {
              responseHandler(data);
            }
          } catch (e) {
            console.log(e);
          }
        } catch (err) {
          if (err?.response?.data?.message) {
            notification.error({
              message: err?.response?.data?.message,
              duration: "3",
            });
            if (errorHandler) {
              errorHandler(err?.response?.data?.message);
            }
          } else {
            notification.error({ message: "Something Wrong Please Try again" });
          }
        }
      } else {
        notification.error({ message: "Not valid endpoint and type" });
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    sendRequest,
  };
};

export default useHttp;

export const buildQueryString = (params) => {
  const queryParts = [];

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];

      if (key.startsWith("autogenerate-mul-array-") && Array.isArray(value)) {
        // Handle autogenerate-mul-array- with array values
        console.log(key, "key");
        const arrayKey = key.slice("autogenerate-mul-array-".length);
        value.forEach((item) => {
          queryParts.push(
            `${encodeURIComponent(arrayKey)}=${encodeURIComponent(item)}`
          );
        });
      } else {
        // Handle other cases
        queryParts.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        );
      }
    }
  }

  return queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
};
