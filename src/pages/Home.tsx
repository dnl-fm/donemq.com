import type { Component } from "solid-js";
import { A } from "@solidjs/router";

const Home: Component = () => {
  return (
    <div class="home">
      <section class="hero">
        <div class="hero-content">
          <h1 class="hero-title">
            Welcome to <span class="highlight">Done</span>
          </h1>
          <p class="hero-subtitle">
            The simple, self-hosted message queue that just works
          </p>
          <p class="hero-description">
            Built for Deno Deploy, Done gives you reliable message queuing without the complexity.
            Perfect for webhooks, background jobs, and scheduled tasks.
          </p>
          <div class="hero-actions">
            <A href="/getting-started" class="btn btn-primary">
              Get Started in 5 Minutes
            </A>
            <a href="https://github.com/dnl-fm/done" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      <section class="features">
        <div class="container">
          <h2 class="section-title">Why developers love Done</h2>
          <div class="feature-grid">
            <div class="feature-card">
              <div class="feature-icon">🚀</div>
              <h3>Deploy in Minutes</h3>
              <p>One-click deployment to Deno Deploy. No complex infrastructure needed.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">⏰</div>
              <h3>Flexible Scheduling</h3>
              <p>Schedule messages with no time limits. Use relative delays like "5m" or exact timestamps.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔄</div>
              <h3>Smart Retries</h3>
              <p>Automatic retry handling with exponential backoff. Never lose a message.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🌍</div>
              <h3>Global & Fast</h3>
              <p>Powered by Deno Deploy's edge network. Your messages delivered worldwide.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🛠️</div>
              <h3>REST API</h3>
              <p>Simple HTTP API that works with any language or framework.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📖</div>
              <h3>Open Source</h3>
              <p>MIT licensed. Audit the code, contribute, or fork it for your needs.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="quick-example">
        <div class="container">
          <h2 class="section-title">See how simple it is</h2>
          <div class="example-content">
            <div class="example-description">
              <h3>Send a delayed message in one HTTP request</h3>
              <p>
                Done uses your existing HTTP endpoints as message handlers. 
                Just add a delay header and Done will call your endpoint when the time comes.
              </p>
              <A href="/examples" class="link-arrow">
                See more examples →
              </A>
            </div>
            <div class="code-example">
              <pre><code>{`// Send a message to be delivered in 5 minutes
await fetch('https://your-done-instance.deno.dev/your-webhook', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-token',
    'Done-Delay': '5m'  // That's it!
  },
  body: JSON.stringify({
    action: 'send-welcome-email',
    userId: 123
  })
});`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="cta">
        <div class="container">
          <h2>Ready to simplify your message queue?</h2>
          <p>Get started with Done in just a few minutes. No credit card required.</p>
          <div class="cta-actions">
            <A href="/getting-started" class="btn btn-primary btn-lg">
              Start Building
            </A>
            <A href="/why-done" class="btn btn-outline btn-lg">
              Learn More
            </A>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;