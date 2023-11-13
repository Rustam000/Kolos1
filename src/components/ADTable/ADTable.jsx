import { ConfigProvider, Table } from "antd";

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
      <Table
        size={size}
        loading={loading}
        bordered
        dataSource={dataSource}
        rowKey={rowKey}
        columns={columns}
        pagination={false}
        scroll={height && { y: height }}
        {...args}
      />
    </ConfigProvider>
  );
}
