import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Link from "next/link";

const CategoriesMenu = ({ data }) => {
  const menu = (
    <Menu className="pr-5">
      {data?.map((category) => (
        <Menu.Item key={category?._id}>
          <Link href={`/categories/${category?._id}`}>
            <p className="block px-4 text-gray-800 hover:bg-blue-100">
              {category?.name}
            </p>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomCenter" arrow>
      <a
        className="text-white font-semibold flex items-center cursor-pointer bg-transparent pr-3 pl-2" // Customize your styles here
        onClick={(e) => e.preventDefault()}
      >
        Categories
      </a>
    </Dropdown>
  );
};

const Navbar = ({ data }) => {
  return (
    <nav className="font-serif mx-2 my-5">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="no-underline">
          <h4 className="text-[#fffffe] font-bold cursor-pointer">
            PC-BUILDER
          </h4>
        </Link>
        <div className="flex items-center">
          {data ? <CategoriesMenu data={data} /> : null}
          <Link href="/pcbuild" className="no-underline">
            <Button className="ml-5" type="primary">
              Build Your PC
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
