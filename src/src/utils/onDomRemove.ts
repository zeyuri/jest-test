import { Ref, MutationWatcher } from "../types";
import isDetached from "./isDetached";

export default function onDomRemove(
  element: Ref,
  onDetachCallback: VoidFunction
): MutationWatcher {
  const observer = new MutationObserver(
    (): void => {
      if (isDetached(element)) {
        observer.disconnect();
        onDetachCallback();
      }
    }
  );

  if (typeof document === Node) {
    observer.observe(document, {
      childList: true,
      subtree: true
    });
  }

  return observer;
}
