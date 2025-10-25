export interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  timeout?: number;
}

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  retryOptions: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 2,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffMultiplier = 2,
    timeout = 90000,
  } = retryOptions;

  let lastError: Error | null = null;
  let delay = initialDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      console.log(`[API Client] Attempt ${attempt + 1}/${maxRetries + 1} for ${url}`);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = `API error (${response.status})`;
        let errorDetails = null;

        const contentType = response.headers.get('content-type');

        try {
          if (contentType?.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
            errorDetails = errorData.details;
          } else {
            const text = await response.text();
            errorDetails = text.substring(0, 200);
          }
        } catch (parseError) {
          console.warn(`[API Client] Failed to parse error response:`, parseError);
          errorDetails = 'Unable to parse error response';
        }

        if (response.status >= 500 && attempt < maxRetries) {
          console.warn(`[API Client] Server error ${response.status}, retrying...`);
          throw new APIError(errorMessage, response.status, errorDetails);
        }

        throw new APIError(errorMessage, response.status, errorDetails);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        throw new APIError('Invalid response format: expected JSON');
      }

      const data = await response.json();
      console.log(`[API Client] Request successful on attempt ${attempt + 1}`);
      return data;

    } catch (err) {
      clearTimeout(timeoutId);

      if (err instanceof APIError) {
        lastError = err;
      } else if (err instanceof Error) {
        if (err.name === 'AbortError') {
          lastError = new APIError('Request timeout - please try again');
        } else {
          lastError = new APIError(err.message);
        }
      } else {
        lastError = new APIError('Unknown error occurred');
      }

      if (attempt < maxRetries) {
        console.log(`[API Client] Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay = Math.min(delay * backoffMultiplier, maxDelay);
      }
    }
  }

  console.error(`[API Client] All ${maxRetries + 1} attempts failed`);
  throw lastError || new APIError('Request failed after all retries');
}
