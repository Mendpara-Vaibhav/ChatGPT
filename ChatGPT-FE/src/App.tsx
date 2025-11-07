import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { SessionProvider } from "./contexts/SessionProvider";
import { Layout } from "./components/Layout";
import { ChatInterface } from "./components/ChatInterface";
import { LandingPage } from "./components/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SessionProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="chat/:sessionId" element={<ChatInterface />} />
            </Route>
          </Routes>
        </SessionProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
