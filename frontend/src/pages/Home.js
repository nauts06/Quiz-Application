// import React, { useState } from 'react';

// const topics = [
//   'Math',
//   'Science',
//   'History',
//   'Literature',
//   'Geography',
//   'Art',
//   'Physics',
//   'Biology'
// ];

// function Home() {
//   const [selectedTopics, setSelectedTopics] = useState([]);

//   const toggleTopic = (topic) => {
//     setSelectedTopics(prev =>
//       prev.includes(topic)
//         ? prev.filter(t => t !== topic)
//         : [...prev, topic]
//     );
//   };

//   const handleSubmit = async () => {
// // console.log("ghhh",  JSON.parse(localStorage.getItem("userInfo"))?._id);
   
//     try {
//       const response = await fetch('http://localhost:8000/api/topics/select', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId: JSON.parse(localStorage.getItem("userInfo"))?._id,
//           topics: selectedTopics,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         console.log('Selected Topics:', data.selectedTopics);
//       } else {
//         console.error('Error:', data.error);
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//     }
//   };
//   return (
//     <div className="min-h-screen bg-gray-200 flex items-center justify-center">
//       <div className="p-4 bg-white rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Select Topics</h2>
//         <div className="space-y-2">
//           {topics.map(topic => (
//             <button
//               key={topic}
//               className={`w-full p-2 text-left rounded-md transition-colors ${
//                 selectedTopics.includes(topic)
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-gray-100 text-gray-800'
//               }`}
//               onClick={() => toggleTopic(topic)}
//             >
//               {topic}
//             </button>
//           ))}
//         </div>
//         <button
//           onClick={handleSubmit}
//           className="mt-4 w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }
// export default Home


import React from 'react'
import TopicSelection from './TopicSelection'

const Home = () => {
  return (
    <div><TopicSelection/></div>
  )
}

export default Home