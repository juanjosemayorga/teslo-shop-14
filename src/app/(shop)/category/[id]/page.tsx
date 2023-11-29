import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: Props) {
  const { id } = params;
  console.log('id', id);

  if (id === "kids") {
    notFound();
  }

  return (
    <div>
      <h1>CategoryPage {id}</h1>
    </div>
  );
}