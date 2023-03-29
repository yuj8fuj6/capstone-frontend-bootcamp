import React from "react";

export const makeOption = (options) => {
  return options.map((option) => (
    <option>{option.label}</option>
  ));
};
