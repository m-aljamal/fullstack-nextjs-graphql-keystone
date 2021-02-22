import React from "react";
import ItemStyles from "../components/styles/ItemStyles";
import Title from "../components/styles/Title";
import PriceTag from "../components/styles/PriceTag";
import Link from "next/link";
import formatMoney from "../lib/formatMoney";
const Product = ({ product }) => {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
    </ItemStyles>
  );
};

export default Product;
