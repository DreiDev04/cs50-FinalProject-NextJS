

export const fetchQuery = async (query: string) => {
  const res = await fetch(`/api/search?q=${query}`);
  const data = await res.json();
  return data.products;
};
