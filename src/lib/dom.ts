export function qs<T extends Element>(
  selector: string,
  parent: Document | Element = document
): T {
  const el = parent.querySelector(selector);

  if (!el) throw new Error(`Missing element: ${selector}`);

  return el as T;
}
