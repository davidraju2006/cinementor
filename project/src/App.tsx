import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Create from "./pages/Create";
import Direct from "./pages/Direct";
import Pitch from "./pages/Pitch";
import Projects from "./pages/Projects";
import AiMentorPage from "./pages/AiMentorPage";
import ShotGenerator from "./pages/ShotGenerator";
import Dashboard from "./pages/Dashboard";
import GenreSelect from "./pages/GenreSelect";
import ToolsHub from "./pages/ToolsHub";
import LessonView from "./pages/LessonView";
import CameraAngles from "./pages/CameraAngles";
import Blocking from "./pages/Blocking";
import BudgetCalculator from "./pages/BudgetCalculator";



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <Navigation />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/create" element={<Create />} />
            <Route path="/direct" element={<Direct />} />
            <Route path="/pitch" element={<Pitch />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/ai" element={<AiMentorPage />} />
            <Route path="/shots" element={<ShotGenerator />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learn/genre" element={<GenreSelect />} />
            <Route path="/learn/:lessonId" element={<LessonView />} />
            <Route path="/tools" element={<ToolsHub />} />
            <Route path="/direct/angles" element={<CameraAngles />} />
            <Route path="/direct/blocking" element={<Blocking />} />
            <Route path="/pitch/budget" element={<BudgetCalculator />} />


          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
