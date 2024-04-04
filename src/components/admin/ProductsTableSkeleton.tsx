import { Stack, Flex, Skeleton, Box } from "@chakra-ui/react";

const ProductsTableSkeleton = () => {
  return (
    <Stack maxW={"95%"} mx={"auto"} my={10}>
      {Array.from({ length: 10 }, (_, idx) => (
        <Flex
          key={idx}
          alignItems={"center"}
          justifyContent={"space-between"}
          border={"1px solid #333"}
          rounded={"md"}
          p={2}
        >
          <Skeleton h={"9px"} w={"120px"} bg={"gray"} />
          <Skeleton h={"9px"} w={"120px"} bg={"gray"} />
          <Skeleton h={"9px"} w={"120px"} bg={"gray"} />
          <Skeleton h={"9px"} w={"120px"} bg={"gray"} />
          <Skeleton h={"9px"} w={"120px"} bg={"gray"} />
          <Skeleton h={"9px"} w={"120px"} bg={"gray"} />
          <Flex>
            <Skeleton
              h={"30px"}
              w={"50px"}
              startColor="red.300"
              endColor="red.500"
              mr={4}
              rounded={"md"}
            />
            <Skeleton
              h={"30px"}
              w={"50px"}
              startColor="blue.300"
              endColor="blue.500"
              rounded={"md"}
            />
          </Flex>
        </Flex>
      ))}
      <Box>
        <Skeleton h={"10px"} w={"250px"} bg={"gray"} mx={"auto"} />
      </Box>
    </Stack>
  );
};

export default ProductsTableSkeleton;
