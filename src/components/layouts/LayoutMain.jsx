import NavBar from "./NavBar";

const LayoutMain = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default LayoutMain;
