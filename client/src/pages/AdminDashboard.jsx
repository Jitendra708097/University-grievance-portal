import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../utils/axios'; // Ensure this path is correct
import { useSelector } from 'react-redux';
import StatusBadge from '../components/StatusBadge';
import toast from 'react-hot-toast';
import { Shield, Search, X, CheckCircle, FileText, Download } from 'lucide-react';

export default function AdminDashboard() {
  const [grievances, setGrievances] = useState([]);
  const [selectedGrievance, setSelectedGrievance] = useState(null); // For Modal
  const { user } = useSelector((state) => state.auth);
  
  // Refresh data function
  const fetchGrievances = () => {
    api.get('/grievances/admin/all')
      .then(res => setGrievances(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  // Update Status Function
  const handleUpdateStatus = async (newStatus) => {
    try {
      await api.put(`/grievances/${selectedGrievance._id}/status`, { status: newStatus });
      toast.success(`Marked as ${newStatus}`);
      setSelectedGrievance(null); // Close Modal
      fetchGrievances(); // Refresh Table
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-amber-400 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Admin Console</h2>
          <p className="text-sm text-slate-500 mt-1">
            Scope: <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{user?.departmentManaged || 'University Wide (VC)'}</span>
          </p>
        </div>
        <div className="bg-amber-50 p-3 rounded-full hidden sm:block">
          <Shield className="w-8 h-8 text-amber-500" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
           <Search className="w-4 h-4 text-slate-400" />
           <input placeholder="Search..." className="bg-transparent outline-none text-sm w-full placeholder:text-slate-400" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Issue</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {grievances.map((g) => (
                <tr key={g._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-600 font-medium">{new Date(g.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    {g.isAnonymous ? (
                      <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">ANONYMOUS</span>
                    ) : (
                      <div>
                        <div className="font-semibold text-slate-900">{g.student?.name}</div>
                        <div className="text-xs text-slate-500">{g.student?.email}</div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate text-slate-700">{g.title}</td>
                  <td className="px-6 py-4"><StatusBadge status={g.status} /></td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setSelectedGrievance(g)}
                      className="text-blue-600 hover:text-blue-800 font-bold text-xs border border-blue-200 hover:border-blue-600 px-3 py-1 rounded transition-all"
                    >
                        MANAGE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL FOR RESOLUTION --- */}
      {selectedGrievance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">Grievance Details</h3>
              <button onClick={() => setSelectedGrievance(null)} className="text-slate-400 hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              
              {/* Title & Desc */}
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subject</span>
                <p className="text-lg font-bold text-slate-900 mt-1">{selectedGrievance.title}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Description</span>
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{selectedGrievance.description}</p>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <span className="text-xs text-slate-400 uppercase font-bold">Department</span>
                    <p className="font-medium text-slate-800">{selectedGrievance.departmentTarget}</p>
                </div>
                <div>
                    <span className="text-xs text-slate-400 uppercase font-bold">Current Status</span>
                    <div className="mt-1"><StatusBadge status={selectedGrievance.status} /></div>
                </div>
              </div>

              {/* Evidence Link */}
              {selectedGrievance.evidenceUrl && (
                <div className="border-t border-slate-100 pt-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attached Evidence</span>
                    <a 
                      href={selectedGrievance.evidenceUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 mt-2 text-blue-600 hover:underline font-medium"
                    >
                      <FileText size={16} /> View Attached Document/Image <Download size={14}/>
                    </a>
                </div>
              )}
            </div>

            {/* Modal Footer (Actions) */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => handleUpdateStatus('Rejected')}
                className="px-4 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
              >
                Reject
              </button>
              <button 
                onClick={() => handleUpdateStatus('In Progress')}
                className="px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
              >
                Mark In Progress
              </button>
              <button 
                onClick={() => handleUpdateStatus('Resolved')}
                className="px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-md flex items-center gap-2 transition-colors"
              >
                <CheckCircle size={16} /> Resolve Grievance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}