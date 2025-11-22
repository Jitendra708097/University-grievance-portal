import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../utils/axios';
import StatusBadge from '../components/StatusBadge';
import { Plus, FileText, Clock, CheckCircle, AlertCircle, Search, User } from 'lucide-react';

export default function StudentDashboard() {
  const [grievances, setGrievances] = useState([]);
  const [filter, setFilter] = useState('All');
  const { user } = useSelector((state) => state.auth);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/grievances/my');
        setGrievances(data);
      } catch (error) {
        console.error("Failed to load grievances");
      }
    };
    fetchData();
  }, []);

  // Calculate Stats
  const stats = {
    total: grievances.length,
    pending: grievances.filter(g => g.status === 'Pending').length,
    resolved: grievances.filter(g => g.status === 'Resolved').length
  };

  // Filter Logic
  const filteredList = filter === 'All' 
    ? grievances 
    : grievances.filter(g => g.status === filter);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Welcome back, <span className="font-semibold text-blue-700">{user?.name}</span></p>
        </div>
        <Link 
          to="/submit-grievance"
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-lg shadow-blue-700/20 transition-all active:scale-95 font-medium text-sm"
        >
          <Plus size={18} /> File New Grievance
        </Link>
      </div>

      {/* 2. Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-full text-blue-600"><FileText size={24} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Reports</p>
            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-amber-50 p-3 rounded-full text-amber-600"><AlertCircle size={24} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending</p>
            <p className="text-2xl font-bold text-slate-900">{stats.pending}</p>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-50 p-3 rounded-full text-emerald-600"><CheckCircle size={24} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Resolved</p>
            <p className="text-2xl font-bold text-slate-900">{stats.resolved}</p>
          </div>
        </div>
      </div>

      {/* 3. Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['All', 'Pending', 'In Progress', 'Resolved'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              filter === status 
                ? 'bg-slate-800 text-white shadow-md' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* 4. Grievance Grid */}
      {filteredList.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-12 text-center">
          <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No records found</h3>
          <p className="text-slate-500 text-sm mt-1">There are no grievances matching your criteria.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredList.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200 group">
              
              <div className="flex justify-between items-start mb-4">
                <StatusBadge status={item.status} />
                <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                  <Clock size={12} /> {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="font-bold text-slate-800 mb-2 line-clamp-1 text-lg group-hover:text-blue-700 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-sm text-slate-600 line-clamp-3 mb-6 h-[60px] leading-relaxed">
                {item.description}
              </p>
              
              <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Department</span>
                  <span className="text-xs font-semibold text-slate-700">{item.departmentTarget}</span>
                </div>
                
                {item.isAnonymous && (
                  <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs font-bold">
                    <User size={12} /> <span>HIDDEN</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}