import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ProductSkeleton = () => {
  return (
    <Box padding="6" boxShadow="lg" bg="gray.600" rounded={"lg"}>
      <SkeletonCircle size="40" mx={"auto"} />
      <SkeletonText
        mt="4"
        w={"50%"}
        noOfLines={1}
        spacing="4"
        skeletonHeight="2"
        mx={"auto"}
      />
      <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
      <SkeletonText
        mt="4"
        noOfLines={1}
        spacing="4"
        skeletonHeight="2"
        w={"30%"}
        mx={"auto"}
      />
      <SkeletonText
        mt="4"
        noOfLines={1}
        spacing="4"
        skeletonHeight="10"
        rounded={"mg"}
      />
    </Box>
  );
};

export default ProductSkeleton;
