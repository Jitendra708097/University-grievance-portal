import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, reset } from '../redux/slices/authSlice';
import { GraduationCap, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, isLoading, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess || user) {
      if (user?.role === 'Student') navigate('/student/dashboard');
      else navigate('/admin/dashboard');
      dispatch(reset());
    }
  }, [user, isSuccess, navigate, dispatch]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 p-10 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-purple-500"></div>
           <div className="inline-flex p-3 rounded-full bg-white/10 mb-4 backdrop-blur-sm">
             <GraduationCap className="w-8 h-8 text-blue-400" />
           </div>
           <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
           <p className="text-slate-400 text-sm mt-2">HRIT University Grievance Portal</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email<span className='text-red-500 font-bold'> *</span></label>
              <div className="relative">
                <input 
                  {...register("email", { required: "Email is required" })}
                  className="w-full px-4 py-2.5 pl-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                  placeholder="student email address"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password<span className='text-red-500 text-md font-bold'> *</span></label>
              <div className="relative">
                <input 
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  className="w-full px-4 py-2.5 pl-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                  placeholder="••••••••"
                />
                <Lock className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>}
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold shadow-lg shadow-blue-700/20 active:scale-[0.99] transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Sign In <ArrowRight size={18}/></>}
            </button>
          </form>
        </div>
        
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
   <p className="text-xs text-slate-500">
     Don't have an account? <Link to="/register" className="text-blue-700 font-bold hover:underline">Register Here</Link>
   </p>
</div>
      </div>
    </div>
  );
}