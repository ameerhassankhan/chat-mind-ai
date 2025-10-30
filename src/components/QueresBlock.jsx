import { removeHeadingStars, checkHeading, checkSubHeading } from "../helper";

const QueresBlock = ({ ans, index}) => {
  const safe = String(ans ?? "");
  const headingStatus = checkHeading(safe);
  const subHeadingStatus = checkSubHeading(safe);
  const answer = removeHeadingStars(safe).trim();

  return (

    <div className="mb-2 text-left">
      {index==0?(
        <span className="text-xl">{answer}</span>
      ):headingStatus ? (
        <span className="text-lg text-red-500">{answer}</span>
      ) : subHeadingStatus ? (
        <span className="pt-2 block">{answer}</span>
      ) : (
        <span className="text-sm text-zinc-200">{answer}</span>
      )}
    </div>
  );
};

export default QueresBlock;
