import type { Component, JSX } from "solid-js";
import Navigation from "../components/Navigation";

interface MainLayoutProps {
  children: JSX.Element;
}

const MainLayout: Component<MainLayoutProps> = (props) => {
  return (
    <div class="app">
      <Navigation />
      <main class="main-content">
        {props.children}
      </main>
      <footer class="footer">
        <div class="footer-container">
          <p>
            Done is open source under the{" "}
            <a href="https://mozilla.org/MPL/2.0/" target="_blank" rel="noopener noreferrer">
              Mozilla Public License 2.0
            </a>
          </p>
          <p class="footer-links">
            <a href="https://github.com/dnl-fm/done" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span class="separator">•</span>
            <a href="https://github.com/dnl-fm/done/issues" target="_blank" rel="noopener noreferrer">Report an Issue</a>
            <span class="separator">•</span>
            <a href="https://deno.com/deploy" target="_blank" rel="noopener noreferrer">Deno Deploy</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;