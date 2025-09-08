import SkeletonDemo from "@/components/demo/SkeletonDemo";
import CardSystemDemo from "@/components/demo/CardSystemDemo";
import SkeletonMobileDemo from "@/components/demo/SkeletonMobileDemo";

export default function Cards() {
  return (
    <div>
      <SkeletonDemo />
      <SkeletonMobileDemo />
      <CardSystemDemo />
    </div>
  );
}
