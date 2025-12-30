import { formatCreatedAt, getInitials } from '../utils';

describe('getInitials', () => {
  it('should return initials of single name', () => {
    expect(getInitials('Anton')).toBe('A');
  });

  it('should return initials of two words', () => {
    expect(getInitials('Anton Ryltsov')).toBe('AR');
  });

  it('should return only first two initials if more words', () => {
    expect(getInitials('Anton Ryltsov Ivan')).toBe('AR');
  });

  it('should handle empty string', () => {
    expect(getInitials('')).toBe('');
  });
});

describe('formatCreatedAt', () => {
  it('should format date correctly', () => {
    const date = new Date('2025-12-29T16:00:00Z');
    const result = formatCreatedAt(date);

    expect(result).toMatch(/December 29, 2025/);
    expect(result).toMatch(/\+2/);
  });

  it('should default to current date if no argument', () => {
    const result = formatCreatedAt();
    expect(result).toContain('at');
  });
});
