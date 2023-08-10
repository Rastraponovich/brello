import { type DragEvent, useCallback, useState } from "react";

interface DragAndDropState<T> {
  isDragging: boolean;
  draggedItem: T | null;
}

interface DragAndDropDef<T> {
  isDragging: boolean;
  draggedItem: T | null;
  handleDragStart: (e: DragEvent, item: T) => void;
  handleDragEnd: () => void;
}

/**
 * hook for handling drag and drop functionality.
 *
 * @template T - The type of the dragged item.
 * @returns {Object} An object containing the state and event handlers for drag and drop.
 */
export const useDragAndDrop = <T,>(): DragAndDropDef<T> => {
  const [state, setState] = useState<DragAndDropState<T>>({
    isDragging: false,
    draggedItem: null,
  });

  const handleDragStart = useCallback((_: DragEvent, item: T) => {
    setState((prevState) => ({
      ...prevState,
      isDragging: true,
      draggedItem: item,
    }));
  }, []);

  const handleDragEnd = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isDragging: false,
      draggedItem: null,
    }));
  }, []);

  return { ...state, handleDragStart, handleDragEnd };
};
