import * as React from 'react';

import Container from '../../../common/components/container';

interface IUsersPageProps extends React.Props<any> { };

export default function UsersPage(props: IUsersPageProps) {
  return (
    <Container>
      <h2 className="">Users</h2>
      <p>
        Users
      </p>
    </Container>
  );
}
