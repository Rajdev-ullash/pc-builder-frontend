import { Card, Col, Row, Image, Rate } from "antd";
import Link from "next/link";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product?._id}`} passHref>
      <Card
        hoverable
        cover={<Image src={product?.image} alt={product?.name} width={200} />}
        style={{ height: "100%" }}
      >
        <Meta title={product?.name} description={`$${product?.price}`} />
        <p>{product?.category?.name}</p>
        <p>Status: {product?.status}</p>
        <div style={{ display: "flex", alignItems: "center" }}>
          Rating: <Rate allowHalf value={product?.averageRating} />
        </div>
      </Card>
    </Link>
  );
};

const Product = ({ data }) => {
  console.log(data);
  // Filter the products with an averageRating above 4
  const filteredProducts = data?.data
    .filter((product) => product?.averageRating > 4)
    ?.slice(0, 6); // Take only the first 6 filtered products

  console.log(filteredProducts);
  return (
    <div className="container mx-auto">
      <div>
        <h1 className="text-3xl font-semibold text-[#fffffe] text-center mb-3">
          Top Rated Products
        </h1>
      </div>
      <Row gutter={[16, 16]}>
        {filteredProducts?.map((product) => (
          <Col key={product?._id} xs={24} sm={12} md={8} lg={4}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Product;
