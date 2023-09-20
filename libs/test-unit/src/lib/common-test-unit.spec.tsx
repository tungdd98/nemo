import { render } from '@testing-library/react';

import CommonTestUnit from './common-test-unit';

describe('CommonTestUnit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommonTestUnit />);
    expect(baseElement).toBeTruthy();
  });
});
