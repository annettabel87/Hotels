export const getCitiesFromData = (cities: string[], value: string) => {
  const citiesArray = Array.from(new Set(cities));
  return citiesArray.filter((item) => item.toLowerCase().includes(value.toLowerCase()));
};
