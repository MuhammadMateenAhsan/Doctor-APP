import React from 'react';
import { BeatLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <BeatLoader color="#36d7b7" />
    </div>
  );
};

export default Spinner;
