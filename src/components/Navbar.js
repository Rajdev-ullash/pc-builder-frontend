import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Link from "next/link";

const CategoriesMenu = ({ data }) => {
  console.log(data);
  // Accept the data prop here
  const menu = (
    <Menu>
      {data?.map((category) => (
        <Menu.Item key={category?._id}>
          <Link href={`/categories/${category?._id}`}>{category?.name}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        Categories <DownOutlined />
      </a>
    </Dropdown>
  );
};

const Navbar = ({ data }) => {
  // Accept the data prop here as well
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-white font-bold text-xl">My Next.js App</h1>
        </Link>
        {data ? <CategoriesMenu data={data} /> : null}{" "}
        {/* Pass the data prop to CategoriesMenu */}
      </div>
    </nav>
  );
};

export default Navbar;

// ssg

export const getStaticProps = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/categories");
    const data = await res.json();
    console.log(data);

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: [],
      },
    };
  }
};
