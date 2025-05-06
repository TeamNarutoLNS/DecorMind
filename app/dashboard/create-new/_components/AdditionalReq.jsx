import { Textarea } from '@/components/ui/textarea';
import React from 'react';

function AdditionalReq({ additionalRequirementInput }) {
  return (
    <div className="mt-5">
      <label htmlFor="additional-requirements" className="text-gray-600 block font-medium">
        Enter Additional Requirements
      </label>
      <p className="text-sm text-gray-400 mt-1">
        Note: 1 credit will be used for generation.
      </p>
      <Textarea
        id="additional-requirements"
        placeholder="e.g., add a modern lamp, prefer warm lighting..."
        className="mt-3"
        onChange={(e) => additionalRequirementInput?.(e.target.value)}
      />
    </div>
  );
}

export default AdditionalReq;
