import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { FormData } from '../../types/types';
import { apiUrl } from '../../constants/constants';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Info } from 'lucide-react';
interface SuggestionFormProps {
  openModal: () => void;
  refreshSuggestions: () => void;
}

const SuggestionForm: React.FC<SuggestionFormProps> = ({ openModal, refreshSuggestions }) => {
  const [formData, setFormData] = useState<FormData>({
    topic: "",
    description: "",
  });

  const [featureMe, setFeatureMe] = useState(false);
  const { isAuthorized, user } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const sendFeedbackMail = async () => {
    const payload = {
      email: user?.email,
      name: user?.displayName,
      featureMe
    };

    try {
      const emailResponse = await axios.post(`${apiUrl}/api/email/sendFeedback`, payload);
      if (emailResponse.status === 200) {
        toast.success('Feedback received successfully!😎');
      } else {
        toast.error('Welp, something went wrong. Please try again!💔');
      }
    } catch (error) {
      toast.error('Error sending feedback email.🚨');
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const payload = {
      topic: formData.topic,
      description: formData.description,
      status: 'New',
      id: uuidv4(),
      addedAt: new Date().toISOString(),
      completedAt: null,
      submittedBy: user?.email,
      featureMe,
    };

    try {
      const response = await axios.post(`${apiUrl}/api/suggestion/suggestions`, payload);
      if (response.status === 201) {
        setFormData({ topic: "", description: "" });
        setFeatureMe(false); // Reset checkbox
        await sendFeedbackMail();
        refreshSuggestions();
      }
    } catch (error) {
      console.error('Failed to submit topic:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Suggest a Topic</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Have an idea for a future episode? We'd love to hear it! Submit your suggestion below.
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
            Topic Title
          </label>
          <input
            type="text"
            id="topic"
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter your topic idea"
            value={formData.topic}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Briefly describe this topic and why it would be interesting"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        {/* Feature Me Checkbox */}
        <div className="relative flex items-center space-x-2">
          <input
            type="checkbox"
            id="featureMe"
            className="w-5 h-5 text-violet-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-violet-500"
            checked={featureMe}
            onChange={() => setFeatureMe(!featureMe)}
          />
          <label
            htmlFor="featureMe"
            className="text-sm text-gray-700 dark:text-gray-200 relative cursor-pointer group flex items-center space-x-2"
          >
            <Info className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span>Feature Me</span>
            <span className="absolute left-1/2 -translate-x-1/2 top-7 hidden w-max text-xs text-white bg-gray-900 rounded-md px-2 py-1 group-hover:block">
              You may be considered for a feature or collaboration in an episode!
            </span>
          </label>
        </div>

        <div className="flex space-x-4 pt-2">
          <button
            type="submit"
            className="flex-1 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium transition-colors shadow-md"
          >
            Submit Topic
          </button>

          {isAuthorized && (
            <button
              type="button"
              onClick={openModal}
              className="flex-1 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-sm border border-gray-200 dark:border-gray-600"
            >
              View Submissions
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SuggestionForm;
