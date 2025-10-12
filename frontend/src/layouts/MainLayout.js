const MainLayout = ({ children }) => (
    <div>
      <header className="bg-gray-800 text-white p-4">Header</header>
      <main>{children}</main>
      <footer className="bg-gray-800 text-white p-4">Footer</footer>
    </div>
  );
  
  export default MainLayout;
  