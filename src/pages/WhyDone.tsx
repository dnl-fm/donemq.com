import type { Component } from "solid-js";
import { A } from "@solidjs/router";

const WhyDone: Component = () => {
  return (
    <div class="why-done">
      <div class="container">
        <header class="page-header">
          <h1>Why Choose Done?</h1>
          <p class="lead">
            We built Done because message queues shouldn't require a PhD to operate.
            Here's why developers love it.
          </p>
        </header>

        <div class="comparison-section">
          <h2>The Problem with Traditional Message Queues</h2>
          <div class="problem-cards">
            <div class="problem-card">
              <div class="problem-icon">😵</div>
              <h3>Complex Setup</h3>
              <p>Hours of configuration, infrastructure planning, and operational overhead</p>
            </div>
            <div class="problem-card">
              <div class="problem-icon">💸</div>
              <h3>Expensive</h3>
              <p>Dedicated servers, managed services, or enterprise licenses that break the bank</p>
            </div>
            <div class="problem-card">
              <div class="problem-icon">🔧</div>
              <h3>Maintenance Heavy</h3>
              <p>Constant monitoring, scaling decisions, and infrastructure management</p>
            </div>
          </div>
        </div>

        <div class="solution-section">
          <h2>Done Does It Differently</h2>
          
          <div class="benefit-list">
            <div class="benefit">
              <h3>🚀 Deploy in Minutes, Not Days</h3>
              <p>
                Fork the repo, add your environment variables, deploy to Deno Deploy. 
                That's it. No Kubernetes, no Docker, no complex infrastructure.
              </p>
            </div>

            <div class="benefit">
              <h3>🌍 Global by Default</h3>
              <p>
                Your Done instance runs on Deno Deploy's edge network. 
                Messages are processed close to your users, anywhere in the world.
              </p>
            </div>

            <div class="benefit">
              <h3>💰 Pay Only for What You Use</h3>
              <p>
                No idle servers burning money. Deno Deploy's pricing means you only 
                pay when Done is actually processing messages.
              </p>
            </div>

            <div class="benefit">
              <h3>🛠️ Use Your Existing Stack</h3>
              <p>
                Done doesn't require special SDKs or clients. If your app can make 
                HTTP requests, it can use Done. Works with any language or framework.
              </p>
            </div>

            <div class="benefit">
              <h3>⏰ Flexible Scheduling</h3>
              <p>
                Schedule messages for 5 minutes or 5 months from now. Use simple 
                relative delays like "1h" or exact timestamps. No restrictions.
              </p>
            </div>

            <div class="benefit">
              <h3>🔒 Your Data, Your Control</h3>
              <p>
                Self-hosted means your message data never leaves your infrastructure. 
                Choose between Turso for production or Deno KV for simplicity.
              </p>
            </div>
          </div>
        </div>

        <div class="use-cases">
          <h2>Perfect For</h2>
          <div class="use-case-grid">
            <div class="use-case">
              <h3>📧 Email Workflows</h3>
              <p>Welcome emails, reminders, drip campaigns</p>
            </div>
            <div class="use-case">
              <h3>🔔 Notifications</h3>
              <p>Push notifications, in-app alerts, SMS</p>
            </div>
            <div class="use-case">
              <h3>🤖 Webhooks</h3>
              <p>Reliable webhook delivery with retries</p>
            </div>
            <div class="use-case">
              <h3>⚡ Background Jobs</h3>
              <p>Image processing, data syncs, cleanups</p>
            </div>
            <div class="use-case">
              <h3>📅 Scheduled Tasks</h3>
              <p>Reports, backups, recurring jobs</p>
            </div>
            <div class="use-case">
              <h3>🔄 API Rate Limiting</h3>
              <p>Spread API calls over time to respect limits</p>
            </div>
          </div>
        </div>

        <div class="comparison-table">
          <h2>Done vs. Traditional Queues</h2>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th class="done-column">Done</th>
                <th>Traditional MQ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Setup Time</td>
                <td class="done-column">✅ 5 minutes</td>
                <td>❌ Hours to days</td>
              </tr>
              <tr>
                <td>Infrastructure</td>
                <td class="done-column">✅ Serverless edge</td>
                <td>❌ Dedicated servers</td>
              </tr>
              <tr>
                <td>Global Availability</td>
                <td class="done-column">✅ Built-in</td>
                <td>❌ Complex setup</td>
              </tr>
              <tr>
                <td>Maintenance</td>
                <td class="done-column">✅ Zero</td>
                <td>❌ Constant</td>
              </tr>
              <tr>
                <td>Client Libraries</td>
                <td class="done-column">✅ Any HTTP client</td>
                <td>❌ Language-specific SDKs</td>
              </tr>
              <tr>
                <td>Cost Model</td>
                <td class="done-column">✅ Pay per use</td>
                <td>❌ Fixed monthly</td>
              </tr>
              <tr>
                <td>Delay Limits</td>
                <td class="done-column">✅ No limits</td>
                <td>❌ Often restricted</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="testimonial">
          <blockquote>
            "We replaced our complex RabbitMQ setup with Done and haven't looked back. 
            What took a dedicated ops person now runs itself."
          </blockquote>
          <cite>- Happy Done User</cite>
        </div>

        <div class="cta-section">
          <h2>Ready to Simplify Your Message Queue?</h2>
          <p>Join developers who've ditched the complexity for something that just works.</p>
          <div class="cta-actions">
            <A href="/getting-started" class="btn btn-primary btn-lg">
              Get Started Now
            </A>
            <A href="/examples" class="btn btn-outline btn-lg">
              See Examples
            </A>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyDone;