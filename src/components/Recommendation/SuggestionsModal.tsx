import React, { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import axios from 'axios';
import { Suggestion } from '../../types/types';
import StatusBadge from './StatusBadge';
import { apiUrl } from '../../constants/constants';
import { toast } from 'react-toastify';

interface SuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  suggestions: Suggestion[];
  refreshSuggestions: () => void;
}

const SuggestionsModal: React.FC<SuggestionsModalProps> = ({ 
  isOpen, 
  onClose, 
  suggestions, 
  refreshSuggestions 
}) => {
  const [editingSuggestion, setEditingSuggestion] = useState<Suggestion | null>(null);
  const [activeStatusDropdown, setActiveStatusDropdown] = useState<number | null>(null);
  
  const statusOptions: Suggestion['status'][] = ["New", "ToDo", "In Progress", "Done"];
  
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
  
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    if (!editingSuggestion) return;

    const { name, value } = e.target;
    setEditingSuggestion({
      ...editingSuggestion,
      [name]: value
    });
  };
  
  const saveEdit = async (): Promise<void> => {
    if (!editingSuggestion) return;

    try {
      const updateResp = await axios.put(`${apiUrl}/api/suggestion/suggestions/${editingSuggestion.id}`, editingSuggestion);
      console.log(updateResp)
      if(updateResp.status == 200){
        toast.success('Suggestion updated successfully 😎')
      }
      else{
        toast.error(updateResp.data.message ?? "Error updating suggestion ☹️")
      }
      refreshSuggestions();
      setEditingSuggestion(null);
    } catch (error) {
      console.error('Failed to update suggestion:', error);
      toast.error('Failed to update suggestion. Please try again.🚨');
    }
  };
  
  const updateStatus = async (id: number | string, newStatus: Suggestion['status']): Promise<void> => {
    try {
      const completedAt = newStatus === "Done" ? new Date().toISOString() : null;
      
      const statusUpdateResp = await axios.patch(`${apiUrl}/api/suggestion/suggestions/${id}/status`, { 
        status: newStatus, 
        completedAt 
      });
      if(statusUpdateResp.status == 200) {
        toast.success("Status updated successfully 😎")
      }
      else{
        toast.error(statusUpdateResp.data.message ?? "Error updating status ☹️")
      }
      refreshSuggestions();
      setActiveStatusDropdown(null);
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status. Please try again.🚨');
    }
  };
  
  const deleteSuggestion = async (id: number | string): Promise<void> => {
    try {
      const deleteResp = await axios.delete(`${apiUrl}/api/suggestion/suggestions/${id}`);
      if(deleteResp.status == 200){
        toast.success("Suggestion deleted successfully🫡;")
      }else{
        toast.error(deleteResp.data.message ?? "Error deleting status 💔")
      }
      refreshSuggestions();
    } catch (error) {
      console.error('Failed to delete suggestion:', error);
      toast.error('Failed to delete suggestion. Please try again.');
    }
  };
  
  const toggleStatusDropdown = (id: number): void => {
    setActiveStatusDropdown(activeStatusDropdown === id ? null : id);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog 
        as="div"
        className="relative z-50" 
        onClose={() => {
          onClose();
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
            <DialogPanel className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto border border-gray-100 dark:border-gray-700 z-30">
              <div className="p-6">
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Topic Suggestions History
                </DialogTitle>

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
                          <div>
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="text-lg font-medium text-gray-900 dark:text-white">{suggestion.topic}</h4>
                              <StatusBadge status={suggestion.status} />
                            </div>

                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{suggestion.description}</p>

                            <div className="grid grid-cols-1 gap-2 mb-4 text-xs text-gray-600 dark:text-gray-400">
                              <div>
                                <span className="font-medium">Added:</span> {formatDate(suggestion.addedAt)}
                              </div>
                              <div>
                                <span className="font-medium">Completed:</span> {formatDate(suggestion.completedAt)}
                              </div>
                              <div>
                                <span className="font-medium">Submitted By:</span> {(suggestion.submittedBy)}
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
                                onClick={() => setEditingSuggestion(suggestion)}
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
                      onClose();
                      setEditingSuggestion(null);
                      setActiveStatusDropdown(null);
                    }}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SuggestionsModal;