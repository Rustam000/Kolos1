import { ConfigProvider, Table } from "antd";

export default function ADTable({
  dataSource,
  columns,
  height = undefined,
  rowKey,
  headerBg = "#f0f0f0",
  loading = false,
}) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            borderColor: "#B9B9B9",
            fontFamily: "Rubik,sans-serif",
            fontWeightStrong: "500",
            headerBg: headerBg,
            lineHeight: "16px",
            /* cellPaddingBlock: "7",
            lineHeight: "36px", */
          },
        },
      }}
    >
      <Table
        loading={loading}
        bordered
        dataSource={dataSource}
        rowKey={rowKey}
        columns={columns}
        pagination={false}
        scroll={height && { y: height }}
      />
    </ConfigProvider>
  );
}
