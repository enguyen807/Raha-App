// eslint-disable-next-line prettier/prettier
import axios from "axios";

// axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
// axios.defaults.headers.common["Authorization"] = process.env.VUE_APP_AUTH_TOKEN;
// axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  }
);

export default class Request {
  constructor() {
    const username = "eric.nguyen";
    const password = "xjVIwpkV8EQkJi53";
    const auth_token = btoa(`${username}:${password}`);
    this.instance = axios.create({
      baseURL: process.env.VUE_APP_BASEURL,
      headers: {
        Authorization: `Basic ${auth_token}`,
        "Content-Type": "application/json",
      },
    });
  }

  async make(method, url, data) {
    const response = await this.instance.request({
      method,
      url,
      data,
    });
    console.log(response);

    return response;
  }

  async post(url, data) {
    const response = await this.make({
      method: "POST",
      url,
      data,
    });
    console.log(response);

    return response;
  }

  // For future use;
  async patch(url, data = null) {
    const response = await this.make({
      method: "PATCH",
      url,
      data,
    });
    console.log(response);

    return response;
  }
}
