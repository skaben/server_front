class BaseApiService<Request, Response> {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getData(): Promise<Response[]> {
    const response = await fetch(`${this.baseUrl}/my-data/`);
    const data = await response.json();
    return data;
  }

  async createData(newData: Request): Promise<Response> {
    const response = await fetch(`${this.baseUrl}/my-data/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    });
    const data = await response.json();
    return data;
  }

  async updateData(id: number | string, updatedData: Request): Promise<Response> {
    const response = await fetch(`${this.baseUrl}/my-data/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });
    const data = await response.json();
    return data;
  }

  async deleteData(id: number | string): Promise<void> {
    await fetch(`${this.baseUrl}/my-data/${id}/`, {
      method: 'DELETE'
    });
  }
}

export default BaseApiService
