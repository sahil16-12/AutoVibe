'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

const Notification = ({ message, type, isVisible, onClose }: NotificationProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 right-6 z-50"
        >
          <div className="bg-black/90 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl p-4 min-w-[300px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {type === 'success' ? (
                  <CheckCircle className="w-6 h-6 text-[#F79B72]" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
                <p className="text-gray-200">{message}</p>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;