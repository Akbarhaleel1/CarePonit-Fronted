// import { Calendar } from "./outSideComponents/Calendar";
// import { PlaceholdersAndVanishInputDemo } from "./outSideComponents/SearchBar";
// import ResponsiveTimePickers from "./outSideComponents/TimePicker";

// const Appointments = () => {
//   return (
//     <div className="flex flex-row p-10 px-20 mt-6">
//       <div className="bg-[#1E1F25] p-10 flex flex-col w-[490px] rounded-3xl min-h-screen">
//         <Calendar className="ml-5" />
//         <span className="border-b-2 border-white text-white inline-block mt-4"></span>
//         <ResponsiveTimePickers />
//       </div>
//       <div className="bg-blue-300 p-10 flex flex-col ml-10 rounded-3xl w-full">
//         <div>
//           <h1 className="font-extrabold text-[22px]">List of Physicians</h1>
//           <PlaceholdersAndVanishInputDemo />
//         </div>
//         <div className="flex gap-10">
//           <div className="p-32 rounded-3xl bg-gray-100">
         
//           </div>
//           <div className="p-32 rounded-3xl bg-gray-100"></div>
//           <div className="p-32 rounded-3xl bg-gray-100"></div>
//         </div>
        
//       </div>
//     </div>
//   );
// };

// export default Appointments;

import { Calendar } from "./outSideComponents/Calendar";
import { PlaceholdersAndVanishInputDemo } from "./outSideComponents/SearchBar";
import ResponsiveTimePickers from "./outSideComponents/TimePicker";
import { User } from "lucide-react";

const Appointments = () => {
  // Sample user profile data
  const physicians = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      rating: 4.8,
      availability: "Available Today",
      experience: "15 years"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurologist",
      rating: 4.9,
      availability: "Available Tomorrow",
      experience: "12 years"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      rating: 4.7,
      availability: "Available Today",
      experience: "10 years"
    }
  ];

  return (
    <div className="flex flex-row p-10 px-20 mt-6">
      <div className="bg-[#1E1F25] p-10 flex flex-col w-[490px] rounded-3xl min-h-screen">
        <Calendar className="ml-5" />
        <span className="border-b-2 border-white text-white inline-block mt-4"></span>
        <ResponsiveTimePickers />
      </div>
      <div className="bg-blue-300 p-10 flex flex-col ml-10 rounded-3xl w-full">
        <div>
          <h1 className="font-extrabold text-[22px]">List of Physicians</h1>
          <PlaceholdersAndVanishInputDemo />
        </div>
        <div className="flex gap-10 mt-6">
          {physicians.map((physician) => (
            <div key={physician.id} className="rounded-3xl bg-gray-100 p-6 flex flex-col w-1/3">
              <div className="flex items-center mb-4">
                <div className="bg-gray-300 rounded-full p-2 mr-3">
                  <User size={40} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{physician.name}</h3>
                  <p className="text-gray-600">{physician.specialty}</p>
                </div>
              </div>
              <div className="border-t border-gray-300 pt-4 mt-2">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-medium">{physician.rating}/5.0</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">{physician.availability}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-medium">{physician.experience}</span>
                </div>
              </div>
              <button className="mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;