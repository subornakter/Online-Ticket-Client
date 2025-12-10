import useAuth from "../../../hooks/useAuth";

const UserProfile = () => {
  const { user } = useAuth(); // name, email, photo, role

  return (
    <div className="p-6">
      <img src={user.photoURL} className="w-32 h-32 rounded-full mx-auto mb-4" />
      <h2 className="text-2xl text-center font-bold">{user.name}</h2>
      <p className="text-lg text-center">{user.email}</p>
      <p className="text-center badge badge-primary my-2">{user.role}</p>
    </div>
  );
};
export default UserProfile;