import React, { useEffect, useState } from "react";
import ProvinceEdit from "./components/ProviceEdit";

function Province({ data, setData }) {
  const [provinceList, setProvinceList] = useState(data.Province);
  const [params, setParams] = useState({
    ProvinceCode: "",
    ProvinceName: "",
  });
  const [currentComponent, setCurrentComponent] = useState(null);

  const handleSearch = () => {
    const arr = data.Province;
    const arrSearch = [];

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];

      if (
        (!params.ProvinceCode || params.ProvinceCode === "") &&
        (!params.ProvinceName || params.provinceName === "")
      ) {
        arrSearch.push(item);
      } else if (
        item.ProvinceCode &&
        item.ProvinceCode.toLowerCase().indexOf(
          params.ProvinceCode.toLowerCase()
        ) !== -1 &&
        (!params.ProvinceName || params.provinceName === "")
      ) {
        arrSearch.push(item);
      } else if (
        item.ProvinceName &&
        item.ProvinceName.toLowerCase().indexOf(
          params.ProvinceName.toLowerCase()
        ) !== -1 &&
        (!params.ProvinceCode || params.ProvinceCode === "")
      ) {
        arrSearch.push(item);
      } else if (
        item.ProvinceName &&
        item.ProvinceName.toLowerCase().indexOf(
          params.ProvinceName.toLowerCase()
        ) !== -1 &&
        item.ProvinceCode &&
        item.ProvinceCode.toLowerCase().indexOf(
          params.ProvinceCode.toLowerCase()
        ) !== -1
      ) {
        arrSearch.push(item);
      }
    }
    const finalArr = [];
    for (let i = 0; i < arrSearch.length; i++) {
      const item = arrSearch[i];
      finalArr.push(Object.assign({}, item));
    }

    setProvinceList(finalArr);
  };

  const handleAdd = () => {
    function handleSave(formValue) {
      const arr = data.Province;
      let check = false;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].ProvinceCode === formValue.ProvinceCode) {
          check = true;
        }
      }
      if (check === false) {
        arr.push(formValue);
        setData(Object.assign({}, data, { Province: arr }));
        handleBack();
      } else {
        window.alert("Mã Tỉnh/Thành phố đã tồn tại");
        return;
      }
    }

    setCurrentComponent(
      <ProvinceEdit
        title="Thêm mới"
        handleSave={handleSave}
        handleBack={handleBack}
      />
    );
  };

  const handleDelete = (currentItem) => {
    if (window.confirm(`Bạn có muốn xoá: ${currentItem.ProvinceName}`)) {
      const arr = data.Province;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].ProvinceCode === currentItem.ProvinceCode) {
          arr.splice(i, 1);
        }
      }
      setData(Object.assign({}, data, { Province: arr }));
    }
  };

  const handleBack = () => {
    setCurrentComponent(null);
  };

  const handleEdit = (currentItem) => {
    function handleSave(formValue) {
      const arr = data.Province;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].ProvinceCode === formValue.ProvinceCode) {
          arr[i] = formValue;
        }
      }
      setData(Object.assign({}, data, { Province: arr }));
      handleBack();
    }

    setCurrentComponent(
      <ProvinceEdit
        title="Chỉnh sửa"
        currentItem={currentItem}
        handleSave={handleSave}
        handleBack={handleBack}
      />
    );
  };

  useEffect(() => {
    setProvinceList(data.Province);
  }, [data]);

  const renderSearch = () => {
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
          <label style={{ marginRight: "20px" }}>Mã tỉnh/ Thành phố</label>
          <input
            onChange={(e) =>
              setParams({
                ProvinceCode: e.target.value,
                ProvinceName: params.ProvinceName,
              })
            }
          ></input>
        </div>
        <div>
          <label style={{ marginRight: "20px" }}>Tên tỉnh/ Thành phố</label>
          <input
            onChange={(e) =>
              setParams({
                ProvinceName: e.target.value,
                ProvinceCode: params.ProvinceCode,
              })
            }
          ></input>
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
  };

  const rederProvince = () => {
    const arrReactNode = [];
    for (let i = 0; i < provinceList.length; i++) {
      arrReactNode.push(
        <tr>
          <td>{provinceList[i].ProvinceCode}</td>
          <td>{provinceList[i].ProvinceName}</td>
          <td>
            <span style={{ display: "flex", gap: 10 }}>
              <button
                style={{
                  backgroundColor: "yellow",
                  padding: "10px",
                  border: "1px solid black",
                  cursor: "pointer",
                }}
                onClick={() => handleEdit(provinceList[i])}
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
                onClick={() => handleDelete(provinceList[i])}
              >
                Xoá
              </button>
            </span>
          </td>
        </tr>
      );
    }
    return arrReactNode;
  };
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
                <th>ProviceCode</th>
                <th>ProvinceName</th>
                <th></th>
              </tr>
              <tbody>{rederProvince()}</tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Province;
