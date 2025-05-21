import OrderTable from "@/components/modules/order/OrderTable";

const page = () => {
  return (
    <div>
      <h1 className="md:text-5xl text-2xl font-medium md:mb-4 mb-2">
        All Order List
      </h1>

      <div className="md:p-7 p-3 md:rounded-3xl rounded-xl bg-white md:mt-12 mt-4">
        <OrderTable />
      </div>
    </div>
  );
};

export default page;
