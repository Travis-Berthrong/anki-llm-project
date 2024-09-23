import { Home, FileSliders } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import Logout from './Logout';

const checkAccess = ({ allowedRoles }) => {
    const userRole = secureLocalStorage.getItem('user_role');
    console.log(userRole);
    return allowedRoles.includes(userRole);
};

export default function Navbar({ children }) {
    const navigation = [
      { name: 'Home', to: '.', icon: Home},
      checkAccess({ allowedRoles: ['admin'] }) && {
        name: 'Config',
        to: './config',
        icon: FileSliders,
      },
    ].filter(Boolean);
  
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-black sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 py-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                end={true}
                className={({ isActive }) =>
                    `text-gray-300 hover:bg-gray-700 hover:text-white group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium ${isActive ? 'bg-gray-900 text-white' : ''}`
                }
              >
                <item.icon
                  className=
                    'text-gray-400 group-hover:text-gray-300 mr-4 size-6 shrink-0'
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
            <Logout />
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    );
  }