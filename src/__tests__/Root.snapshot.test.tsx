import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Root from '../pages/Root';

describe('Root Page Snapshot Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-06-19T10:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('Root page should match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});