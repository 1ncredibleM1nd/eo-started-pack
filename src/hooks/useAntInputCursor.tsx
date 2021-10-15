import { useRef, useCallback } from "react";
import { Input } from "antd";

/**
 * Support ANTD INPUT cursor operation
 */
export function useAntInputCursor() {
  /**
   * Reference https://www.cnblogs.com/katydids/p/12430581.html
   * Ref needs to see the source of Ant Design Component + breakpoints, there may be differences between different versions.
   **/
  // ant design component ref
  const ref = useRef(null);
  // DOM elements object
  let domRef: any;

  const setValue = useCallback((value: string) => {
    ref.current.handleChange({
      target: {
        value,
      },
    });
  }, []);

  const setRef = (target: any) => {
    ref.current = target;
    if (!target) {
      domRef = null;
      return;
    }
    if (target instanceof Input) {
      domRef = (ref.current as any).input as any;
    } else if (target instanceof Input.TextArea) {
      domRef = (ref.current as any).resizableTextArea.textArea as any;
    } else {
      throw new Error("only support antd Input or Input.TextArea");
    }
  };

  /** Get the location of the cursor */
  const getCursorPos = () => {
    // Get the cursor position
    const CaretPos = {
      start: 0,
      end: 0,
    };
    if (domRef.selectionStart) {
      // Firefox support
      CaretPos.start = domRef.selectionStart;
    }
    if (domRef.selectionEnd) {
      CaretPos.end = domRef.selectionEnd;
    }
    return CaretPos;
  };

  /** Set the cursor position, no support interval */
  const setCursorPos = (pos: number) => {
    domRef.focus();
    domRef.setSelectionRange(pos, pos);
  };

  /** Insert a string in a certain position, not supported interval */
  const insertAt = (pos: number, str: string) => {
    const originValue: string = domRef.value;
    if (!originValue) {
      domRef.value = str;
    } else {
      const newPos = Math.min(Math.max(0, pos), originValue.length);
      if (originValue.length <= newPos) {
        domRef.value = originValue + str;
      } else {
        domRef.value =
          originValue.substr(0, newPos) + str + originValue.substr(newPos);
      }
    }
    setCursorPos(pos + str.length);
    domRef.focus();
    setValue(domRef.value);
  };

  return { setRef, getCursorPos, setCursorPos, insertAt };
}
