import * as React from 'react';

interface INavigatorProps extends React.Props<any> {}

export default function Navigator({ children = null }: INavigatorProps) {
  return (
    <nav className="">
      { children }
    </nav>
  );
}
