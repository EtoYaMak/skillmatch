import Select from "react-select";

const sampleOptions = [
  {
    label: "Finland",
    options: [
      {
        label: "Great Hotel",
        value: "Great Hotel",
      },
      // More options
    ],
  },
  {
    label: "Sweden",
    options: [{ label: "Stockholm", value: "Stockholm" }],
  },
];

export const ReactSelect = ({ value, options = sampleOptions, ...props }) => {
  return (
    <Select
      value={value}
      options={options}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      {...props}
    />
  );
};
