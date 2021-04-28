// eslint-disable-next-line prettier/prettier
import axios from "axios";

// axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
// axios.defaults.headers.common["Authorization"] = process.env.VUE_APP_AUTH_TOKEN;
// axios.defaults.headers.post["Content-Type"] = "application/json";

export default class Request {
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.VUE_APP_BASEURL,
      headers: {
        Authorization: `Basic ${process.env.VUE_APP_AUTH_TOKEN}`,
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
