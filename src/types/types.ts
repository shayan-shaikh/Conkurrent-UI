export interface Suggestion {
    id: number;
    topic: string;
    description: string;
    status: 'New' | 'ToDo' | 'In Progress' | 'Done';
    addedAt: string;
    completedAt: string | null;
    submittedBy: string
  }
  
  export interface FormData {
    topic: string;
    description: string;
  }