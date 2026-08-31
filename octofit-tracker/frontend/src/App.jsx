import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/workouts', label: 'Workouts' },
  { to: '/leaderboard', label: 'Leaderboard' },
];

function Overview() {
  return (
    <div className="row g-4">
      <div className="col-12 col-xl-6">
        <Users />
      </div>
      <div className="col-12 col-xl-6">
        <Teams />
      </div>
      <div className="col-12 col-xl-7">
        <Activities />
      </div>
      <div className="col-12 col-xl-5">
        <Workouts />
      </div>
      <div className="col-12">
        <Leaderboard />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid px-4">
          <div className="navbar-brand d-flex align-items-center gap-3">
            <img
              src="/octofitapp-small.png"
              alt="OctoFit Tracker"
              className="brand-logo"
            />
            <div>
              <div className="fw-bold">OctoFit Tracker</div>
              <small className="text-light opacity-75">Fitness dashboard</small>
            </div>
          </div>

          <div className="navbar-nav ms-auto flex-row flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-pill ${isActive ? 'active bg-white text-primary' : 'text-white-50'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <header className="mb-4">
          <p className="eyebrow mb-2">School wellness</p>
          <h1 className="display-6 fw-bold mb-0">Athlete activity overview</h1>
        </header>

        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
