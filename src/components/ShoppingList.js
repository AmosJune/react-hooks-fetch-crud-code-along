import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

//useEffect hook => triggers side effect [[ GOAL 1 ]]
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((resp) => resp.json())
      .then((items) => setItems(items))
  }, []);

// Deleted items
  function handleDeleteItem(deletedItem) {
    console.log("In shoppingCart:", deletedItem);
  }

  function handleDeletedItem() {
    const updatedItems = items.filter((item) => item.id != handleDeletedItem.id);
    setItems(updatedItems)
  }

// Updated items
  function handleUpdatedItem(updatedItem) {
    // console.log("In shoppingCart:", updatedItem);
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } 
      else {
        return item;
      }
    });
    setItems(updatedItems);
  };

// Adds Item 
  function handleAddItem(newItem) {
    console.log("In shoppingList:", newItem);
    setItems([...items, newItem])
  }

//Change Category
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} 
              onUpdatedItem={handleUpdatedItem}
              onDeleteItem={handleDeleteItem}
              onDeletedItemForm={handleDeletedItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
