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
import { useAllCausesForAdminQuery } from "@/redux/features/cause/cause.api";
import CausesUpdateModal from "./CausesUpdateModal";
import AddLinkToCausesModal from "./AddLinkToCausesModal";

const CausesTable = () => {
  const { data, isFetching } = useAllCausesForAdminQuery(undefined);

  if (isFetching) {
    return <Spinner />;
  }

  if (data?.data.length < 1) {
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
              No
            </TableHead>
            <TableHead className="text-[#0C0B21B2] font-normal text-center">
              Temple Name
            </TableHead>
            <TableHead className="text-[#0C0B21B2] font-normal text-center">
              Cause Name
            </TableHead>
            <TableHead className="text-[#0C0B21B2] font-normal text-center">
              Price
            </TableHead>
            <TableHead className="text-[#0C0B21B2] font-normal text-center">
              Status
            </TableHead>
            <TableHead className="text-[#0C0B21B2] font-normal text-center">
              Action
            </TableHead>
            <TableHead className="text-[#0C0B21B2] font-normal text-center">
              Link
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((data: any, idx: string) => (
            <TableRow key={data.id} className="text-[#0C0B21B2] text-center">
              <TableCell className="py-3">{idx + 1}</TableCell>
              <TableCell>{data?.temple?.name}</TableCell>
              <TableCell>{data?.cause?.name}</TableCell>
              <TableCell>{data?.totalAmount}</TableCell>
              <TableCell>{data?.status}</TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <CausesUpdateModal data={data} />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <AddLinkToCausesModal data={data} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CausesTable;
