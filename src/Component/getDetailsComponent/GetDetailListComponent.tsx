"use client";
import React from 'react';
import PropTypes from 'prop-types';
import { calculateAge } from '@/lib/calculateAge';
const PersonCardList = ({
  name,
  gender = 'Not specified',
  dob = 'Unknown',
  work = 'Not specified',
  education = 'Not specified'
}) => {
  return (
   <div 
  className="p-4 min-w-64 w-fit mx-auto bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden md:max-w-xl m-1 mb-4"
>
  <div className="space-y-2"> 
    <h2 className="text-xl font-medium text-black">
      {`${name} - ${gender}`}
    </h2>
    <p className="text-gray-600">
      {`Age: ${calculateAge(dob)}`}
    </p>
    <p className="text-gray-600">
      {`Occupation & Work: ${education} & ${work}`}
    </p>
  </div>
</div>
  );
};

PersonCardList.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  gender: PropTypes.string,
  dob: PropTypes.string,
  work: PropTypes.string,
  education: PropTypes.string
};

export default PersonCardList;
