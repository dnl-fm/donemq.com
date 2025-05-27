import type { Component } from 'solid-js';
import { Router, Route } from "@solidjs/router";
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import GettingStarted from './pages/GettingStarted';
import WhyDone from './pages/WhyDone';
import Examples from './pages/Examples';
import ApiReference from './pages/ApiReference';
import './App.css';

const App: Component = () => {
  return (
    <Router root={MainLayout}>
      <Route path="/" component={Home} />
      <Route path="/getting-started" component={GettingStarted} />
      <Route path="/why-done" component={WhyDone} />
      <Route path="/examples" component={Examples} />
      <Route path="/api" component={ApiReference} />
    </Router>
  );
};

export default App
