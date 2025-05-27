import { createSignal, For } from "solid-js";
import type { Component } from "solid-js";

interface Example {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
}

const Examples: Component = () => {
  const [selectedExample, setSelectedExample] = createSignal<string>("welcome-email");

  const examples: Example[] = [
    {
      id: "welcome-email",
      title: "Welcome Email",
      description: "Send a welcome email 5 minutes after user signup",
      language: "javascript",
      code: `// After user signs up
await fetch('https://your-done.deno.dev/send-welcome-email', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_DONE_SECRET',
    'Done-Delay': '5m'  // Send in 5 minutes
  },
  body: JSON.stringify({
    userId: newUser.id,
    email: newUser.email,
    name: newUser.name
  })
});

// Your webhook endpoint receives this after 5 minutes
app.post('/send-welcome-email', async (req, res) => {
  const { userId, email, name } = req.body;
  
  await emailService.send({
    to: email,
    subject: 'Welcome to our app!',
    template: 'welcome',
    data: { name }
  });
  
  res.json({ success: true });
});`
    },
    {
      id: "scheduled-report",
      title: "Daily Reports",
      description: "Schedule a daily report at a specific time",
      language: "python",
      code: `import requests
from datetime import datetime, timedelta

# Schedule report for tomorrow at 9 AM
tomorrow_9am = datetime.now().replace(
    hour=9, minute=0, second=0
) + timedelta(days=1)

response = requests.post(
    'https://your-done.deno.dev/generate-daily-report',
    headers={
        'Authorization': 'Bearer YOUR_DONE_SECRET',
        'Done-Delay': tomorrow_9am.isoformat()
    },
    json={
        'report_type': 'daily_sales',
        'recipients': ['team@company.com']
    }
)

# Your endpoint that generates the report
@app.route('/generate-daily-report', methods=['POST'])
def generate_report():
    data = request.get_json()
    
    # Generate your report
    report = create_sales_report()
    
    # Send to recipients
    send_report_email(
        report=report,
        recipients=data['recipients']
    )
    
    # Schedule next report
    schedule_next_daily_report()
    
    return {'status': 'sent'}`
    },
    {
      id: "retry-webhook",
      title: "Webhook with Retries",
      description: "Reliable webhook delivery with automatic retries",
      language: "javascript",
      code: `// Send webhook with retry configuration
await fetch('https://your-done.deno.dev/customer-webhook', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_DONE_SECRET',
    'Done-Retry-Count': '3',        // Retry up to 3 times
    'Done-Retry-Delay': '30s',      // Wait 30s between retries
    'Done-Retry-Multiplier': '2'    // Double delay each time
  },
  body: JSON.stringify({
    event: 'order.completed',
    orderId: order.id,
    customerId: customer.id,
    webhookUrl: customer.webhookEndpoint
  })
});

// Your webhook delivery endpoint
app.post('/customer-webhook', async (req, res) => {
  const { event, orderId, customerId, webhookUrl } = req.body;
  
  try {
    // Deliver webhook to customer
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Event': event
      },
      body: JSON.stringify({ orderId, customerId })
    });
    
    if (!response.ok) {
      // Done will retry automatically
      return res.status(500).json({ 
        error: 'Webhook delivery failed' 
      });
    }
    
    res.json({ delivered: true });
  } catch (error) {
    // Network errors trigger retry
    res.status(500).json({ error: error.message });
  }
});`
    },
    {
      id: "rate-limiting",
      title: "API Rate Limiting",
      description: "Spread API calls over time to respect rate limits",
      language: "typescript",
      code: `// Queue API calls to respect rate limits
interface ApiCall {
  endpoint: string;
  data: any;
}

async function queueApiCalls(calls: ApiCall[]) {
  const CALLS_PER_MINUTE = 60;
  const delayBetweenCalls = 60 / CALLS_PER_MINUTE; // 1 second
  
  for (let i = 0; i < calls.length; i++) {
    const call = calls[i];
    const delay = \`\${i * delayBetweenCalls}s\`;
    
    await fetch('https://your-done.deno.dev/process-api-call', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_DONE_SECRET',
        'Done-Delay': delay
      },
      body: JSON.stringify(call)
    });
  }
}

// Usage
await queueApiCalls([
  { endpoint: '/users/1', data: { status: 'active' } },
  { endpoint: '/users/2', data: { status: 'active' } },
  { endpoint: '/users/3', data: { status: 'active' } }
  // ... hundreds more
]);

// Your processing endpoint
app.post('/process-api-call', async (req, res) => {
  const { endpoint, data } = req.body;
  
  // Make the actual API call
  const result = await externalApi.patch(endpoint, data);
  
  // Log or handle result
  await db.apiCalls.create({
    endpoint,
    data,
    result,
    timestamp: new Date()
  });
  
  res.json({ processed: true });
});`
    },
    {
      id: "abandoned-cart",
      title: "Abandoned Cart Recovery",
      description: "Send reminders for abandoned shopping carts",
      language: "ruby",
      code: `# When user adds items but doesn't checkout
def handle_cart_abandonment(cart_id)
  # First reminder after 1 hour
  send_to_done(
    endpoint: '/cart-reminder',
    delay: '1h',
    data: {
      cart_id: cart_id,
      reminder_number: 1
    }
  )
  
  # Second reminder after 24 hours
  send_to_done(
    endpoint: '/cart-reminder',
    delay: '24h',
    data: {
      cart_id: cart_id,
      reminder_number: 2
    }
  )
  
  # Final reminder with discount after 72 hours
  send_to_done(
    endpoint: '/cart-reminder',
    delay: '72h',
    data: {
      cart_id: cart_id,
      reminder_number: 3,
      offer_discount: true
    }
  )
end

# Your reminder endpoint
post '/cart-reminder' do
  data = JSON.parse(request.body.read)
  cart = Cart.find(data['cart_id'])
  
  # Skip if cart was already purchased
  return { skipped: true }.to_json if cart.purchased?
  
  case data['reminder_number']
  when 1
    send_reminder_email(
      to: cart.user.email,
      subject: "You left something behind!",
      template: 'cart_reminder_1'
    )
  when 2
    send_reminder_email(
      to: cart.user.email,
      subject: "Your cart is waiting",
      template: 'cart_reminder_2'
    )
  when 3
    # Create discount code
    discount = create_discount_code(cart.user, 10)
    send_reminder_email(
      to: cart.user.email,
      subject: "10% off your cart - last chance!",
      template: 'cart_reminder_discount',
      data: { discount_code: discount.code }
    )
  end
  
  { sent: true }.to_json
end

def send_to_done(endpoint:, delay:, data:)
  HTTParty.post(
    "https://your-done.deno.dev#{endpoint}",
    headers: {
      'Authorization' => "Bearer #{ENV['DONE_SECRET']}",
      'Done-Delay' => delay
    },
    body: data.to_json
  )
end`
    },
    {
      id: "batch-processing",
      title: "Batch Processing",
      description: "Process large datasets in chunks",
      language: "go",
      code: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

// Queue batch processing jobs
func processBatchData(records []Record) error {
    const BATCH_SIZE = 100
    
    for i := 0; i < len(records); i += BATCH_SIZE {
        end := i + BATCH_SIZE
        if end > len(records) {
            end = len(records)
        }
        
        batch := records[i:end]
        delay := fmt.Sprintf("%ds", i/BATCH_SIZE*5) // 5s between batches
        
        err := queueBatch(batch, delay, i/BATCH_SIZE)
        if err != nil {
            return err
        }
    }
    
    return nil
}

func queueBatch(batch []Record, delay string, batchNum int) error {
    payload := map[string]interface{}{
        "batch_number": batchNum,
        "records":      batch,
    }
    
    body, _ := json.Marshal(payload)
    
    req, _ := http.NewRequest(
        "POST",
        "https://your-done.deno.dev/process-batch",
        bytes.NewBuffer(body),
    )
    
    req.Header.Set("Authorization", "Bearer YOUR_DONE_SECRET")
    req.Header.Set("Done-Delay", delay)
    
    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    return nil
}

// Your batch processing endpoint
func processBatchHandler(w http.ResponseWriter, r *http.Request) {
    var data struct {
        BatchNumber int      \`json:"batch_number"\`
        Records     []Record \`json:"records"\`
    }
    
    json.NewDecoder(r.Body).Decode(&data)
    
    // Process each record
    for _, record := range data.Records {
        err := processRecord(record)
        if err != nil {
            log.Printf("Error processing record: %v", err)
        }
    }
    
    log.Printf("Processed batch %d with %d records", 
        data.BatchNumber, len(data.Records))
    
    json.NewEncoder(w).Encode(map[string]bool{
        "success": true,
    })
}`
    }
  ];

  const currentExample = () => examples.find(e => e.id === selectedExample()) || examples[0];

  return (
    <div class="examples">
      <div class="container">
        <header class="page-header">
          <h1>Examples</h1>
          <p class="lead">
            Real-world examples showing how to use Done in your applications. 
            Click any example to see the code.
          </p>
        </header>

        <div class="examples-container">
          <div class="examples-sidebar">
            <h3>Choose an Example</h3>
            <For each={examples}>
              {(example) => (
                <button
                  class={`example-button ${selectedExample() === example.id ? 'active' : ''}`}
                  onClick={() => setSelectedExample(example.id)}
                >
                  <strong>{example.title}</strong>
                  <span>{example.description}</span>
                </button>
              )}
            </For>
          </div>

          <div class="example-content">
            <div class="example-header">
              <h2>{currentExample().title}</h2>
              <p>{currentExample().description}</p>
            </div>

            <div class="code-container">
              <div class="code-header">
                <span class="language-badge">{currentExample().language}</span>
                <button class="copy-button" onClick={() => {
                  navigator.clipboard.writeText(currentExample().code);
                  alert('Code copied to clipboard!');
                }}>
                  Copy Code
                </button>
              </div>
              <pre class="code-block"><code>{currentExample().code}</code></pre>
            </div>

            <div class="example-notes">
              <h3>Key Points</h3>
              {selectedExample() === "welcome-email" && (
                <ul>
                  <li>Use <code>Done-Delay</code> header with relative time like "5m", "1h", "7d"</li>
                  <li>Done calls your endpoint after the specified delay</li>
                  <li>Perfect for onboarding sequences and drip campaigns</li>
                </ul>
              )}
              {selectedExample() === "scheduled-report" && (
                <ul>
                  <li>Use ISO 8601 timestamps for exact scheduling</li>
                  <li>Great for recurring tasks - just reschedule in your handler</li>
                  <li>Timezone handling is automatic with ISO timestamps</li>
                </ul>
              )}
              {selectedExample() === "retry-webhook" && (
                <ul>
                  <li>Automatic retries on 5xx status codes or network errors</li>
                  <li>Exponential backoff prevents overwhelming failed endpoints</li>
                  <li>Dead letter queue after max retries (configure with Done-DLQ header)</li>
                </ul>
              )}
              {selectedExample() === "rate-limiting" && (
                <ul>
                  <li>Spread API calls over time to respect rate limits</li>
                  <li>No complex queue management needed</li>
                  <li>Perfect for bulk operations on external APIs</li>
                </ul>
              )}
              {selectedExample() === "abandoned-cart" && (
                <ul>
                  <li>Schedule multiple reminders with one cart abandonment event</li>
                  <li>Each reminder can check if action was already taken</li>
                  <li>Escalating incentives improve conversion rates</li>
                </ul>
              )}
              {selectedExample() === "batch-processing" && (
                <ul>
                  <li>Process large datasets without overwhelming your system</li>
                  <li>Automatic spacing between batches prevents spikes</li>
                  <li>Failed batches don't affect others</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div class="more-examples">
          <h2>More Use Cases</h2>
          <div class="use-case-ideas">
            <div class="idea">
              <h4>📱 Push Notifications</h4>
              <p>Queue and batch mobile push notifications</p>
            </div>
            <div class="idea">
              <h4>🔄 Data Sync</h4>
              <p>Schedule regular syncs between systems</p>
            </div>
            <div class="idea">
              <h4>🧹 Cleanup Tasks</h4>
              <p>Delete old data, logs, or temporary files</p>
            </div>
            <div class="idea">
              <h4>📊 Analytics</h4>
              <p>Aggregate and process analytics events</p>
            </div>
            <div class="idea">
              <h4>🎂 Birthday Emails</h4>
              <p>Schedule anniversary and birthday messages</p>
            </div>
            <div class="idea">
              <h4>💳 Payment Reminders</h4>
              <p>Send invoice and payment due notices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examples;