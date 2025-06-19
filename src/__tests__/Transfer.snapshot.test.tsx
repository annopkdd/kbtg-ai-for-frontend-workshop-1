import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Transfer from '../pages/Transfer';

// Mock data for consistent snapshots
const mockContacts = [
  { id: '1', name: 'สมชาย ใจดี', payTag: '@somchai123', isFrequent: true },
  { id: '2', name: 'นิดา สวยงาม', payTag: '@nida456', isFrequent: true }
];

describe('Transfer Page Snapshot Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-06-19T10:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('Transfer page initial state (recipient step) should match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <Transfer />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Transfer page QR scanner modal should match snapshot', async () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <Transfer />
      </MemoryRouter>
    );
    
    // Click QR scanner button to open modal
    const qrButton = container.querySelector('button[aria-label="QR Scanner"]') || 
                    container.querySelector('svg[viewBox="0 0 24 24"]')?.closest('button');
    
    if (qrButton) {
      qrButton.click();
    }
    
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Transfer Page Error States', () => {
  test('Transfer page with validation errors should match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <Transfer />
      </MemoryRouter>
    );
    
    // Simulate validation error state
    const nextButton = container.querySelector('button[type="button"]');
    if (nextButton) {
      nextButton.click();
    }
    
    expect(container.firstChild).toMatchSnapshot();
  });
});