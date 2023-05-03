// this is not a component
// no need to import react, also no need to make a componentfile for it. This should be in a utils.js file or similar since you use it across all components
export const makeOption = (options) => {
  return options.map((option) => (
    <option>{option.label}</option>
  ));
};
