import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LessonErrorBoundary } from './App.jsx';

function Boom() {
  throw new Error('lesson blew up');
}

describe('LessonErrorBoundary', () => {
  beforeEach(() => {
    // React logs caught render errors to console.error; silence it so the
    // expected-throw tests do not spam the run output.
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders its children unchanged when nothing throws', () => {
    render(
      <LessonErrorBoundary>
        <p>lesson body</p>
      </LessonErrorBoundary>
    );
    expect(screen.getByText('lesson body')).toBeInTheDocument();
  });

  it('renders a recoverable fallback when a child throws during render', () => {
    render(
      <LessonErrorBoundary>
        <Boom />
      </LessonErrorBoundary>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/hit a snag while rendering/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('retries rendering its children when "Try again" is clicked', () => {
    let shouldThrow = true;
    function Flaky() {
      if (shouldThrow) throw new Error('transient');
      return <p>recovered content</p>;
    }
    render(
      <LessonErrorBoundary>
        <Flaky />
      </LessonErrorBoundary>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();

    // The underlying cause is now resolved (e.g. KaTeX finished loading).
    shouldThrow = false;
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));

    expect(screen.getByText('recovered content')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
