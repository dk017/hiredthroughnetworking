import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold">Filter by Category</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;