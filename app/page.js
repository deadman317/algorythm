import { Card } from "@/components";

const navigation = [
  { name: "Sorting Visualizer", href: "/sort", img: "/sort.png" },
  { name: "Path Finder", href: "/pathfinder", img: "/pathfinder.png" },
  { name: "Search Visualizer", href: "/search", img: "/search.png" },
  { name: "N Queen", href: "/nqueen", img: "/nqueen.png" },
];

export default function Home() {
  return <Card navigation={navigation} />;
}
