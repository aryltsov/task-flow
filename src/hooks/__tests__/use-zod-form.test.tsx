import { renderHook, act } from '@testing-library/react';
import { useZodForm } from '../use-zod-form';

describe('useZodForm', () => {
  const initial = { name: '', age: 0 };
  const validate = (values: typeof initial) => {
    const errors: Record<string, string> = {};
    if (!values.name) errors.name = 'Name required';
    if (values.age < 0) errors.age = 'Age must be positive';
    return errors;
  };

  it('should initialize correctly', () => {
    const { result } = renderHook(() => useZodForm(initial, validate));
    expect(result.current.values).toEqual(initial);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isValid).toBe(false);
  });

  it('should update fields and validate', () => {
    const { result } = renderHook(() => useZodForm(initial, validate));

    act(() => result.current.update('name', 'Anton'));
    expect(result.current.values.name).toBe('Anton');
    expect(result.current.errors.name).toBeUndefined();

    act(() => result.current.update('age', -1));
    expect(result.current.errors.age).toBe('Age must be positive');
  });

  it('should mark fields as touched on blur', () => {
    const { result } = renderHook(() => useZodForm(initial, validate));

    act(() => result.current.blur('name'));
    expect(result.current.touched.name).toBe(true);
    expect(result.current.errors.name).toBe('Name required');
  });

  it('should submit only if valid', async () => {
    const { result } = renderHook(() => useZodForm(initial, validate));
    const onSubmit = jest.fn();

    // invalid
    await act(async () => {
      await result.current.submit(onSubmit);
    });
    expect(onSubmit).not.toHaveBeenCalled();

    // valid
    act(() => result.current.update('name', 'Anton'));
    act(() => result.current.update('age', 30));

    await act(async () => {
      await result.current.submit(onSubmit);
    });
    expect(onSubmit).toHaveBeenCalledWith({ name: 'Anton', age: 30 });
  });
});
