import React, { useState } from 'react';

const Dashboard = () => {
  const [connectionsTab, setConnectionsTab] = useState(true);
  const [requestsTab, setRequestsTab] = useState(true);

  return (
    <div className="flex flex-row basis-1 grow bg-red-100">
      <div className="flex basis-5/6 ">Editors Dashboard</div>
      <div className="flex basis-1/6 flex-col mx-2">
        <div className="flex flex-col gap-y-5">
            <div className='bg-slate-200 py-1'>
          <button
            className="flex items-center "
            onClick={() => setConnectionsTab(!connectionsTab)}
          >
            {connectionsTab ? '↑' : '↓'} Connections(2)
          </button>

          {connectionsTab && (
            <div className="overflow-hidden transition-max-height duration-500 ease-in-out max-h-96 mt-3">
              <div className="flex flex-col gap-y-5">
                <div className="flex flex-row gap-x-2">
                  <img
                    className="object-contain h-8 w-8"
                    src={process.env.PUBLIC_URL + '/profile.png'}
                    alt="Profile"
                  />
                  <div className="">name</div>
                </div>
                <div className="flex flex-row gap-x-2">
                  <img
                    className="object-contain h-8 w-8"
                    src={process.env.PUBLIC_URL + '/profile.png'}
                    alt="Profile"
                  />
                  <div className="">name</div>
                </div>
              </div>
            </div>
          )}
            </div>
            <div className='bg-slate-300 py-1'>
          <button
            className='flex flex-start'
            onClick={() => setRequestsTab(!requestsTab)}
          >
            {requestsTab ? '↑' : '↓'} Requests(2)
          </button>

          {requestsTab && (
            <div className="overflow-hidden transition-max-height duration-500 ease-in-out max-h-96 mt-3">
              <div className="flex flex-col gap-y-5">
                <div className="flex flex-row gap-x-2">
                  <img
                    className="object-contain h-8 w-8"
                    src={process.env.PUBLIC_URL + '/profile.png'}
                    alt="Profile"
                  />
                  <div className="">name</div>
                  <img
                    className="object-contain h-6 w-6"
                    src={process.env.PUBLIC_URL + '/view.png'}
                    alt="View"
                  />
                  <img
                    className="object-contain h-6 w-6"
                    src={process.env.PUBLIC_URL + '/check.png'}
                    alt="Check"
                  />
                  <img
                    className="object-contain h-6 w-6"
                    src={process.env.PUBLIC_URL + '/remove.png'}
                    alt="Remove"
                  />
                </div>

                <div className="flex flex-row gap-x-2">
                  <img
                    className="object-contain h-8 w-8"
                    src={process.env.PUBLIC_URL + '/profile.png'}
                    alt="Profile"
                  />
                  <div className="">name</div>
                  <img
                    className="object-contain h-6 w-6"
                    src={process.env.PUBLIC_URL + '/view.png'}
                    alt="View"
                  />
                  <img
                    className="object-contain h-6 w-6"
                    src={process.env.PUBLIC_URL + '/check.png'}
                    alt="Check"
                  />
                  <img
                    className="object-contain h-6 w-6"
                    src={process.env.PUBLIC_URL + '/remove.png'}
                    alt="Remove"
                  />
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
