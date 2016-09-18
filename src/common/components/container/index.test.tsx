import { assert } from 'chai';
import { shallow, render } from 'enzyme';
import * as sinon from 'sinon';

import * as React from 'react';
import Container from './index';


describe('Container Component', () => {

  it('should create a container', () => {
    const container = shallow( <Container>Hello World</Container> );

    assert.isOk(container.length, 'container not created');
    assert.strictEqual(container.text(), 'Hello World', 
       'Child contents not found');
  });

});
