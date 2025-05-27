import { Component, createSignal } from "solid-js";
import { A } from "@solidjs/router";

const GettingStarted: Component = () => {
  const [selectedStorage, setSelectedStorage] = createSignal<'turso' | 'denokv'>('turso');

  return (
    <div class="getting-started">
      <div class="container">
        <header class="page-header">
          <h1>Getting Started with Done</h1>
          <p class="lead">
            Set up your own message queue in just 5 minutes. No complex configuration needed!
          </p>
        </header>

        <div class="steps-container">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h2>Clone the repository</h2>
              <p>Start by getting the Done source code from GitHub:</p>
              <div class="code-block">
                <code>git clone https://github.com/dnl-fm/done.git</code>
              </div>
              <div class="code-block">
                <code>cd done</code>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h2>Choose your storage backend</h2>
              <p>Done supports two storage options. Pick the one that fits your needs:</p>
              
              <div class="storage-options">
                <button 
                  class={`storage-option ${selectedStorage() === 'turso' ? 'active' : ''}`}
                  onClick={() => setSelectedStorage('turso')}
                >
                  <h3>Turso (Recommended) 🚀</h3>
                  <p>Perfect for production with global edge deployment</p>
                </button>
                <button 
                  class={`storage-option ${selectedStorage() === 'denokv' ? 'active' : ''}`}
                  onClick={() => setSelectedStorage('denokv')}
                >
                  <h3>Deno KV 🦕</h3>
                  <p>Great for getting started quickly with zero setup</p>
                </button>
              </div>

              {selectedStorage() === 'turso' ? (
                <div class="storage-setup">
                  <h4>Setting up Turso:</h4>
                  <ol>
                    <li>
                      <p>Install the Turso CLI:</p>
                      <div class="code-block">
                        <code>curl -sSfL https://get.tur.so/install.sh | bash</code>
                      </div>
                    </li>
                    <li>
                      <p>Create a new database:</p>
                      <div class="code-block">
                        <code>turso db create done-queue</code>
                      </div>
                    </li>
                    <li>
                      <p>Get your database URL and auth token:</p>
                      <div class="code-block">
                        <code>turso db show done-queue --url</code>
                      </div>
                      <div class="code-block">
                        <code>turso db tokens create done-queue</code>
                      </div>
                    </li>
                  </ol>
                </div>
              ) : (
                <div class="storage-setup">
                  <h4>Using Deno KV:</h4>
                  <p class="info-box">
                    ✨ Good news! Deno KV requires no setup. It's built right into Deno Deploy!
                  </p>
                </div>
              )}
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h2>Configure your environment</h2>
              <p>Create a <code>.env</code> file with your settings:</p>
              
              {selectedStorage() === 'turso' ? (
                <div class="code-block">
                  <pre>{`DONE_SECRET=your-secret-key-here
TURSO_DATABASE_URL=your-turso-url
TURSO_AUTH_TOKEN=your-turso-token`}</pre>
                </div>
              ) : (
                <div class="code-block">
                  <pre>{`DONE_SECRET=your-secret-key-here`}</pre>
                </div>
              )}
              
              <p class="tip">
                💡 <strong>Tip:</strong> Use a strong, random secret key. You can generate one with:
              </p>
              <div class="code-block">
                <code>openssl rand -base64 32</code>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h2>Test locally</h2>
              <p>Run Done on your local machine to make sure everything works:</p>
              <div class="code-block">
                <code>deno task dev</code>
              </div>
              <p>Your Done instance should now be running at <code>http://localhost:8000</code> 🎉</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h2>Deploy to Deno Deploy</h2>
              <p>Ready to go live? Deploy your Done instance:</p>
              
              <ol>
                <li>
                  <p>Push your code to GitHub</p>
                </li>
                <li>
                  <p>Go to <a href="https://deno.com/deploy" target="_blank" rel="noopener noreferrer">deno.com/deploy</a></p>
                </li>
                <li>
                  <p>Click "New Project" and connect your GitHub repository</p>
                </li>
                <li>
                  <p>Add your environment variables from the <code>.env</code> file</p>
                </li>
                <li>
                  <p>Click "Deploy"</p>
                </li>
              </ol>
              
              <p class="success-message">
                🚀 That's it! Your Done instance is now live and ready to handle messages globally!
              </p>
            </div>
          </div>
        </div>

        <div class="next-steps">
          <h2>What's next?</h2>
          <div class="next-steps-grid">
            <A href="/examples" class="next-step-card">
              <h3>📝 See Examples</h3>
              <p>Learn how to send messages, handle delays, and implement retries</p>
            </A>
            <A href="/api" class="next-step-card">
              <h3>📚 API Reference</h3>
              <p>Explore all the endpoints and options available in Done</p>
            </A>
            <a href="https://github.com/dnl-fm/done/issues" target="_blank" rel="noopener noreferrer" class="next-step-card">
              <h3>💬 Get Help</h3>
              <p>Stuck? Open an issue on GitHub and we'll help you out</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;