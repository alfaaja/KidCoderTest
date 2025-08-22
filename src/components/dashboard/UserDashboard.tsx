import React from 'react';
import { LogOut, User, Mail, Calendar, Crown, GraduationCap, Presentation, Phone, MapPin, BookOpen, Briefcase } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const roleConfig = {
    admin: {
      title: 'Admin Dashboard',
      icon: Crown,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      features: [
        'Kelola pengguna',
        'Monitor aktivitas',
        'Atur kurikulum',
        'Laporan sistem'
      ]
    },
    student: {
      title: 'Dashboard Murid',
      icon: GraduationCap,
      color: 'from-pink-400 to-pink-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-500',
      features: [
        'Kursus saya',
        'Progress belajar',
        'Tugas & quiz',
        'Sertifikat'
      ]
    },
    mentor: {
      title: 'Dashboard Mentor',
      icon: Presentation,
      color: 'from-blue-400 to-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-500',
      features: [
        'Kelas saya',
        'Murid aktif',
        'Buat materi',
        'Evaluasi'
      ]
    }
  };

  const config = roleConfig[user.role];
  const Icon = config.icon;

  const ProfileCard = () => {
    if (user.role === 'student' && user.studentData) {
      return (
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <User className="w-6 h-6 mr-3 text-pink-500" />
            Informasi Murid
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <GraduationCap className="w-5 h-5 text-pink-500" />
                <div>
                  <p className="text-sm text-gray-500">Nama Murid</p>
                  <p className="font-semibold text-gray-800">{user.studentData.studentName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-pink-500" />
                <div>
                  <p className="text-sm text-gray-500">Tanggal Lahir</p>
                  <p className="font-semibold text-gray-800">{new Date(user.studentData.birthDate).toLocaleDateString('id-ID')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-pink-500" />
                <div>
                  <p className="text-sm text-gray-500">Kelas/Jenjang</p>
                  <p className="font-semibold text-gray-800">{user.studentData.grade}</p>
                </div>
              </div>
              {user.studentData.learningInterest && (
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-5 h-5 text-pink-500" />
                  <div>
                    <p className="text-sm text-gray-500">Minat Belajar</p>
                    <p className="font-semibold text-gray-800">{user.studentData.learningInterest}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-pink-500" />
                <div>
                  <p className="text-sm text-gray-500">Nama Orang Tua/Wali</p>
                  <p className="font-semibold text-gray-800">{user.studentData.parentName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-pink-500" />
                <div>
                  <p className="text-sm text-gray-500">Email Orang Tua</p>
                  <p className="font-semibold text-gray-800 break-all">{user.studentData.parentEmail}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-pink-500" />
                <div>
                  <p className="text-sm text-gray-500">HP Orang Tua</p>
                  <p className="font-semibold text-gray-800">{user.studentData.parentPhone}</p>
                </div>
              </div>
              {user.studentData.city && (
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-pink-500" />
                  <div>
                    <p className="text-sm text-gray-500">Kota</p>
                    <p className="font-semibold text-gray-800">{user.studentData.city}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (user.role === 'mentor' && user.mentorData) {
      return (
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <User className="w-6 h-6 mr-3 text-blue-500" />
            Informasi Mentor
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Tanggal Lahir</p>
                  <p className="font-semibold text-gray-800">{new Date(user.mentorData.birthDate).toLocaleDateString('id-ID')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Nomor HP</p>
                  <p className="font-semibold text-gray-800">{user.mentorData.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Bidang Keahlian</p>
                  <p className="font-semibold text-gray-800">{user.mentorData.expertise}</p>
                </div>
              </div>
              {user.mentorData.city && (
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Kota</p>
                    <p className="font-semibold text-gray-800">{user.mentorData.city}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <BookOpen className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Pengalaman Mengajar</p>
                  <p className="font-semibold text-gray-800">{user.mentorData.teachingExperience}</p>
                </div>
              </div>
              {user.mentorData.portfolio && (
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Portfolio</p>
                    <a 
                      href={user.mentorData.portfolio} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-600 hover:underline break-all"
                    >
                      {user.mentorData.portfolio}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">KidCoderClub</h1>
              <span className="text-white/80">|</span>
              <span className="text-white/90 font-medium">{config.title}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-white text-right">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-white/80">{user.email}</p>
              </div>
              <button
                onClick={logout}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <div className="flex items-center space-x-6 mb-6">
            <div className={`p-4 rounded-full bg-gradient-to-r ${config.color}`}>
              <Icon className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Selamat datang, {user.name}! 👋
              </h2>
              <p className="text-gray-600">
                Siap untuk memulai petualangan coding hari ini?
              </p>
            </div>
          </div>

          {/* User Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`${config.bgColor} rounded-2xl p-6`}>
              <div className="flex items-center space-x-3 mb-2">
                <User className={`w-6 h-6 ${config.textColor}`} />
                <h3 className="font-semibold text-gray-800">Profil</h3>
              </div>
              <p className="text-gray-600">{user.name}</p>
              <p className={`text-sm ${config.textColor} font-medium`}>
                {config.title.replace('Dashboard ', '')}
              </p>
            </div>

            <div className={`${config.bgColor} rounded-2xl p-6`}>
              <div className="flex items-center space-x-3 mb-2">
                <Mail className={`w-6 h-6 ${config.textColor}`} />
                <h3 className="font-semibold text-gray-800">Email</h3>
              </div>
              <p className="text-gray-600 break-all">{user.email}</p>
            </div>

            <div className={`${config.bgColor} rounded-2xl p-6`}>
              <div className="flex items-center space-x-3 mb-2">
                <Calendar className={`w-6 h-6 ${config.textColor}`} />
                <h3 className="font-semibold text-gray-800">Bergabung</h3>
              </div>
              <p className="text-gray-600">
                {new Date(user.createdAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Fitur Tersedia</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {config.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-purple-200 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${config.color} flex items-center justify-center`}>
                      <span className="text-white text-xl">
                        {index === 0 && '📚'}
                        {index === 1 && '📊'}
                        {index === 2 && '✏️'}
                        {index === 3 && '🏆'}
                      </span>
                    </div>
                    <p className="font-medium text-gray-800">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <ProfileCard />

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Aksi Cepat</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {user.role === 'mentor' ? (
              <button 
                onClick={() => window.location.href = '/mentor'}
                className={`bg-gradient-to-r ${config.color} text-white p-6 rounded-2xl hover:opacity-90 transition-all transform hover:scale-105`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">👨‍🏫</div>
                  <p className="font-semibold">Dashboard Mentor</p>
                </div>
              </button>
            ) : (
              <button className={`bg-gradient-to-r ${config.color} text-white p-6 rounded-2xl hover:opacity-90 transition-all transform hover:scale-105`}>
                <div className="text-center">
                  <div className="text-3xl mb-2">🚀</div>
                  <p className="font-semibold">Mulai Belajar</p>
                </div>
              </button>
            )}
            
            <button className="bg-gradient-to-r from-green-400 to-green-500 text-white p-6 rounded-2xl hover:opacity-90 transition-all transform hover:scale-105">
              <div className="text-center">
                <div className="text-3xl mb-2">💬</div>
                <p className="font-semibold">Chat Support</p>
              </div>
            </button>
            
            <button className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-6 rounded-2xl hover:opacity-90 transition-all transform hover:scale-105">
              <div className="text-center">
                <div className="text-3xl mb-2">⚙️</div>
                <p className="font-semibold">Pengaturan</p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
