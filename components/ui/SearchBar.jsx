import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null); // Removed TypeScript type

  const handleSearchToggle = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      // Focus input after animation completes
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  const handleSearchSubmit = (e) => { // Removed TypeScript type
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Here you would typically redirect to a search results page
    }
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => { // Removed TypeScript type
      if (
        isExpanded &&
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        !(e.target.closest('button'))
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <div className="relative">
      <div className="flex items-center">
        <form
          onSubmit={handleSearchSubmit}
          className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "w-60" : "w-0"
          }`}
        >
          <div className="relative w-full">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search products..."
              className="pr-8 h-9 focus-visible:ring-decor-accent/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-decor-secondary hover:text-decor-primary"
                onClick={handleClearSearch}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={`transition-all duration-200 ${
            isExpanded ? "text-decor-accent" : "text-decor-primary hover:text-decor-accent"
          }`}
          onClick={handleSearchToggle}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
