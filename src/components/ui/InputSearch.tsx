import { FaMagnifyingGlass } from "react-icons/fa6";

type TInputSearchProps = {
  className?: string;
  setSearchValue: (value: string) => void; 
  value?: string; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
};

const InputSearch = ({ className, setSearchValue, value = "", onChange }: TInputSearchProps) => {
  const handleSearch = () => {
    setSearchValue(value); 
  };

  const handleKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchValue(value); 
    }
  };

  return (
    <label className={`input rounded-full flex items-center gap-2 ${className}`}>
      <input
        type="text"
        className="grow focus-within:bg-none"
        placeholder="Search"
        value={value}
        onChange={onChange} 
        onKeyDown={handleKeyDownSearch}
      />
      <FaMagnifyingGlass onClick={handleSearch} />
    </label>
  );
};

export default InputSearch;