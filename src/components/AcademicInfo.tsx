import React from 'react';
import { GraduationCap, Clock, ArrowRight } from 'lucide-react';
import { Event } from '../types/events';

interface AcademicInfoProps {
  event: Event;
}

export function AcademicInfo({ event }: AcademicInfoProps) {
  if (!event.academicInfo) return null;

  return (
    <div className="space-y-6 bg-indigo-50/50 dark:bg-indigo-900/10 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800/20">
      {/* Course Connections */}
      <div>
        <h3 className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          Course Connections
        </h3>
        <div className="mt-3 space-y-3">
          {event.academicInfo.courseConnections.map((course, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {course.code} - {course.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  {course.relevance}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-500 mt-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Learning Outcomes */}
      <div>
        <h3 className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 mb-3">
          Learning Outcomes
        </h3>
        <ul className="space-y-2">
          {event.academicInfo.learningOutcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300">{outcome}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Prerequisites */}
      {event.academicInfo.prerequisites && (
        <div>
          <h3 className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 mb-3">
            Prerequisites
          </h3>
          <div className="flex flex-wrap gap-2">
            {event.academicInfo.prerequisites.map((prereq, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-indigo-100/50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-sm rounded-full"
              >
                {prereq}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Study Notes */}
      {event.academicInfo.studyNotes && (
        <div className="bg-white dark:bg-dark-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 mb-2">
            Study Notes
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {event.academicInfo.studyNotes}
          </p>
        </div>
      )}

      {/* Next Review */}
      {event.academicInfo.nextReviewDate && (
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Next review: {event.academicInfo.nextReviewDate}</span>
        </div>
      )}
    </div>
  );
}