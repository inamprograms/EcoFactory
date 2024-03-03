import React, { createContext, useEffect, useState } from "react";
export const DataContext = createContext();

function DataContextProvider(props) {
  const [imageName, setImageName] = useState("File Name");
  useEffect(() => {}, []);

  return (
    <DataContext.Provider
      value={{
        imageName,
        setImageName,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
export default DataContextProvider;
