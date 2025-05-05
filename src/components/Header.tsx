
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface HeaderProps {
  onSearch: (query: string) => void;
  onTypeChange: (type: string) => void;
  onLocationChange: (location: string) => void;
}

const Header = ({ onSearch, onTypeChange, onLocationChange }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-brand-primary">
            <span className="mr-1">d</span>
            <span className="text-brand-dark">Workz</span>
          </h1>
          
          <div className="flex items-center space-x-2">
            <a href="/admin" className="text-sm text-brand-primary hover:text-brand-secondary">
              Admin Login
            </a>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative w-full sm:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search jobs..."
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-4 w-full sm:w-auto">
            <Select onValueChange={onTypeChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="Government">Government</SelectItem>
                <SelectItem value="Private">Private</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="w-full sm:w-auto">
              <Input
                placeholder="Filter by Location"
                onChange={(e) => onLocationChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
