import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import Form from "../components/styles/Form";
import DisplayError from "./ErrorMessage";
import { ALL_PRODUCTS_QUERY } from "./Products";
import Router from "next/router";
const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # variabels
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        photo: { create: { image: $image, altText: $name } }
        status: "AVAILABLE"
      }
    ) {
      id
      price
      description
      status
      name
    }
  }
`;
const CreateProduct = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: "test",
    price: 4,
    image: "",
    description: "this is description",
  });
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      // this is a network refetch products to add the latest one to the product page
      // there is another way with cash

      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await createProduct();
    clearForm();
    Router.push({
      pathname: `/product/${res.data.createProduct.id}`,
    });
  };
  return (
    <Form onSubmit={onSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image:
          <input type="file" id="image" name="image" onChange={handleChange} />
        </label>
        <label htmlFor="name">
          Name:
          <input
            placeholder="Name"
            type="text"
            id="name"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="number">
          Price:
          <input
            placeholder="Price"
            type="number"
            id="price"
            name="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description:
          <textarea
            placeholder="Description"
            id="description"
            name="description"
            value={inputs.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <button type="submit"> + Add Product</button>
        <button type="button" onClick={clearForm}>
          clear form
        </button>
        <button type="button" onClick={resetForm}>
          reset form
        </button>
      </fieldset>
    </Form>
  );
};

export default CreateProduct;
