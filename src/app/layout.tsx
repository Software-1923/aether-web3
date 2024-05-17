import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import './Layout.css';

const Layout = () => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
export default Layout;
