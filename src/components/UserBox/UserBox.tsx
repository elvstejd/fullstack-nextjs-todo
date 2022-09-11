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
import { useEffect, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import Countdown from "react-countdown";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function UserBox() {
  const { data: session, status } = useSession();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const { mutate, isLoading } = useMutation(async () => {
    const { data } = await axios.get("/api/auth/extend");
    return data;
  });

  useEffect(() => {
    let interval;

    if (authLoading) {
      interval = setInterval(() => setAuthLoading(false), 5000);
    }
    return () => clearInterval(interval);
  }, [authLoading]);

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
            <Text>Hola {session.user.username ?? "USUARIO TEMPORAL"}</Text>
            <Text>
              {session.user.expiresAt && (
                <>
                  <Text>
                    Su usuario será invalidado una vez se acabe el tiempo (30
                    minutos)
                  </Text>
                  <Countdown
                    onComplete={() => signOut()}
                    date={session.user.expiresAt}
                  />
                </>
              )}
            </Text>
            <Group spacing="xs">
              <Button
                onClick={() => {
                  signOut();
                  setAuthLoading(true);
                }}
                loading={authLoading}
              >
                Cerrar sesion
              </Button>
              <Button
                variant="subtle"
                loading={isLoading}
                onClick={() =>
                  mutate(null, {
                    onSuccess: () =>
                      signIn("temp-extend", { id: session.user.id }),
                  })
                }
              >
                Extender tiempo
              </Button>
            </Group>
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
              <Button
                size="sm"
                compact
                onClick={() => setShowLoginModal(true)}
                disabled={authLoading}
              >
                Mi cuenta
              </Button>
              <Button
                compact
                size="sm"
                onClick={() => {
                  signIn("temp");
                  setAuthLoading(true);
                }}
                variant="subtle"
                loading={authLoading}
              >
                Perfil de invitado
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
