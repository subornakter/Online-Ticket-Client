import React from 'react';


import CustomerStatistics from '../../../components/Statistics/CustomerStatistics.jsx';
import VendorStatistics from '../../../components/Statistics/VendorStatistics.jsx';
import AdminStatistics from '../../../components/Statistics/AdminStatistics.jsx';
import LoadingSpinner from '../../../components/LoadingSpinner.jsx';
import useRole from '../../../hooks/useRole.jsx';
const Statistics = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner/>
      </div>
    );
  }

  return (
    <div>
      {role === 'customer' && <CustomerStatistics/>}
      {role === 'vendor' && <VendorStatistics/>}
      {role === 'admin' && <AdminStatistics/>}
      {!role && (
        <p className="mt-10 text-center text-gray-500">
          Role not recognized or not assigned.
        </p>
      )}
    </div>
  );
};

export default Statistics;

