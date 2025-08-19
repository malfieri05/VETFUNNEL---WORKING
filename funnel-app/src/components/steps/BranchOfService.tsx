import React, { useEffect } from 'react'
import { useFunnelStore } from '../../store/funnelStore'

const branchOptions = [
  { value: 'Army', label: 'Army' },
  { value: 'Navy', label: 'Navy' },
  { value: 'Air Force', label: 'Air Force' },
  { value: 'Marines', label: 'Marines' },
  { value: 'Coast Guard', label: 'Coast Guard' },
  { value: 'Space Force', label: 'Space Force' },
  { value: 'Other', label: 'Other' }
]

export const BranchOfService: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useFunnelStore()

  // Auto-continue when branch of service is selected
  useEffect(() => {
    if (formData.preQualification?.branchOfService) {
      const timer = setTimeout(() => {
        goToNextStep()
      }, 500) // Small delay for better UX
      return () => clearTimeout(timer)
    }
  }, [formData.preQualification?.branchOfService, goToNextStep])

  return (
    <div>
      <h2>Branch of Service</h2>
      <p>Please select your branch of service.</p>
      
      <div className="form-field">
        <label>Branch of Service *</label>
        <div className="radio-options">
          {branchOptions.map((option) => (
            <label key={option.value} className="radio-option">
              <input
                type="radio"
                name="branchOfService"
                value={option.value}
                checked={formData.preQualification?.branchOfService === option.value}
                onChange={() => {
                  updateFormData({
                    preQualification: {
                      ...formData.preQualification,
                      branchOfService: option.value
                    }
                  })
                }}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
} 