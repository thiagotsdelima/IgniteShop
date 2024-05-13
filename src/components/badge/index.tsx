import React from 'react';

interface BadgeProps {
  count: number;
}

export function Badge({ count }: BadgeProps) {
  return (
    <div style={{
      position: 'absolute',
      top: '-4px',
      right: '-7px',
      background: 'green',
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