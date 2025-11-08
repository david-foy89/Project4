import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  User, 
  Calendar, 
  MapPin, 
  Globe, 
  Mail, 
  MessageSquare, 
  Trophy, 
  Edit,
  Settings,
  Star,
  ThumbsUp,
  Clock,
  ExternalLink
} from 'lucide-react';

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    questionsCount: 0,
    answersCount: 0,
    reputation: 0,
    bestAnswers: 0
  });
  const [recentQuestions, setRecentQuestions] = useState([]);
  const [recentAnswers, setRecentAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Check if viewing own profile
  const isOwnProfile = !userId || userId === currentUser?._id;
  const profileUser = isOwnProfile ? currentUser : user;

  const loadUserProfile = async (id) => {
    try {
      // This would fetch user profile from API
      // For now, using mock data
      setUser({
        _id: id,
        name: 'Sample User',
        username: 'sampleuser',
        email: 'sample@example.com',
        bio: 'Software developer passionate about technology and helping others learn.',
        location: 'San Francisco, CA',
        website: 'https://example.com',
        joinedAt: '2024-01-15T00:00:00.000Z',
        reputation: 1250,
        isActive: true
      });
      loadUserData(id);
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOwnProfile) {
      setUser(currentUser);
      setLoading(false);
      // Load user stats and content for current user
      if (currentUser?._id) {
        loadUserData(currentUser._id);
      }
    } else {
      // Load other user's profile
      loadUserProfile(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, currentUser, isOwnProfile]);

  const loadUserData = async (id) => {
    try {
      // Mock user stats and content
      setStats({
        questionsCount: 15,
        answersCount: 42,
        reputation: 1250,
        bestAnswers: 8
      });

      setRecentQuestions([
        {
          _id: '1',
          title: 'How to implement JWT authentication in Node.js?',
          createdAt: '2024-11-05T10:00:00.000Z',
          viewCount: 45,
          answerCount: 3,
          votes: 5
        },
        {
          _id: '2',
          title: 'React Context vs Redux - When to use which?',
          createdAt: '2024-11-03T14:30:00.000Z',
          viewCount: 67,
          answerCount: 7,
          votes: 12
        }
      ]);

      setRecentAnswers([
        {
          _id: '1',
          questionTitle: 'Best practices for MongoDB schema design',
          content: 'When designing MongoDB schemas, consider embedding vs referencing based on your query patterns...',
          createdAt: '2024-11-04T09:15:00.000Z',
          votes: 8,
          isAccepted: true
        },
        {
          _id: '2',
          questionTitle: 'How to optimize React app performance?',
          content: 'There are several techniques you can use to optimize React performance: React.memo, useMemo, useCallback...',
          createdAt: '2024-11-02T16:45:00.000Z',
          votes: 15,
          isAccepted: false
        }
      ]);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h1>
          <p className="text-gray-600 mb-6">The requested user profile could not be found.</p>
          <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Profile Header */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {profileUser.name?.charAt(0)?.toUpperCase() || <User className="w-8 h-8" />}
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profileUser.name}</h1>
                <p className="text-gray-600">@{profileUser.username}</p>
                {profileUser.bio && (
                  <p className="text-gray-700 mt-2">{profileUser.bio}</p>
                )}
              </div>

              {isOwnProfile && (
                <div className="flex gap-2">
                  <Link to="/settings" className="btn btn-outline btn-sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Link>
                  <Link to="/settings" className="btn btn-outline btn-sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </div>
              )}
            </div>

            {/* User Details */}
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Joined {formatDate(profileUser.joinedAt)}
              </div>
              
              {profileUser.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {profileUser.location}
                </div>
              )}
              
              {profileUser.website && (
                <a 
                  href={profileUser.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-primary-600 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  Website
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              {profileUser.email && isOwnProfile && (
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {profileUser.email}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.reputation}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              Reputation
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.questionsCount}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <MessageSquare className="w-4 h-4 text-blue-500" />
              Questions
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.answersCount}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <ThumbsUp className="w-4 h-4 text-green-500" />
              Answers
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.bestAnswers}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              Best Answers
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="mb-6">
        <nav className="flex border-b border-gray-200">
          {['overview', 'questions', 'answers'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {activeTab === 'overview' && (
          <>
            {/* Recent Questions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                Recent Questions
              </h3>
              
              {recentQuestions.length > 0 ? (
                <div className="space-y-4">
                  {recentQuestions.map((question) => (
                    <div key={question._id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                      <Link 
                        to={`/questions/${question._id}`}
                        className="text-primary-600 hover:text-primary-800 font-medium"
                      >
                        {question.title}
                      </Link>
                      
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {question.votes}
                        </span>
                        <span>{question.answerCount} answers</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {timeAgo(question.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No questions posted yet.</p>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link to="/questions" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                  View all questions →
                </Link>
              </div>
            </div>

            {/* Recent Answers */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-green-500" />
                Recent Answers
              </h3>
              
              {recentAnswers.length > 0 ? (
                <div className="space-y-4">
                  {recentAnswers.map((answer) => (
                    <div key={answer._id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                      <Link 
                        to={`/questions/${answer._id}`}
                        className="text-gray-900 hover:text-primary-600 font-medium"
                      >
                        {answer.questionTitle}
                      </Link>
                      
                      <p className="text-gray-700 mt-1 text-sm line-clamp-2">
                        {answer.content}
                      </p>
                      
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {answer.votes}
                        </span>
                        {answer.isAccepted && (
                          <span className="flex items-center gap-1 text-green-600">
                            <Star className="w-3 h-3 fill-current" />
                            Accepted
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {timeAgo(answer.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No answers posted yet.</p>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link to="/questions" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                  View all answers →
                </Link>
              </div>
            </div>
          </>
        )}

        {activeTab === 'questions' && (
          <div className="lg:col-span-2 card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">All Questions</h3>
            <p className="text-gray-600">Questions tab content will be implemented here.</p>
          </div>
        )}

        {activeTab === 'answers' && (
          <div className="lg:col-span-2 card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">All Answers</h3>
            <p className="text-gray-600">Answers tab content will be implemented here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;