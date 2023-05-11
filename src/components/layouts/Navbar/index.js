import React from "react";

function Navbar({ navList, activeKey, setActiveKey }) {
  function returnNavItem() {
    const arrReactNode = [];

    if (navList && navList.length > 0) {
      for (let i = 0; i < navList.length; i++) {
        arrReactNode.push(
          <div
            key={navList[i].key}
            style={{
              backgroundColor: navList[i].key === activeKey && "gray",
              padding: 10,
              cursor: "pointer",
            }}
            onClick={() => handleChangeActiveKey(navList[i].key)}
          >
            {navList[i].content}
          </div>
        );
      }
    }
    return arrReactNode;
  }

  function handleChangeActiveKey(key) {
    setActiveKey(key);
  }

  return (
    <div
      style={{
        backgroundColor: "#f3f3f3",
        width: 300,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {returnNavItem()}
    </div>
  );
}

export default Navbar;
