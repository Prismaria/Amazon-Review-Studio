import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

interface AlertProps {
    id: string;
    title: string;
    text?: string;
    html?: string;
    icon?: 'success' | 'error' | 'warning' | 'info';
    showCancelButton?: boolean;
    confirmButtonText?: string;
    cancelButtonText?: string;
    confirmButtonColor?: string;
    cancelButtonColor?: string;
    resolve: (value: { isConfirmed: boolean }) => void;
}

const IconMap = {
    success: <CheckCircle2 className="text-emerald-500" size={48} />,
    error: <X className="text-red-500 border-2 border-red-500 rounded-full p-1" size={48} />,
    warning: <AlertTriangle className="text-amber-500" size={48} />,
    info: <Info className="text-blue-500" size={48} />,
};

export const AlertPortal: React.FC<{ alerts: AlertProps[] }> = ({ alerts }) => {
    return (
        <AnimatePresence>
            {alerts.map((alert) => (
                <div key={alert.id} className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 dark:border-gray-700"
                    >
                        <div className="p-8 flex flex-col items-center text-center">
                            {alert.icon && (
                                <div className="mb-6 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl">
                                    {IconMap[alert.icon]}
                                </div>
                            )}

                            <h3 className="text-2xl font-black tracking-tight text-gray-900 dark:text-gray-100 mb-2">
                                {alert.title}
                            </h3>

                            {alert.text && (
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {alert.text}
                                </p>
                            )}

                            {alert.html && (
                                <div
                                    className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm"
                                    dangerouslySetInnerHTML={{ __html: alert.html }}
                                />
                            )}

                            <div className="mt-8 flex flex-wrap gap-3 w-full">
                                {alert.showCancelButton && (
                                    <button
                                        onClick={() => alert.resolve({ isConfirmed: false })}
                                        className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-700"
                                        style={{ backgroundColor: alert.cancelButtonColor }}
                                    >
                                        {alert.cancelButtonText || 'Cancel'}
                                    </button>
                                )}
                                <button
                                    onClick={() => alert.resolve({ isConfirmed: true })}
                                    className="flex-1 px-6 py-3 rounded-xl font-bold text-white shadow-lg shadow-indigo-200 dark:shadow-none transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    style={{ backgroundColor: alert.confirmButtonColor || '#4f46e5' }}
                                >
                                    {alert.confirmButtonText || 'OK'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            ))}
        </AnimatePresence>
    );
};
