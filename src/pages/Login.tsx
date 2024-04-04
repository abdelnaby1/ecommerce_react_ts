"use client";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  FormHelperText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/Stror";
import { userLogin } from "../app/features/LoginSlice";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.login);

  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const submitHandler = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!user.identifier) {
      setIsEmail(true);
      if (!user.password) {
        setIsPassword(true);
        return;
      }
    }
    setIsEmail(false);
    if (!user.password) {
      setIsPassword(true);
      return;
    }
    setIsPassword(false);
    dispatch(userLogin(user));
  };

  useEffect(() => {
    if (data) {
      window.location.reload();
    }
  }, [data]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          as="form"
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          onSubmit={submitHandler}
        >
          <Stack spacing={4}>
            <FormControl id="identifier">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                isInvalid={isEmail}
                errorBorderColor="crimson"
                name="identifier"
                value={user.identifier}
                onChange={onChangeHandler}
              />
              {isEmail && <FormHelperText>Email is required</FormHelperText>}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  isInvalid={isPassword}
                  errorBorderColor="crimson"
                  name="password"
                  value={user.password}
                  onChange={onChangeHandler}
                />

                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isPassword && (
                <FormHelperText>Password is required</FormHelperText>
              )}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
                isLoading={loading}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default LoginPage;
