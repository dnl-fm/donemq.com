import { Component } from 'solid-js';
import { Router, Route } from "@solidjs/router";
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import GettingStarted from './pages/GettingStarted';
import './App.css';

const App: Component = () => {
  return (
    <Router root={MainLayout}>
      <Route path="/" component={Home} />
      <Route path="/getting-started" component={GettingStarted} />
      <Route path="/why-done" component={() => <div>Why Done? - Coming Soon</div>} />
      <Route path="/examples" component={() => <div>Examples - Coming Soon</div>} />
      <Route path="/api" component={() => <div>API Reference - Coming Soon</div>} />
    </Router>
  );
};

export default App
