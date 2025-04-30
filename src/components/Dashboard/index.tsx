import Sidebar from '../Sidebar';
import Header from '../Header';
import MetricsCard from '../MetricsCard';
import RevenueChart from '../RevenueChart';
import ReportsOverview from '../ReportsOverview';
import { useEffect, useState } from 'react';
import { formatNumber } from '@/utils/formatter';
import { numberWithCommas } from '@/utils/numberWithComma';
import Loader from '../Loader';

// Interfaces and Types
interface IUsersByDevice {
  desktop_users: number | string;
  laptop_users: number | string;
  phone_app_users: number | string;
}

export interface IUsersByDeviceData {
  labels: string[];
  datasets: [
    {
      data: number[];
      backgroundColor: string[];
      hoverOffset: number;
    },
  ];
}

export interface IRecentSubscriber {
  date: Date;
  name: string;
  package: string;
  amount: number;
}

export interface IRevenueData {
  _id: string;
  month: string;
  revenue: string;
}

interface AnalyticsType {
  user_id: string;
  live_visits: number;
  monthly_users: number;
  new_sign_ups: number;
  subscriptions: number;
  total_revenue: number;
  revenue_data: IRevenueData[];
  recent_subscribers: IRecentSubscriber[];
  users_by_device: IUsersByDevice;
  users_by_device_data: IUsersByDeviceData;
  users_by_country_count: number;
  users_by_device_count: number;
  createdAt: Date;
  updatedAt: Date;
}

const DashboardComponent = () => {
  const [username, setUsername] = useState('Guest!');
  const [isUsernameFetched, setIsUsernameFetched] = useState(false);
  const [analyticsInfo, setAnalyticsInfo] = useState<AnalyticsType | null>(null);
  const [selectedTab, setSelectedTab] = useState("dashboard");

  // Fetch username from localStorage
  useEffect(() => {
    const fetchUserName = () => {
      const storedUserName = localStorage.getItem('userName');
      const finalUsername = storedUserName || 'Guest!';
      setUsername(finalUsername);
      setIsUsernameFetched(true);
    };
    fetchUserName();
  }, []);

  // Fetch analytics data only after username is fetched
  useEffect(() => {
    const fetchAnalyticsInfo = async () => {
      try {
        const response = await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        data = {
          ...data,
          revenue_data: data.revenue_data.map((item: IRevenueData) => ({
            ...item,
            revenue: parseFloat(item.revenue),
          })),
        };

        console.log('...Analytics data:...', data);
        setAnalyticsInfo(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    if (isUsernameFetched) {
      fetchAnalyticsInfo();
    }
  }, [username, isUsernameFetched]);

  // Render content based on the selected tab
  const renderContent = () => {
    switch (selectedTab) {
      case "dashboard":
        return (
          <>
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <MetricsCard
                title="Live Visits"
                ic={"ic:baseline-remove-red-eye"}
                value={analyticsInfo?.live_visits?.toString() ?? "0"}
                change="+12%"
              />
              <MetricsCard
                title="Monthly Users"
                ic={"mdi:account"}
                value={analyticsInfo ? formatNumber(analyticsInfo.monthly_users) : "0"}
                change="-2.5%"
              />
              <MetricsCard
                title="New Sign-ups"
                ic={"mdi:plus-circle"}
                value={analyticsInfo?.new_sign_ups?.toString() ?? "0"}
                change="+15%"
              />
              <MetricsCard
                title="Subscriptions"
                ic={"mdi:star"}
                value={analyticsInfo ? formatNumber(analyticsInfo.subscriptions) : "0"}
                change="+0.25%"
              />
            </div>

            {/* Revenue Chart */}
            <div className="bg-boxColor p-4 rounded shadow-md mt-4">
              {analyticsInfo ? (
                <RevenueChart
                  analyticsTotalRevenue={analyticsInfo ? formatNumber(analyticsInfo.total_revenue) : "0"}
                  analyticsRevenueData={analyticsInfo!.revenue_data}
                />
              ) : (
                <p>Loading...</p>
              )}
            </div>

            {/* Reports Overview */}
            {analyticsInfo ? (
              <ReportsOverview
                analyticsInfoDeviceCount={analyticsInfo ? analyticsInfo.users_by_device_count.toLocaleString() : "0"}
                analyticsInfoCountryCount={analyticsInfo ? formatNumber(analyticsInfo.users_by_country_count) : "0"}
                analyticsInfoDesktopUserCount={analyticsInfo ? numberWithCommas(+analyticsInfo.users_by_device.desktop_users) : "0"}
                analyticsInfoPhoneUserCount={analyticsInfo ? numberWithCommas(+analyticsInfo.users_by_device.phone_app_users) : "0"}
                analyticsInfoLaptopUserCount={analyticsInfo ? numberWithCommas(+analyticsInfo.users_by_device.laptop_users) : "0"}
                analyticsRecentSubscriber={analyticsInfo?.recent_subscribers}
                analyticsDeviceData={analyticsInfo ? [analyticsInfo?.users_by_device_data] : []}
              />
            ) : (
              <Loader />
            )}
          </>
        );

      case "notifications":
        return <p>Notifications Content</p>;

      case "users":
        return <p>Users Content</p>;

      case "posts":
        return <p>Flagged Posts Content</p>;

      case "ads":
        return <p>Advertisements Content</p>;

      case "blogs":
        return <p>Blogs Content</p>;

      default:
        return <p>No content available</p>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onTabChange={setSelectedTab} />

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-gray-800 to-indigo-900 p-4 overflow-y-auto">
        {/* Header */}
        <Header />

        {/* Dynamic Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardComponent;



















// import Sidebar from '../Sidebar';
// import Header from '../Header';
// import MetricsCard from '../MetricsCard';
// import RevenueChart from '../RevenueChart';
// import ReportsOverview from '../ReportsOverview';
// import { useEffect, useState } from 'react';
// import { formatNumber } from '@/utils/formatter';
// import { numberWithCommas } from '@/utils/numberWithComma';
// import Loader from '../Loader';
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";

// // Interfaces and Types
// interface IUsersByDevice {
//   desktop_users: number | string;
//   laptop_users: number | string;
//   phone_app_users: number | string;
// }

// export interface IUsersByDeviceData {
//   labels: string[];
//   datasets: [
//     {
//       data: number[];
//       backgroundColor: string[];
//       hoverOffset: number;
//     },
//   ];
// }

// export interface IRecentSubscriber {
//   date: Date;
//   name: string;
//   package: string;
//   amount: number;
// }

// export interface IRevenueData {
//   _id: string;
//   month: string;
//   revenue: string;
// }

// interface AnalyticsType {
//   user_id: string;
//   live_visits: number;
//   monthly_users: number;
//   new_sign_ups: number;
//   subscriptions: number;
//   total_revenue: number;
//   revenue_data: IRevenueData[];
//   recent_subscribers: IRecentSubscriber[];
//   users_by_device: IUsersByDevice;
//   users_by_device_data: IUsersByDeviceData;
//   users_by_country_count: number;
//   users_by_device_count: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const DashboardComponent = () => {
//   const [username, setUsername] = useState('Guest!');
//   const [isUsernameFetched, setIsUsernameFetched] = useState(false);
//   const [analyticsInfo, setAnalyticsInfo] = useState<AnalyticsType | null>(null);

//   // Fetch username from localStorage
//   useEffect(() => {
//     const fetchUserName = () => {
//       const storedUserName = localStorage.getItem('userName');
//       const finalUsername = storedUserName || 'Guest!';
//       setUsername(finalUsername);
//       setIsUsernameFetched(true);
//     };
//     fetchUserName();
//   }, []);

//   // Fetch analytics data only after username is fetched
//   useEffect(() => {
//     const fetchAnalyticsInfo = async () => {
//       try {
//         const response = await fetch('/api/analytics', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ username }),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         let data = await response.json();
//         data = {
//           ...data,
//           revenue_data: data.revenue_data.map((item: IRevenueData) => ({
//             ...item,
//             revenue: parseFloat(item.revenue),
//           })),
//         };

//         console.log('...Analytics data:...', data);
//         setAnalyticsInfo(data);
//       } catch (error) {
//         console.error('Error fetching analytics:', error);
//       }
//     };

//     if (isUsernameFetched) {
//       fetchAnalyticsInfo();
//     }
//   }, [username, isUsernameFetched]);

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content Area */}
//       <div className="flex-1 bg-gradient-to-br from-gray-800 to-indigo-900 p-4 overflow-y-auto">
//         {/* Header */}
//         <Header />

//         {/* Vertical Tabs for Main Content */}
//         <Tabs defaultValue="dashboard" className="w-full">
//           {/* Tab Content */}
//           <TabsContent value="dashboard">
//             {/* Metrics Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
//               <MetricsCard
//                 title="Live Visits"
//                 ic={"ic:baseline-remove-red-eye"}
//                 value={analyticsInfo?.live_visits?.toString() ?? "0"}
//                 change="+12%"
//               />
//               <MetricsCard
//                 title="Monthly Users"
//                 ic={"mdi:account"}
//                 value={analyticsInfo ? formatNumber(analyticsInfo.monthly_users) : "0"}
//                 change="-2.5%"
//               />
//               <MetricsCard
//                 title="New Sign-ups"
//                 ic={"mdi:plus-circle"}
//                 value={analyticsInfo?.new_sign_ups?.toString() ?? "0"}
//                 change="+15%"
//               />
//               <MetricsCard
//                 title="Subscriptions"
//                 ic={"mdi:star"}
//                 value={analyticsInfo ? formatNumber(analyticsInfo.subscriptions) : "0"}
//                 change="+0.25%"
//               />
//             </div>

//             {/* Revenue Chart */}
//             <div className="bg-boxColor p-4 rounded shadow-md mt-4">
//               {analyticsInfo ? (
//                 <RevenueChart
//                   analyticsTotalRevenue={analyticsInfo ? formatNumber(analyticsInfo.total_revenue) : "0"}
//                   analyticsRevenueData={analyticsInfo!.revenue_data}
//                 />
//               ) : (
//                 <p>Loading...</p>
//               )}
//             </div>

//             {/* Reports Overview */}
//             {analyticsInfo ? (
//               <ReportsOverview
//                 analyticsInfoDeviceCount={analyticsInfo ? analyticsInfo.users_by_device_count.toLocaleString() : "0"}
//                 analyticsInfoCountryCount={analyticsInfo ? formatNumber(analyticsInfo.users_by_country_count) : "0"}
//                 analyticsInfoDesktopUserCount={analyticsInfo ? numberWithCommas(+analyticsInfo.users_by_device.desktop_users) : "0"}
//                 analyticsInfoPhoneUserCount={analyticsInfo ? numberWithCommas(+analyticsInfo.users_by_device.phone_app_users) : "0"}
//                 analyticsInfoLaptopUserCount={analyticsInfo ? numberWithCommas(+analyticsInfo.users_by_device.laptop_users) : "0"}
//                 analyticsRecentSubscriber={analyticsInfo?.recent_subscribers}
//                 analyticsDeviceData={analyticsInfo ? [analyticsInfo?.users_by_device_data] : []}
//               />
//             ) : (
//               <Loader />
//             )}
//           </TabsContent>

//           {/* Notifications Tab Content */}
//           <TabsContent value="notifications">
//             <p>Notifications Contentttt</p>
//           </TabsContent>

//           {/* Users Tab Content */}
//           <TabsContent value="users">
//             <p>Users Content</p>
//           </TabsContent>

//           {/* Flagged Posts Tab Content */}
//           <TabsContent value="posts">
//             <p>Flagged Posts Content</p>
//           </TabsContent>

//           {/* Advertisements Tab Content */}
//           <TabsContent value="ads">
//             <p>Advertisements Content</p>
//           </TabsContent>

//           {/* Blogs Tab Content */}
//           <TabsContent value="blogs">
//             <p>Blogs Content</p>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default DashboardComponent;




















// // import Sidebar from '../Sidebar';
// // import Header from '../Header';
// // import MetricsCard from '../MetricsCard';
// // import RevenueChart from '../RevenueChart';
// // import ReportsOverview from '../ReportsOverview';
// // import { useEffect, useState } from 'react';
// // import { formatNumber } from '@/utils/formatter';
// // import { numberWithCommas } from '@/utils/numberWithComma';
// // import Loader from '../Loader';

// // interface IUsersByDevice {
// //   desktop_users: number | string;
// //   laptop_users: number | string;
// //   phone_app_users: number | string;
// // }

// // export interface IUsersByDeviceData {
// //   labels: string[],
// //     datasets: [
// //       {
// //         data: number[],
// //         backgroundColor: string[],
// //         hoverOffset: number,
// //       },
// //     ],
// // }

// // export interface IRecentSubscriber {
// //   date: Date;
// //   name: string;
// //   package: string;
// //   amount: number;
// // }

// // export interface IRevenueData {
// //   _id: string;
// //   month: string;
// //   // revenue: number;
// //   revenue: string;
// // }

// // interface AnalyticsType {
// //     user_id: string;
// //     live_visits: number;
// //     monthly_users: number;
// //     new_sign_ups: number;
// //     subscriptions: number;
// //     total_revenue: number;
// //     revenue_data: IRevenueData[];
// //     recent_subscribers: IRecentSubscriber[];
// //     users_by_device: IUsersByDevice;
// //     // users_by_device_data: IUsersByDeviceData[];
// //     users_by_device_data: IUsersByDeviceData;
// //     // users_by_country: IUsersByCountry;
// //     users_by_country_count: number;
// //     users_by_device_count: number;
// //     createdAt: Date;
// //     updatedAt: Date;
// // }

// // const DashboardComponent = () => {
// //   const [username, setUsername] = useState('Guest!');
// //   const [isUsernameFetched, setIsUsernameFetched] = useState(false); // Track if username is fetched
// //   const [analyticsInfo, setAnalyticsInfo] = useState<AnalyticsType | null>(null); // State to store analytics info

// //   // Fetch username from localStorage
// //   useEffect(() => {
// //     const fetchUserName = () => {
// //       const storedUserName = localStorage.getItem('userName');
// //       const finalUsername = storedUserName || 'Guest!';
// //       setUsername(finalUsername);
// //       setIsUsernameFetched(true); // Mark username as fetched
// //     };
// //     fetchUserName();
// //   }, []);

// //   // Fetch analytics data only after username is fetched
// //   useEffect(() => {
// //     const fetchAnalyticsInfo = async () => {
// //       try {
// //         const response = await fetch('/api/analytics', {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({ username }), // Send username in the request body
// //         });

// //         if (!response.ok) {
// //           throw new Error(`HTTP error! Status: ${response.status}`);
// //         }
// //         let data = await response.json();
// //         data = {
// //           ...data,
// //           revenue_data: data.revenue_data.map((item: IRevenueData) => ({
// //             ...item,
// //             revenue: parseFloat(item.revenue), // Convert revenue from string to number
// //           })),
// //         }
// //         console.log('...Analytics data:...', data); // Log the fetched analytics data
// //         setAnalyticsInfo(data); // Store analytics info in state
// //       } catch (error) {
// //         console.error('Error fetching analytics:', error);
// //       }
// //     };

// //     // Only trigger fetchAnalyticsInfo if username is fetched
// //     if (isUsernameFetched) {
// //       fetchAnalyticsInfo();
// //     }
// //   }, [username, isUsernameFetched]); // Trigger when username or isUsernameFetched changes

// //   return (
// //     <div className="flex h-screen">
// //       <Sidebar />

// //       {/* Main Content */}
// //       <div className="flex-1 bg-gradient-to-br from-gray-800 to-indigo-900 p-4 overflow-y-auto">
// //         {/* Header */}
// //         <Header />

// //         {/* Metrics Cards */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
// //           <MetricsCard title="Live Visits" ic={"ic:baseline-remove-red-eye"} value={analyticsInfo?.live_visits?.toString() ?? "0"} change="+12%" />
// //           <MetricsCard title="Monthly Users" ic={"mdi:account"} value={analyticsInfo ? formatNumber(analyticsInfo.monthly_users) : "0"} change="-2.5%" />
// //           <MetricsCard title="New Sign-ups" ic={"mdi:plus-circle"} value={analyticsInfo?.new_sign_ups?.toString() ?? "0"} change="+15%" />
// //           <MetricsCard title="Subscriptions" ic={"mdi:star"} value={analyticsInfo ? formatNumber(analyticsInfo.subscriptions) : "0"} change="+0.25%" />
// //         </div>

// //         {/* Revenue Chart */}
// //         <div className="bg-boxColor p-4 rounded shadow-md mt-4">
// //            {analyticsInfo ? (
// //           <RevenueChart
// //             analyticsTotalRevenue={analyticsInfo ? formatNumber(analyticsInfo.total_revenue) : "0"}
// //             analyticsRevenueData={analyticsInfo!.revenue_data}
// //           />
// //         ) : (
// //           <p>Loading...</p>
// //         )}
// //         </div>

// //         {/* Reports Overview */}
// //         {analyticsInfo ? <ReportsOverview 
// //           analyticsInfoDeviceCount={analyticsInfo ? analyticsInfo.users_by_device_count.toLocaleString() : "0"} 
// //           analyticsInfoCountryCount={analyticsInfo ? formatNumber(analyticsInfo.users_by_country_count) : "0"} 
// //           analyticsInfoDesktopUserCount={analyticsInfo ? numberWithCommas(+analyticsInfo.users_by_device.desktop_users) : "0"} 
// //           analyticsInfoPhoneUserCount={analyticsInfo ? numberWithCommas(+analyticsInfo.users_by_device.phone_app_users) : "0"} 
// //           analyticsInfoLaptopUserCount={analyticsInfo ? numberWithCommas(+analyticsInfo.users_by_device.laptop_users) : "0"} 
// //           analyticsRecentSubscriber={analyticsInfo?.recent_subscribers}
// //           analyticsDeviceData={analyticsInfo ? [analyticsInfo?.users_by_device_data] : 
// //             [{
// //               labels: ['Fake Desktop users', 'Phone app users', 'Laptop users'],
// //               datasets: [
// //                 {
// //                   data: [4100, 643, 1000, 400],
// //                   backgroundColor: ['#CB3CFF', '#00C2FF', '#0038FF', '#343B4F40'],
// //                   hoverOffset: 4,
// //                 },
// //               ],
// //             }]
// //           }
// //         />
// //       : <Loader />
// //       }
// //       </div>
// //     </div>
// //   );
// // };

// // export default DashboardComponent;