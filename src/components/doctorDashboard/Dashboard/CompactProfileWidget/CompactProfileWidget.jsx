import React, { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import { User, TrendingUp } from 'lucide-react';
import './CompactProfileWidget.css';

const CompactProfileWidget = () => {
  const { user } = useContext(AuthContext);

  const calculateProfileCompletion = () => {
    if (!user) return { percentage: 0, filledFields: 0, totalFields: 15 };

    const fields = [
      user.fullName,
      user.email,
      user.phone,
      user.professionalSummary,
      user.designation,
      user.workingHospital,
      user.yearsOfExperience,
      user.professionalTitle,
      user.profileImage,
      user.keySkills?.length > 0,
      user.experience?.length > 0,
      user.education?.length > 0,
      user.interests?.length > 0,
      user.achievements?.length > 0,
      user.certifications?.length > 0
    ];

    const filledFields = fields.filter(field => field && field !== '').length;
    const totalFields = fields.length;
    const percentage = Math.round((filledFields / totalFields) * 100);

    return { percentage, filledFields, totalFields };
  };

  const { percentage, filledFields, totalFields } = calculateProfileCompletion();

  const getCompletionColor = () => {
    if (percentage === 100) return '#10b981';
    if (percentage >= 75) return '#3b82f6';
    if (percentage >= 50) return '#8b5cf6';
    return '#f59e0b';
  };

  return (
    <div className="compact-profile-widget">
      <div className="widget-header">
        <div className="profile-section">
          <div className="profile-avatar">
            {user?.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="avatar-image" />
            ) : (
              <div className="avatar-placeholder">
                <User size={20} />
              </div>
            )}
            <div className="avatar-progress" style={{ 
              background: `conic-gradient(${getCompletionColor()} ${percentage * 3.6}deg, #e5e7eb 0deg)` 
            }}></div>
          </div>
          
          <div className="profile-info">
            <div className="profile-name">
              {user?.fullName || 'Your Name'}
            </div>
            <div className="profile-designation">
              {user?.designation || 'Add your designation'}
            </div>
          </div>
        </div>
        
        <div className="completion-info">
          <div className="percentage-badge" style={{ backgroundColor: getCompletionColor() }}>
            {percentage}%
          </div>
          <div className="completion-status">
            <TrendingUp size={14} />
            <span>{filledFields}/{totalFields} fields</span>
          </div>
        </div>
      </div>
      
      <div className="progress-section">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ 
              width: `${percentage}%`,
              backgroundColor: getCompletionColor()
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CompactProfileWidget;
