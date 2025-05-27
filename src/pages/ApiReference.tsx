import { createSignal, For } from "solid-js";
import type { Component } from "solid-js";

interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  headers?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  body?: {
    description: string;
    example: any;
  };
  responses?: Array<{
    status: number;
    description: string;
    example?: any;
  }>;
}

const ApiReference: Component = () => {
  const [selectedSection, setSelectedSection] = createSignal<string>("sending");

  const sections = {
    sending: {
      title: "Sending Messages",
      endpoints: [
        {
          method: "POST",
          path: "/{your-endpoint}",
          description: "Queue a message to be delivered to your endpoint",
          headers: [
            {
              name: "Authorization",
              type: "string",
              required: true,
              description: "Bearer token with your Done secret"
            },
            {
              name: "Done-Delay",
              type: "string",
              required: false,
              description: "When to deliver the message. Examples: '5m', '1h', '2025-01-20T15:30:00Z'"
            },
            {
              name: "Done-Retry-Count",
              type: "number",
              required: false,
              description: "Maximum number of retry attempts (default: 3)"
            },
            {
              name: "Done-Retry-Delay",
              type: "string",
              required: false,
              description: "Initial delay between retries (default: '30s')"
            },
            {
              name: "Done-Retry-Multiplier",
              type: "number",
              required: false,
              description: "Multiplier for exponential backoff (default: 2)"
            },
            {
              name: "Done-DLQ",
              type: "string",
              required: false,
              description: "Dead letter queue endpoint for failed messages"
            }
          ],
          body: {
            description: "Any JSON payload you want to deliver to your endpoint",
            example: {
              userId: 123,
              action: "send-welcome-email",
              metadata: {
                signupDate: "2025-01-15T10:30:00Z"
              }
            }
          },
          responses: [
            {
              status: 200,
              description: "Message queued successfully",
              example: {
                id: "msg_abc123",
                status: "queued",
                scheduledFor: "2025-01-15T10:35:00Z"
              }
            },
            {
              status: 401,
              description: "Invalid or missing authorization token"
            },
            {
              status: 400,
              description: "Invalid request (bad delay format, etc.)"
            }
          ]
        }
      ]
    },
    headers: {
      title: "Header Reference",
      endpoints: [
        {
          method: "HEADERS",
          path: "Done Headers",
          description: "Complete list of Done-specific headers you can use",
          headers: [
            {
              name: "Done-Delay",
              type: "string",
              required: false,
              description: "Schedule message delivery. Supports relative delays (5m, 1h, 7d) or ISO 8601 timestamps"
            },
            {
              name: "Done-Retry-Count",
              type: "number",
              required: false,
              description: "Max retry attempts. Set to 0 to disable retries. Default: 3"
            },
            {
              name: "Done-Retry-Delay",
              type: "string",
              required: false,
              description: "Initial retry delay. Supports formats like '30s', '5m', '1h'. Default: '30s'"
            },
            {
              name: "Done-Retry-Multiplier",
              type: "number",
              required: false,
              description: "Exponential backoff multiplier. Example: 2 means delays of 30s, 60s, 120s. Default: 2"
            },
            {
              name: "Done-DLQ",
              type: "string",
              required: false,
              description: "Dead letter queue endpoint. Failed messages after all retries go here"
            },
            {
              name: "Done-Priority",
              type: "string",
              required: false,
              description: "Message priority: 'low', 'normal', 'high'. Default: 'normal'"
            },
            {
              name: "Done-Idempotency-Key",
              type: "string",
              required: false,
              description: "Prevent duplicate message queuing. Same key = same message"
            }
          ]
        }
      ]
    },
    webhooks: {
      title: "Webhook Handling",
      endpoints: [
        {
          method: "POST",
          path: "Your webhook endpoint",
          description: "How Done calls your webhook endpoints",
          headers: [
            {
              name: "X-Done-Message-Id",
              type: "string",
              required: true,
              description: "Unique identifier for this message"
            },
            {
              name: "X-Done-Attempt",
              type: "number",
              required: true,
              description: "Current delivery attempt number (starts at 1)"
            },
            {
              name: "X-Done-Timestamp",
              type: "string",
              required: true,
              description: "ISO 8601 timestamp of when Done sent this request"
            },
            {
              name: "X-Done-Signature",
              type: "string",
              required: false,
              description: "HMAC signature for webhook verification (if configured)"
            }
          ],
          body: {
            description: "The exact JSON payload you sent when queuing the message",
            example: {
              userId: 123,
              action: "send-welcome-email"
            }
          },
          responses: [
            {
              status: 200,
              description: "Success - message processed successfully"
            },
            {
              status: 201,
              description: "Success - message processed successfully"
            },
            {
              status: 204,
              description: "Success - message processed successfully"
            },
            {
              status: 500,
              description: "Server error - Done will retry based on retry configuration"
            },
            {
              status: 503,
              description: "Service unavailable - Done will retry"
            },
            {
              status: 429,
              description: "Rate limited - Done will retry with backoff"
            }
          ]
        }
      ]
    },
    errors: {
      title: "Error Handling",
      endpoints: [
        {
          method: "ERROR",
          path: "Error Responses",
          description: "Common error responses and how to handle them",
          responses: [
            {
              status: 400,
              description: "Bad Request - Invalid delay format or missing required fields",
              example: {
                error: "Invalid delay format. Use relative (5m, 1h) or ISO 8601 format"
              }
            },
            {
              status: 401,
              description: "Unauthorized - Invalid or missing Bearer token",
              example: {
                error: "Invalid authorization token"
              }
            },
            {
              status: 413,
              description: "Payload Too Large - Message body exceeds size limit",
              example: {
                error: "Message payload exceeds 1MB limit"
              }
            },
            {
              status: 429,
              description: "Too Many Requests - Rate limit exceeded",
              example: {
                error: "Rate limit exceeded. Try again in 60 seconds",
                retryAfter: 60
              }
            },
            {
              status: 503,
              description: "Service Unavailable - Done is temporarily unavailable",
              example: {
                error: "Service temporarily unavailable"
              }
            }
          ]
        }
      ]
    }
  };

  const currentSection = () => sections[selectedSection() as keyof typeof sections];

  return (
    <div class="api-reference">
      <div class="container">
        <header class="page-header">
          <h1>API Reference</h1>
          <p class="lead">
            Complete technical reference for the Done API. For practical examples, 
            check out our <a href="/examples">Examples</a> section.
          </p>
        </header>

        <div class="api-container">
          <nav class="api-nav">
            <h3>Sections</h3>
            <For each={Object.entries(sections)}>
              {([key, section]) => (
                <button
                  class={`nav-button ${selectedSection() === key ? 'active' : ''}`}
                  onClick={() => setSelectedSection(key)}
                >
                  {section.title}
                </button>
              )}
            </For>
          </nav>

          <div class="api-content">
            <h2>{currentSection().title}</h2>
            
            <For each={currentSection().endpoints}>
              {(endpoint) => (
                <div class="endpoint-card">
                  <div class="endpoint-header">
                    <span class={`method method-${endpoint.method.toLowerCase()}`}>
                      {endpoint.method}
                    </span>
                    <code class="endpoint-path">{endpoint.path}</code>
                  </div>
                  
                  <p class="endpoint-description">{endpoint.description}</p>

                  {endpoint.headers && (
                    <div class="endpoint-section">
                      <h4>Headers</h4>
                      <table class="params-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <For each={endpoint.headers}>
                            {(header) => (
                              <tr>
                                <td><code>{header.name}</code></td>
                                <td><span class="type">{header.type}</span></td>
                                <td>{header.required ? '✓' : '–'}</td>
                                <td>{header.description}</td>
                              </tr>
                            )}
                          </For>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {endpoint.body && (
                    <div class="endpoint-section">
                      <h4>Request Body</h4>
                      <p>{endpoint.body.description}</p>
                      <div class="code-example">
                        <pre><code>{JSON.stringify(endpoint.body.example, null, 2)}</code></pre>
                      </div>
                    </div>
                  )}

                  {endpoint.responses && (
                    <div class="endpoint-section">
                      <h4>Responses</h4>
                      <For each={endpoint.responses}>
                        {(response) => (
                          <div class="response-item">
                            <div class="response-header">
                              <span class={`status status-${Math.floor(response.status / 100)}xx`}>
                                {response.status}
                              </span>
                              <span class="response-description">{response.description}</span>
                            </div>
                            {response.example && (
                              <div class="code-example">
                                <pre><code>{JSON.stringify(response.example, null, 2)}</code></pre>
                              </div>
                            )}
                          </div>
                        )}
                      </For>
                    </div>
                  )}
                </div>
              )}
            </For>
          </div>
        </div>

        <div class="api-notes">
          <h2>Important Notes</h2>
          <div class="notes-grid">
            <div class="note-card">
              <h3>🔐 Authentication</h3>
              <p>
                All requests must include an Authorization header with your Done secret:
                <code>Authorization: Bearer YOUR_DONE_SECRET</code>
              </p>
            </div>
            <div class="note-card">
              <h3>📏 Size Limits</h3>
              <p>
                Message payloads are limited to 1MB. For larger payloads, 
                store the data elsewhere and pass a reference in the message.
              </p>
            </div>
            <div class="note-card">
              <h3>⏱️ Timeouts</h3>
              <p>
                Your webhook endpoints should respond within 30 seconds. 
                Longer processing will trigger a timeout and retry.
              </p>
            </div>
            <div class="note-card">
              <h3>🔄 Idempotency</h3>
              <p>
                Use the Done-Idempotency-Key header to prevent duplicate 
                messages. Same key = message won't be queued again.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiReference;