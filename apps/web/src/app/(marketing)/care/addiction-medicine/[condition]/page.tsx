import { permanentRedirect } from "next/navigation";

type Props = { params: Promise<{ condition: string }> };

export default async function Page({ params }: Props) {
  const { condition } = await params;
  permanentRedirect(`/care/services/addiction-medicine/conditions/${condition}`);
}
