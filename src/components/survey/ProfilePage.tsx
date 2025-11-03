import React from 'react';
import { SurveyData } from '../../pages/BotswanaSurvey';

interface ProfilePageProps {
  data: SurveyData;
  updateData: (data: Partial<SurveyData>) => void;
}

export default function ProfilePage({ data, updateData }: ProfilePageProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Profile and Demographic Information</h2>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">1. Profile</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => updateData({ name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
            <input
              type="text"
              value={data.company}
              onChange={(e) => updateData({ company: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => updateData({ email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
            <input
              type="text"
              value={data.District}
              onChange={(e) => updateData({ district: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your district"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            2. Years of experience as a broker
          </label>
          <input
            type="text"
            value={data.yearsOfExperience}
            onChange={(e) => updateData({ yearsOfExperience: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 5 years"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            3. What category best describes your job function?
          </label>
          <div className="space-y-2">
            {['Client Facing / Broker', 'Sales manager / Team Leader', 'Senior Management'].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="jobFunction"
                  value={option}
                  checked={data.jobFunction === option}
                  onChange={(e) => updateData({ jobFunction: e.target.value })}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            4. What is your gender?
          </label>
          <div className="space-y-2">
            {['Male', 'Female'].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={data.gender === option}
                  onChange={(e) => updateData({ gender: e.target.value })}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            5. What is your age group?
          </label>
          <div className="space-y-2">
            {['20 to 30 years', '31 to 40 years', '41 to 50 years', '51 to 60 years', '60+ years'].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="ageGroup"
                  value={option}
                  checked={data.ageGroup === option}
                  onChange={(e) => updateData({ ageGroup: e.target.value })}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
