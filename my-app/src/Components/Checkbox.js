import React, { useState } from 'react';
import './Checkbox.css'; // Import the CSS file for the styles


const Checkbox = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(!checked);
  };

  return (
    <div className='checkbox-container'>
      <input

        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className={checked ? 'checkbox-checked' : 'checkbox-unchecked'}
      />
      <label className='checkbox-label'>Check me!</label>
    </div>
  );
};

export default Checkbox;
