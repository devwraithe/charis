import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreatorPage from './pages/Creator';
import FanPage from './pages/Fan';
import CreatorArchivePage from './pages/CreatorArchive';
import WalletContextProvider from './providers/WalletProvider';
import { Toaster } from 'sonner';
import SetupCreator from './pages/SetupCreator';


function App() {
  return (
    <div>
      <Toaster />
      <WalletContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setup" element={<SetupCreator />} />
            <Route path="/creator" element={<CreatorPage />} />
            <Route path="/archive" element={<CreatorArchivePage />} />
            <Route path="/fan" element={<FanPage />} />
          </Routes>
        </BrowserRouter>
      </WalletContextProvider>
    </div>
  );
}

export default App
