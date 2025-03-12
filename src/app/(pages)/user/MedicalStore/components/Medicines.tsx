
'use client'
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import axiosInstance from "@/app/hooks/useApi";
import cartIcon from "../../../../../../public/images/cartIcon.png";
import productListingIcon from "../../../../../../public/images/Product_list.webp";
import { useRouter } from 'next/navigation'

export interface IMedicine {
  _id: any;
  name: string;
  category: string;
  price: number;
  stock: number;
  dosage: string;
  expiryDate: Date;
  sideEffects: string;
  productImage?: string;
}

const Medicines = () => {
  const [medicines, setMedicines] = useState<IMedicine[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [sortBy, setSortBy] = useState<keyof IMedicine>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>(["all"]);

  const router = useRouter();

  // useEffect(() => {
  //   const fetchMedicines = async () => {
  //     try {
  //       const response = await axiosInstance.get("/user-service/medicines");
  //       const fetchedMedicines = response.data.result as IMedicine[];
  //       setMedicines(fetchedMedicines);
        
  //       // Extract unique categories
  //       const uniqueCategories = Array.from(new Set(fetchedMedicines.map(m => m.category)));
  //       setCategories(["all", ...uniqueCategories]);
  //     } catch (error) {
  //       console.error("Error fetching medicines:", error);
  //       // Handle error (e.g., show error message to user)
  //     }
  //   };
  //   fetchMedicines();
  // }, []);

  useEffect(() => {
    // Demo data
    const demoMedicines: IMedicine[] = [
      {
        _id: "1",
        name: "Paracetamol",
        category: "Painkiller",
        price: 5.99,
        stock: 100,
        dosage: "500mg",
        expiryDate: new Date("2025-12-31"),
        sideEffects: "None",
        productImage: "https://hdmall.co.th/blog/wp-content/uploads/2024/07/paracetamol-1024x683.jpg",
      },
      {
        _id: "2",
        name: "Ibuprofen",
        category: "Painkiller",
        price: 7.99,
        stock: 80,
        dosage: "400mg",
        expiryDate: new Date("2024-11-30"),
        sideEffects: "Stomach irritation",
        productImage: "https://www1.racgp.org.au/getattachment/154e931c-a415-4952-8ff9-490c71e8c8f1/attachment.aspx",
      },
      {
        _id: "3",
        name: "Amoxicillin",
        category: "Antibiotic",
        price: 12.99,
        stock: 50,
        dosage: "250mg",
        expiryDate: new Date("2024-10-15"),
        sideEffects: "Allergic reactions",
        productImage: "http://5.imimg.com/data5/SELLER/Default/2023/8/332350358/SI/JT/VF/98283251/amoxicillin-drugs3.jpg",
      },
      {
        _id: "4",
        name: "Vitamin C",
        category: "Supplement",
        price: 9.99,
        stock: 200,
        dosage: "1000mg",
        expiryDate: new Date("2026-01-01"),
        sideEffects: "None",
        productImage: "https://tajgenerics.com/wp-content/uploads/Vitamin-C-Tablet-Ascorbic-acid-Chewable-Tablets-500mg-manufcaturer-supplier-india-1-scaled.jpg",
      },
      {
        _id: "5",
        name: "Cetirizine",
        category: "Antihistamine",
        price: 6.99,
        stock: 120,
        dosage: "10mg",
        expiryDate: new Date("2025-09-20"),
        sideEffects: "Drowsiness",
        productImage: "https://tse3.mm.bing.net/th?id=OIP.lX9UZ4UceyYRbv1afrpkuAHaE8&pid=Api&P=0&h=180",
      },
      {
        _id: "6",
        name: "Omeprazole",
        category: "Antacid",
        price: 8.99,
        stock: 90,
        dosage: "20mg",
        expiryDate: new Date("2024-08-10"),
        sideEffects: "Headache",
        productImage: "https://lh3.googleusercontent.com/HIsd6ekFu7DS6s8wdtmHR6FN1T-2bWNAkw7x363CkdF55sloIBfcq_iNWfdRXIZvssi3mZkr2ftjTQxpISG1Y8KXfDz4eDzWISWW2yZsZNpQX5hmg68w_eFolIYIH1gI5is6rIzr",
      },
      {
        _id: "7",
        name: "Metformin",
        category: "Diabetes",
        price: 11.99,
        stock: 70,
        dosage: "500mg",
        expiryDate: new Date("2025-07-25"),
        sideEffects: "Nausea",
        productImage: "https://tse2.mm.bing.net/th?id=OIP.spzVN20yKo7ojX9ocMsRUQHaE8&pid=Api&P=0&h=180",
      },
      {
        _id: "8",
        name: "Atorvastatin",
        category: "Cholesterol",
        price: 14.99,
        stock: 60,
        dosage: "20mg",
        expiryDate: new Date("2025-06-15"),
        sideEffects: "Muscle pain",
        productImage: "https://tse4.mm.bing.net/th?id=OIP.bBv_ULL_jH9pJs3ClMC4WwHaE8&pid=Api&P=0&h=180",
      },
    ];
  
    // Set the demo data to state
    setMedicines(demoMedicines);
  
    // Extract unique categories
    const uniqueCategories = Array.from(new Set(demoMedicines.map((m) => m.category)));
    setCategories(["all", ...uniqueCategories]);
  }, []);

  // Filter medicines based on search query and category
  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (categoryFilter === "all" || medicine.category === categoryFilter)
  );

  // Sort medicines
  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Get current medicines
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMedicines = sortedMedicines.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Function to handle Add to Cart
  const handleAddToCart = async (medicineId: string) => {
    try {
      console.log('handle add to cart is working');
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user)
        let userId = userData._id
        console.log('user', user)
        const response = await axiosInstance.post('/user-service/add-to-cart', {
          userId,
          medicineId
        });
        if (response) {
          router.push('/user/MedicalStore/Cart')
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleCart = () => {
    router.push('/user/MedicalStore/Cart')
  }
  
  const handleProductsListing = () => {
    router.push('/user/MedicalStore/ProudctListing')
  }

  return (
    <div className="bg-gradient-to-br bg-[#0E0A3C] rounded-3xl m-3 p-6 md:p-12 lg:p-16 mt-10 min-h-screen">
      <main className="flex-1 flex flex-col relative p-4">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-white text-3xl font-bold">Give All You Need</h1>
          <div className="relative flex items-center">
            <Image
              src={cartIcon}
              alt="profileImg"
              width={50}
              height={50}
              className="rounded-full mr-8 cursor-pointer"
              onClick={handleCart}
            />
            <Image
              src={productListingIcon}
              alt="profileImg"
              width={50}
              height={50}
              className="rounded-full mr-8 cursor-pointer"
              onClick={handleProductsListing}
            />
            <input
              type="text"
              placeholder="Search medicines..."
              className="bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white bg-opacity-20 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as keyof IMedicine)}
              className="bg-white bg-opacity-20 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="stock">Stock</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-md hover:bg-opacity-30 transition duration-300"
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentMedicines.map((medicine, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
            >
              <img
                src={medicine.productImage}
                alt={medicine.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {medicine.name}
                </h3>
                <p className="text-gray-300 mb-1">Category: {medicine.category}</p>
                <p className="text-gray-300 mb-1">Dosage: {medicine.dosage}</p>
                <p className="text-gray-300 mb-1">Price: ${medicine.price.toFixed(2)}</p>
                <p className="text-gray-300 mb-4">Stock: {medicine.stock} available</p>
                <div className="flex justify-between space-x-4">
                  <button onClick={() => handleAddToCart(medicine._id)} className="flex-1 bg-white text-purple-800 px-4 py-2 rounded-full shadow-md hover:bg-purple-100 transition duration-300 transform hover:-translate-y-1 flex items-center justify-center">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(sortedMedicines.length / itemsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-4 py-2 rounded ${
                currentPage === i + 1 ? 'bg-purple-600 text-white' : 'bg-white text-purple-600'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Medicines;