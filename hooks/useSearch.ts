// hooks/useSearch.ts
import { useState } from 'react';

interface UseSearch<T> {
  search: string;
  setSearch: (value: string) => void;
  filteredData: T[];
}

const useSearch = <T extends { name: string }>(data: T[]): UseSearch<T> => {
  const [search, setSearch] = useState<string>('');

  // Filter the data based on the search term
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return { search, setSearch, filteredData };
};

export default useSearch;
