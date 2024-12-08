import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Upload, Plus } from 'lucide-react';
import { Event, EventCategory, EventPriority } from '../types/events';
import { MainNav } from '../components/MainNav';
import { useDarkMode } from '../hooks/useDarkMode';

export function ClubEventPage() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useDarkMode();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    category: 'academic' as EventCategory,
    priority: 'medium' as EventPriority,
    memoryTip: '',
    keyTakeaways: [''],
    tags: [''],
    image: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newEvent: Partial<Event> = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        attendingCount: 0
      };

      // In a real app, this would be an API call
      console.log('New event:', newEvent);
      
      navigate('/home');
    } catch (error) {
      console.error('Failed to create event:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addKeyTakeaway = () => {
    setFormData(prev => ({
      ...prev,
      keyTakeaways: [...prev.keyTakeaways, '']
    }));
  };

  const addTag = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, '']
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <MainNav isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Create New Event
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-dark-700">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Event preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Upload className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Upload event image
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 
                    bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter event title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 
                    bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 
                    bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 
                    bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    category: e.target.value as EventCategory 
                  }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 
                    bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="academic">Academic</option>
                  <option value="social">Social</option>
                  <option value="sports">Sports</option>
                  <option value="cultural">Cultural</option>
                  <option value="career">Career</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority
                </label>
                <select
                  required
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    priority: e.target.value as EventPriority 
                  }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 
                    bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 
                  bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                placeholder="Enter event description"
              />
            </div>

            {/* Memory Tip */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Memory Tip
              </label>
              <input
                type="text"
                required
                value={formData.memoryTip}
                onChange={(e) => setFormData(prev => ({ ...prev, memoryTip: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 
                  bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                placeholder="Enter a memory tip for attendees"
              />
            </div>

            {/* Key Takeaways */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Key Takeaways
              </label>
              <div className="space-y-2">
                {formData.keyTakeaways.map((takeaway, index) => (
                  <input
                    key={index}
                    type="text"
                    value={takeaway}
                    onChange={(e) => {
                      const newTakeaways = [...formData.keyTakeaways];
                      newTakeaways[index] = e.target.value;
                      setFormData(prev => ({ ...prev, keyTakeaways: newTakeaways }));
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 
                      bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                    placeholder={`Key takeaway ${index + 1}`}
                  />
                ))}
                <button
                  type="button"
                  onClick={addKeyTakeaway}
                  className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400"
                >
                  <Plus className="w-4 h-4" />
                  Add takeaway
                </button>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tags
              </label>
              <div className="space-y-2">
                {formData.tags.map((tag, index) => (
                  <input
                    key={index}
                    type="text"
                    value={tag}
                    onChange={(e) => {
                      const newTags = [...formData.tags];
                      newTags[index] = e.target.value;
                      setFormData(prev => ({ ...prev, tags: newTags }));
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 
                      bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                    placeholder={`Tag ${index + 1}`}
                  />
                ))}
                <button
                  type="button"
                  onClick={addTag}
                  className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400"
                >
                  <Plus className="w-4 h-4" />
                  Add tag
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700
                  disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Creating Event...' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}