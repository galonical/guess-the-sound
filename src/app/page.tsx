import GalonicalTheme from "@/theme/GalonicalTheme";
import { Layout, Menu, Breadcrumb } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import StickyHeader from "./page.styles"

export default function Home() {
  const items = Array.from({ length: 3 }).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
  }));

  const { colorBgContainer, borderRadiusLG } = GalonicalTheme.token;

  return (
    <Layout>
      <StickyHeader>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </StickyHeader>
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
