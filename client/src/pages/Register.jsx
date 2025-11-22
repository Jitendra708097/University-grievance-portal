import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, reset } from '../redux/slices/authSlice'; // Ensure registerUser is exported from slice
import { UserPlus, Loader2, Building2, ArrowRight } from 'lucide-react';

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Access Redux state
  const { user, isLoading, isSuccess } = useSelector((state) => state.auth);

  // Watch role to conditionally show department dropdown
  // const selectedRole = watch("role", "Student");

  useEffect(() => {
    if (isSuccess || user) {
      if (user?.role === 'Student') navigate('/student/dashboard');
      else navigate('/admin/dashboard');
      dispatch(reset());
    }
  }, [user, isSuccess, navigate, dispatch]);

  const onSubmit = (data) => {
    // If student, clear departmentManaged field
    // const payload = {
    //   ...data,
    //   departmentManaged: data.role === 'Student' ? null : data.departmentManaged
    // };
    dispatch(registerUser(data));
  };

  // Shared Styles
  const labelClass = "block text-sm font-semibold text-slate-700 mb-1";
  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white text-sm";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex">
        
        {/* Left Side: Visual (Hidden on mobile) */}
        <div className="hidden md:flex w-5/12 bg-slate-900 flex-col justify-center items-center p-8 text-white text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
           
           <div className="bg-white/10 p-4 rounded-2xl mb-6 backdrop-blur-sm">
             <Building2 className="w-10 h-10 text-blue-400" />
           </div>
           <h2 className="text-2xl font-bold mb-3">Join the Community</h2>
           <p className="text-slate-400 text-sm leading-relaxed">
             Create an account to submit grievances, track resolutions, and improve campus life.
           </p>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-7/12 p-8 sm:p-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
            <p className="text-slate-500 text-sm mt-1">Enter your details to register.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               <div>
                 <label className={labelClass}>Full Name</label>
                 <input 
                    {...register("name", { required: "Name is required" })} 
                    className={inputClass} 
                    placeholder="John Doe"
                 />
                 {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
               </div>

               <div>
                 <label className={labelClass}>University Email</label>
                 <input 
                    {...register("email", { 
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@university\.edu$/i,
                            message: "Must use @university.edu"
                        }
                    })} 
                    className={inputClass} 
                    placeholder="id@university.edu"
                 />
                 {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
               </div>
            </div>

             {/* Password  */}
            <div>
                <label className={labelClass}>Password</label>
                <input 
                    type="password"
                    {...register("password", { required: "Required", minLength: { value: 6, message: "Min 6 characters" }})} 
                    className={inputClass} 
                    placeholder="••••••••"
                />
                {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
            </div>

            {/* Role  */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className={labelClass}>I am a...</label>
                    <div className="relative">
                        <select {...register("role")} className={inputClass}>
                            <option value="Student">Student</option>
                            <option value="DeptAdmin">Faculty / Admin</option>
                            <option value="SuperAdmin">Vice Chancellor</option>
                        </select>
                    </div>
                </div>

                {/* Conditional Dropdown for Department 
                {selectedRole !== 'Student' && selectedRole !== 'SuperAdmin' && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className={labelClass}>Department</label>
                        <select {...register("departmentManaged")} className={inputClass}>
                            <option value="ComputerScience">Computer Science</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Hostel">Hostel</option>
                            <option value="ExamCell">Exam Cell</option>
                        </select>
                    </div>
                )}
            </div> */}

            <button 
                disabled={isLoading} 
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold shadow-lg shadow-blue-700/20 active:scale-[0.99] transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
                {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Register Account <UserPlus size={18}/></>}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
                Already have an account? <Link to="/login" className="text-blue-700 font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}