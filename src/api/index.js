import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
axios.defaults.headers.common["Authorization"] = process.env.VUE_APP_AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] = "application/json";

export default class Request {
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
    return response;
  }

  async patch(url, data = null) {
    const response = await this.make({
      method: "POST",
      url,
      data,
    });
    return response;
  }
}
