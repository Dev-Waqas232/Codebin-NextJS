type AvatarProps = {
  children: any;
};

const Avatar = ({ children }: AvatarProps) => {
  return (
    <button className="flex items-center justify-center w-10 h-10 rounded-full border-white border-2 bg-transparent  focus:outline-none">
      {children?.length > 1 ? (
        <img
          src={children}
          width={0}
          height={0}
          alt="user"
          className="w-full rounded-full object-cover"
        />
      ) : (
        children
      )}
    </button>
  );
};

export default Avatar;
