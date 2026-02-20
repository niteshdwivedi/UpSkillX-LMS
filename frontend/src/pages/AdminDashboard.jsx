import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#001f2f]">
      <Navbar />
      <div className="p-6 text-white">
        <h2 className="text-3xl font-bold">Welcome Admin 🛠</h2>
      </div>
    </div>
  );
};

export default AdminDashboard;
