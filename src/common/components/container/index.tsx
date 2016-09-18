import * as React from 'react';
import * as classNames from 'classnames';

interface IContainerProps extends React.Props<any> {
};

export default function Container({
  children = null
}: IContainerProps) {
  const containerClasses = classNames('clearfix');

  return (
    <div className={ containerClasses }>
      { children }
    </div>
  );
}
