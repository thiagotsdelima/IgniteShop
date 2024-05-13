import React from 'react';

interface BadgeProps {
  count: number;
}

export function Badge({ count }: BadgeProps) {
  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'red',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {count}
    </div>
  );
}
