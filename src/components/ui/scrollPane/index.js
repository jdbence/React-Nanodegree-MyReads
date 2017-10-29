import React from 'react';

export const ScrollPane = (props) => {
  const { children } = props;
  return (
    <div className="scrollPane">
      {children}
    </div>
  );
};

export default ScrollPane;