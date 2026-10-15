import { Routes, Route, useLocation } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Headerone from "./components/Headerone";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import Waitlist from "./pages/Waitlist";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();

  const isWaitlist = location.pathname === "/waitlist";

  return (
    <>
      <ScrollToTop />

      {isWaitlist ? (
        <>
          <Headerone />

          <Routes>
            <Route path="/waitlist" element={<Waitlist />} />
          </Routes>
        </>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}

export default App;