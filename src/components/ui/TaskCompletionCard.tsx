import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Card from './Card';

const TaskCompletionCard: React.FC = () => {
  return (
    <div className="mt-6 text-center">
      <Card padding="lg" className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <div className="flex items-center justify-center gap-3 mb-2">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
          <h3 className="text-xl font-bold text-green-700">Task Complete! 🎉</h3>
        </div>
        <p className="text-green-600">All steps have been successfully completed.</p>
      </Card>
    </div>
  );
};

export default TaskCompletionCard;
