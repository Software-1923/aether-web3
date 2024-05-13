import React from 'react';
import Layout from './Layout';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <Router>
      <Layout>
        <Header />
        <Route exact path="/" component={Home} />
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
