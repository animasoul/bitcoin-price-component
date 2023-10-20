// UpdateTime.tsx
import React from 'react';

interface UpdatedTimeProps {
  time: string;
  tag: 'p' | 'span' | 'div';
}

const UpdatedTime: React.FC<UpdatedTimeProps> = ({ time, tag }) => {
  const DynamicTag = tag as keyof JSX.IntrinsicElements;

  return (
    <DynamicTag>
      <strong>Updated:</strong> {time}
    </DynamicTag>
  );
};

export default React.memo(UpdatedTime);
