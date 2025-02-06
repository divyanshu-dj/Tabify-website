import { X } from "lucide-react";
import {  useState } from "react";

const TagsInput = ({ field }: { field: any }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!field.value.includes(inputValue.trim())) {
        field.onChange([...field.value, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    field.onChange(field.value.filter((tag: string) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 min-h-11 border bg-background border-gray-700 rounded-lg
                    focus:ring-2 focus:ring-blue-500/20 transition-all
                    hover:border-gray-600">
      {field.value.map((tag: string, index: number) => (
        <span
          key={index}
          className="flex items-center gap-1 bg-[#3C4048] px-2 py-1 rounded-md text-sm"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="hover:text-gray-400"
          >
            <X size={14} />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent outline-none min-w-[60px] text-sm "
        placeholder={field.value.length === 0 ? "Enter tags..." : ""}
      />
    </div>
  );
};

export default TagsInput;