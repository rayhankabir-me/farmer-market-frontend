import EditPostData from "@/app/components/frontend/posts/EditPostData";

export default function EditSinglePost({ params }) {
  const { id } = params;

  return (
    <div>
      <EditPostData id={id} />
    </div>
  );
}
