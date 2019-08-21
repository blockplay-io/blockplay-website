import React from "react";

import First from "./first";
import Values from "./secondValues";
import Contact from "./contactUs";

const App = ({lang}) => {
  return (
    <React.Fragment>
      <First lang = {lang} />
      <Values lang = {lang} />
      <Contact lang = {lang} />
    </React.Fragment>
  );
}
 
export default App;


