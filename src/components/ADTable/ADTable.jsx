import { ConfigProvider, Table } from "antd";
import { useEffect, useRef, useState } from "react";

export default function ADTable({
  size = "large", //large|middle|small
  dataSource,
  columns,
  height = undefined,
  rowKey,
  headerBg = "#f0f0f0",
  loading = false,
  ...args
}) {
  const [wrapperHeight, setWrapperHeight] = useState(100);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const setDimensions = () => {
      const { height } = wrapperRef.current?.getBoundingClientRect();
      setWrapperHeight(height);
    };

    setDimensions();

    /* window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    }; */
  }, [wrapperRef.current]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            borderColor: "#B9B9B9",
            fontFamily: "Rubik,sans-serif",
            fontSize: size === "small" ? "11px" : undefined,
            fontWeightStrong: "500",
            headerBg: headerBg,
            lineHeight: "16px",
            cellPaddingInlineSM: 5,
            cellPaddingBlockSM: 5,
            /*lineHeight: 36, */
          },
        },
      }}
    >
      <div ref={wrapperRef} style={{ flexGrow: "1", overflow: "hidden" }}>
        <Table
          size={size}
          loading={loading}
          bordered
          dataSource={dataSource}
          rowKey={rowKey}
          columns={columns}
          pagination={false}
          scroll={{ y: wrapperHeight - 70 }}
          {...args}
        />
      </div>
    </ConfigProvider>
  );
}

/* scroll={height && { y: height }} */
