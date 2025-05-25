'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertCircle } from 'lucide-react';
import Image from 'next/image';

interface Vehicle {
  id: string;
  metadata: {
    make: string;
    model: string;
    year: number;
    type: string;
    price: string;
    mileage: string;
    fuel: string;
    transmission: string;
    features: string[];
    availability: boolean;
  };
}

interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  category: string;
}

const VehicleModal = ({ isOpen, onClose, vehicles, category }: VehicleModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#121212] w-full max-w-4xl max-h-[80vh] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#F79B72]">{category}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Vehicle List */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vehicles.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/40 rounded-xl p-6 border border-white/10 hover:border-[#F79B72]/50 transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {vehicle.metadata.make} {vehicle.metadata.model}
                        </h3>
                        <p className="text-[#F79B72]">{vehicle.metadata.year}</p>
                      </div>
                      {vehicle.metadata.availability ? (
                        <span className="flex items-center text-green-500">
                          <Check className="w-4 h-4 mr-1" /> In Stock
                        </span>
                      ) : (
                        <span className="flex items-center text-red-500">
                          <AlertCircle className="w-4 h-4 mr-1" /> Out of Stock
                        </span>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-300">
                        <span>Price:</span>
                        <span className="text-white">{vehicle.metadata.price}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Mileage:</span>
                        <span className="text-white">{vehicle.metadata.mileage}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Fuel:</span>
                        <span className="text-white">{vehicle.metadata.fuel}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Transmission:</span>
                        <span className="text-white">{vehicle.metadata.transmission}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-gray-400 text-sm mb-2">Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {vehicle.metadata.features.map((feature, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 rounded-full bg-[#F79B72]/10 text-[#F79B72] border border-[#F79B72]/20"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VehicleModal;