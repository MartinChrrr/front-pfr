import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebouncedValue } from "../useDebouncedValue";

describe("useDebouncedValue", () => {
  it("retourne la valeur initiale immediatement", () => {
    const { result } = renderHook(() => useDebouncedValue("hello"));

    expect(result.current).toBe("hello");
  });

  it("ne met pas a jour la valeur avant le delai", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      { initialProps: { value: "hello" } }
    );

    rerender({ value: "world" });

    expect(result.current).toBe("hello");

    vi.advanceTimersByTime(200);
    expect(result.current).toBe("hello");

    vi.useRealTimers();
  });

  it("met a jour la valeur apres le delai", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      { initialProps: { value: "hello" } }
    );

    rerender({ value: "world" });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("world");

    vi.useRealTimers();
  });

  it("annule le timer precedent si la valeur change rapidement", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      { initialProps: { value: "a" } }
    );

    rerender({ value: "ab" });
    vi.advanceTimersByTime(100);

    rerender({ value: "abc" });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("abc");

    vi.useRealTimers();
  });

  it("utilise un delai par defaut de 300ms", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value),
      { initialProps: { value: "initial" } }
    );

    rerender({ value: "updated" });

    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe("updated");

    vi.useRealTimers();
  });
});
