import { ImSpinner9 } from "react-icons/im";

const Spinner = () => {
    return (
    <div className="md:py-10 py-5 flex justify-center items-center">
      <div className="animate-spin"><ImSpinner9 className="text-[#249A24] text-3xl" /></div>
    </div>
    );
};

export default Spinner;