import { SelectedVodkaProvider } from "@/context/SelectedVodkaContext";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SelectedVodkaProvider>{children}</SelectedVodkaProvider>;
}
