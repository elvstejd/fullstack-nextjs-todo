import {
  Badge,
  Box,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import Countdown from "react-countdown";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function Header() {
  const { data: session, status } = useSession();
  const [authLoading, setAuthLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { register, handleSubmit } = useForm();
  const { mutate, isLoading } = useMutation(
    async () => {
      const { data } = await axios.get("/api/auth/extend");
      return data;
    },
    { onSuccess: () => signIn("temp-extend", { id: session?.user?.id }) }
  );

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (authLoading) {
      interval = setInterval(() => setAuthLoading(false), 5000);
    }
    return () => clearInterval(interval);
  }, [authLoading]);

  return (
    <>
      <Box sx={{ padding: "2rem 1rem" }}>
        <Group position="apart">
          <Badge>Todo App</Badge>
          <Group spacing="xs">
            {session ? (
              <>
                <Text>
                  Hola, {session.user?.username ?? "Usuario temporal"}
                </Text>
                {session.user?.expiresAt && (
                  <>
                    <Text>
                      <Countdown
                        onComplete={() => signOut()}
                        date={session.user.expiresAt}
                      />
                    </Text>
                  </>
                )}
                <Group spacing="xs">
                  <Button
                    size="sm"
                    compact
                    onClick={() => {
                      signOut();
                      setAuthLoading(true);
                    }}
                    loading={authLoading}
                  >
                    Cerrar sesion
                  </Button>
                  {session.user?.expiresAt && (
                    <Button
                      size="sm"
                      compact
                      variant="subtle"
                      loading={isLoading}
                      onClick={() => extendUserExpiry()}
                    >
                      Extender tiempo
                    </Button>
                  )}
                </Group>
              </>
            ) : (
              <>
                <Group spacing="xs">
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
                  <Button
                    size="sm"
                    compact
                    onClick={() => setShowLoginModal(true)}
                    disabled={authLoading}
                  >
                    Mi cuenta
                  </Button>
                </Group>
              </>
            )}
          </Group>
        </Group>
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
