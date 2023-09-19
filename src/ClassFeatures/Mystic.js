const Mystic = ({ formData, updateFormData, feature, classId }) => {
  // Update selection
  const handleChoiceSelection = (selectedChoice, choiceType) => {
    formData.feature_choices = formData.feature_choices || {};

    // Always ensure nested structure, even for non-"Biohacks"
    formData.feature_choices[feature] = formData.feature_choices[feature] || {};
    formData.feature_choices[feature][choiceType] = selectedChoice;

    // Update the parent state with the updated form data
    updateFormData(formData);
  };
  return <></>;
};

export default Mystic;
