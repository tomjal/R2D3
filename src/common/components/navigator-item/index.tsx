import * as React from 'react';
import * as classNames from 'classnames';

interface INavigatorItemProps extends React.Props<any> {
  isVisible?: boolean;
};

export default function NavigatorItem({
  children = null,
  isVisible = true,
}: INavigatorItemProps) {
  const navItemClasses = classNames('', {
    hide: !isVisible,
  });

  return (
    <div className={ navItemClasses }>
      { children }
    </div>
  );
};
