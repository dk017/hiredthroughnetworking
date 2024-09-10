const Tag = ({ skill }: { skill: string }) => {
  return (
    <span className="inline-block bg-black text-white text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
      {skill}
    </span>
  );
};

export default Tag;