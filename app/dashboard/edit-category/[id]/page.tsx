import EditCategory from "@/app/components/dashboard/category/EditCategory";

export default function SingleCategory({ params }) {
  const { id } = params;

  return (
    <div>
      <EditCategory id={id} />
    </div>
  );
}
