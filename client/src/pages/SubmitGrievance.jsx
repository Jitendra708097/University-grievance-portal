
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import toast from 'react-hot-toast';
import { Send, UploadCloud, FileText, ChevronLeft } from 'lucide-react';

export default function SubmitGrievance() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('departmentTarget', data.departmentTarget);
    formData.append('isAnonymous', data.isAnonymous);
    if (data.evidence[0]) formData.append('evidence', data.evidence[0]);

    try {
      await api.post('/grievances', formData, { 
        headers: { 'Content-Type': 'multipart/form-data' } 
      });
      toast.success('Grievance Submitted Successfully');
      navigate('/student/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Submission failed');
    }
  };

  // Styling constants
  const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";
  const inputClass = "w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white transition-all text-sm placeholder:text-slate-400";
  const errorClass = "text-red-500 text-xs mt-1 font-medium";

  return (
    <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-slate-500 hover:text-slate-800 text-sm mb-4 font-medium transition-colors"
      >
        <ChevronLeft size={16} /> Back to Dashboard
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Form Header */}
        <div className="bg-slate-50/80 px-8 py-6 border-b border-slate-100 flex items-start gap-4">
          <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm">
             <FileText className="w-6 h-6 text-blue-700" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">File a Grievance</h2>
            <p className="text-sm text-slate-500 mt-1">
              Please provide detailed information to help us resolve your issue faster.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          
          {/* 1. Title & Dept */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Subject Title</label>
              <input 
                {...register("title", { required: "Subject is required", minLength: { value: 6, message: "Min 3 characters" }, maxLength: { value: 300, message: "Max 150 characters"} })} 
                className={inputClass} 
                placeholder="e.g. WiFi Connectivity Issue" 
              />
              {errors.title && <p className={errorClass}>{errors.title.message}</p>}
            </div>

            <div>
              <label className={labelClass}>Target Department</label>
              <div className="relative">
                <select {...register("departmentTarget", { required: "Department is required" })} className={inputClass}>
                  <option value="">Select Department...</option>
                  <option value="ComputerScience">Computer Science</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Hostel">Hostel Administration</option>
                  <option value="ExamCell">Examination Cell</option>
                  <option value="ViceChancellor">Vice Chancellor (Escalation)</option>
                </select>
              </div>
              {errors.departmentTarget && <p className={errorClass}>{errors.departmentTarget.message}</p>}
            </div>
          </div>

          {/* 2. Description */}
          <div>
            <label className={labelClass}>Detailed Description</label>
            <textarea 
              {...register("description", { required: "Description is required",minLength: { value: 6, message: "Min 5 characters" }, maxLength: { value: 500, message: "Max 300 characters"} })} 
              rows="6" 
              className={inputClass} 
              placeholder="Describe the incident, location, and any specific details..."
            ></textarea>
            {errors.description && <p className={errorClass}>{errors.description.message}</p>}
          </div>

          {/* 3. File Upload */}
          <div>
            <label className={labelClass}>Evidence (Optional)</label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 hover:border-blue-400 transition-all cursor-pointer relative group">
              <input 
                type="file" 
                {...register("evidence")} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              />
              <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-semibold text-slate-700">Click to upload document</p>
              <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, PDF (Max 5MB)</p>
            </div>
          </div>

          {/* 4. Anonymity Toggle */}
          <div className="flex items-center gap-3 bg-amber-50 p-4 rounded-lg border border-amber-100">
            <input 
              type="checkbox" 
              id="anon" 
              {...register("isAnonymous")} 
              className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer" 
            />
            <label htmlFor="anon" className="text-sm text-slate-800 font-medium cursor-pointer select-none">
               Submit Anonymously 
               <span className="text-xs text-slate-500 block font-normal mt-0.5">
                 Your name and email will be hidden from the department admin.
               </span>
            </label>
          </div>

          {/* 5. Submit Button */}
          <div className="pt-2">
            <button 
              disabled={isSubmitting} 
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition-all shadow-lg shadow-slate-900/10 flex justify-center items-center gap-2 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
            >
               {isSubmitting ? 'Submitting Report...' : <><Send size={18} /> Submit Grievance</>}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}