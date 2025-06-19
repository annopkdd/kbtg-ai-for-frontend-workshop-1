import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Transfer from '../pages/Transfer';

describe('Transfer Page Snapshot Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-06-19T10:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('Transfer page initial state should match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <Transfer />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Transfer page with QR scanner should match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <Transfer />
      </MemoryRouter>
    );
    
    // Click QR button to show scanner
    const qrButton = container.querySelector('button[aria-label="QR Scanner"]') ||
                    container.querySelector('svg')?.closest('button');
    
    if (qrButton) {
      (qrButton as HTMLElement).click();
    }
    
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Transfer page amount step should match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <Transfer />
      </MemoryRouter>
    );
    
    // Navigate to amount step
    const nextButton = container.querySelector('button[type="button"]');
    if (nextButton && nextButton.textContent?.includes('ถัดไป')) {
      (nextButton as HTMLElement).click();
    }
    
    expect(container.firstChild).toMatchSnapshot();
  });
});