"use client";
import React from 'react';
import PropTypes from 'prop-types';
import { calculateAge } from '@/lib/calculateAge';
import { formatDate } from '@/lib/dateFormat';

const PersonCard = ({
  name,
  email,
  gender = 'Not specified',
  dob = 'Unknown',
  work = 'Not specified',
  education = 'Not specified'
}) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        {/* Header Section */}
        <div className="border-b pb-4 mb-4">
          <h2 className="block mt-1 text-xl leading-tight font-medium text-black">{name}</h2>
          <p className="mt-1 text-gray-500">{email}</p>
        </div>

        {/* Details Section */}
        <div className="space-y-3">
          <div className="flex">
            <span className="font-semibold text-gray-700 w-32">Gender:</span>
            <span className="text-gray-600">{gender}</span>
          </div>

          <div className="flex">
            <span className="font-semibold text-gray-700 w-32">DOB:</span>
            <span className="text-gray-600">{formatDate(dob)}</span>
          </div>

          <div className="flex">
            <span className="font-semibold text-gray-700 w-32">Age:</span>
            <span className="text-gray-600">{calculateAge(dob)}</span>
          </div>

          <div className="flex">
            <span className="font-semibold text-gray-700 w-32">Occupation:</span>
            <span className="text-gray-600">{work}</span>
          </div>

          <div className="flex">
            <span className="font-semibold text-gray-700 w-32">Education:</span>
            <span className="text-gray-600">{education}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

PersonCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  gender: PropTypes.string,
  dob: PropTypes.string,
  work: PropTypes.string,
  education: PropTypes.string
};

export default PersonCard;
