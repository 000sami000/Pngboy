import React, { useState, useEffect } from 'react';

function Loader({small}) {
  const [loading, setLoading] = useState(true);

  // Simulate loading after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
    //   setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div >
      {loading && (
        <div className={`animate-spin rounded-full ${small?"h-4 w-4":"h-10 w-10"} border-b-2 blue-white-100`}></div>
      )}
    </div>
  );
}

export default Loader;
