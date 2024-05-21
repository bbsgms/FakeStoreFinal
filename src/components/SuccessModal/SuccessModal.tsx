import { order_success } from "../../assets";

const SuccessModal = () => {
  return (
    <div>
      <div className="overlay"></div>
      <div className="modal">
        <h2 className="font-bold text-xl md:text-3xl">Success Order!</h2>
        <img
          src={order_success}
          alt="Success modal illustration"
          className="md:h-[300px] md:w-[300px]"
        ></img>
        <p className="font-medium text-base md:text-xl">
          Your order has been submitted successfully!
        </p>
      </div>
    </div>
  );
};

export default SuccessModal;


