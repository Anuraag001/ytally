import React, { useState, useEffect } from 'react';
import { useUser } from './User';
import axios from 'axios';

const Dashboard = () => {
  const [connectionsTab, setConnectionsTab] = useState(true);
  const [requestsTab, setRequestsTab] = useState(true);
  const [requests, setRequests] = useState([]);
  const [connections, setConnections] = useState([]);
  const { userState } = useUser();
  const editoremail =  userState.user?.emailID;

  // Fetch requests from the server
  useEffect(() => {
    if (!editoremail) return;

    console.log(userState);

    const fetchRequests = async () => {
      try {
        const response = await axios.post('http://localhost:3001/Users/creatorsrequests', 
           { emailID: editoremail }
        );
        setRequests(response.data.requests);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, [editoremail]);

  // Fetch connections from the server
  useEffect(() => {
    if (!editoremail) return;

    const fetchConnections = async () => {
      try {
        const response = await axios.post('http://localhost:3001/Users/connections', 
           { email: editoremail }
        );
        setConnections(response.data.connections);
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
    };

    fetchConnections();
  }, [editoremail]);

  // Approve a request
  const approveRequest = async (requestId) => {
    try {
      await axios.post('http://localhost:3001/Users/approvecreator', { requestId });

      // Remove the approved request from the list
      setRequests(requests.filter(request => request._id !== requestId));

      // Refresh connections
      const response = await axios.get('http://localhost:3001/Users/approvedcreators', {
        params: { email: editoremail }
      });
      setConnections(response.data.connections);
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  // Reject a request
  const rejectRequest = async (requestId) => {
    try {
      await axios.post('http://localhost:3001/Users/rejectcreator', { requestId });

      // Remove the rejected request from the list
      setRequests(requests.filter(request => request._id !== requestId));
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <div className="flex flex-row basis-1 grow bg-red-100">
      <div className="flex basis-5/6">Editors Dashboard</div>
      <div className="flex basis-1/6 flex-col mx-2">
        <div className="flex flex-col gap-y-5">
          {/* Connections Tab */}
          <div className='bg-slate-200 py-1'>
            <button
              className="flex items-center"
              onClick={() => setConnectionsTab(!connectionsTab)}
            >
              {connectionsTab ? '↑' : '↓'} Connections ({connections.length})
            </button>

            {connectionsTab && (
              <div className="overflow-hidden transition-max-height duration-500 ease-in-out max-h-96 mt-3">
                <div className="flex flex-col gap-y-5">
                  {connections.map((connection, index) => (
                    <div key={index} className="flex flex-row gap-x-2 items-center">
                      <img
                        className="object-contain h-8 w-8"
                        src={process.env.PUBLIC_URL + '/profile.png'}
                        alt="Profile"
                      />
                      <div>{connection.creatoremail}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Requests Tab */}
          <div className='bg-slate-300 py-1'>
            <button
              className='flex flex-start'
              onClick={() => setRequestsTab(!requestsTab)}
            >
              {requestsTab ? '↑' : '↓'} Requests ({requests.length})
            </button>

            {requestsTab && (
              <div className="overflow-hidden transition-max-height duration-500 ease-in-out max-h-96 mt-3">
                <div className="flex flex-col gap-y-5">
                  {requests.map((request, index) => (
                    <div key={index} className="flex flex-row gap-x-2 items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <img
                          className="object-contain h-8 w-8"
                          src={process.env.PUBLIC_URL + '/profile.png'}
                          alt="Profile"
                        />
                        <div>{request.creatoremail}</div>
                      </div>
                      <div className="flex gap-x-2">
                        <img
                          className="object-contain h-6 w-6 cursor-pointer"
                          src={process.env.PUBLIC_URL + '/check.png'}
                          alt="Approve"
                          onClick={() => approveRequest(request._id)}
                        />
                        <img
                          className="object-contain h-6 w-6 cursor-pointer"
                          src={process.env.PUBLIC_URL + '/remove.png'}
                          alt="Reject"
                          onClick={() => rejectRequest(request._id)}
                        />
                      </div>
                    </div>
                  ))}
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
