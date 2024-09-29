import EditPrductData from "@/app/components/dashboard/product/EditProductData";

export default function SinglePost({ params }) {
  const { id } = params;

  return (
    <div>
      <EditPrductData id={id} />
    </div>
  );
}
