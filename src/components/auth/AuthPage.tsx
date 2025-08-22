import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, Loader2, Phone, Calendar, MapPin, BookOpen, Briefcase, Link, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthFormProps {
  role: 'admin' | 'student' | 'mentor';
  onBack: () => void;
}

type FormMode = 'login' | 'register' | 'forgot-password';

const AuthForm: React.FC<AuthFormProps> = ({ role, onBack }) => {
  const { login, register, resetPassword, isLoading } = useAuth();
  const [mode, setMode] = useState<FormMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Base form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  // Student specific fields
  const [studentData, setStudentData] = useState({
    studentName: '',
    birthDate: '',
    grade: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    learningInterest: '',
    city: ''
  });

  // Mentor specific fields
  const [mentorData, setMentorData] = useState({
    birthDate: '',
    phone: '',
    expertise: '',
    teachingExperience: '',
    portfolio: '',
    city: '',
    cvFile: null as File | null
  });

  const roleConfig = {
    admin: {
      title: 'Admin',
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600'
    },
    student: {
      title: 'Murid',
      color: 'from-pink-400 to-pink-500',
      textColor: 'text-pink-500'
    },
    mentor: {
      title: 'Mentor',
      color: 'from-blue-400 to-blue-500',
      textColor: 'text-blue-500'
    }
  };

  const gradeOptions = [
    'TK A',
    'TK B', 
    'SD Kelas 1',
    'SD Kelas 2',
    'SD Kelas 3',
    'SD Kelas 4',
    'SD Kelas 5',
    'SD Kelas 6'
  ];

  const expertiseOptions = [
    'Scratch',
    'Python',
    'Robotics',
    'Web Development',
    'Game Development',
    'Mobile App',
    'Data Science',
    'AI/ML',
    'Blockchain',
    'Lainnya'
  ];

  const learningInterestOptions = [
    'Game Development',
    'Robotics',
    'Animation',
    'Basic Coding',
    'Web Design',
    'Mobile Apps',
    'Data Visualization',
    'Lainnya'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('student.')) {
      const fieldName = name.replace('student.', '');
      setStudentData(prev => ({ ...prev, [fieldName]: value }));
    } else if (name.startsWith('mentor.')) {
      const fieldName = name.replace('mentor.', '');
      setMentorData(prev => ({ ...prev, [fieldName]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    setError('');
    setSuccess('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMentorData(prev => ({ ...prev, cvFile: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'login') {
      const success = await login({
        email: formData.email,
        password: formData.password,
        role
      });
      
      if (!success) {
        setError('Email atau password salah. Silakan coba lagi.');
      }
    } else if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        setError('Password tidak cocok!');
        return;
      }
      
      if (formData.password.length < 6) {
        setError('Password minimal 6 karakter!');
        return;
      }

      // Validate required fields based on role
      if (role === 'student') {
        if (!studentData.studentName || !studentData.birthDate || !studentData.grade || 
            !studentData.parentName || !studentData.parentEmail || !studentData.parentPhone) {
          setError('Mohon lengkapi semua field yang wajib diisi!');
          return;
        }
      } else if (role === 'mentor') {
        if (!mentorData.birthDate || !mentorData.phone || !mentorData.expertise || 
            !mentorData.teachingExperience) {
          setError('Mohon lengkapi semua field yang wajib diisi!');
          return;
        }
      }
      
      const userData = {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        name: formData.name,
        role,
        ...(role === 'student' && { studentData }),
        ...(role === 'mentor' && { mentorData })
      };
      
      const success = await register(userData);
      
      if (!success) {
        setError('Email sudah terdaftar atau terjadi kesalahan.');
      }
    } else if (mode === 'forgot-password') {
      const success = await resetPassword(formData.email);
      
      if (success) {
        setSuccess('Link reset password telah dikirim ke email Anda!');
      } else {
        setError('Email tidak ditemukan.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
    setStudentData({
      studentName: '',
      birthDate: '',
      grade: '',
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      learningInterest: '',
      city: ''
    });
    setMentorData({
      birthDate: '',
      phone: '',
      expertise: '',
      teachingExperience: '',
      portfolio: '',
      city: '',
      cvFile: null
    });
    setError('');
    setSuccess('');
  };

  const switchMode = (newMode: FormMode) => {
    setMode(newMode);
    resetForm();
  };

  const renderStudentFields = () => (
    <>
      {/* Student Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nama Lengkap Murid <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="student.studentName"
            value={studentData.studentName}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
            placeholder="Nama lengkap murid"
            required
          />
        </div>
      </div>

      {/* Birth Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tanggal Lahir <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="date"
            name="student.birthDate"
            value={studentData.birthDate}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>
      </div>

      {/* Grade */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kelas/Jenjang <span className="text-red-500">*</span>
        </label>
        <select
          name="student.grade"
          value={studentData.grade}
          onChange={handleInputChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
          required
        >
          <option value="">Pilih kelas/jenjang</option>
          {gradeOptions.map(grade => (
            <option key={grade} value={grade}>{grade}</option>
          ))}
        </select>
      </div>

      {/* Parent Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nama Orang Tua/Wali <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="student.parentName"
            value={studentData.parentName}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
            placeholder="Nama orang tua/wali"
            required
          />
        </div>
      </div>

      {/* Parent Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Orang Tua/Wali <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            name="student.parentEmail"
            value={studentData.parentEmail}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
            placeholder="email.ortu@example.com"
            required
          />
        </div>
      </div>

      {/* Parent Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nomor HP Orang Tua/Wali <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="tel"
            name="student.parentPhone"
            value={studentData.parentPhone}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
            placeholder="08123456789"
            required
          />
        </div>
      </div>

      {/* Learning Interest */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Minat Belajar (Opsional)
        </label>
        <select
          name="student.learningInterest"
          value={studentData.learningInterest}
          onChange={handleInputChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
        >
          <option value="">Pilih minat belajar</option>
          {learningInterestOptions.map(interest => (
            <option key={interest} value={interest}>{interest}</option>
          ))}
        </select>
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kota (Opsional)
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="student.city"
            value={studentData.city}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
            placeholder="Jakarta, Bandung, Surabaya, dll"
          />
        </div>
      </div>
    </>
  );

  const renderMentorFields = () => (
    <>
      {/* Birth Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tanggal Lahir <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="date"
            name="mentor.birthDate"
            value={mentorData.birthDate}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nomor HP <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="tel"
            name="mentor.phone"
            value={mentorData.phone}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="08123456789"
            required
          />
        </div>
      </div>

      {/* Expertise */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bidang Keahlian <span className="text-red-500">*</span>
        </label>
        <select
          name="mentor.expertise"
          value={mentorData.expertise}
          onChange={handleInputChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          required
        >
          <option value="">Pilih bidang keahlian</option>
          {expertiseOptions.map(expertise => (
            <option key={expertise} value={expertise}>{expertise}</option>
          ))}
        </select>
      </div>

      {/* Teaching Experience */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pengalaman Mengajar <span className="text-red-500">*</span>
        </label>
        <textarea
          name="mentor.teachingExperience"
          value={mentorData.teachingExperience}
          onChange={handleInputChange}
          rows={2}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
          placeholder="Ceritakan pengalaman mengajar atau coding Anda..."
          required
        />
      </div>

      {/* Portfolio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Portfolio/Link (Opsional)
        </label>
        <div className="relative">
          <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="url"
            name="mentor.portfolio"
            value={mentorData.portfolio}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="https://github.com/username atau LinkedIn"
          />
        </div>
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kota (Opsional)
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="mentor.city"
            value={mentorData.city}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Jakarta, Bandung, Surabaya, dll"
          />
        </div>
      </div>

      {/* CV Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload CV/Sertifikat (Opsional)
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">Format: PDF, DOC, DOCX (Max: 5MB)</p>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl relative">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className="text-center mb-6 pt-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${roleConfig[role].color} mb-3`}>
            <span className="text-2xl font-bold text-white">
              {role === 'admin' ? '👑' : role === 'student' ? '🎓' : '👨‍🏫'}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {mode === 'login' && `Masuk sebagai ${roleConfig[role].title}`}
            {mode === 'register' && `Daftar sebagai ${roleConfig[role].title}`}
            {mode === 'forgot-password' && 'Reset Password'}
          </h2>
          <p className="text-gray-600">
            {mode === 'login' && 'Masukkan email dan password Anda'}
            {mode === 'register' && 'Buat akun baru untuk mulai belajar'}
            {mode === 'forgot-password' && 'Masukkan email untuk reset password'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field (Register only) */}
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>
            </div>
          )}

          {/* Role-specific fields for register */}
          {mode === 'register' && role === 'student' && renderStudentFields()}
          {mode === 'register' && role === 'mentor' && renderMentorFields()}

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="contoh@email.com"
                required
              />
            </div>
          </div>

          {/* Password Field (not for forgot password) */}
          {mode !== 'forgot-password' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="Masukkan password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {/* Confirm Password Field (Register only) */}
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Konfirmasi Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="Ulangi password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-2.5">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-2.5">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r ${roleConfig[role].color} text-white py-3 px-4 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {mode === 'login' && 'Masuk...'}
                {mode === 'register' && 'Mendaftar...'}
                {mode === 'forgot-password' && 'Mengirim...'}
              </>
            ) : (
              <>
                {mode === 'login' && 'Masuk'}
                {mode === 'register' && 'Daftar'}
                {mode === 'forgot-password' && 'Kirim Link Reset'}
              </>
            )}
          </button>
        </form>

        {/* Mode Switcher */}
        <div className="mt-4 text-center space-y-2">
          {mode === 'login' && (
            <>
              <button
                onClick={() => switchMode('forgot-password')}
                className={`${roleConfig[role].textColor} hover:underline text-sm`}
              >
                Lupa password?
              </button>
              <div className="text-gray-600 text-sm">
                Belum punya akun?{' '}
                <button
                  onClick={() => switchMode('register')}
                  className={`${roleConfig[role].textColor} hover:underline font-medium`}
                >
                  Daftar di sini
                </button>
              </div>
            </>
          )}
          
          {mode === 'register' && (
            <div className="text-gray-600 text-sm">
              Sudah punya akun?{' '}
              <button
                onClick={() => switchMode('login')}
                className={`${roleConfig[role].textColor} hover:underline font-medium`}
              >
                Masuk di sini
              </button>
            </div>
          )}
          
          {mode === 'forgot-password' && (
            <div className="text-gray-600 text-sm">
              Ingat password?{' '}
              <button
                onClick={() => switchMode('login')}
                className={`${roleConfig[role].textColor} hover:underline font-medium`}
              >
                Kembali ke login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;