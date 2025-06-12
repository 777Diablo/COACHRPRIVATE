import React from 'react';
import { Filter } from 'lucide-react';

interface FilterGroup {
  title: string;
  items: string[];
}

interface SidebarProps {
  filters: FilterGroup[];
}

const Sidebar: React.FC<SidebarProps> = ({ filters }) => {
  return (
    <div className="w-full lg:w-60 bg-gray-50 p-4 border-r border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={16} className="text-[#1e3a5f]" />
        <h3 className="text-sm font-medium uppercase text-[#1e3a5f]">Filters</h3>
      </div>
      
      {filters.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-4">
          <h4 className="text-xs font-medium text-gray-500 mb-2">{group.title}</h4>
          <ul className="space-y-1">
            {group.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-center">
                <input
                  type="checkbox"
                  id={`filter-${groupIndex}-${itemIndex}`}
                  className="w-3 h-3 text-[#1e3a5f] rounded focus:ring-[#1e3a5f]"
                />
                <label
                  htmlFor={`filter-${groupIndex}-${itemIndex}`}
                  className="ml-2 text-xs text-gray-700 cursor-pointer hover:text-[#1e3a5f]"
                >
                  {item}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;