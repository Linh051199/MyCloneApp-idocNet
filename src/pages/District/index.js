import React, { useEffect, useState } from "react";
import DistrictEdit from "./components/DistrictEdit";

function District({ data, setData }) {
  const [districtList, setDistrictList] = useState(data.District);
  const [params, setParams] = useState({
    DistrictCode: "",
    DistrictName: "",
  });
  const [currentComponent, setCurrentComponent] = useState(null);

  const handleSearch = () => {
    const arrDistrict = data.District;
    const arrSearch = [];

    for (let i = 0; i < arrDistrict.length; i++) {
      const item = arrDistrict[i];

      if (
        (!params.DistrictCode || params.DistrictCode === "") &&
        (!params.DistrictName || params.DistrictName === "")
      ) {
        arrSearch.push(item);
      } else if (
        item.DistrictCode &&
        item.DistrictCode.toLowerCase().indexOf(
          params.DistrictCode.toLowerCase()
        ) !== -1 &&
        (!params.DistrictName || params.DistrictName === "")
      ) {
        arrSearch.push(item);
      } else if (
        item.DistrictName &&
        item.DistrictName.toLowerCase().indexOf(
          params.DistrictName.toLowerCase()
        ) !== -1 &&
        (!params.DistrictCode || params.DistrictCode === "")
      ) {
        arrSearch.push(item);
      } else if (
        item.DistrictName &&
        item.DistrictName.toLowerCase().indexOf(
          params.DistrictName.toLowerCase()
        ) !== -1 &&
        item.DistrictCode &&
        item.DistrictCode.toLowerCase().indexOf(
          params.DistrictCode.toLowerCase()
        ) !== -1
      ) {
        arrSearch.push(item);
      }
    }
    const finalArr = [];
    for (let i = 0; i < arrSearch.length; i++) {
      const item = arrSearch[i];
      finalArr.push(Object.assign({}, item, { Idx: i + 1 }));
    }
    setDistrictList(finalArr);
  };

  const handleAdd = () => {
    function handleSave(formValue) {
      const arr = data.District;
      let check = false;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].DistrictCode === formValue.DistrictCode) {
          check = true;
        }
      }
      if (check === false) {
        arr.push(formValue);
        setData(Object.assign({}, data, { District: arr }));
        handleBack();
      } else {
        alert("Mã quận/huyện đã tồn tại!");
        return;
      }
    }
    setCurrentComponent(
      <DistrictEdit
        title="Thêm mới"
        listProvince={data.Province}
        handleSave={handleSave}
        handleBack={handleBack}
      />
    );
  };

  const handleEdit = (currentItem) => {
    function handleSave(formValue) {
      const arr = data.District;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].DistrictCode === formValue.DistrictCode) {
          arr[i] = formValue;
        }
      }
      setData(Object.assign({}, data, { District: arr }));
      handleBack();
    }
    setCurrentComponent(
      <DistrictEdit
        title="Chỉnh sửa"
        listProvince={data.Province}
        handleSave={handleSave}
        handleBack={handleBack}
        currentItem={currentItem}
      />
    );
  };

  const handleDelete = (currentItem) => {
    if (
      window.confirm(
        `Bạn có muốn xoá Quận/Huyện: ${currentItem.DistrictName}  `
      )
    ) {
      const arr = data.District;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].DistrictCode === currentItem.DistrictCode) {
          arr.splice(i, 1);
        }
      }
      setData(Object.assign({}, data, { District: arr }));
    }
  };

  function handleBack() {
    setCurrentComponent(null);
  }

  useEffect(() => {
    setDistrictList(data.District);
  }, [data]);

  function renderSearch() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          width: "400px",
        }}
      >
        <div>
          <label style={{ marginRight: "20px" }}>Mã Quận/Huyện</label>
          <input
            onChange={(e) => {
              setParams({
                DistrictCode: e.target.value,
                DistrictName: params.DistrictName,
              });
            }}
          />
        </div>
        <div>
          <label style={{ marginRight: "20px" }}>Tên Quận/Huyện</label>
          <input
            onChange={(e) => {
              setParams({
                DistrictCode: params.DistrictCode,
                DistrictName: e.target.value,
              });
            }}
          />
        </div>

        <button
          style={{
            padding: "5px 10px",
            backgroundColor: "green",
            width: "100px",
            color: "white",
            cursor: "pointer",
          }}
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>
        <button
          style={{
            padding: "5px 10px",
            backgroundColor: "purple",
            width: "100px",
            color: "white",
            cursor: "pointer",
          }}
          onClick={handleAdd}
        >
          Thêm
        </button>
      </div>
    );
  }

  function renderTableDistrict() {
    const arrReactNode = [];
    for (let i = 0; i < districtList.length; i++) {
      arrReactNode.push(
        <tr>
          <td>{districtList[i].DistrictCode}</td>
          <td>{districtList[i].DistrictName}</td>
          <td>{districtList[i].ProvinceCode}</td>
          <td>
            <span style={{ display: "flex", gap: 10 }}>
              <button
                style={{
                  backgroundColor: "yellow",
                  padding: "10px",
                  border: "1px solid black",
                  cursor: "pointer",
                }}
                onClick={() => handleEdit(districtList[i])}
              >
                Sửa
              </button>
              <button
                style={{
                  backgroundColor: "red",
                  padding: "10px",
                  border: "1px solid black",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(districtList[i])}
              >
                Xoá
              </button>
            </span>
          </td>
        </tr>
      );
    }
    return arrReactNode;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        padding: 10,
      }}
    >
      {currentComponent || (
        <>
          {renderSearch()}
          <div
            style={{
              height: "392px",
              overflow: "auto",
              marginTop: "50px",
            }}
          >
            <table border={1} style={{ borderCollapse: "collapse" }}>
              <tr>
                <th>DistrictCode</th>
                <th>DistrictName</th>
                <th>ProvinceCode</th>
                <th></th>
              </tr>
              <tbody>{renderTableDistrict()}</tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default District;
