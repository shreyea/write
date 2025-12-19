import FriendButton from "./FriendButton";

export default function UserCard({
  user,
  status,
}: {
  user: any;
  status: "none" | "pending" | "friends";
}) {
  return (
    <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
      <span>@{user.username}</span>
      <FriendButton targetUserId={user.id} status={status} />
    </div>
  );
}
