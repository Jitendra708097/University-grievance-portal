import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LayoutDashboard, PlusCircle, ShieldCheck } from 'lucide-react';

export default function Sidebar() {
  const { user } = useSelector((state) => state.auth);

  const linkClasses = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700 shadow-sm' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-[calc(100vh-64px)] sticky top-16 hidden md:block shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="p-4 space-y-2 mt-2">
        <div className="px-4 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Menu</div>
        
        {user?.role === 'Student' && (
          <>
            <NavLink to="/student/dashboard" className={linkClasses}>
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>
            <NavLink to="/submit-grievance" className={linkClasses}>
              <PlusCircle size={18} />
              New Grievance
            </NavLink>
          </>
        )}

        {(user?.role === 'DeptAdmin' || user?.role === 'SuperAdmin') && (
          <NavLink to="/admin/dashboard" className={linkClasses}>
            <ShieldCheck size={18} />
            Admin Console
          </NavLink>
        )}
      </div>
    </aside>
  );
}