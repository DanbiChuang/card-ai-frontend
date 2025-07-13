import React from 'react';

export default function StepProgress({ 
  steps, 
  currentStep, 
  theme = 'blue' // 'blue', 'green', 'purple'
}) {
  const getThemeColors = () => {
    switch (theme) {
      case 'green':
        return {
          active: 'bg-blue-600 text-white',
          completed: 'bg-blue-600 text-white',
          inactive: 'bg-gray-300 text-gray-500',
          line: 'bg-blue-600'
        };
      case 'purple':
        return {
          active: 'bg-purple-600 text-white',
          completed: 'bg-purple-600 text-white',
          inactive: 'bg-gray-300 text-gray-500',
          line: 'bg-purple-600'
        };
      default: // blue
        return {
          active: 'bg-blue-600 text-white',
          completed: 'bg-blue-600 text-white',
          inactive: 'bg-gray-300 text-gray-500',
          line: 'bg-blue-600'
        };
    }
  };

  const colors = getThemeColors();

  return (
    <div className="flex items-center justify-center mb-6">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center">
            <div className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold ${
              index < currentStep 
                ? colors.completed 
                : index === currentStep 
                  ? colors.active 
                  : colors.inactive
            }`}>
              {index < currentStep ? '✓' : index + 1}
            </div>
            <div className={`font-medium ml-2 ${
              index < currentStep 
                ? colors.completed.replace('bg-', 'text-').replace(' text-white', '') 
                : index === currentStep 
                  ? colors.active.replace('bg-', 'text-').replace(' text-white', '') 
                  : 'text-gray-500'
            }`}>
              {step}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-8 h-0.5 mx-2 ${
              index < currentStep ? colors.line : 'bg-gray-300'
            }`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
} 