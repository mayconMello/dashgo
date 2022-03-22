import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from "react-hook-form";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirm: string
}

const CreateUserFormSchema = yup.object().shape({
  name: yup.string()
    .required('Nome obrigatório')
    .matches(/^[A-Za-z ]*$/, 'Informe um nome válido'),
  email: yup.string()
    .required('E-mail obrigatório')
    .email('E-mail inválido'),
  password: yup.string()
    .required('Senha obrigatória')
    .min(6, 'A senha precisa ter no minimo 6 caracteres'),
  password_confirmation: yup.string()
    .oneOf([
      null,
      yup.ref('password')
    ], 'As senhas precisam ser iguais')
})

export default function UserCreate() {

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(CreateUserFormSchema)
  })

  const { errors } = formState

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(values)
  }

  return (
    <Box>
      <Header />
      <Flex
        width="100%"
        my="6"
        maxWidth={1480}
        mx="auto"
        px="6"
      >
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["4", "6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}

        >
          <Heading
            size="lg"
            fontWeight="normal"
          >
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid
              minChildWidth="240px"
              spacing={["4", "6", "8"]}
              w="100%"
            >
              <Input
                name="name"
                label="Nome completo"
                error={errors.name}
                {...register('name')}
              />
              <Input
                name="email"
                label="E-mail"
                type="email"
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>
            <SimpleGrid
              minChildWidth="240px"
              spacing={["4", "6", "8"]}
              w="100%"
            >
              <Input
                name="password"
                type="password"
                label="Senha"
                error={errors.password}
                {...register('password')}
              />
              <Input
                name="password_confirmation"
                label="Confirme a senha"
                type="password"
                error={errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex
            mt="8"
            justify="end"
          >
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
                loadingText="Aguarde"
              >Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}