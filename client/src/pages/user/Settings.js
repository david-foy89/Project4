import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Eye, 
  Save,
  Camera
} from 'lucide-react';

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form states
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    questionAnswers: true,
    newFollowers: true,
    weeklyDigest: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    showEmail: false,
    showLocation: true,
    showWebsite: true
  });

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await updateProfile(profileData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // This would need to be implemented in the backend
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to update password' });
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'password', name: 'Password', icon: Lock },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Shield }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>

      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'} mb-6`}>
          {message.text}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-1/4">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 border-primary-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="card">
            {activeTab === 'profile' && (
              <div>
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                  <p className="text-gray-600 mt-1">Update your account profile information</p>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Change Photo
                      </button>
                      <p className="text-xs text-gray-500 mt-1">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="form-input"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={4}
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="form-input"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        id="location"
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        className="form-input"
                        placeholder="e.g., San Francisco, CA"
                      />
                    </div>

                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                        Website
                      </label>
                      <input
                        id="website"
                        type="url"
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        className="form-input"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'password' && (
              <div>
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
                  <p className="text-gray-600 mt-1">Update your password to keep your account secure</p>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="form-input"
                      required
                      minLength={6}
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="form-input"
                      required
                      minLength={6}
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      {loading ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
                  <p className="text-gray-600 mt-1">Choose what notifications you want to receive</p>
                </div>

                <div className="space-y-4">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-2">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {key === 'emailNotifications' && 'Receive notifications via email'}
                          {key === 'pushNotifications' && 'Receive push notifications in your browser'}
                          {key === 'questionAnswers' && 'Get notified when someone answers your questions'}
                          {key === 'newFollowers' && 'Get notified when someone follows you'}
                          {key === 'weeklyDigest' && 'Receive a weekly summary of forum activity'}
                        </p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings({
                          ...notificationSettings,
                          [key]: !value
                        })}
                        className={`toggle ${value ? 'toggle-checked' : ''}`}
                      >
                        <span className="toggle-switch"></span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-6">
                  <button className="btn btn-primary">
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div>
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Privacy Settings</h2>
                  <p className="text-gray-600 mt-1">Control who can see your information</p>
                </div>

                <div className="space-y-4">
                  {Object.entries(privacySettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-2">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {key === 'profileVisible' && 'Allow others to view your profile page'}
                          {key === 'showEmail' && 'Display your email address on your profile'}
                          {key === 'showLocation' && 'Display your location on your profile'}
                          {key === 'showWebsite' && 'Display your website link on your profile'}
                        </p>
                      </div>
                      <button
                        onClick={() => setPrivacySettings({
                          ...privacySettings,
                          [key]: !value
                        })}
                        className={`toggle ${value ? 'toggle-checked' : ''}`}
                      >
                        <span className="toggle-switch"></span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-6">
                  <button className="btn btn-primary">
                    <Eye className="w-4 h-4 mr-2" />
                    Save Privacy Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;