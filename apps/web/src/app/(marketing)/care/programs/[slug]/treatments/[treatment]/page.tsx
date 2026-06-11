import { redirect } from "next/navigation";

type Props = { params: Promise<{ treatment: string }> };

export default async function Page({ params }: Props) {
  const { treatment } = await params;
  redirect(`/care/medications/${treatment}`);
}
