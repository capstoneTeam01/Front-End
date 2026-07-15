import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const LocationContext = createContext({
  city: "Vancouver",
  setCity: () => {},
});

const LocationProvider = ({ children }) => {
  const [city, setCity] = useState("Vancouver");

  const value = useMemo(
    () => ({ city, setCity }),
    [city]
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

const useLocation = () =>
  useContext(LocationContext);

export {
  LocationProvider,
  useLocation,
};
