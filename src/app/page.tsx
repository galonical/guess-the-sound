import GalonicalTheme from "@/theme/GalonicalTheme";
import { Breadcrumb, Layout, Menu } from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";

export default function Home() {
  const items = Array.from({ length: 3 }).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
  }));

  const { colorBgContainer, borderRadiusLG } = GalonicalTheme.token;

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
        />
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©{new Date().getFullYear()} created by Galonical
      </Footer>
    </Layout>
  );
}
