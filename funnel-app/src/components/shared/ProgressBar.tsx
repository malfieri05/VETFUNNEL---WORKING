import React from 'react'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  className?: string
  hideText?: boolean
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  className = '',
  hideText = false
}) => {
  // Define the sections and their step ranges
  const sections = [
    { name: 'Basic Info', start: 1, end: 7, total: 7 },
    { name: 'Medical Questions', start: 8, end: 12, total: 5 },
    { name: 'Application', start: 17, end: 18, total: 2 }
  ]
  
  // Find which section the current step belongs to
  const currentSection = sections.find(section => 
    currentStep >= section.start && currentStep <= section.end
  )
  
  let progressPercentage = 0
  let displayText = ''
  
  if (currentSection) {
    // Calculate progress within the current section
    const stepsInSection = currentStep - currentSection.start + 1
    progressPercentage = (stepsInSection / currentSection.total) * 100
    displayText = `Step ${stepsInSection} of ${currentSection.total}`
  } else {
    // For steps outside defined sections (like loading, success screens)
    progressPercentage = 100
    displayText = '' // Remove 'Done.' text completely
  }
  
  return (
    <div className={`progress-container ${className}`}>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      {!hideText && (
        <div className="progress-text">
          {displayText}
        </div>
      )}
    </div>
  )
} 