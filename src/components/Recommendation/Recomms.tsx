import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

// Type definitions
interface Suggestion {
  id: number;
  topic: string;
  description: string;
  status: 'New' | 'ToDo' | 'In Progress' | 'Done';
  addedAt: string; // ISO date string
  completedAt: string | null; // ISO date string or null if not completed
}

interface FormData {
  topic: string;
  description: string;
}

const TopicSuggestionSystem: React.FC = () => {
  // Format date for display
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "Not completed";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get current date in ISO format
  const getCurrentDate = (): string => {
    return new Date().toISOString();
  };

  // Mock data for previously submitted suggestions
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    { 
      id: 1, 
      topic: "AI Ethics in Healthcare", 
      description: "Exploring the ethical implications of AI in medical diagnoses and treatment plans.", 
      status: "Done",
      addedAt: "2025-03-01T10:30:00Z",
      completedAt: "2025-03-08T14:45:00Z"
    },
    { 
      id: 2, 
      topic: "Sustainable Urban Planning", 
      description: "How cities are redesigning infrastructure to combat climate change.", 
      status: "ToDo",
      addedAt: "2025-03-05T09:15:00Z",
      completedAt: null
    },
    { 
      id: 3, 
      topic: "Digital Privacy in 2025", 
      description: "Examining the current state of data protection laws and user privacy concerns.", 
      status: "In Progress",
      addedAt: "2025-03-07T16:20:00Z",
      completedAt: null
    }
  ]);

  // Form state for new submissions
  const [formData, setFormData] = useState<FormData>({
    topic: "",
    description: ""
  });

  // State for tracking which suggestion is being edited
  const [editingSuggestion, setEditingSuggestion] = useState<Suggestion | null>(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Status dropdown state
  const [activeStatusDropdown, setActiveStatusDropdown] = useState<number | null>(null);
  
  // Handle input changes for the suggestion form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Handle input changes when editing a suggestion
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    if (!editingSuggestion) return;
    
    const { name, value } = e.target;
    setEditingSuggestion({
      ...editingSuggestion,
      [name]: value
    });
  };

  // Submit a new suggestion
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const newSuggestion: Suggestion = {
      id: suggestions.length + 1,
      ...formData,
      status: "New",
      addedAt: getCurrentDate(),
      completedAt: null
    };
    setSuggestions([...suggestions, newSuggestion]);
    setFormData({ topic: "", description: "" });
    alert("Your topic has been submitted!");
  };

  // Start editing a suggestion
  const startEditing = (suggestion: Suggestion): void => {
    setEditingSuggestion(suggestion);
  };

  // Save edited suggestion
  const saveEdit = (): void => {
    if (!editingSuggestion) return;
    
    const updatedSuggestions = suggestions.map(suggestion => 
      suggestion.id === editingSuggestion.id ? editingSuggestion : suggestion
    );
    setSuggestions(updatedSuggestions);
    setEditingSuggestion(null);
  };

  // Update suggestion status
  const updateStatus = (id: number, newStatus: Suggestion['status']): void => {
    const updatedSuggestions = suggestions.map(suggestion => {
      if (suggestion.id === id) {
        // If status is being set to "Done", set completedAt to current date
        // If status is being changed from "Done" to something else, set completedAt to null
        const completedAt = newStatus === "Done" ? getCurrentDate() : null;
        return {...suggestion, status: newStatus, completedAt};
      }
      return suggestion;
    });
    
    setSuggestions(updatedSuggestions);
    setActiveStatusDropdown(null);
  };

  // Delete a suggestion
  const deleteSuggestion = (id: number): void => {
    const updatedSuggestions = suggestions.filter(suggestion => suggestion.id !== id);
    setSuggestions(updatedSuggestions);
  };

  // Toggle status dropdown
  const toggleStatusDropdown = (id: number): void => {
    setActiveStatusDropdown(activeStatusDropdown === id ? null : id);
  };

  // Status badge component with appropriate colors
  const StatusBadge: React.FC<{ status: Suggestion['status'] }> = ({ status }) => {
    const getStatusStyles = (): string => {
      switch (status) {
        case "Done":
          return "bg-emerald-100 text-emerald-800 border-emerald-200";
        case "ToDo":
          return "bg-amber-100 text-amber-800 border-amber-200";
        case "In Progress":
          return "bg-sky-100 text-sky-800 border-sky-200";
        case "New":
          return "bg-violet-100 text-violet-800 border-violet-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
      }
    };
    
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyles()}`}>
        {status}
      </span>
    );
  };

  const statusOptions: Suggestion['status'][] = ["New", "ToDo", "In Progress", "Done"];

  return (
    <div className="font-sans antialiased">
      {/* Topic Suggestion Form */}
      <div className="mt-16 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-2xl mx-auto border border-gray-100 dark:border-gray-700">
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
          
          <div className="flex space-x-4 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium transition-colors shadow-md"
            >
              Submit Topic
            </button>
            
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex-1 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-sm border border-gray-200 dark:border-gray-600"
            >
              View Submissions
            </button>
          </div>
        </form>
      </div>

      {/* Headless UI Dialog for Previous Submissions */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog 
          as="div"
          className="relative z-50" 
          onClose={() => {
            setIsModalOpen(false);
            setEditingSuggestion(null);
            setActiveStatusDropdown(null);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>
          
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto border border-gray-100 dark:border-gray-700">
                <div className="p-6">
                  <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white">
                    Topic Suggestions History
                  </Dialog.Title>
                  
                  <div className="mt-6 space-y-4">
                    {suggestions.length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-8">No suggestions yet. Be the first to submit a topic!</p>
                    ) : (
                      suggestions.map((suggestion) => (
                        <div 
                          key={suggestion.id} 
                          className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
                        >
                          {editingSuggestion && editingSuggestion.id === suggestion.id ? (
                            // Edit mode
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Topic
                                </label>
                                <input
                                  type="text"
                                  name="topic"
                                  value={editingSuggestion.topic}
                                  onChange={handleEditChange}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Description
                                </label>
                                <textarea
                                  name="description"
                                  value={editingSuggestion.description}
                                  onChange={handleEditChange}
                                  rows={2}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                ></textarea>
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Status
                                </label>
                                <select
                                  name="status"
                                  value={editingSuggestion.status}
                                  onChange={handleEditChange}
                                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                >
                                  {statusOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                  ))}
                                </select>
                              </div>
                              
                              <div className="flex space-x-3 justify-end pt-2">
                                <button
                                  onClick={() => setEditingSuggestion(null)}
                                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={saveEdit}
                                  className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                                >
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          ) : (
                            // View mode
                            <div>
                              <div className="flex justify-between items-start mb-3">
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white">{suggestion.topic}</h4>
                                <StatusBadge status={suggestion.status} />
                              </div>
                              
                              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{suggestion.description}</p>
                              
                              <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-600 dark:text-gray-400">
                                <div>
                                  <span className="font-medium">Added:</span> {formatDate(suggestion.addedAt)}
                                </div>
                                <div>
                                  <span className="font-medium">Completed:</span> {formatDate(suggestion.completedAt)}
                                </div>
                              </div>
                              
                              <div className="flex space-x-2 justify-end">
                                <div className="relative">
                                  <button
                                    onClick={() => toggleStatusDropdown(suggestion.id)}
                                    className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center space-x-1"
                                  >
                                    <span>Status</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>
                                  
                                  {activeStatusDropdown === suggestion.id && (
                                    <div className="absolute right-0 mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 py-1 z-10 w-32">
                                      {statusOptions.map((status) => (
                                        <button
                                          key={status}
                                          onClick={() => updateStatus(suggestion.id, status)}
                                          className="block w-full text-left px-4 py-1.5 text-sm hover:bg-violet-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                          {status}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                
                                <button
                                  onClick={() => startEditing(suggestion)}
                                  className="px-3 py-1.5 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-lg transition-colors"
                                >
                                  Edit
                                </button>
                                
                                <button
                                  onClick={() => deleteSuggestion(suggestion.id)}
                                  className="px-3 py-1.5 text-sm bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        setEditingSuggestion(null);
                        setActiveStatusDropdown(null);
                      }}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default TopicSuggestionSystem;