// src/lib/api.ts
export class DaytonaClient {
    private baseUrl: string;
    private apiKey: string | null;

    constructor(baseUrl: string, apiKey?: string) {
      this.baseUrl = baseUrl.replace(/\/$/, '');
      this.apiKey = apiKey || null;
      console.log('DaytonaClient initialized with:', { baseUrl, apiKey });
    }

    private async request<T>(
      method: string,
      endpoint: string,
      options: RequestInit = {}
    ): Promise<T> {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      if (this.apiKey) {
        headers.Authorization = `Bearer ${this.apiKey}`;
      }

      const url = `${this.baseUrl}${endpoint}`;
      console.log(`Making ${method} request to:`, url);

      try {
        const response = await fetch(url, {
          method,
          headers,
          ...options,
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error:', {
            status: response.status,
            statusText: response.statusText,
            error: errorText,
          });
          throw new Error(`API Error: ${response.status} ${errorText}`);
        }

        // Handle empty responses
        if (response.status === 204) {
          return {} as T;
        }

        // Handle text responses (like new API key)
        if (endpoint.includes('/apikey/') && method === 'POST') {
          const text = await response.text();
          return text as unknown as T;
        }

        const data = await response.json();
        console.log('Response data:', data);
        return data;
      } catch (error) {
        console.error('Request failed:', error);
        throw error;
      }
    }

    async listApiKeys(): Promise<ApiKey[]> {
      try {
        const keys = await this.request<ApiKey[]>('GET', '/apikey');
        console.log('Listed API keys:', keys);
        return keys;
      } catch (error) {
        console.error('Failed to list API keys:', error);
        throw error;
      }
    }

    async generateApiKey(name: string, type: string = 'client'): Promise<string> {
      try {
        const key = await this.request<string>('POST', `/apikey/${name}`, {
          body: JSON.stringify({ type }),
        });
        console.log('Generated API key:', { name, type });
        return key;
      } catch (error) {
        console.error('Failed to generate API key:', error);
        throw error;
      }
    }

    async revokeApiKey(name: string): Promise<boolean> {
      await this.request('DELETE', `/apikey/${name}`);
      return true;
    }

    async listWorkspaces(): Promise<Workspace[]> {
      return this.request<Workspace[]>('GET', '/workspace');
    }

    async deleteWorkspace(id: string): Promise<boolean> {
      await this.request('DELETE', `/workspace/${id}?force=true`);
      return true;
    }

    async deleteAllWorkspaces(): Promise<boolean> {
      const workspaces = await this.listWorkspaces();
      await Promise.all(workspaces.map(w => this.deleteWorkspace(w.id)));
      return true;
    }
  }

  // Create singleton instance
  export const daytonaClient = new DaytonaClient(
    import.meta.env.DAYTONA_API_URL || 'http://localhost:3986',
    import.meta.env.DAYTONA_API_KEY
  );

  export type { ApiKey, Workspace, Project };