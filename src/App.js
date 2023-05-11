import { useState } from "react";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import * as districtList from "./data/Mst_District.json";
import * as provinceList from "./data/Mst_Province.json";
import District from "./pages/District";
import Province from "./pages/Province";

function App() {
  function getDefaultDataDistriclist() {
    const data = Object.values(districtList);
    const arr = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].DistrictCode) {
        arr.push(data[i]);
      }
    }
    return arr;
  }

  function getDefaultDataProvinceList() {
    const data = Object.values(provinceList);
    const arr = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].ProvinceCode) {
        arr.push(data[i]);
      }
    }
    return arr;
  }

  const [data, setData] = useState({
    District: getDefaultDataDistriclist(),
    Province: getDefaultDataProvinceList(),
  });

  const components = [
    {
      key: "1",
      component: <District data={data} setData={setData} />,
      content: "Quận/Huyện",
    },
    {
      key: "2",
      component: <Province data={data} setData={setData} />,
      content: "Tỉnh/Thành phố",
    },
  ];

  const [activeKey, setActiveKey] = useState("1");

  function renderComponent() {
    for (let i = 0; i < components.length; i++) {
      if (components[i].key === activeKey) {
        return components[i].component;
      }
    }
  }

  return (
    <div className="App" style={{ display: "flex" }}>
      <Navbar
        navList={components}
        activeKey={activeKey}
        setActiveKey={setActiveKey}
      />
      {renderComponent()}
    </div>
  );
}

export default App;
