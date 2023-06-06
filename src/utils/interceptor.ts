import Cookies from "js-cookie";
import { ElNotification } from "element-plus";

const onRequestFulfilled = (config: any) => {
  // 如果csrf加载不出来，应删除Cookies当中的 stock-display_sessionid
  config.headers["X-CSRFToken"] = Cookies.get("csrftoken");
  return config;
};

const onRequestRejected = (error: any) => {
  return Promise.reject(error);
};

const onResponseFulfilled = (response: any) => {
  if (response?.status == 200) {
    if ([4, 5].includes(response.data.status / 100)) {
      ElNotification({
        title: "错误",
        message: response.data.message,
        type: "error",
        position: "bottom-right",
      });
      return;
    }
  }

  return response?.data;
};

const onResponseRejected = (error: any) => {
  if (error?.response?.status / 100 == 5) {
    ElNotification({
      title: "错误",
      message: "服务器被吃了( ╯□╰ )",
      type: "error",
      position: "bottom-right",
    });
  } else if (error?.response?.status == 404) {
    ElNotification({
      title: "错误",
      message: "请求的资源不存在！",
      type: "error",
      position: "bottom-right",
    });
  } else if (error?.response?.status == 403) {
    ElNotification({
      title: "错误",
      message: "权限不足,请联系管理员！",
      type: "error",
      position: "bottom-right",
    });
  } else if (error?.response?.status == 401) {
    ElNotification({
      title: "错误",
      message: "尚未登录,请登录！",
      type: "error",
      position: "bottom-right",
    });
  } else {
    if (error?.response?.data?.message) {
      ElNotification({
        title: "错误",
        message: error.response.data.message,
        type: "error",
        position: "bottom-right",
      });
    } else {
      ElNotification({
        title: "错误",
        message: "未知错误",
        type: "error",
        position: "bottom-right",
      });
    }
  }
  return Promise.reject(error);
};

export {
  onRequestFulfilled,
  onRequestRejected,
  onResponseFulfilled,
  onResponseRejected,
};
