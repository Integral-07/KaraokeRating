const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <p className="text-sm">&copy; {new Date().getFullYear()} Integral07. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
