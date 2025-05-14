'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function GenerateButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/blogs/generate', {
        method: 'POST',
      });
      
      const data = await response.json();
      if (data.success) {
        alert('Blog generated successfully!');
      } else {
        throw new Error(data.error || 'Failed to generate blog');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate blog. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleGenerate}
      disabled={isLoading}
    >
      {isLoading ? 'Generating...' : 'Generate New Blog'}
    </Button>
  );
}