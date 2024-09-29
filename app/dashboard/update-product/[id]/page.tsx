import EditPrductData from "@/app/components/dashboard/product/EditProductData";

export default function SingleProduct({ params }) {
  const { id } = params;

  return (
    <div>
      <EditPrductData id={id} />
    </div>
  );
}
