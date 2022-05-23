export class Request {
  constructor(url) {
    this.url = url;
  }

  async getRequest() {
    const response = await fetch(this.url);
    const data = await response.json();
    return data;
  }

  async postRequest(data) {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataResponse = await response.json();
    return dataResponse;
  }

  async putRequest(id, data) {
    const response = await fetch(this.url + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataResponse = await response.json();
    return dataResponse;
  }
  async deleteRequest(id) {
    const response = await fetch(this.url + "/" + id, {
      method: "DELETE",
    });
    return "Data deleted";
  }
}
