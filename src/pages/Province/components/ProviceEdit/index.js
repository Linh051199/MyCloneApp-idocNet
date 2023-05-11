import React, { useEffect, useState } from "react";

function ProvinceEdit({ title, handleBack, handleSave, currentItem }) {
  const [formValue, setFormValue] = useState({
    ProvinceCode: "",
    ProvinceName: "",
  });
  const handleSubmit = () => {
    if (!formValue.ProvinceCode && !formValue.ProvinceName) {
      window.alert("Mời nhập đầy đủ thông tin");
      return;
    }
    handleSave(formValue);
  };
  useEffect(() => {
    if (currentItem) {
      setFormValue(currentItem);
    }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        flexDirection: "column",
        padding: 10,
        alignItems: "center",
      }}
    >
      <div>{title}</div>
      <div>
        <label style={{ marginRight: 10 }}>Mã Tỉnh/Thành phố</label>
        <input
          required
          value={formValue.ProvinceCode}
          onChange={(e) => {
            setFormValue(
              Object.assign({}, formValue, { ProvinceCode: e.target.value })
            );
          }}
          disabled={currentItem}
        />
      </div>
      <div>
        <label style={{ marginRight: 10 }}>Tên Tỉnh/Thành phố</label>
        <input
          required
          value={formValue.ProvinceName}
          onChange={(e) => {
            setFormValue(
              Object.assign({}, formValue, { ProvinceName: e.target.value })
            );
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button
          style={{
            padding: "5px 10px",
            backgroundColor: "#73d13d",
            width: "100px",
            border: "1px solid black",
          }}
          onClick={handleSubmit}
        >
          Lưu
        </button>
        <button
          onClick={handleBack}
          style={{
            padding: "5px 10px",
            backgroundColor: "yellow",
            width: "100px",
            border: "1px solid black",
          }}
        >
          Quay lại
        </button>
      </div>
    </div>
  );
}

export default ProvinceEdit;
