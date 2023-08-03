import React, { useState } from "react";

type Item = "Item 1" | "Item 2" | "Item 3";

/**
 * This function is a custom drag and drop component for React.
 *
 * @return {React.FC} The custom drag and drop component.
 */
const CustomDragAndDrop: React.FC = () => {
  const [draggedItem, setDraggedItem] = useState<Item | null>(null);

  /**
   * A function that handles the drag start event.
   *
   * @param {React.DragEvent<HTMLDivElement>} _ - The drag event.
   * @param {Item} item - The item being dragged.
   * @return {void}
   */
  const handleDragStart = (_: React.DragEvent<HTMLDivElement>, item: Item): void => {
    setDraggedItem(item);
  };

  /**
   * Handles the drag over event in the specified HTMLDivElement.
   *
   * @param {React.DragEvent<HTMLDivElement>} e - The drag event object.
   * @return {void} This function does not return anything.
   */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  /**
   * Handles the drop event for the HTMLDivElement.
   *
   * @param {React.DragEvent<HTMLDivElement>} e - The drag event object.
   * @return {void} This function does not return anything.
   */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();

    // Do something with the dropped item
    console.log("Dropped item:", draggedItem);
    setDraggedItem(null);
  };

  return (
    <div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, "Item 1")}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        Item 1
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, "Item 2")}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        Item 2
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, "Item 3")}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        Item 3
      </div>
    </div>
  );
};

export default CustomDragAndDrop;
