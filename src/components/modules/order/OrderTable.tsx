/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Spinner from "@/components/modules/common/Spinner";
import { useGetAllDonationQuery } from "@/redux/features/cause/cause.api";
import CausesUpdateModal from "../cause/CausesUpdateModal";

const OrderTable = () => {
  const { data: order, isFetching } = useGetAllDonationQuery(undefined);
  console.log(order?.data);
  if (isFetching) {
    return <Spinner />;
  }

  if (order?.data < 1) {
    return (
      <div className="flex justify-center items-center md:my-12 my-5 md:py-12 py-5 bg-white rounded-3xl">
        <p>No Data Found</p>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-[#0C0B21B2] font-normal text-center">
              User Name
            </TableHead>
            <TableHead className="text-[#0C0B21B2] font-normal text-center">
              User Email
            </TableHead>
            <TableHead className="text-[#0C0B21B2] font-normal text-center">
              Price
            </TableHead>
            <TableHead className="text-[#0C0B21B2] font-normal text-center">
              Status
            </TableHead>
            <TableHead className="text-[#0C0B21B2] font-normal text-center">
              Make Completed
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order?.data?.map((item: any) => (
            <TableRow key={item.id} className="text-[#0C0B21B2] text-center">
              <TableCell className="py-3">{item?.user?.fullName}</TableCell>
              <TableCell>{item?.user?.email}</TableCell>
              <TableCell>{item?.amount}</TableCell>
              <TableCell>{item?.status}</TableCell>
              <TableCell className="flex justify-center">
                {item?.status === "DELIVERED" || item?.status === "CANCEL" ? (
                  <p className="text-green-500">Completed</p>
                ) : (
                  <CausesUpdateModal
                    data={{ id: item.id, status: "COMPLETED" }}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
