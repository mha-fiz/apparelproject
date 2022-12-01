import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

export const AppSkeleton = (props) => {
  const isDark = useSelector((state) => state.theme.isDarkTheme);

  return (
    <SkeletonTheme
      baseColor={`${isDark ? "#373A40" : "#ebebeb"}`}
      highlightColor={`${isDark ? "#2C2E33" : "#f5f5f5"}`}
    >
      <Skeleton {...props} />
    </SkeletonTheme>
  );
};
