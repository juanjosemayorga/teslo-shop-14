export const revalidate = 0;

import { getPaginatedUsers } from "@/actions";
import { Title } from "@/components";

import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";
import { Pagination } from '../../../../components/ui/pagination/Pagination';

export default async function UsersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="All users" />

      <div className="mb-10">
        <UsersTable users={users} />
        <Pagination totalPages={3} />
      </div>
    </>
  );
}
