import { Skeleton } from "antd"
import { styled } from "styled-components"


const StyledSkeleton = styled(Skeleton.Image)`
  &.ant-skeleton-image {
    width: 276px !important;
    height: 430px !important;
  }
`

export const SkeletonCardParaProduto = () => {
  return (
    <StyledSkeleton active />
  )
}