import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, reset } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { LogOut, GraduationCap } from 'lucide-react';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50 w-full border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/20 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none tracking-tight text-slate-100">HRIT UNIVERSITY</h1>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Grievance Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {user && (
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-medium text-slate-200">{user.name}</span>
                <span className="text-xs text-slate-500 uppercase">{user.role}</span>
              </div>
            )}
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-2 rounded-md transition-all text-sm border border-slate-700"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}