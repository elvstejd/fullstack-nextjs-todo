import {
  Box,
  Button,
  Group,
  Modal,
  Notification,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import Countdown from "react-countdown";

export function UserBox() {
  const { data: session, status } = useSession();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { register, handleSubmit } = useForm();

  return (
    <>
      <Box
        sx={(theme) => ({
          background: theme.colors.gray[1],
          borderRadius: theme.radius.md,
          padding: theme.spacing.md,
          margin: 16 * 2,
        })}
      >
        {session ? (
          <>
            <Text>Hello {session.user.username}</Text>
            <pre>{JSON.stringify(session)}</pre>
            <Text>
              {session.user.expiresAt && (
                <Countdown
                  onComplete={() => signOut()}
                  date={session.user.expiresAt}
                />
              )}
            </Text>

            <Button onClick={() => signOut()}>Cerrar sesion</Button>
          </>
        ) : (
          <>
            <Notification title="Autenticación requerida" mb={16}>
              Necesitas una cuenta para crear tareas
            </Notification>

            <Text color="dimmed" size="xs" transform="uppercase" mb={8}>
              Continuar con:
            </Text>
            <Group spacing="xs">
              <Button size="sm" compact onClick={() => setShowLoginModal(true)}>
                Mi cuenta
              </Button>
              <Button compact size="sm" onClick={() => signIn("temp")}>
                Como invitado
              </Button>
            </Group>
          </>
        )}
      </Box>
      <Modal
        title="Inicia sesion"
        opened={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      >
        <form
          onSubmit={handleSubmit((data) =>
            signIn("credentials", {
              email: data.username,
              ...data,
              callbackUrl: `${window.location.origin}/`,
            })
          )}
        >
          <Stack>
            <TextInput label="Usuario" {...register("username")} />
            <TextInput
              label="Clave"
              type="password"
              {...register("password")}
            />
            <Button loading={status === "loading"} type="submit">
              Iniciar sesión
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
