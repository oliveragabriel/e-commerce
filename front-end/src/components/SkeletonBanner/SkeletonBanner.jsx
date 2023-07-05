import { Skeleton } from "antd"
import { styled } from "styled-components"


const StyledSkeleton = styled(Skeleton.Image)`
  &.ant-skeleton {
    width: 100%;
    height: 50vh;
  }
  &.ant-skeleton-image {
    width: 100% !important;
    height: 50vh !important;
  }
`

export const SkeletonBanner = () => {
  return (
    <StyledSkeleton active />
  )
}