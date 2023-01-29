import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Calendar from './pages/Calendar';
import Achievements from './pages/Achievements';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Task from './pages/Task';
import Register from './pages/Register';
import RegisterAdmin from './pages/RegisterAdmin';
import AchievementInfo from './pages/AchievementInfo';
import Logout from './pages/Logout';
import GeneralSetting from './components/Settings/General/GeneralSetting';
import AppearanceSettings from './components/Settings/Appearance/AppearanceSettings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{
      path: '/task',
      element: <Task />
    },
    {
      path: '/calendar',
      element: <Calendar />
    },
    {
      path: '/achievements',
      element: <Achievements />
    },
    {
      path: '/profile',
      element: <Profile />
    },
    {
      path: '/profile',
      element: <Profile />
    },

    {
      path: '/settings',
      element: <Settings />,
      children:
        [{
          path: '/settings/general',
          element: <GeneralSetting />
        },
        {
          path: '/settings/appearance',
          element: <AppearanceSettings />
        }
        ]
    }

    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/logout',
    element: <Logout />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/register/admin',
    element: <RegisterAdmin />
  },
  {
    path: '/achievement/info',
    element: <AchievementInfo />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);

