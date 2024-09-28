import EditUserData from "@/app/components/dashboard/user/EditUser";

export default function SingleUser({ params }) {
  const { id } = params;

  return (
    <div>
      <EditUserData id={id} />
    </div>
  );
}
